'use client';

import {
  AlignLeft, ArrowRight, BarChart3, BrainCircuit, Check, ChevronRight,
  CircleCheck, KeyRound, LayoutGrid, ListChecks, Menu, MousePointerClick,
  Play, RotateCcw, Search, Sparkles, Target, X,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const concepts = [
  { id: 'seo', short: 'SEO', name: 'Search Engine Optimization', icon: Search, tone: 'orange', definition: 'Organiza tu contenido para que Google o YouTube lo entiendan, lo posicionen y lo recomienden.', analogy: 'Es como etiquetar los pasillos de un supermercado: si “Leche” está bien señalizado, el cliente llega rápido.', example: 'Título: “Cómo leer un Estado de Resultados paso a paso”.' },
  { id: 'aeo', short: 'AEO', name: 'Answer Engine Optimization', icon: BrainCircuit, tone: 'blue', definition: 'Estructura respuestas tan claras que una IA pueda encontrarlas, entenderlas y citarlas directamente.', analogy: 'Es ser la persona del supermercado que no solo señala el pasillo: te entrega el producto exacto y explica por qué sirve.', example: 'Respuesta citable: “Los 3 estados clave son balance, resultados y flujo de efectivo”.' },
  { id: 'keywords', short: 'Keywords', name: 'Palabras clave', icon: KeyRound, tone: 'yellow', definition: 'Son las frases reales que una audiencia escribe cuando necesita aprender, resolver o comparar algo.', analogy: 'No inventas el nombre del platillo: lees cómo lo pide la gente antes de escribir el menú.', example: 'Mejor: “plantilla de planeación de contenido 2026” que “organización de textos creativos”.' },
  { id: 'ctr', short: 'CTR', name: 'Click-Through Rate', icon: MousePointerClick, tone: 'pink', definition: 'El porcentaje de personas que hacen clic después de ver tu título y miniatura.', analogy: 'Es el poder del empaque: de 100 personas frente al aparador, ¿cuántas entran?', example: '5 clics por cada 100 impresiones = 5% de CTR.' },
  { id: 'tldr', short: 'TL;DR', name: 'Too Long; Didn’t Read', icon: AlignLeft, tone: 'green', definition: 'Un resumen ejecutivo que entrega la idea principal antes de desarrollar todos los detalles.', analogy: 'Es el tráiler de una película: te da la promesa y el contexto para decidir si quieres seguir.', example: 'Abre con la respuesta principal durante los primeros 30 segundos.' },
];

const quiz = [
  { question: '¿Qué señal le dice a YouTube que tu “empaque” funciona?', options: ['La duración total', 'El CTR', 'La cantidad de capítulos'], answer: 1 },
  { question: '¿Qué formato facilita que una IA extraiga una respuesta?', options: ['Una introducción larga', 'Texto ambiguo', 'Pregunta + respuesta directa'], answer: 2 },
  { question: '¿Qué optimiza principalmente el AEO?', options: ['Ser una fuente citable', 'Solo conseguir clics', 'Usar más hashtags'], answer: 0 },
];

export default function Home() {
  const [activeConcept, setActiveConcept] = useState(0);
  const [activeModule, setActiveModule] = useState('diccionario');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const current = concepts[activeConcept];
  const currentQuiz = quiz[quizIndex];
  const score = answers.filter((answer, index) => answer === quiz[index].answer).length;

  useEffect(() => {
    type ModuleId = 'diccionario' | 'algoritmos' | 'proyectos' | 'practica';
    type WebContext = { registerTool?: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: WebContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const allowed: ModuleId[] = ['diccionario', 'algoritmos', 'proyectos', 'practica'];
    void Promise.resolve(context.registerTool({
      name: 'open_learning_module',
      title: 'Abrir módulo de aprendizaje',
      description: 'Navega al módulo visible solicitado de Creador Lab.',
      inputSchema: { type: 'object', properties: { module: { type: 'string', enum: allowed } }, required: ['module'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const module = (input as { module?: string })?.module;
        if (!allowed.includes(module as ModuleId)) throw new Error('Módulo no válido');
        setActiveModule(module as ModuleId);
        document.getElementById(module as string)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return { module, status: 'opened' };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const jumpTo = (id: string) => {
    setActiveModule(id); setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  const answerQuiz = (option: number) => {
    if (answers[quizIndex] !== undefined) return;
    setAnswers((existing) => { const next = [...existing]; next[quizIndex] = option; return next; });
  };
  const restartQuiz = () => { setAnswers([]); setQuizIndex(0); };

  return (
    <main>
      <header className="topbar">
        <button className="brand" onClick={() => jumpTo('inicio')} aria-label="Ir al inicio"><span className="brand-mark">C</span><span>Creador Lab</span></button>
        <nav className="desktop-nav" aria-label="Navegación principal">
          {([['diccionario', 'Diccionario'], ['algoritmos', 'Cómo funciona'], ['proyectos', 'Proyectos']] as const).map(([id, label]) => (
            <button key={id} className={activeModule === id ? 'active' : ''} onClick={() => jumpTo(id)}>{label}</button>
          ))}
        </nav>
        <button className="header-cta" onClick={() => jumpTo('practica')}><Play size={15} fill="currentColor" /> Practicar</button>
        <button className="menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Abrir menú">{mobileOpen ? <X /> : <Menu />}</button>
        {mobileOpen && <div className="mobile-menu"><button onClick={() => jumpTo('diccionario')}>Diccionario</button><button onClick={() => jumpTo('algoritmos')}>Cómo funciona</button><button onClick={() => jumpTo('proyectos')}>Proyectos</button><button onClick={() => jumpTo('practica')}>Practicar</button></div>}
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={14} /> Guía práctica para creadores</div>
          <h1>Haz contenido que los algoritmos <em>sí entiendan.</em></h1>
          <p>Aprende a ser visible en buscadores y a convertirte en la respuesta que las inteligencias artificiales deciden citar.</p>
          <div className="hero-actions"><button className="primary-button" onClick={() => jumpTo('diccionario')}>Empezar el recorrido <ArrowRight size={18} /></button><span><CircleCheck size={17} /> 3 módulos · ejemplos reales</span></div>
        </div>
        <div className="hero-board" aria-label="Comparación entre SEO y AEO">
          <div className="board-top"><span>Tu contenido</span><span className="live-dot">EN LÍNEA</span></div>
          <div className="content-card"><div className="thumbnail-mini"><BarChart3 size={34} /></div><div><strong>Cómo leer un Estado de Resultados</strong><small>Guía paso a paso · 08:42</small></div></div>
          <div className="signal-row"><div className="signal seo-signal"><Search size={18} /><span><b>SEO</b>Te encuentra</span><strong>↑ 82</strong></div><div className="signal aeo-signal"><BrainCircuit size={18} /><span><b>AEO</b>Te cita</span><strong>✓</strong></div></div>
          <div className="board-note">Una pieza. Dos caminos para ser descubierto.</div>
        </div>
      </section>

      <section className="section dictionary" id="diccionario">
        <div className="section-heading"><div><span className="module-label">MÓDULO 01</span><h2>El diccionario del creador</h2></div><p>Cinco conceptos, sin jerga complicada. Elige uno para explorarlo.</p></div>
        <div className="concept-tabs" role="tablist" aria-label="Conceptos">
          {concepts.map((concept, index) => { const Icon = concept.icon; return <button key={concept.id} role="tab" aria-selected={activeConcept === index} className={`concept-tab ${activeConcept === index ? 'selected' : ''}`} onClick={() => setActiveConcept(index)}><Icon size={18} /> {concept.short}</button>; })}
        </div>
        <article className={`concept-feature tone-${current.tone}`}>
          <div className="concept-title"><span className="concept-icon"><current.icon size={28} /></span><div><span>{current.name}</span><h3>{current.short}</h3></div></div>
          <p className="definition">{current.definition}</p>
          <div className="analogy-card"><span>PIÉNSALO ASÍ</span><p>“{current.analogy}”</p></div>
          <div className="example-strip"><Target size={18} /><span><b>En la práctica:</b> {current.example}</span></div>
        </article>
      </section>

      <section className="section algorithms" id="algoritmos">
        <div className="section-heading light-heading"><div><span className="module-label">MÓDULO 02</span><h2>¿Cómo “ven” tu contenido?</h2></div><p>Los dos sistemas leen señales distintas. Dales exactamente lo que necesitan.</p></div>
        <div className="comparison-grid">
          <article className="engine-card traditional"><div className="engine-head"><span><Search /></span><div><small>MOTOR TRADICIONAL</small><h3>Google + YouTube</h3></div></div><p>Primero interpreta tu empaque; después observa cómo reacciona la audiencia.</p><ol><li><span>01</span><div><b>Lee tus metadatos</b><small>Título, descripción, keywords y subtítulos SRT.</small></div></li><li><span>02</span><div><b>Mide el clic</b><small>Un buen CTR confirma que el tema y el empaque interesan.</small></div></li><li><span>03</span><div><b>Observa la retención</b><small>Si la gente se queda, aumenta la recomendación.</small></div></li></ol><div className="formula"><b>Visibilidad</b><span>=</span><i>Relevancia</i><span>×</span><i>Comportamiento</i></div></article>
          <article className="engine-card ai-engine"><div className="engine-head"><span><BrainCircuit /></span><div><small>AGENTE DE IA</small><h3>Gemini + Perplexity</h3></div></div><p>Busca fragmentos autónomos, precisos y fáciles de convertir en una respuesta.</p><ol><li><span>01</span><div><b>Escanea texto estructurado</b><small>Transcripciones, artículos, tablas, listas y foros.</small></div></li><li><span>02</span><div><b>Reconoce entidades</b><small>Personas, marcas, conceptos y relaciones semánticas.</small></div></li><li><span>03</span><div><b>Extrae la respuesta</b><small>Premia claridad, evidencia y formato pregunta-respuesta.</small></div></li></ol><div className="formula"><b>Ser citado</b><span>=</span><i>Claridad</i><span>×</span><i>Autoridad</i></div></article>
        </div>
        <div className="insight-banner"><Sparkles size={20} /><span><b>La idea clave:</b> SEO gana la visita. AEO gana la mención. El mejor contenido hace las dos cosas.</span></div>
      </section>

      <section className="section projects" id="proyectos">
        <div className="section-heading"><div><span className="module-label">MÓDULO 03</span><h2>De la teoría al entregable</h2></div><p>Dos guiones de acción para producir contenido encontrable y citable.</p></div>
        <div className="project-stack">
          <article className="project-card"><div className="project-number">01</div><div className="project-info"><span>PROYECTO · VIDEO EDUCATIVO</span><h3>Estados financieros</h3><p>Enseña a interpretar números sin perder a quien apenas empieza.</p></div><div className="strategy strategy-seo"><div><Search size={17}/><b>Movimiento SEO</b></div><p><strong>Título:</strong> “Cómo leer un Estado de Resultados paso a paso”.</p><small>Miniatura: cifra grande + flecha al margen de ganancia.</small></div><div className="strategy strategy-aeo"><div><BrainCircuit size={17}/><b>Movimiento AEO</b></div><p><strong>TL;DR:</strong> “Los tres estados clave son Balance General, Estado de Resultados y Flujo de Efectivo”.</p><small>Di esa frase de forma literal en los primeros 30 segundos.</small></div></article>
          <article className="project-card"><div className="project-number">02</div><div className="project-info"><span>PROYECTO · VIDEO TUTORIAL</span><h3>Planeación y difusión</h3><p>Transforma una idea central en un sistema de contenidos multicanal.</p></div><div className="strategy strategy-seo"><div><LayoutGrid size={17}/><b>Movimiento SEO</b></div><p><strong>Capítulo:</strong> “Cómo reciclar contenido para redes”.</p><small>Usa capítulos descriptivos en la línea de tiempo.</small></div><div className="strategy strategy-aeo"><div><ListChecks size={17}/><b>Movimiento AEO</b></div><p><strong>Formato:</strong> muestra un calendario y explica cada columna.</p><small>Menciona entidades: Trello, Notion y TikTok.</small></div></article>
        </div>
      </section>

      <section className="practice" id="practica">
        <div className="practice-copy"><span className="module-label">CIERRE RÁPIDO</span><h2>Comprueba lo que aprendiste.</h2><p>Tres preguntas. Menos de un minuto.</p></div>
        <div className="quiz-card">
          {answers.length === quiz.length ? <div className="quiz-result"><span className="result-icon"><Check size={28}/></span><small>RESULTADO</small><h3>{score} de {quiz.length}</h3><p>{score === 3 ? 'Listo: ya piensas como creador y como algoritmo.' : 'Buen inicio. Revisa los conceptos y vuelve a intentarlo.'}</p><button onClick={restartQuiz}><RotateCcw size={16}/> Intentar de nuevo</button></div> : <>
            <div className="quiz-progress"><span>Pregunta {quizIndex + 1} de {quiz.length}</span><div>{quiz.map((_, index) => <i key={index} className={index <= quizIndex ? 'filled' : ''}/>)}</div></div>
            <h3>{currentQuiz.question}</h3>
            <div className="quiz-options">{currentQuiz.options.map((option, index) => { const answered = answers[quizIndex] !== undefined; const isCorrect = index === currentQuiz.answer; const isChosen = answers[quizIndex] === index; return <button key={option} onClick={() => answerQuiz(index)} className={answered ? (isCorrect ? 'correct' : isChosen ? 'wrong' : '') : ''}><span>{String.fromCharCode(65 + index)}</span>{option}{answered && isCorrect && <Check size={17}/>}</button>; })}</div>
            {answers[quizIndex] !== undefined && <button className="next-question" onClick={() => setQuizIndex((q) => q + 1)}>{quizIndex === quiz.length - 1 ? 'Ver resultado' : 'Siguiente pregunta'} <ChevronRight size={17}/></button>}
          </>}
        </div>
      </section>
      <footer><div className="brand"><span className="brand-mark">C</span><span>Creador Lab</span></div><p>Primero ayuda a la persona. Después, facilita que la máquina lo entienda.</p><button onClick={() => jumpTo('inicio')}>Volver arriba ↑</button></footer>
    </main>
  );
}
