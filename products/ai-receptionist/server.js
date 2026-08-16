/**
 * AI Receptionist — Phone bridge
 * Twilio Media Streams  <-->  this server  <-->  OpenAI Realtime API
 *
 * Flow:
 *  1. Patient calls the practice's Twilio number.
 *  2. Twilio hits /voice, gets TwiML that opens a <Stream> back to this server's /media-stream websocket.
 *  3. Raw audio is piped both ways between Twilio and OpenAI's Realtime API (gpt-realtime-mini).
 *  4. The model is given two tools: book_appointment and escalate_to_staff.
 *     - book_appointment posts to the shared n8n webhook (same instance used by Product 1).
 *     - escalate_to_staff sends a WhatsApp summary to the front desk via the Meta Cloud API
 *       (reuses WHATSAPP_PHONE_NUMBER_ID / WHATSAPP_ACCESS_TOKEN from Product 1's env).
 */

const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws');
const twilio = require('twilio');

const {
  PORT = 3000,
  OPENAI_API_KEY,
  WHATSAPP_PHONE_NUMBER_ID,
  WHATSAPP_ACCESS_TOKEN,
  FRONT_DESK_WHATSAPP_NUMBER,
  N8N_BOOKING_WEBHOOK_URL, // e.g. https://your-n8n-host/webhook/book-appointment
  PUBLIC_HOSTNAME,          // e.g. receptionist.yourdomain.com (no protocol)
  APPWRITE_ENDPOINT,        // e.g. https://cloud.appwrite.io/v1
  APPWRITE_PROJECT_ID,
  APPWRITE_API_KEY,         // server-side API key with write access to calls_log
  APPWRITE_DATABASE_ID,     // e.g. practice_os
} = process.env;

const SYSTEM_PROMPT = `You are the AI receptionist for a dental practice, answering by phone.
Be warm, brief, and efficient — this is a voice call, so keep turns short (1-2 sentences).
Goals, in order:
1. Understand why the patient is calling (new patient, existing patient, emergency, general question).
2. Ask qualifying questions: name, whether they're a new or returning patient, reason for visit, preferred day/time, and whether they have dental insurance.
3. If you have enough information and a slot is available, call book_appointment to confirm it.
4. If the situation is urgent (severe pain, swelling, trauma), or the patient asks for something you can't resolve (billing dispute, complex insurance question, angry patient), call escalate_to_staff with a full summary instead of guessing.
Never invent appointment times — always confirm through book_appointment. Never give medical advice beyond generic first-aid comfort ("rinse with warm salt water, take ibuprofen if you're able") — always offer the soonest booking for anything painful.`;

const TOOLS = [
  {
    type: 'function',
    name: 'book_appointment',
    description: 'Books a patient appointment once you have their name, phone, reason for visit, and a day/time preference.',
    parameters: {
      type: 'object',
      properties: {
        patient_name: { type: 'string' },
        phone: { type: 'string' },
        reason: { type: 'string' },
        preferred_day_time: { type: 'string' },
        new_or_returning: { type: 'string', enum: ['new', 'returning'] },
        has_insurance: { type: 'boolean' },
      },
      required: ['patient_name', 'reason', 'preferred_day_time'],
    },
  },
  {
    type: 'function',
    name: 'escalate_to_staff',
    description: 'Escalates the call to front-desk staff or the doctor with a full summary, for anything the receptionist should not handle alone.',
    parameters: {
      type: 'object',
      properties: {
        caller_phone: { type: 'string' },
        summary: { type: 'string', description: 'Full summary of the call and why it needs a human.' },
        urgency: { type: 'string', enum: ['routine', 'same_day', 'emergency'] },
      },
      required: ['summary', 'urgency'],
    },
  },
];

const app = express();
app.use(express.urlencoded({ extended: false }));
expressWs(app);

// --- Twilio entry point: incoming call -> TwiML that opens the media stream ---
app.post('/voice', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  const connect = twiml.connect();
  const stream = connect.stream({ url: `wss://${PUBLIC_HOSTNAME}/media-stream` });
  // Pass the caller's number through as a custom parameter so it's available
  // on the media-stream 'start' event — Twilio doesn't include the raw From
  // number in Media Stream messages by default.
  stream.parameter({ name: 'callerNumber', value: req.body.From || '' });
  res.type('text/xml').send(twiml.toString());
});

