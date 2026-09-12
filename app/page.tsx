'use client';

import {
  AlertCircle, ArrowLeft, ArrowRight, BarChart3, BrainCircuit, Check,
  CheckCircle2, ChevronRight, Eye, FlaskConical, Hash, KeyRound, Lightbulb,
  Maximize2, Menu, MessageCircleQuestion, MousePointerClick, Play,
  Presentation, Search, Sparkles, Target, Users, X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Mode = 'class' | 'lab';

const slides = [
  { id: 'inicio', number: '01', tag: 'PUNTO DE PARTIDA', title: 'SEO conecta una pregunta con una respuesta.', lead: 'No escribimos para un robot. Organizamos una buena respuesta para que una persona pueda encontrarla.', prompt: 'Pregunta al grupo: ¿qué buscarían en Google si mañana tuvieran que presentar un Estado de Resultados?' },
  { id: 'intencion', number: '02', tag: 'INTENCIÓN DE BÚSQUEDA', title: 'Antes de elegir palabras, descubre qué quiere lograr la persona.', lead: 'Una búsqueda puede pedir aprender, comparar, llegar a un sitio o realizar una acción.', prompt: 'Pide tres maneras distintas de buscar el mismo tema y clasifíquenlas por intención.' },
  { id: 'keywords', number: '03', tag: 'PALABRAS CLAVE', title: 'La mejor keyword suena como algo que alguien sí escribiría.', lead: 'Una frase útil combina una acción, un tema reconocible y un contexto que delimita la respuesta.', prompt: 'Compara “educación financiera” con “cómo leer estados financieros paso a paso”. ¿Cuál promete algo más claro?' },
  { id: 'senales', number: '04', tag: 'CÓMO LEE EL BUSCADOR', title: 'Título, descripción y subtítulos explican de qué trata tu video.', lead: 'Los metadatos aportan contexto; los clics y la permanencia confirman si el contenido realmente ayuda.', prompt: 'Pregunta: ¿qué podría entender YouTube de un video titulado únicamente “Tarea final”?' },
  { id: 'ctr', number: '05', tag: 'CTR · EL CLIC', title: 'El CTR mide si tu promesa logra detener la mirada.', lead: 'De cada 100 personas que ven el título y la miniatura, ¿cuántas deciden entrar?', prompt: 'Muestra dos títulos para el mismo video y hagan una votación rápida: ¿cuál recibiría el clic?' },
  { id: 'retencion', number: '06', tag: 'RETENCIÓN · EL VALOR', title: 'El clic abre la puerta. La retención demuestra que cumpliste.', lead: 'La introducción debe confirmar pronto que la persona llegó al video correcto.', prompt: 'Reto oral: redacten una apertura de 20 segundos que entregue valor antes de presentarse.' },
  { id: 'mapa', number: '07', tag: 'MAPA COMPLETO', title: 'Una pieza fuerte combina intención, empaque y experiencia.', lead: 'Cuando la promesa es clara y el contenido la cumple, el buscador recibe señales coherentes.', prompt: 'Cierra conectando las tres preguntas: ¿qué busca?, ¿por qué haría clic?, ¿por qué se quedaría?' },
] as const;

const suggestedKeywords = [
  'cómo leer estados financieros paso a paso',
  'estados financieros explicados para principiantes',
  'cómo interpretar un estado de resultados',
  'balance general estado de resultados y flujo de efectivo',
];

function normalize(value: string) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}

