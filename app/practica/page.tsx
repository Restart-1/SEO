'use client';

import { AlertCircle, Check, FlaskConical, Hash, Images, Lightbulb, Mic2, RotateCcw, Search, Sparkles, Type, Video } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CourseHeader } from '@/app/components/course-header';

const examples = [
  'estados financieros',
  'cómo leer estados financieros paso a paso',
  'cómo interpretar un estado de resultados para principiantes',
];

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
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

  return (
    <main className="restart-app">
      <CourseHeader active="practica" />
      <section className="practice-page">
        <header className="practice-title"><span><FlaskConical/> PRÁCTICA FINAL · 18 MIN</span><h1>De keyword a <em>pieza publicable.</em></h1><p>El grupo construye un empaque coherente para un reel o video sobre “estados financieros y cómo leerlos”.</p></header>
        <div className="practice-grid">
          <article className="keyword-workbench">
            <div className="workbench-step"><b>01</b><div><span>ESCRIBE COMO BUSCARÍA UNA PERSONA</span><h2>¿Qué necesita resolver?</h2></div></div>
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
