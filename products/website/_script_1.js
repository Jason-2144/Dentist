
  document.getElementById('year').textContent = new Date().getFullYear();

  const BOOKING_WEBHOOK_URL = 'https://YOUR-N8N-HOST/webhook/book-appointment'; // same shared webhook as Products 2 & 5

  document.getElementById('bookForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const status = document.getElementById('bookStatus');
    const data = Object.fromEntries(new FormData(form).entries());
    status.textContent = 'Sending...';
    try {
      await fetch(BOOKING_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'website', ...data }),
      });
      status.textContent = "Thanks! We'll confirm your slot by WhatsApp shortly.";
      form.reset();
    } catch (err) {
      status.textContent = 'Something went wrong — please WhatsApp us directly using the button below.';
    }
  });