function scoreKeyword(value: string) {
  const clean = normalize(value);
  const words = clean.split(/\s+/).filter(Boolean);
  const checks = [
    { label: 'Tema reconocible', detail: 'Menciona estados financieros, resultados, balance o flujo.', points: 30, pass: /(estado|estados|balance|flujo).*(financier|resultado)|resultado|balance general|flujo de efectivo/.test(clean) },
    { label: 'Acción o necesidad', detail: 'Expresa lo que la persona quiere hacer: leer, entender o interpretar.', points: 25, pass: /(como|leer|entender|interpretar|explicad|analizar)/.test(clean) },
    { label: 'Nivel de precisión', detail: 'Es suficientemente específica para anticipar la respuesta.', points: 20, pass: words.length >= 5 && words.length <= 12 },
    { label: 'Contexto útil', detail: 'Delimita nivel, método o alcance: principiantes, paso a paso o los tres estados.', points: 15, pass: /(paso a paso|principiante|facil|tres|3|ejemplo|desde cero)/.test(clean) },
    { label: 'Lenguaje natural', detail: 'Se puede decir en voz alta sin sonar como una lista de etiquetas.', points: 10, pass: words.length >= 4 && !clean.includes(',') && !clean.includes('#') },
  ];
  return { checks, score: checks.reduce((sum, item) => sum + (item.pass ? item.points : 0), 0) };
}

