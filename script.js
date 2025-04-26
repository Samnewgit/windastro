const form = document.getElementById('astro-form');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  resultDiv.innerHTML = '<p class="text-center text-gray-500">Analyzing...</p>';
  const payload = {
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    city: document.getElementById('city').value,
    country: document.getElementById('country').value
  };
  try {
    const res = await fetch('/api/astro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2);
    resultDiv.innerHTML = `<div class="prose max-w-none whitespace-pre-wrap">${content}</div>`;
  } catch (err) {
    resultDiv.innerHTML = `<p class="text-red-600">Error: ${err.message}</p>`;
  }
});