// --- Bridge: Twilio Media Stream <-> OpenAI Realtime API ---
app.ws('/media-stream', (twilioWs) => {
  let streamSid = null;
  let callerPhone = null;
  let callOutcome = { type: 'support', patientName: null, summary: null }; // updated as tools fire; logged on hangup
  const openaiWs = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-realtime-mini', {
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'OpenAI-Beta': 'realtime=v1',
    },
  });

  openaiWs.on('open', () => {
    openaiWs.send(JSON.stringify({
      type: 'session.update',
      session: {
        modalities: ['audio', 'text'],
        instructions: SYSTEM_PROMPT,
        voice: 'alloy',
        input_audio_format: 'g711_ulaw',
        output_audio_format: 'g711_ulaw',
        tools: TOOLS,
        tool_choice: 'auto',
        turn_detection: { type: 'server_vad' },
      },
    }));
  });

  // OpenAI -> Twilio (audio out) + handle tool calls
  openaiWs.on('message', async (raw) => {
    const event = JSON.parse(raw.toString());

    if (event.type === 'response.audio.delta' && streamSid) {
      twilioWs.send(JSON.stringify({
        event: 'media',
        streamSid,
        media: { payload: event.delta },
      }));
    }

    if (event.type === 'response.function_call_arguments.done') {
      const args = JSON.parse(event.arguments || '{}');
      let result = { ok: true };
      try {
        if (event.name === 'book_appointment') {
          result = await postJson(N8N_BOOKING_WEBHOOK_URL, { source: 'ai_receptionist_phone', ...args });
          callOutcome = {
            type: args.new_or_returning === 'new' ? 'conversion' : 'scheduling',
            patientName: args.patient_name,
            summary: `Booked: ${args.reason} (${args.preferred_day_time})`,
          };
        } else if (event.name === 'escalate_to_staff') {
          await sendWhatsAppText(FRONT_DESK_WHATSAPP_NUMBER,
            `📞 AI Receptionist escalation (${args.urgency})\nCaller: ${args.caller_phone || 'unknown'}\n\n${args.summary}`);
          callOutcome = { type: 'escalation', patientName: null, summary: args.summary };
        }
      } catch (err) {
        result = { ok: false, error: err.message };
      }
      openaiWs.send(JSON.stringify({
        type: 'conversation.item.create',
        item: {
          type: 'function_call_output',
          call_id: event.call_id,
          output: JSON.stringify(result),
        },
      }));
      openaiWs.send(JSON.stringify({ type: 'response.create' }));
    }
  });

  // Twilio -> OpenAI (audio in)
  twilioWs.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    if (msg.event === 'start') {
      streamSid = msg.start.streamSid;
      callerPhone = msg.start.customParameters?.callerNumber || null;
    } else if (msg.event === 'media' && openaiWs.readyState === WebSocket.OPEN) {
      openaiWs.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: msg.media.payload,
      }));
    } else if (msg.event === 'stop') {
      openaiWs.close();
    }
  });

  let logged = false;
  const logCallOnce = () => {
    if (logged) return;
    logged = true;
    logCall({
      patient_name: callOutcome.patientName || 'Unknown',
      phone: callerPhone || 'unknown',
      channel: 'phone',
      type: callOutcome.type,
      summary: callOutcome.summary || 'Call completed — no booking or escalation.',
      handled_at: new Date().toISOString(),
      missed: false, // the bridge only logs calls that actually connected and were answered
    }).catch((e) => console.error('Appwrite call log failed:', e.message));
  };

  twilioWs.on('close', () => { openaiWs.close(); logCallOnce(); });
  openaiWs.on('close', () => { twilioWs.close(); logCallOnce(); });
  openaiWs.on('error', (e) => console.error('OpenAI WS error:', e.message));
});

async function postJson(url, body) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json().catch(() => ({ ok: res.ok }));
}

async function logCall(doc) {
  // Appends to the shared calls_log table (same Appwrite project the
  // dashboard reads from) via the TablesDB REST API. Append-only, so let
  // Appwrite generate the row ID.
  await fetch(
    `${APPWRITE_ENDPOINT}/tablesdb/${APPWRITE_DATABASE_ID}/tables/calls_log/rows`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Appwrite-Project': APPWRITE_PROJECT_ID,
        'X-Appwrite-Key': APPWRITE_API_KEY,
      },
      body: JSON.stringify({ rowId: 'unique()', data: doc }),
    }
  );
}

async function sendWhatsAppText(to, body) {
  await fetch(`https://graph.facebook.com/v20.0/${WHATSAPP_PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'text',
      text: { body },
    }),
  });
}

app.listen(PORT, () => console.log(`AI Receptionist bridge listening on :${PORT}`));
