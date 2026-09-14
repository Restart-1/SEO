'use client';

import { AlertCircle, Check, ChevronRight, Database, ExternalLink, FlaskConical, Globe2, Hash, Images, Lightbulb, LoaderCircle, Mic2, Plus, RotateCcw, Search, Smartphone, Sparkles, Type, Video } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CourseHeader } from '@/app/components/course-header';
import { sitePath } from '@/lib/site-path';

const examples = [
  'estados financieros',
  'cómo leer estados financieros paso a paso',
  'cómo interpretar un estado de resultados para principiantes',
];

type Suggestion = { keyword: string; intent: string; clarity: number; origin: 'live' | 'starter' | 'observed' | 'fallback' };

function detectIntent(value: string) {
  const clean = normalize(value);
  if (/^(como|que|cual|por que|guia|tutorial)|aprender|ejemplo/.test(clean)) return 'Informativa';
  if (/mejor|vs|comparar|opinion|recomendad/.test(clean)) return 'Comparación';
  if (/precio|comprar|contratar|curso|servicio|cerca/.test(clean)) return 'Comercial';
  return 'Exploratoria';
}

function clarityScore(value: string) {
  const words = normalize(value).split(/\s+/).filter(Boolean);
  return Math.min(100, 40 + Math.min(words.length, 8) * 6 + (/como|que|mejor|para|cerca|precio/.test(normalize(value)) ? 12 : 0));
}

function fallbackIdeas(topic: string, industry: string) {
  const context = industry.trim() ? ` para ${industry.trim()}` : '';
  return [
    `qué es ${topic}`,
    `cómo usar ${topic}${context}`,
    `${topic} paso a paso${context}`,
    `errores comunes de ${topic}`,
    `mejor forma de aprender ${topic}`,
    `${topic} para principiantes`,
  ];
}

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function jsonpSuggestions(seed: string, source: 'google' | 'youtube', country: string) {
  return new Promise<string[]>((resolve, reject) => {
    const callback = `restartSuggest${Date.now()}${Math.random().toString(36).slice(2)}`;
    const script = document.createElement('script');
    const timer = window.setTimeout(() => finish(new Error('Tiempo de espera agotado')), 7000);
    const callbackWindow = window as unknown as Record<string, unknown>;
    const finish = (error?: Error, values: string[] = []) => {
      window.clearTimeout(timer);
      script.remove();
      delete callbackWindow[callback];
      if (error) reject(error); else resolve(values);
    };
    callbackWindow[callback] = (payload: unknown) => {
      const list = Array.isArray(payload) && Array.isArray(payload[1]) ? payload[1].map(String) : [];
      finish(undefined, list);
    };
    const endpoint = new URL('https://suggestqueries.google.com/complete/search');
    endpoint.searchParams.set('client', 'firefox');
    endpoint.searchParams.set('q', seed);
    endpoint.searchParams.set('hl', 'es');
    endpoint.searchParams.set('gl', country);
    endpoint.searchParams.set('callback', callback);
    if (source === 'youtube') endpoint.searchParams.set('ds', 'yt');
    script.onerror = () => finish(new Error('No se pudo consultar el servicio'));
    script.src = endpoint.toString();
    document.head.appendChild(script);
  });
}

function evaluateKeyword(value: string) {
  const clean = normalize(value);
  const words = clean.split(/\s+/).filter(Boolean);
  const checks = [
    { label: 'Tema reconocible', detail: 'Nombra estados financieros, resultados, balance o flujo de efectivo.', points: 25, pass: /(estado|estados|balance|flujo).*(financier|resultado)|estado de resultados|balance general|flujo de efectivo/.test(clean) },
    { label: 'Intención explícita', detail: 'Expresa una acción: leer, entender, interpretar, comparar o aprender.', points: 25, pass: /(como|leer|entender|interpretar|comparar|aprender|explicad|analizar)/.test(clean) },
    { label: 'Contexto útil', detail: 'Delimita el nivel, el método o el alcance de la respuesta.', points: 20, pass: /(paso a paso|principiante|facil|ejemplo|desde cero|negocio|empresa|emprendedor)/.test(clean) },
    { label: 'Lenguaje natural', detail: 'Suena como una frase que una persona podría decir o buscar.', points: 15, pass: words.length >= 4 && words.length <= 14 && !clean.includes(',') && !clean.includes('#') },
    { label: 'Promesa específica', detail: 'La frase permite imaginar con claridad qué aprenderá la audiencia.', points: 15, pass: words.length >= 6 },
  ];
  return { checks, score: checks.reduce((total, check) => total + (check.pass ? check.points : 0), 0) };
}

