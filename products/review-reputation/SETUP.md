# Automated Review + Reputation Agent — Setup

## Stack
Same n8n + Meta WhatsApp Cloud API infra, plus one small static page (`kiosk.html`) for the in-office iPad/desktop rating option the Figma flow called out.

## Files
- `completed_visits_mock.csv` — sample completed visits
- `n8n_workflow_1_rating_request.json` — every 2 hours, sends a "How was your visit? (1-5)" WhatsApp request to patients who just completed a visit
- `n8n_workflow_2_rating_handler.json` — **shared handler** for both channels: WhatsApp replies and kiosk submissions both land here. 4-5 stars → Google review link + referral coupon (public). 1-3 stars → private escalation to the manager, never posted publicly.
- `kiosk.html` — single-file rating page for an in-office iPad/desktop; posts directly to the same webhook as WhatsApp replies

## Setup steps
1. Import both workflows into the existing n8n instance.
2. Create the `post_visit_rating_v1` utility template in Meta Business Manager.
3. Set `REVIEW_LOG_SHEET_ID`, `GOOGLE_REVIEW_LINK` (your practice's direct Google review URL), `REFERRAL_LINK_BASE`, `FRONT_DESK_WHATSAPP_NUMBER`.
4. In `kiosk.html`, replace `RATING_WEBHOOK_URL` with your n8n instance's `/webhook/rating-submit` URL, then load it on the front-desk iPad's browser (or wrap in a simple kiosk-mode app).
5. Swap the CSV read for a real "visit completed" PMS event once a pilot clinic is live.

## Cost math
- Rating request: utility template ≈ ₹0.11/message
- Positive follow-up (Google link + referral): free (service-conversation reply, patient-initiated)
- Kiosk submissions: zero messaging cost — the rating is captured before the patient even leaves
- Proof point: 8 new 5-star reviews ≈ 40% more calls from new patients, for well under ₹1 in messaging cost per rating collected