export default function Home() {
  const [mode, setMode] = useState<Mode>('class');
  const [slideIndex, setSlideIndex] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const slide = slides[slideIndex];
  const evaluation = useMemo(() => scoreKeyword(keyword), [keyword]);

  const goToSlide = (index: number) => {
    setSlideIndex(Math.max(0, Math.min(slides.length - 1, index)));
    setMode('class'); setMobileMenu(false);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (mode !== 'class' || event.target instanceof HTMLInputElement) return;
      if (event.key === 'ArrowRight') setSlideIndex((old) => Math.min(slides.length - 1, old + 1));
      if (event.key === 'ArrowLeft') setSlideIndex((old) => Math.max(0, old - 1));
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode]);

  useEffect(() => {
    type WebContext = { registerTool?: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: WebContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'open_class_section', title: 'Abrir sección de clase', description: 'Abre una diapositiva de enseñanza o el laboratorio de keywords.',
      inputSchema: { type: 'object', properties: { section: { type: 'string', enum: [...slides.map((item) => item.id), 'laboratorio'] } }, required: ['section'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const section = (input as { section?: string })?.section;
        if (section === 'laboratorio') { setMode('lab'); return { section, status: 'opened' }; }
        const index = slides.findIndex((item) => item.id === section);
        if (index < 0) throw new Error('Sección no válida');
        setSlideIndex(index); setMode('class');
        return { section, status: 'opened' };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const presentFullscreen = async () => {
    try { if (!document.fullscreenElement) await document.documentElement.requestFullscreen(); else await document.exitFullscreen(); } catch { /* Browser may block fullscreen. */ }
  };

  const evaluate = () => { if (keyword.trim()) setSubmitted(true); };
  const useExample = (value: string) => { setKeyword(value); setSubmitted(false); };

  return (
    <main className="classroom-app">
      <header className="app-header">
        <button className="brand" onClick={() => goToSlide(0)}><span>C</span><b>Creador Lab</b></button>
        <div className="mode-switch" aria-label="Cambiar modo">
          <button className={mode === 'class' ? 'active' : ''} onClick={() => setMode('class')}><Presentation /> Enseñanza</button>
          <button className={mode === 'lab' ? 'active' : ''} onClick={() => setMode('lab')}><FlaskConical /> Práctica</button>
        </div>
        <div className="header-actions"><span>CLASE · SEO</span><Button className="fullscreen-button" onClick={presentFullscreen}><Maximize2 /> Presentar</Button></div>
        <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Abrir índice">{mobileMenu ? <X /> : <Menu />}</button>
      </header>

      <aside className={`slide-rail ${mobileMenu ? 'open' : ''}`}>
        <div className="rail-heading"><span>MÓDULO 01</span><h2>SEO para creadores</h2><p>Guion visual para facilitar la clase.</p></div>
        <nav>{slides.map((item, index) => <button key={item.id} className={mode === 'class' && index === slideIndex ? 'active' : ''} onClick={() => goToSlide(index)}><span>{item.number}</span><div><small>{item.tag}</small><b>{item.title}</b></div><ChevronRight /></button>)}</nav>
        <button className={`rail-lab ${mode === 'lab' ? 'active' : ''}`} onClick={() => { setMode('lab'); setMobileMenu(false); }}><span><FlaskConical /></span><div><small>ACTIVIDAD CON EL GRUPO</small><b>Laboratorio de keywords</b></div><ChevronRight /></button>
      </aside>

      {mode === 'class' ? (
        <section className="presentation-area">
          <div className="slide-meta"><span>DIAPOSITIVA {slide.number} / {String(slides.length).padStart(2, '0')}</span><div>{slides.map((_, index) => <i key={index} className={index <= slideIndex ? 'filled' : ''}/>)}</div></div>
          <article className="teaching-slide">
            <div className="slide-copy"><span className="slide-kicker">{slide.tag}</span><h1>{slide.title}</h1><p>{slide.lead}</p></div>
            <div className="slide-visual">
              {slideIndex === 0 && <div className="connection-visual"><div><Users/><span>Persona</span></div><ArrowRight/><div className="query"><Search/><b>“¿Cómo leo un Estado de Resultados?”</b></div><ArrowRight/><div><CheckCircle2/><span>Respuesta</span></div></div>}
              {slideIndex === 1 && <div className="intent-board">{[['APRENDER','cómo leer estados financieros'],['COMPARAR','mejor curso de finanzas'],['LLEGAR','YouTube Studio'],['ACTUAR','descargar plantilla financiera']].map(([type, query]) => <div key={type}><span>{type}</span><b>“{query}”</b></div>)}</div>}
              {slideIndex === 2 && <div className="keyword-anatomy"><div><small>ACCIÓN</small><b>cómo leer</b></div><i>+</i><div><small>TEMA</small><b>estados financieros</b></div><i>+</i><div><small>CONTEXTO</small><b>paso a paso</b></div></div>}
              {slideIndex === 3 && <div className="signal-board"><div className="video-card"><Play/><b>Tu video</b></div><div className="signals"><span><Hash/> Título y descripción</span><span><FileSignal/> Capítulos y SRT</span><span><MousePointerClick/> Clics</span><span><Eye/> Permanencia</span></div><ArrowRight/><div className="engine"><Search/><b>Entiende</b><small>y valida</small></div></div>}
              {slideIndex === 4 && <div className="ctr-board"><div><strong>100</strong><small>impresiones</small></div><i>→</i><div><strong>5</strong><small>clics</small></div><b>=</b><div className="accent"><strong>5%</strong><small>CTR</small></div></div>}
              {slideIndex === 5 && <div className="retention-board"><div><span>0:00</span><b>Respuesta principal</b></div><i/><div><span>0:30</span><b>Mapa del video</b></div><i/><div><span>2:00</span><b>Ejemplo práctico</b></div><i/><div><span>Final</span><b>Conclusión</b></div></div>}
              {slideIndex === 6 && <div className="map-board"><div><Target/><span>INTENCIÓN</span><b>¿Qué busca?</b></div><ArrowRight/><div><MousePointerClick/><span>EMPAQUE</span><b>¿Por qué entra?</b></div><ArrowRight/><div><BarChart3/><span>EXPERIENCIA</span><b>¿Por qué se queda?</b></div></div>}
            </div>
            <div className="teacher-prompt"><MessageCircleQuestion/><div><span>PAUSA PARA EL GRUPO</span><p>{slide.prompt}</p></div></div>
          </article>
          <div className="slide-controls"><button onClick={() => goToSlide(slideIndex - 1)} disabled={slideIndex === 0}><ArrowLeft/> Anterior</button><span>Usa ← → para avanzar</span>{slideIndex < slides.length - 1 ? <button className="next" onClick={() => goToSlide(slideIndex + 1)}>Siguiente <ArrowRight/></button> : <button className="next lab-next" onClick={() => setMode('lab')}>Ir a la práctica <FlaskConical/></button>}</div>
        </section>
      ) : (
        <section className="lab-area">
          <div className="lab-heading"><span><FlaskConical/> ACTIVIDAD CON EL GRUPO</span><h1>Laboratorio de palabras clave</h1><p>Prueben frases reales para un reel o video sobre <b>estados financieros y cómo leerlos.</b></p></div>
          <div className="lab-grid">
            <article className="workbench">
              <div className="challenge"><span>EL RETO</span><h2>¿Qué escribiría una persona que necesita entender sus estados financieros?</h2><p>Escribe la frase completa, tal como la buscaría en Google o YouTube.</p></div>
              <label htmlFor="keyword">Keyword propuesta</label>
              <div className="keyword-input"><Search/><Input id="keyword" value={keyword} onChange={(event) => { setKeyword(event.target.value); setSubmitted(false); }} onKeyDown={(event) => { if (event.key === 'Enter') evaluate(); }} placeholder="Ej. cómo leer estados financieros…"/><button onClick={evaluate} disabled={!keyword.trim()}>Evaluar keyword <Sparkles/></button></div>
              <div className="examples"><span>PRUEBA UN EJEMPLO</span><div>{suggestedKeywords.map((item) => <button key={item} onClick={() => useExample(item)}>{item}</button>)}</div></div>
              {!submitted ? <div className="empty-result"><Lightbulb/><div><b>Aún no calificamos nada</b><p>Escribe una propuesta y presiona “Evaluar keyword”.</p></div></div> : <div className="evaluation-result"><div className={`score-ring ${evaluation.score >= 70 ? 'strong' : evaluation.score >= 45 ? 'medium' : 'weak'}`} style={{ '--score': `${evaluation.score * 3.6}deg` } as React.CSSProperties}><div><strong>{evaluation.score}%</strong><small>claridad SEO</small></div></div><div><span>DIAGNÓSTICO</span><h3>{evaluation.score >= 85 ? 'Keyword muy sólida' : evaluation.score >= 60 ? 'Va por buen camino' : 'Todavía es demasiado amplia'}</h3><p>{evaluation.score >= 85 ? 'La intención, el tema y el contexto se entienden de inmediato.' : 'Usa las observaciones para volver la búsqueda más natural y específica.'}</p></div></div>}
            </article>
            <aside className="rubric">
              <div className="rubric-head"><div><span>RÚBRICA EN VIVO</span><h2>¿Qué hace fuerte a la frase?</h2></div>{submitted && <strong>{evaluation.score}/100</strong>}</div>
              <div className="rubric-items">{evaluation.checks.map((check) => <div key={check.label} className={submitted ? (check.pass ? 'pass' : 'fail') : ''}><span>{submitted ? (check.pass ? <Check/> : <AlertCircle/>) : <span className="pending-dot"/>}</span><div><b>{check.label}</b><p>{check.detail}</p></div><strong>+{check.points}</strong></div>)}</div>
              {submitted && <div className="keyword-output"><span>TÍTULO SUGERIDO</span><p>{evaluation.score >= 70 ? `Cómo leer estados financieros paso a paso | Guía para principiantes` : 'Cómo leer estados financieros paso a paso'}</p><small>La keyword guía el título; no tiene que repetirlo de forma mecánica.</small></div>}
            </aside>
          </div>
          <div className="group-dynamic"><Users/><div><span>DINÁMICA DOCENTE · 8 MINUTOS</span><p>Forma equipos, pide una keyword por equipo, evalúen cada propuesta y comparen qué cambio sube más el porcentaje.</p></div><button onClick={() => { setKeyword(''); setSubmitted(false); }}>Nueva ronda</button></div>
        </section>
      )}
    </main>
  );
}

function FileSignal() {
  return <KeyRound />;
}