export default function PracticePage() {
  const [keyword, setKeyword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [screenText, setScreenText] = useState('');
  const [opening, setOpening] = useState('');
  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [source, setSource] = useState<'google' | 'youtube' | 'tiktok'>('google');
  const [country, setCountry] = useState('mx');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [researching, setResearching] = useState(false);
  const [researchMode, setResearchMode] = useState<'live' | 'fallback' | 'guided' | null>(null);
  const [observedSuggestion, setObservedSuggestion] = useState('');
  const result = useMemo(() => evaluateKeyword(keyword), [keyword]);
  const run = () => {
    if (!keyword.trim()) return;
    const base = result.score >= 70 ? keyword.trim() : 'cómo leer estados financieros paso a paso para principiantes';
    setSubmitted(true);
    if (!title) setTitle(`${base.charAt(0).toUpperCase() + base.slice(1)} | Ejemplo práctico`);
    if (!screenText) setScreenText(base);
    if (!opening) setOpening('En este video aprenderás a identificar qué dice un Estado de Resultados y cómo leerlo paso a paso.');
  };
  const suggested = result.score >= 70 ? keyword.trim() : 'cómo leer estados financieros paso a paso para principiantes';
  const packageScore = [title.trim().length >= 20, screenText.trim().length >= 12, opening.trim().length >= 45].filter(Boolean).length;
  const research = async () => {
    if (!topic.trim()) return;
    setResearching(true);
    if (source === 'tiktok') {
      const raw = fallbackIdeas(topic.trim(), industry.trim());
      setSuggestions(raw.map((item) => ({ keyword: item, intent: detectIntent(item), clarity: clarityScore(item), origin: 'starter' })));
      setResearchMode('guided');
      setResearching(false);
      return;
    }
    try {
      const query = `${topic.trim()} ${industry.trim()}`.trim();
      let data: { suggestions?: string[]; live?: boolean };
      if (process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true') {
        const groups = await Promise.all([query, `cómo ${query}`, `${query} para`].map((seed) => jsonpSuggestions(seed, source, country)));
        data = { suggestions: [...new Set(groups.flat().map((item) => item.trim()).filter(Boolean))].slice(0, 18), live: true };
      } else {
        const params = new URLSearchParams({ q: query, source, country, language: 'es' });
        const response = await fetch(`${sitePath('/api/sugerencias')}?${params}`);
        data = await response.json() as { suggestions?: string[]; live?: boolean };
      }
      const raw = data.suggestions?.length ? data.suggestions : fallbackIdeas(topic.trim(), industry.trim());
      const origin = data.suggestions?.length && data.live ? 'live' : 'fallback';
      setSuggestions(raw.map((item) => ({ keyword: item, intent: detectIntent(item), clarity: clarityScore(item), origin })));
      setResearchMode(data.suggestions?.length && data.live ? 'live' : 'fallback');
    } catch {
      setSuggestions(fallbackIdeas(topic.trim(), industry.trim()).map((item) => ({ keyword: item, intent: detectIntent(item), clarity: clarityScore(item), origin: 'fallback' })));
      setResearchMode('fallback');
    } finally { setResearching(false); }
  };
  const chooseSuggestion = (value: string) => {
    setKeyword(value); setSubmitted(false); setTitle(''); setScreenText(''); setOpening('');
    document.getElementById('keyword')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  const addObservedSuggestion = () => {
    const items = observedSuggestion.split(/[\n,]/).map((item) => item.trim()).filter((item) => item.length > 2);
    if (!items.length) return;
    setSuggestions((current) => {
      const existing = new Set(current.map((item) => normalize(item.keyword)));
      const additions = items.filter((item) => !existing.has(normalize(item))).map((item) => ({ keyword: item, intent: detectIntent(item), clarity: clarityScore(item), origin: 'observed' as const }));
      return [...additions, ...current];
    });
    setObservedSuggestion('');
  };
  const tiktokSearchUrl = `https://www.tiktok.com/search?q=${encodeURIComponent(`${topic.trim()} ${industry.trim()}`.trim())}`;

  return (
    <main className="restart-app">
      <CourseHeader active="practica" />
      <section className="practice-page">
        <header className="practice-title"><span><FlaskConical/> LABORATORIO GRATUITO · CUALQUIER TEMA</span><h1>De tema a <em>pieza publicable.</em></h1><p>Descubre búsquedas reales, elige una oportunidad y conviértela en un empaque coherente para video.</p></header>
        <section className="free-research">
          <div className="research-heading"><div><span>01 / DESCUBRIMIENTO</span><h2>¿Qué está buscando la gente?</h2></div><div className="free-badge"><Database/> SIN API KEY · SIN DATOS INVENTADOS</div></div>
          <div className="research-form">
            <label><span>TEMA O PROBLEMA</span><input value={topic} onChange={(event) => setTopic(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && research()} placeholder="Ej. estados financieros, yoga, repostería…"/></label>
            <label><span>GIRO O AUDIENCIA · OPCIONAL</span><input value={industry} onChange={(event) => setIndustry(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && research()} placeholder="Ej. emprendedores, restaurantes…"/></label>
            <label><span>FUENTE</span><select value={source} onChange={(event) => { setSource(event.target.value as 'google' | 'youtube' | 'tiktok'); setSuggestions([]); setResearchMode(null); }}><option value="google">Google</option><option value="youtube">YouTube</option><option value="tiktok">TikTok · guiado</option></select></label>
            <label><span>PAÍS</span><select value={country} onChange={(event) => setCountry(event.target.value)}><option value="mx">México</option><option value="es">España</option><option value="ar">Argentina</option><option value="co">Colombia</option><option value="cl">Chile</option><option value="pe">Perú</option><option value="us">Estados Unidos</option></select></label>
            <button onClick={research} disabled={!topic.trim() || researching}>{researching ? <LoaderCircle className="spin"/> : <Search/>}{researching ? 'Buscando…' : 'Buscar ideas'}</button>
          </div>
          {source === 'tiktok' && topic.trim() && <div className="tiktok-guide">
            <div className="guide-intro"><Smartphone/><div><span>TIKTOK · BÚSQUEDA GUIADA</span><p>Abre la búsqueda real, observa el autocompletado y pega aquí las frases que TikTok te muestre.</p></div><a href={tiktokSearchUrl} target="_blank" rel="noreferrer">Abrir búsqueda <ExternalLink/></a></div>
            <div className="capture-row"><label><span>SUGERENCIA OBSERVADA EN TIKTOK</span><input value={observedSuggestion} onChange={(event) => setObservedSuggestion(event.target.value)} onKeyDown={(event) => event.key === 'Enter' && addObservedSuggestion()} placeholder="Pega una o varias frases, separadas por comas…"/></label><button onClick={addObservedSuggestion} disabled={!observedSuggestion.trim()}><Plus/> Añadir al análisis</button></div>
            <a className="creative-center-link" href="https://ads.tiktok.com/business/creativecenter/" target="_blank" rel="noreferrer">Consultar también tendencias y Keyword Insights en Creative Center <ExternalLink/></a>
          </div>}
          {suggestions.length > 0 && <div className="suggestion-results">
            <div className="results-meta"><span>{suggestions.length} IDEAS ENCONTRADAS</span><b className={researchMode === 'live' ? 'live' : researchMode === 'guided' ? 'guided' : ''}><Globe2/>{researchMode === 'live' ? `Sugerencias actuales de ${source === 'google' ? 'Google' : 'YouTube'}` : researchMode === 'guided' ? 'Exploración guiada en TikTok' : 'Modo educativo de respaldo'}</b></div>
            <div className="suggestion-list">{suggestions.map((item, itemIndex) => <button key={`${item.keyword}-${itemIndex}`} onClick={() => chooseSuggestion(item.keyword)}><em>{String(itemIndex + 1).padStart(2, '0')}</em><span><b>{item.keyword}</b><small>{item.intent} · claridad {item.clarity}/100 · <mark className={`origin-${item.origin}`}>{item.origin === 'live' ? 'fuente actual' : item.origin === 'observed' ? 'observada en TikTok' : item.origin === 'starter' ? 'idea inicial' : 'respaldo'}</mark></small></span><ChevronRight/></button>)}</div>
            <p className="data-note">{researchMode === 'guided' ? 'Las ideas iniciales preparan la exploración; solo las frases que añades se marcan como observadas en TikTok.' : 'El autocompletado muestra consultas sugeridas, no volumen mensual.'} La claridad es una rúbrica didáctica calculada por esta plataforma.</p>
          </div>}
        </section>
        <div className="practice-grid">
          <article className="keyword-workbench">
            <div className="workbench-step"><b>02</b><div><span>SELECCIONA O ESCRIBE UNA FRASE</span><h2>¿Qué necesita resolver?</h2></div></div>
            <label htmlFor="keyword">PALABRA CLAVE O FRASE DE BÚSQUEDA</label>
            <div className="practice-input"><Search/><input id="keyword" value={keyword} onChange={(event) => { setKeyword(event.target.value); setSubmitted(false); }} onKeyDown={(event) => event.key === 'Enter' && run()} placeholder="Ej. cómo leer estados financieros…"/><button onClick={run} disabled={!keyword.trim()}>Analizar <Sparkles/></button></div>
            <div className="example-pills"><span>PRUEBA Y COMPARA</span>{examples.map((example) => <button key={example} onClick={() => { setKeyword(example); setSubmitted(false); }}>{example}</button>)}</div>
            {!submitted ? <div className="practice-empty"><Lightbulb/><div><b>Aún no hay resultado.</b><p>Escribe una propuesta, analízala y ajusta una sola parte por ronda.</p></div></div> : <div className="score-result"><div className="score-number"><strong>{result.score}</strong><span>/100</span></div><div><small>CLARIDAD SEO</small><h3>{result.score >= 85 ? 'La intención se entiende de inmediato.' : result.score >= 60 ? 'La idea ya se reconoce, pero puede enfocarse.' : 'La plataforma recibe un tema, no una intención.'}</h3></div></div>}
          </article>
          <aside className="live-rubric">
            <header><div><span>RÚBRICA EN VIVO</span><h2>¿Qué comunica la frase?</h2></div>{submitted && <b>{result.score}%</b>}</header>
            <div>{result.checks.map((check) => <section key={check.label} className={submitted ? (check.pass ? 'pass' : 'fail') : ''}><i>{submitted ? (check.pass ? <Check/> : <AlertCircle/>) : null}</i><div><b>{check.label}</b><p>{check.detail}</p></div><strong>+{check.points}</strong></section>)}</div>
          </aside>
        </div>
        {submitted && <section className="platform-preview">
          <header><span>02 / LLEVA LA KEYWORD A LA PIEZA</span><h2>La frase no vive solo en el título.</h2><p>Úsala de forma natural en varias señales y cumple la misma promesa en el contenido.</p></header>
          <div className="package-progress"><span>EMPAQUE COMPLETO</span><div>{[0,1,2].map((item) => <i key={item} className={item < packageScore ? 'done' : ''}/>)}</div><b>{packageScore}/3</b></div>
          <div className="production-fields">
            <label><Video/><span><small>TÍTULO DEL VIDEO</small><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Promesa clara y específica"/><em>{title.length} caracteres</em></span></label>
            <label><Type/><span><small>TEXTO EN PANTALLA</small><input value={screenText} onChange={(event) => setScreenText(event.target.value)} placeholder={suggested}/><em>Debe entenderse sin escuchar el audio.</em></span></label>
            <label><Mic2/><span><small>APERTURA HABLADA · 15 SEGUNDOS</small><textarea value={opening} onChange={(event) => setOpening(event.target.value)} placeholder="En este video aprenderás…"/><em>{opening.length}/45 caracteres mínimos</em></span></label>
          </div>
          <div className="preview-grid compact">
            <div><Images/><small>APERTURA · REEL</small><p>{screenText || suggested}</p></div>
            <div><Hash/><small>ETIQUETAS ESPECÍFICAS</small><p>#EstadosFinancieros #EstadoDeResultados #FinanzasParaEmprendedores</p></div>
          </div>
          {packageScore === 3 && <div className="package-ready"><Check/><p><b>La pieza ya tiene una cadena de coherencia.</b> Keyword, título, pantalla y apertura hablan de la misma necesidad.</p></div>}
        </section>}
        <footer className="facilitator-bar"><div><span>DINÁMICA DOCENTE</span><p>Revisa coherencia, no repetición exacta: ¿una persona sabría en cinco segundos que llegó al video correcto?</p></div><button onClick={() => { setKeyword(''); setSubmitted(false); setTitle(''); setScreenText(''); setOpening(''); }}><RotateCcw/> Nueva ronda</button></footer>
      </section>
    </main>
  );
}
