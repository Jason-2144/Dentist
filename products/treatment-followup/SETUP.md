# Treatment Follow-Up + Upsell Agent — Setup

## Stack
Same infra as Products 1, 2, 3 — n8n + Meta WhatsApp Cloud API. Booking flows through the **same shared booking webhook built for Product 2**, so a treatment booked from this campaign lands in the same calendar as phone/WhatsApp receptionist bookings.

## Files
- `pending_treatments_mock.csv` — sample recommended-but-not-booked treatments
- `n8n_workflow_1_followup_campaign.json` — weekly job: finds treatments recommended 14+ days ago and not yet booked, sends a marketing-template WhatsApp message with an educational link, caps at 3 touches, then marks "logged and closed"
- `n8n_workflow_2_response_handler.json` — webhook: "yes/book" replies call the shared booking webhook from Product 2; "no/decline" marks the treatment declined

## Setup steps
1. Import both workflows into the existing n8n instance.
2. Create the `treatment_followup_v1` marketing-category template in Meta Business Manager, with a body slot for the educational content link.
3. Set `TREATMENT_LOG_SHEET_ID` (reuse or extend the same sheet structure as Product 1/3) and confirm `N8N_BOOKING_WEBHOOK_URL` points at Product 2's shared booking webhook.
4. Swap the CSV read for a real PMS treatment-plan export once a pilot clinic is live.

## Cost math (matches the proof-point scenario)
- 60 patients, marketing template ≈ ₹0.86 × 60 = **₹52** in messaging cost for the first touch
- Up to 3 touches per patient if unresponsive ≈ **₹155** worst case for the full campaign
- Proof point: 15 book at ₹3,000/filling = ₹45,000 recovered — messaging cost is under 0.4% of revenue recovered
