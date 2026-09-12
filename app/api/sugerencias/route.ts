const allowedCountries = new Set(['mx', 'es', 'ar', 'co', 'cl', 'pe', 'us']);
const allowedLanguages = new Set(['es', 'en']);

function clean(value: string | null, max = 120) {
  return (value ?? '').replace(/[<>]/g, '').trim().slice(0, max);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = clean(url.searchParams.get('q'));
  const source = url.searchParams.get('source') === 'youtube' ? 'youtube' : 'google';
  const countryParam = clean(url.searchParams.get('country'), 2).toLowerCase();
  const languageParam = clean(url.searchParams.get('language'), 2).toLowerCase();
  const country = allowedCountries.has(countryParam) ? countryParam : 'mx';
  const language = allowedLanguages.has(languageParam) ? languageParam : 'es';

  if (query.length < 2) return Response.json({ error: 'Escribe al menos dos caracteres.' }, { status: 400 });

  const seeds = [query, `cómo ${query}`, `${query} para`];
  const requests = seeds.map(async (seed) => {
    const endpoint = new URL('https://suggestqueries.google.com/complete/search');
    endpoint.searchParams.set('client', 'firefox');
    endpoint.searchParams.set('q', seed);
    endpoint.searchParams.set('hl', language);
    endpoint.searchParams.set('gl', country);
    if (source === 'youtube') endpoint.searchParams.set('ds', 'yt');
    const response = await fetch(endpoint, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Suggestion provider unavailable');
    const payload = await response.json() as [string, string[]];
    return Array.isArray(payload?.[1]) ? payload[1] : [];
  });

  try {
    const groups = await Promise.all(requests);
    const suggestions = [...new Set(groups.flat().map((item) => clean(String(item))).filter(Boolean))].slice(0, 18);
    return Response.json({ suggestions, source, country, language, live: true }, { headers: { 'Cache-Control': 'public, max-age=900' } });
  } catch {
    return Response.json({ suggestions: [], source, country, language, live: false }, { status: 200 });
  }
}
