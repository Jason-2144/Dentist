# Insurance + Billing Follow-Up Automation — Setup

## Stack
Same n8n + Meta WhatsApp Cloud API infra. This product's "single web dashboard" is really the `claims_needing_attention` and `revenue_recovered` sheets it writes to — Product 4 (Practice Dashboard) will read from these directly when we build it last.

## Files
- `claims_mock.csv` — sample submitted claims across 3 data sources (Dentrix, Curve, OpenDental)
- `n8n_workflow_1_claim_monitor.json` — daily job: flags claims pending 14+ days ("needs follow-up") and 28+ days ("urgent forgotten"), alerts the accountant by WhatsApp, logs to the claims-needing-attention sheet
- `n8n_workflow_2_claim_status_update.json` — webhook: marks a claim paid (logs to revenue-recovered) or denied (alerts accountant to appeal/bill patient)

## Setup steps
1. Import both workflows into the existing n8n instance.
2. Set `CLAIMS_LOG_SHEET_ID` and `ACCOUNTANT_WHATSAPP_NUMBER`.
3. For now, claim status updates (paid/denied) are pushed manually via the webhook — the accountant marks a claim resolved from a simple form, or the PMS pushes it automatically if it supports webhooks. Swap `Read Claims (CSV)` for real pulls across Dentrix/Curve/OpenDental once a pilot clinic is live — this is genuinely the hardest integration of all 8 products, since it depends on what each PMS's API/export actually supports.

## Cost math (matches the proof-point scenario)
- Alerts are WhatsApp to internal staff only (accountant), not patients — service-conversation, **free** under Meta's 1,000/month allowance
- No new infrastructure cost beyond the existing n8n instance
- Proof point: ₹1.8L in forgotten claims found, ₹1.2L recovered in a month — against effectively ₹0 in running cost
