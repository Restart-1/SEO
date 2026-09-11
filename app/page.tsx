'use client';

import {
  ArrowLeft, ArrowRight, BarChart3, BookOpen, BrainCircuit, Check, ChevronRight,
  CircleHelp, FileText, KeyRound, Layers3, ListChecks, LockKeyhole, Menu,
  MousePointerClick, Play, RotateCcw, Search, Sparkles, Target, Trophy, X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

type Lesson = {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  icon: typeof Search;
  question: string;
  options: string[];
  answer: number;
  feedback: string;
};

const lessons: Lesson[] = [
  { id: 'fundamento', eyebrow: 'La idea central', title: 'SEO no es “gustarle a Google”.', lead: 'Es reducir la distancia entre una pregunta real y la mejor respuesta disponible.', icon: Search, question: '¿Cuál definición describe mejor el SEO?', options: ['Repetir una palabra muchas veces', 'Conectar una búsqueda con una respuesta útil', 'Publicar todos los días'], answer: 1, feedback: 'SEO empieza por resolver una intención humana, no por engañar al algoritmo.' },
  { id: 'recorrido', eyebrow: 'Cómo funciona', title: 'El buscador recorre cuatro estaciones.', lead: 'Antes de recomendarte, necesita descubrir, entender, guardar y ordenar tu contenido.', icon: Layers3, question: 'Si Google todavía no conoce una página, ¿en qué etapa está el problema?', options: ['Rastreo', 'Ranking', 'Conversión'], answer: 0, feedback: 'Sin rastreo no hay lectura; sin lectura no hay posibilidad de aparecer.' },
  { id: 'intencion', eyebrow: 'La decisión clave', title: 'Una búsqueda siempre esconde una intención.', lead: 'Las mismas palabras pueden pedir aprender, comparar, llegar a un sitio o comprar.', icon: Target, question: '“Mejor app para planear contenido” expresa una intención de…', options: ['Navegación', 'Comparación', 'Compra inmediata'], answer: 1, feedback: 'La palabra “mejor” suele indicar que la persona está comparando alternativas.' },
  { id: 'keywords', eyebrow: 'Palabras clave', title: 'No elijas la frase más elegante. Elige la más buscable.', lead: 'Una buena keyword usa el lenguaje del alumno, define el problema y deja clara la promesa.', icon: KeyRound, question: '¿Qué frase tiene una intención más clara para un tutorial?', options: ['Ideas y creatividad digital', 'Cómo hacer un calendario de contenido mensual', 'Reflexiones sobre comunicación'], answer: 1, feedback: 'Incluye acción, objeto y alcance: hacer + calendario de contenido + mensual.' },
  { id: 'empaque', eyebrow: 'Título + descripción', title: 'El empaque debe prometer una respuesta específica.', lead: 'El título gana la mirada; la descripción confirma el contexto sin repetir por repetir.', icon: FileText, question: '¿Qué título comunica mejor el resultado?', options: ['Estados financieros explicados', 'Finanzas 2026', 'Cómo leer un Estado de Resultados paso a paso'], answer: 2, feedback: 'Incluye la tarea concreta, el objeto y el nivel de acompañamiento.' },
  { id: 'clic', eyebrow: 'CTR', title: 'El clic mide si tu promesa resulta irresistible.', lead: 'CTR es la proporción de personas que hacen clic después de ver tu título y miniatura.', icon: MousePointerClick, question: 'Tu miniatura tuvo 2,000 impresiones y 120 clics. ¿Cuál fue su CTR?', options: ['6%', '12%', '16%'], answer: 0, feedback: '120 ÷ 2,000 × 100 = 6%. Compáralo siempre con videos y fuentes similares.' },
  { id: 'retencion', eyebrow: 'Después del clic', title: 'El CTR abre la puerta; la retención demuestra valor.', lead: 'Si el título promete una cosa y el video tarda en entregarla, el usuario se va.', icon: BarChart3, question: '¿Qué apertura protege mejor la retención?', options: ['Una historia personal de tres minutos', 'La respuesta principal y el mapa del video', 'Una animación larga del logotipo'], answer: 1, feedback: 'Entrega valor temprano y luego explica cómo profundizarás.' },
  { id: 'senales', eyebrow: 'SEO para video', title: 'YouTube escucha, lee y observa.', lead: 'Título, descripción, capítulos y subtítulos dan contexto; clics y permanencia validan la utilidad.', icon: ListChecks, question: '¿Qué combinación ofrece señales más completas?', options: ['Título llamativo + hashtags', 'Título claro + capítulos + SRT + buena retención', 'Descripción larga sin estructura'], answer: 1, feedback: 'Combina señales textuales para entender y señales humanas para validar.' },
];

const finalQuiz = [
  ['¿Cuál es el punto de partida de una estrategia SEO?', ['La intención de búsqueda', 'La miniatura', 'La duración'], 0],
  ['¿Qué ocurre antes de que una página pueda posicionarse?', ['Se comparte', 'Se rastrea e indexa', 'Se monetiza'], 1],
  ['“Cómo calcular margen bruto” tiene intención…', ['Informativa', 'Navegacional', 'Transaccional'], 0],
  ['¿Qué keyword es más específica?', ['Contenido', 'Marketing', 'Plantilla de calendario de contenido 2026'], 2],
  ['¿Qué mide el CTR?', ['Clics sobre impresiones', 'Minutos sobre clics', 'Comentarios sobre vistas'], 0],
  ['500 clics de 10,000 impresiones equivalen a…', ['0.5%', '5%', '50%'], 1],
  ['¿Qué valida la retención?', ['Que el empaque funciona', 'Que el contenido mantiene su promesa', 'Que el archivo tiene subtítulos'], 1],
  ['¿Para qué sirven los capítulos descriptivos?', ['Para alargar el video', 'Para indexar temas concretos', 'Para ocultar la descripción'], 1],
  ['¿Qué archivo ayuda a un buscador a leer un video?', ['SRT', 'JPG', 'ZIP'], 0],
  ['¿Cuál es la mejor relación entre SEO y audiencia?', ['Optimizar para robots aunque confunda', 'Ayudar a personas y dar señales claras a máquinas', 'Usar keywords sin contexto'], 1],
] as const;

export default function Home() {
  const [lessonIndex, setLessonIndex] = useState(0);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<number, number>>({});
  const [mobileNav, setMobileNav] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const lesson = lessons[lessonIndex];
  const LessonIcon = lesson.icon;

  const practiceStats = useMemo(() => {
    const attempted = Object.keys(practiceAnswers).length;
    const correct = Object.entries(practiceAnswers).filter(([key, value]) => lessons[Number(key)].answer === value).length;
    return { attempted, correct, accuracy: attempted ? Math.round(correct / attempted * 100) : 0 };
  }, [practiceAnswers]);

  const finalScore = quizAnswers.filter((answer, index) => answer === finalQuiz[index][2]).length;
  const finalFinished = quizAnswers.length === finalQuiz.length;

  useEffect(() => {
    type WebContext = { registerTool?: (tool: unknown, options?: { signal?: AbortSignal }) => void | Promise<void> };
    const context = (document as Document & { modelContext?: WebContext }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    void Promise.resolve(context.registerTool({
      name: 'open_seo_lesson', title: 'Abrir lección SEO',
      description: 'Abre una lección visible del recorrido SEO de Creador Lab por su identificador.',
      inputSchema: { type: 'object', properties: { lesson: { type: 'string', enum: lessons.map((item) => item.id) } }, required: ['lesson'], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute(input: unknown) {
        const id = (input as { lesson?: string })?.lesson;
        const index = lessons.findIndex((item) => item.id === id);
        if (index < 0) throw new Error('Lección no válida');
        setLessonIndex(index); window.scrollTo({ top: 0, behavior: 'smooth' });
        return { lesson: id, status: 'opened' };
      },
    }, { signal: lifecycle.signal })).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const goToLesson = (index: number) => {
    setLessonIndex(Math.max(0, Math.min(lessons.length - 1, index)));
    setMobileNav(false); window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => { setQuizAnswers([]); setQuizIndex(0); };

  return (
    <main className="course-shell">
      <header className="course-header">
        <button className="brand" onClick={() => goToLesson(0)} aria-label="Ir al inicio"><span className="brand-mark">C</span><span>Creador Lab</span></button>
        <div className="header-path"><span>Ruta actual</span><b>Fundamentos de SEO</b></div>
        <div className="header-progress"><span>{lessonIndex + 1} / {lessons.length}</span><div><i style={{ width: `${((lessonIndex + 1) / lessons.length) * 100}%` }} /></div></div>
        <Dialog open={quizOpen} onOpenChange={setQuizOpen}>
          <DialogTrigger render={<Button className="quiz-trigger" />}><CircleHelp /> Evaluación final</DialogTrigger>
          <DialogContent className="quiz-dialog" showCloseButton={false}>
            <DialogHeader><DialogTitle>Evaluación final de SEO</DialogTitle><DialogDescription>10 preguntas · resultado porcentual al terminar</DialogDescription></DialogHeader>
            <button className="dialog-close" onClick={() => setQuizOpen(false)} aria-label="Cerrar"><X /></button>
            {finalFinished ? (
              <div className="final-result"><span><Trophy /></span><small>RESULTADO FINAL</small><h3>{Math.round(finalScore / finalQuiz.length * 100)}%</h3><p>{finalScore} aciertos · {finalQuiz.length - finalScore} desaciertos</p><b>{finalScore >= 8 ? 'Dominio sólido. Ya puedes pasar a AEO.' : 'Conviene repasar las lecciones marcadas antes de avanzar.'}</b><button onClick={resetQuiz}><RotateCcw /> Volver a intentar</button></div>
            ) : (
              <div className="final-question">
                <div className="quiz-counter"><span>Pregunta {quizIndex + 1} de {finalQuiz.length}</span><div>{finalQuiz.map((_, i) => <i key={i} className={i <= quizIndex ? 'on' : ''}/>)}</div></div>
                <h3>{finalQuiz[quizIndex][0]}</h3>
                <div className="final-options">{finalQuiz[quizIndex][1].map((option, i) => <button key={option} onClick={() => { const next = [...quizAnswers]; next[quizIndex] = i; setQuizAnswers(next); setTimeout(() => setQuizIndex((old) => old + 1), 180); }}><span>{String.fromCharCode(65 + i)}</span>{option}</button>)}</div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <button className="mobile-nav-button" onClick={() => setMobileNav(!mobileNav)} aria-label="Abrir temario">{mobileNav ? <X /> : <Menu />}</button>
      </header>

      <aside className={`course-sidebar ${mobileNav ? 'open' : ''}`}>
        <div className="sidebar-intro"><span>MÓDULO 01</span><h2>SEO desde cero</h2><p>Una idea por pantalla. Avanza a tu ritmo.</p></div>
        <nav aria-label="Lecciones SEO">{lessons.map((item, index) => { const Icon = item.icon; const answered = practiceAnswers[index] !== undefined; const correct = answered && practiceAnswers[index] === item.answer; return <button key={item.id} className={lessonIndex === index ? 'current' : ''} onClick={() => goToLesson(index)}><span className={`nav-index ${answered ? (correct ? 'done' : 'miss') : ''}`}>{answered ? (correct ? <Check /> : '•') : String(index + 1).padStart(2, '0')}</span><span><b>{item.eyebrow}</b><small>{item.title}</small></span><ChevronRight /></button>; })}</nav>
        <div className="score-card"><div><span>Prácticas rápidas</span><b>{practiceStats.attempted}/{lessons.length}</b></div><div className="score-bar"><i style={{ width: `${practiceStats.accuracy}%` }}/></div><p><strong>{practiceStats.accuracy}%</strong> acierto · <strong>{practiceStats.attempted ? 100 - practiceStats.accuracy : 0}%</strong> desacierto</p></div>
        <div className="coming-next"><span><LockKeyhole /> MÓDULO 02</span><b>AEO y respuestas citables</b><small>Disponible después de dominar SEO</small></div>
      </aside>

      <section className="lesson-stage">
        <div className="lesson-topline"><span>LECCIÓN {String(lessonIndex + 1).padStart(2, '0')}</span><span>≈ {lessonIndex === 3 || lessonIndex === 5 ? '6' : '4'} min</span></div>
        <div className="lesson-heading"><span className="lesson-icon"><LessonIcon /></span><div><p>{lesson.eyebrow}</p><h1>{lesson.title}</h1><h2>{lesson.lead}</h2></div></div>

        <div className="lesson-content">
          {lessonIndex === 0 && <><div className="core-idea"><span>USUARIO</span><ArrowRight/><span className="search-pill">“¿Cómo leo mis resultados?”</span><ArrowRight/><span>RESPUESTA ÚTIL</span></div><div className="two-notes"><article><small>NO ES</small><p>Escribir para un robot, llenar un texto de términos repetidos o perseguir trucos.</p></article><article><small>SÍ ES</small><p>Comprender una necesidad y volver tu respuesta fácil de encontrar y entender.</p></article></div></>}
          {lessonIndex === 1 && <div className="station-flow">{[['01','Rastrear','El buscador descubre la URL.'],['02','Interpretar','Lee texto, estructura y contexto.'],['03','Indexar','Guarda la pieza en su biblioteca.'],['04','Ordenar','Decide cuándo y dónde mostrarla.']].map(([n,t,d]) => <article key={n}><span>{n}</span><b>{t}</b><p>{d}</p></article>)}</div>}
          {lessonIndex === 2 && <div className="intent-grid">{[['APRENDER','Informativa','“Cómo calcular margen bruto”'],['COMPARAR','Comercial','“Mejor software de finanzas”'],['LLEGAR','Navegacional','“YouTube Studio analíticas”'],['ACTUAR','Transaccional','“Descargar plantilla financiera”']].map(([tag,title,example]) => <article key={tag}><span>{tag}</span><b>{title}</b><p>{example}</p></article>)}</div>}
          {lessonIndex === 3 && <><div className="keyword-formula"><span>ACCIÓN</span><b>+</b><span>TEMA</span><b>+</b><span>CONTEXTO</span><b>=</b><strong>KEYWORD ÚTIL</strong></div><div className="example-box"><small>EJEMPLO CONSTRUIDO</small><p><i>Cómo hacer</i> + <i>calendario de contenido</i> + <i>mensual</i></p><b>“Cómo hacer un calendario de contenido mensual”</b></div></>}
          {lessonIndex === 4 && <><div className="title-recipe"><article><span>1</span><p><b>Tarea</b>Cómo leer</p></article><b>+</b><article><span>2</span><p><b>Objeto</b>un Estado de Resultados</p></article><b>+</b><article><span>3</span><p><b>Promesa</b>paso a paso</p></article></div><div className="search-preview"><small>Vista previa en resultados</small><a>Cómo leer un Estado de Resultados paso a paso</a><p>Aprende a identificar ingresos, costos, utilidad bruta y margen con un ejemplo sencillo…</p></div></>}
          {lessonIndex === 5 && <><div className="ctr-math"><div><strong>120</strong><span>clics</span></div><b>÷</b><div><strong>2,000</strong><span>impresiones</span></div><b>× 100 =</b><div className="result"><strong>6%</strong><span>CTR</span></div></div><div className="callout"><MousePointerClick/><p><b>Importante:</b> no existe un CTR “perfecto” universal. Compáralo con tu historial, la fuente de tráfico y videos semejantes.</p></div></>}
          {lessonIndex === 6 && <><div className="promise-line"><div><span>TÍTULO</span><b>Promesa</b></div><ArrowRight/><div><span>PRIMEROS 30 S</span><b>Confirmación</b></div><ArrowRight/><div><span>RESTO DEL VIDEO</span><b>Profundidad</b></div></div><div className="tldr-example"><Sparkles/><p><small>APERTURA RECOMENDADA</small>“En este video aprenderás a distinguir los tres estados financieros clave y a leer cada uno sin experiencia previa.”</p></div></>}
          {lessonIndex === 7 && <div className="signal-map"><div className="signal-source"><Play/><b>Tu video</b></div><div className="signal-list"><span><Check/> Título con intención</span><span><Check/> Descripción contextual</span><span><Check/> Capítulos descriptivos</span><span><Check/> Subtítulos SRT</span><span><Check/> Clic + permanencia</span></div><div className="signal-result"><Search/><b>Contenido entendible</b><small>para personas y buscadores</small></div></div>}
        </div>

        <section className="micro-practice" aria-labelledby="practice-title">
          <div className="practice-label"><span><BookOpen/> PRÁCTICA DE ESTA LECCIÓN</span><small>Cuenta para tu porcentaje de acierto</small></div>
          <h3 id="practice-title">{lesson.question}</h3>
          <div className="practice-options">{lesson.options.map((option, index) => { const selected = practiceAnswers[lessonIndex]; const answered = selected !== undefined; const correct = index === lesson.answer; const chosen = selected === index; return <button key={option} disabled={answered} onClick={() => setPracticeAnswers((old) => ({ ...old, [lessonIndex]: index }))} className={answered ? (correct ? 'correct' : chosen ? 'wrong' : 'dim') : ''}><span>{String.fromCharCode(65 + index)}</span>{option}{answered && correct && <Check/>}{answered && chosen && !correct && <X/>}</button>; })}</div>
          {practiceAnswers[lessonIndex] !== undefined && <div className={`practice-feedback ${practiceAnswers[lessonIndex] === lesson.answer ? 'good' : 'bad'}`}><b>{practiceAnswers[lessonIndex] === lesson.answer ? '¡Correcto!' : 'Casi. Revisa la idea principal.'}</b><span>{lesson.feedback}</span></div>}
        </section>

        <div className="lesson-nav"><button onClick={() => goToLesson(lessonIndex - 1)} disabled={lessonIndex === 0}><ArrowLeft/> Anterior</button><span>{lessonIndex + 1} de {lessons.length}</span>{lessonIndex < lessons.length - 1 ? <button className="next" onClick={() => goToLesson(lessonIndex + 1)}>Siguiente idea <ArrowRight/></button> : <button className="next" onClick={() => setQuizOpen(true)}>Abrir evaluación <Trophy/></button>}</div>
      </section>
    </main>
  );
}
