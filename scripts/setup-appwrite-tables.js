/**
 * Run this in your browser's DevTools Console (F12) while logged into
 * https://cloud.appwrite.io and viewing ANY page of the DENTIST project
 * (session cookie auth — no API key needed).
 *
 * Creates all 8 tables + columns + permissions for the practice_os database
 * in one shot. Safe to re-run — it skips anything that already exists.
 */
(async () => {
  const ENDPOINT = 'https://sgp.cloud.appwrite.io/v1';
  const PROJECT_ID = '6a7eafe70004501c7bf7';
  const DATABASE_ID = '6a7eb6030033e8a8d2f6'; // practice_os

  const headers = { 'X-Appwrite-Project': PROJECT_ID, 'Content-Type': 'application/json' };
  const opts = { credentials: 'include' };

  async function req(method, path, body) {
    const res = await fetch(ENDPOINT + path, { method, headers, credentials: 'include', body: body ? JSON.stringify(body) : undefined });
    const json = await res.json().catch(() => ({}));
    if (!res.ok && json.type !== 'table_already_exists' && json.type !== 'column_already_exists') {
      console.warn('FAILED', method, path, res.status, json.message || json);
    }
    return json;
  }

  async function createTable(tableId, name) {
    await req('POST', `/tablesdb/${DATABASE_ID}/tables`, {
      tableId, name,
      permissions: ['read("any")'],
      rowSecurity: false,
    });
  }

  async function col(tableId, type, key, extra = {}) {
    // type: 'string' | 'integer' | 'boolean' | 'datetime'
    const path = `/tablesdb/${DATABASE_ID}/tables/${tableId}/columns/${type}`;
    await req('POST', path, { key, required: false, ...extra });
  }

  const tables = {
    reengagement_log: { name: 'Reengagement Log', cols: async (t) => {
      await col(t, 'string', 'patient_id', { size: 64 });
      await col(t, 'string', 'name', { size: 128 });
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'integer', 'months_lapsed');
      await col(t, 'datetime', 'sent_at');
      await col(t, 'string', 'status', { size: 32 });
    }},
    calls_log: { name: 'Calls Log', cols: async (t) => {
      await col(t, 'string', 'patient_name', { size: 128 });
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'string', 'channel', { size: 16 });
      await col(t, 'string', 'type', { size: 32 });
      await col(t, 'string', 'summary', { size: 1024 });
      await col(t, 'datetime', 'handled_at');
      await col(t, 'boolean', 'missed');
    }},
    appointments: { name: 'Appointments', cols: async (t) => {
      await col(t, 'string', 'source', { size: 32 });
      await col(t, 'string', 'patient_name', { size: 128 });
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'string', 'reason', { size: 256 });
      await col(t, 'string', 'preferred_day_time', { size: 128 });
      await col(t, 'string', 'new_or_returning', { size: 16 });
      await col(t, 'boolean', 'has_insurance');
      await col(t, 'datetime', 'appointment_datetime');
      await col(t, 'string', 'status', { size: 32 });
      await col(t, 'integer', 'no_show_count');
    }},
    waitlist_offers: { name: 'Waitlist Offers', cols: async (t) => {
      await col(t, 'string', 'patient_id', { size: 64 });
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'datetime', 'offered_at');
      await col(t, 'string', 'status', { size: 32 });
    }},
    pending_treatments: { name: 'Pending Treatments', cols: async (t) => {
      await col(t, 'string', 'name', { size: 128 });
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'string', 'treatment', { size: 128 });
      await col(t, 'integer', 'quoted_price');
      await col(t, 'integer', 'follow_up_count');
      await col(t, 'string', 'status', { size: 32 });
    }},
    ratings: { name: 'Ratings', cols: async (t) => {
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'string', 'name', { size: 128 });
      await col(t, 'integer', 'rating');
      await col(t, 'string', 'outcome', { size: 32 });
      await col(t, 'datetime', 'logged_at');
    }},
    claims: { name: 'Claims', cols: async (t) => {
      await col(t, 'string', 'patient_name', { size: 128 });
      await col(t, 'string', 'insurer', { size: 128 });
      await col(t, 'integer', 'amount');
      await col(t, 'datetime', 'submitted_date');
      await col(t, 'string', 'status', { size: 32 });
      await col(t, 'integer', 'days_since_submitted');
      await col(t, 'string', 'tier', { size: 32 });
    }},
    revenue_recovered: { name: 'Revenue Recovered', cols: async (t) => {
      await col(t, 'string', 'claim_id', { size: 64 });
      await col(t, 'integer', 'amount');
      await col(t, 'datetime', 'recovered_at');
    }},
    completed_visits: { name: 'Completed Visits', cols: async (t) => {
      await col(t, 'string', 'name', { size: 128 });
      await col(t, 'string', 'phone', { size: 32 });
      await col(t, 'datetime', 'visit_datetime');
      await col(t, 'string', 'treatment', { size: 128 });
      await col(t, 'string', 'rating_requested', { size: 8 });
    }},
    reminder_log: { name: 'Reminder Log', cols: async (t) => {
      await col(t, 'string', 'appointment_id', { size: 64 });
      await col(t, 'string', 'patient_id', { size: 64 });
      await col(t, 'string', 'reminder_window', { size: 8 });
      await col(t, 'boolean', 'is_chronic_no_show');
      await col(t, 'datetime', 'sent_at');
    }},
  };

  for (const [id, def] of Object.entries(tables)) {
    console.log('Creating table:', id);
    await createTable(id, def.name);
    await new Promise(r => setTimeout(r, 300)); // let table creation settle before adding columns
    await def.cols(id);
    console.log('Done:', id);
  }

  console.log('%cAll 10 tables created. Refresh the Databases page to see them.', 'color: lime; font-weight: bold');
})();
