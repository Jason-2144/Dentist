# No-Show Recovery + Waitlist Agent — Setup

## Stack
Same infra as Products 1 & 2 — n8n (self-hosted, free) + Meta WhatsApp Cloud API direct. No new services needed; this is three more workflows on the same instance.

## Files
- `appointments_mock.csv`, `waitlist_mock.csv` — sample data
- `n8n_workflow_1_reminders.json` — hourly job, fires reminders at 72h/24h/2h before each appointment, flags chronic no-showers (2+ prior no-shows) to the front desk
- `n8n_workflow_2_confirmation_handler.json` — webhook, classifies patient replies (confirm / cancel), and on cancellation triggers the waitlist fill
- `n8n_workflow_3_waitlist_fill.json` — texts the top 3 waitlisted patients simultaneously ("first to reply YES gets it")

## Setup steps
1. Import all three workflows into the same n8n instance as Products 1 & 2.
2. Create the `appointment_reminder_v1` **utility**-category template in Meta Business Manager (cheaper than marketing: ~₹0.11/msg vs ₹0.86/msg).
3. Set `NOSHOW_LOG_SHEET_ID` and `N8N_WAITLIST_FILL_WEBHOOK_URL` (points workflow 2 → workflow 3).
4. **First-to-reply resolution**: extend workflow 2's "confirmed" branch to also check the `waitlist_offers` sheet for a matching phone — if found, mark that patient's slot filled and send "Sorry, that slot's just been taken — we'll keep you on the list" to the other two. Left as a follow-on since it reuses the same classify-and-branch pattern already in workflow 2.
5. Swap the CSV reads for the real PMS/calendar feed once a pilot clinic is live.

## Cost math
- Reminders: utility template ≈ ₹0.11/message × 3 reminders per appointment ≈ **₹0.33/appointment** in messaging cost
- Waitlist texts: 3 patients × ₹0.86 (marketing-ish nudge) or ₹0.11 if templated as utility ≈ **₹0.33–2.58** per slot filled
- Against the proof point — practice loses ~₹1,260/day without this, ₹400 saved per slot filled — the messaging cost is negligible (well under ₹1 per ₹400 recovered).
