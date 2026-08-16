# AI Receptionist — Phone + WhatsApp — Setup

## Stack
- **Phone**: Twilio (telephony) + OpenAI Realtime API, `gpt-realtime-mini` (custom Node bridge — `server.js`)
- **WhatsApp**: same n8n instance + Meta WhatsApp Cloud API used for Product 1
- **Shared booking**: one n8n webhook (`0. Shared Booking Webhook`) is the single source of truth — both the phone bridge and the WhatsApp workflow write bookings there, so the calendar never splits across channels

## Files
- `server.js` — Twilio Media Streams ↔ OpenAI Realtime API bridge. Handles the live call, qualifying questions, and two tools: `book_appointment`, `escalate_to_staff`.
- `package.json`, `.env.example` — run with `npm install && npm start`
- `n8n_workflow_whatsapp_receptionist.json` — WhatsApp-side receptionist (GPT-4o-mini), same qualifying-question logic, same two tools
- `n8n_workflow_shared_booking_webhook.json` — the shared booking endpoint both channels call

## Setup steps
1. **Twilio**: buy a number, set its Voice webhook to `https://<PUBLIC_HOSTNAME>/voice` (POST).
2. **Deploy `server.js`** somewhere with a public HTTPS/WSS endpoint (small VPS or Fly.io/Render — needs to stay warm for low latency, so avoid pure serverless cold-starts here). `npm install && npm start`.
3. **OpenAI**: set `OPENAI_API_KEY`. No separate STT/TTS vendor needed — Realtime API handles both ends of the audio in one socket.
4. **Reuse Product 1's WhatsApp setup** (`WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`) — same WABA, same n8n instance. Import the two new workflows.
5. **Wire `N8N_BOOKING_WEBHOOK_URL`** into both `server.js`'s `.env` and the WhatsApp workflow so phone and WhatsApp bookings land in the same place.
6. Swap the booking webhook's Google Sheets node for Calendly's API or a direct PMS write once a pilot clinic is live.

## Cost math (per call/conversation)
- **OpenAI Realtime (mini)**: input ~$0.019/min heard + output ~$0.077/min spoken ≈ **$0.05–0.10/min** for a natural back-and-forth call. A typical 3-minute booking call ≈ **$0.15–0.30**.
- **Twilio telephony**: India inbound ~₹0.40–0.90/min on a normal number ≈ **₹1.20–2.70** for a 3-minute call (~$0.015–0.03).
- **All-in per call**: roughly **$0.20–0.35** (~₹17–30).
- **WhatsApp side**: free if the patient messages first (service conversation, patient-initiated); n8n + Meta cost is otherwise the same as Product 1.

Against the proof point (Saturday 8pm call that would've gone to a competitor, ₹2,500+ avg booking value), the cost of the call itself is a rounding error.

## Why custom over a managed platform (Vapi/Retell/Bland)
Published per-minute rates on managed platforms ($0.05–0.09) look close to the custom build, but their *all-in* cost after telephony pass-through and premium voices runs $0.10–0.30+/min — often 2–5x the custom stack once volume grows, per current market comparisons. Custom costs more in setup time now, less per call at scale, and keeps the shared-booking + escalation logic in your own infrastructure rather than a third party's.
