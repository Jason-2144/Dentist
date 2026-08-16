# Dental Practice Website + Booking Built In — Setup

## Stack
- Single static HTML file (no framework needed for a practice site this size) — free to host
- Hosting: **Vercel or Netlify free tier** (₹0/mo, custom domain supported)
- Domain: ~₹800–1,200/year (.com or .in via GoDaddy/Namecheap)
- Booking: posts straight to the **same shared booking webhook** built for Product 2 (AI Receptionist) — one calendar across phone, WhatsApp, treatment follow-up, and now the website
- WhatsApp: floating chat button (`wa.me` deep link) — no API cost, opens the patient's own WhatsApp

## Files
- `index.html` — full site: hero, about, services, gallery, pricing, FAQ, booking form, WhatsApp widget. Includes `Dentist` Schema.org JSON-LD for local SEO (helps Google Maps / local pack ranking).

## Setup steps
1. **Fill in placeholders** — every `{{PLACEHOLDER}}` (practice name, city, address, phone, prices, FAQ answers, WhatsApp number) needs real values before launch. There are 26 in the current template.
2. **Point the booking form** at your real n8n host: replace `BOOKING_WEBHOOK_URL` in the `<script>` block with `https://your-n8n-host/webhook/book-appointment` (Product 2's shared webhook).
3. **Alternative**: if you'd rather use Calendly directly instead of the custom form, uncomment the Calendly embed block in the `#book` section and drop the form.
4. **Add real photos** to replace the gallery placeholders.
5. **Deploy**: drag-and-drop `index.html` onto Netlify, or `vercel deploy` — both give you HTTPS and a free subdomain immediately; attach the custom domain after.
6. **Submit to Google**: add the site to Google Search Console and Google Business Profile once live — this is what actually drives the "2-5 new organic patients/month" proof point, not the website alone.

## Cost math
- Hosting: **₹0/mo** (Netlify/Vercel free tier easily covers a single practice site's traffic)
- Domain: **~₹800–1,200/year**
- No booking/messaging cost on the website itself — it hands off to infra already built (Product 2's webhook, WhatsApp deep link)
- Total new recurring cost: **~₹70–100/month**, against 2-5 new organic patients/month
