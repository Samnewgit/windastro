export async function onRequest({ request, env }) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  try {
    const { date, time, city, country } = await request.json();
    const systemMessage = `Instructions for Astrology Analysis:
Generate Birth Chart:
    Construct a detailed astrological chart using the provided birth details (Natal Chart).
    Consider planetary positions (Sun, Moon, Ascendant, etc.), houses, and major aspects (conjunctions, squares, trines).
    House wise listing of planets.

Life Event Predictions:
    Good Events (Positive Influences):
        Identify periods of success, happiness, and growth based on beneficial transits (Jupiter trine Sun, Venus in 10th house, etc.).
        Highlight career breakthroughs, financial gains, romantic opportunities, and spiritual growth.
    Bad Events (Challenges & Obstacles):
        Detect difficult phases (Saturn return, Mars square Pluto, Rahu-Ketu influence).
        Warn about health issues, financial losses, conflicts, or emotional struggles.
    Extraordinary Events (Rare & Significant):
        Predict life-changing moments (sudden fame, major relocation, spiritual awakening).
        Check for rare transits (Jupiter-Saturn conjunction, Uranus opposition) and their impact.

Time Periods:
    Specify key ages or years when major events may occur.
    Differentiate between short-term (transits) and long-term (progressions) influences.

Remedial Suggestions (Optional):
    Provide astrological remedies (gemstones, mantras, charity) to mitigate negative effects.

Mahadasha and Antardash from 2025 to 2030

IMPORTANT: Do not include any follow-up questions or invitations for further conversation at the end of your response. End your analysis with the final conclusion or remedial suggestions.`;

    const userMessage = `User Details:
Date of Birth: ${date}
Time of Birth: ${time}
City: ${city}
Country: ${country}`;

    const apiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${env.DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!apiRes.ok) {
      const errorText = await apiRes.text();
      return new Response(errorText, { status: apiRes.status });
    }

    const apiData = await apiRes.json();
    return new Response(JSON.stringify(apiData), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(err.message || 'Internal Error', { status: 500 });
  }
}
