# WhatsApp Patient Re-Engagement System — Setup

## Stack
- **n8n**, self-hosted (free — only pay for the VPS, ~$5–7/mo e.g. Hetzner/DigitalOcean)
- **Meta WhatsApp Cloud API**, direct (no BSP subscription) — India rates: service free (1,000/mo), utility ₹0.11/msg, marketing ₹0.86/msg

## Files
- `patients_mock.csv` — 10 sample patients (3 lapsed 6+ months, used to test the filter)
- `n8n_workflow_1_outbound_campaign.json` — weekly job: reads patient DB → filters lapsed 6+ months → sends WhatsApp template → logs
- `n8n_workflow_2_inbound_responses.json` — webhook: catches replies → books / sends referral coupon / queues for seasonal campaign

## Setup steps
1. **Spin up n8n**: `docker run -it --rm -p 5678:5678 n8nio/n8n` (or deploy to a $5/mo VPS for persistence).
2. **Meta WhatsApp Business setup**: create a Meta Business Account → WhatsApp product → get a test phone number → generate a permanent access token (System User token, not the 24h temp one).
3. **Create & submit the message template** `patient_reengagement_v1` in Meta Business Manager (Marketing category) — approval usually takes a few hours to 1 day.
4. **Set n8n environment variables**: `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_ACCESS_TOKEN`, `WHATSAPP_VERIFY_TOKEN`, `CAMPAIGN_LOG_SHEET_ID`, `REFERRAL_LINK_BASE`.
5. **Import both workflow JSON files** into n8n (Workflows → Import from File).
6. **Point the Meta webhook** at workflow 2's production URL (`https://your-n8n-host/webhook/whatsapp-webhook`).
7. Swap `Read Patient Database (CSV)` for a real PMS export/API once a pilot clinic is live; swap the Google Sheets logging nodes for Appwrite if that's the system of record.

## Cost math (matches the proof-point scenario)
- 400 lapsed patients messaged, marketing-category template → 400 × ₹0.86 ≈ **₹344** in Meta message fees
- n8n server: ~$5–7/mo (₹420–590), shared across all products/clients running on the same instance
- Result: ₹80,000 recovered in a week against roughly ₹350–950 in running cost — the case sells itself
