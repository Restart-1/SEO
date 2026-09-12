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
  const result = useMemo(() => evaluateKeyword(keyword), [keyword]);
  const run = () => keyword.trim() && setSubmitted(true);
  const suggested = result.score >= 70 ? keyword.trim() : 'cómo leer estados financieros paso a paso para principiantes';

  return (
    <main className="restart-app">
      <CourseHeader active="practica" />
      <section className="practice-page">
        <header className="practice-title"><span><FlaskConical/> PRÁCTICA EN CLASE · 12 MIN</span><h1>Probemos una palabra clave <em>en contexto.</em></h1><p>El grupo propone una frase para un reel o video sobre “estados financieros y cómo leerlos”. La herramienta muestra qué entiende una plataforma y dónde todavía falta claridad.</p></header>
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
          <div className="preview-grid">
            <div><Mic2/><small>LO QUE DICES</small><p>“Hoy vamos a ver <b>{suggested}</b>”.</p></div>
            <div><Type/><small>TEXTO EN PANTALLA</small><p>{suggested}</p></div>
            <div><Video/><small>TÍTULO · YOUTUBE</small><p>{suggested.charAt(0).toUpperCase() + suggested.slice(1)} | Ejemplo práctico</p></div>
            <div><Images/><small>APERTURA · REEL</small><p>El error que te impide entender un Estado de Resultados.</p></div>
            <div><Hash/><small>ETIQUETAS ESPECÍFICAS</small><p>#EstadosFinancieros #EstadoDeResultados #FinanzasParaEmprendedores</p></div>
          </div>
        </section>}
        <footer className="facilitator-bar"><div><span>DINÁMICA DOCENTE</span><p>Proyecta tres propuestas, cambia una sola variable y pregunta: “¿qué entiende ahora la plataforma que antes no entendía?”.</p></div><button onClick={() => { setKeyword(''); setSubmitted(false); }}><RotateCcw/> Nueva ronda</button></footer>
      </section>
    </main>
  );
}
