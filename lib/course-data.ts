export type Concept = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  thesis: string;
  keywords: [string, string, string];
  duration?: string;
  expected?: string;
  badExample?: string;
  goodExample?: string;
  activity?: { instruction: string; steps: [string, string, string]; output: string };
  explanation: string;
  example: string;
  exampleLabel: string;
  teacherPrompt: string;
  misconception: string;
  visual: 'bridge' | 'legacy' | 'intent' | 'content' | 'signals' | 'tiktok' | 'authority' | 'aeo';
};

export const concepts: Concept[] = [
  {
    slug: 'seo', number: '01', eyebrow: 'CONCEPTO BASE',
    title: 'SEO ayuda al buscador a decidir qué contenido mostrar.',
    thesis: 'El navegador abre la puerta; el buscador ordena las respuestas.',
    keywords: ['ENTENDER', 'CLASIFICAR', 'MOSTRAR'],
    duration: '10 min', expected: 'El buscador conecta una consulta con la respuesta más relevante.',
    badExample: 'Publicar y esperar que Google “adivine” el tema.', goodExample: 'Definir la pregunta y responderla con señales coherentes.',
    explanation: 'Google, YouTube y las redes necesitan clasificar millones de piezas. El SEO les entrega contexto: tema, intención, formato y evidencia de que la respuesta sí ayudó. Por eso el trabajo empieza antes de grabar: entendiendo qué necesita resolver la audiencia.',
    exampleLabel: 'DEL TEMA A LA BÚSQUEDA',
    example: '“Estados financieros” es un tema. “Cómo leer estados financieros paso a paso” expresa una necesidad concreta y anticipa la solución.',
    teacherPrompt: 'Pregunta al grupo: si mañana tuvieran que presentar un Estado de Resultados, ¿qué frase escribirían exactamente en el buscador?',
    misconception: 'SEO no es escribir para robots ni llenar una descripción de términos repetidos.',
    visual: 'bridge',
  },
  {
    slug: 'seo-antes', number: '02', eyebrow: 'LO QUE ANTES ERA TODO',
    title: 'Antes, el SEO se concentraba en señales fáciles de manipular.',
    thesis: 'Repetir keywords, llenar etiquetas y conseguir enlaces podía pesar más que la utilidad real.',
    keywords: ['REPETICIÓN', 'ETIQUETAS', 'ENLACES'],
    duration: '10 min', expected: 'La técnica sigue siendo base, pero ya no sustituye la utilidad.',
    badExample: 'Repetir “estados financieros” en cada párrafo.', goodExample: 'Resolver una pregunta concreta con profundidad y naturalidad.',
    explanation: 'Durante años, la conversación de SEO giró alrededor de densidad de palabras clave, metaetiquetas, volumen de enlaces y pequeños ajustes técnicos. Algunas bases todavía importan, pero los sistemas actuales combinan contexto, calidad, autoridad y comportamiento humano. La técnica dejó de ser el objetivo; ahora sostiene una respuesta útil.',
    exampleLabel: 'ANTES → AHORA',
    example: 'Antes: repetir “estados financieros” muchas veces. Ahora: resolver con claridad una pregunta concreta y demostrar que la respuesta satisface a la audiencia.',
    teacherPrompt: 'Pregunta qué trucos de posicionamiento ha escuchado el grupo. Clasifíquenlos: ¿base técnica, práctica obsoleta o señal vigente?',
    misconception: 'Que una técnica haya perdido protagonismo no significa que el SEO técnico ya no importe.',
    visual: 'legacy',
  },
  {
    slug: 'actividad-tecnica-o-truco', number: 'A1', eyebrow: 'ACTIVIDAD · 10 MIN',
    title: '¿Base técnica o truco obsoleto?', thesis: 'Clasifiquen prácticas de SEO y defiendan una decisión.',
    keywords: ['OBSERVAR', 'CLASIFICAR', 'DEFENDER'],
    explanation: 'Presenta ejemplos uno por uno. El grupo levanta una señal para elegir: base vigente, práctica riesgosa o idea incompleta. No busques memorizar reglas; pide que expliquen cómo cada práctica mejora —o no— la experiencia de búsqueda.',
    exampleLabel: 'CASOS PARA PROYECTAR', example: 'Título descriptivo · 30 hashtags genéricos · sitio móvil · keyword repetida 18 veces · respuesta firmada por una persona experta.',
    teacherPrompt: 'Después de cada voto pregunta: ¿qué entiende mejor la persona o el buscador gracias a esta acción?',
    misconception: 'Una práctica antigua puede seguir siendo útil cuando tiene un propósito claro.', visual: 'legacy', duration: '10 min', expected: 'Distinguen fundamentos técnicos de tácticas mecánicas.',
    activity: { instruction: 'Muestra cinco prácticas. El grupo vota y justifica cada clasificación.', steps: ['Vota: base, truco o depende', 'Explica qué señal produce', 'Reformula la práctica si hace falta'], output: 'Una regla del grupo: “Esta técnica sirve cuando…”' },
  },
  {
    slug: 'intencion-de-busqueda', number: '03', eyebrow: 'LA PREGUNTA DETRÁS DE LA FRASE',
    title: 'Toda búsqueda esconde una intención.',
    thesis: 'El mismo tema puede pedir una definición, un proceso o una herramienta.',
    keywords: ['APRENDER', 'HACER', 'OBTENER'],
    duration: '10 min', expected: 'Una misma temática puede requerir contenidos diferentes según la intención.',
    badExample: 'Usar el mismo video para cualquier búsqueda financiera.', goodExample: 'Cambiar formato y profundidad según lo que la persona quiere lograr.',
    explanation: 'Una consulta puede buscar aprender, comparar, llegar a un lugar o realizar una acción. Antes de elegir una keyword, pregunta: “¿qué debería poder hacer la persona después de ver este contenido?”. Esa respuesta define el enfoque, la profundidad y el formato.',
    exampleLabel: 'MISMO TEMA, TRES INTENCIONES',
    example: '“Qué son los estados financieros” pide una definición. “Cómo leer un Estado de Resultados” pide un proceso. “Plantilla de Estado de Resultados” pide una herramienta.',
    teacherPrompt: 'Lee las tres búsquedas del ejemplo y pide al grupo que proponga un video distinto para cada una.',
    misconception: 'Una keyword con muchas búsquedas no sirve si promete algo distinto de lo que entrega el video.',
    visual: 'intent',
  },
  {
    slug: 'palabras-clave', number: '04', eyebrow: 'LENGUAJE NATURAL',
    title: 'La keyword debe sonar humana.',
    thesis: 'Acción + tema + contexto convierte una categoría amplia en una búsqueda utilizable.',
    keywords: ['ACCIÓN', 'TEMA', 'CONTEXTO'],
    duration: '10 min', expected: 'Una keyword útil combina lo que harán, el tema y un contexto.',
    badExample: '“Finanzas empresas información”.', goodExample: '“Cómo leer estados financieros paso a paso”.',
    explanation: 'Las plataformas entienden cada vez mejor el lenguaje conversacional. Conviene observar las sugerencias del buscador y las preguntas reales de la audiencia, y después redactar una frase natural. Las palabras clave deben guiar el guion; no tienen que aparecer de forma mecánica en cada línea.',
    exampleLabel: 'ANATOMÍA DE UNA KEYWORD',
    example: 'cómo leer + estados financieros + paso a paso para principiantes',
    teacherPrompt: 'Construyan una frase entre todos. Primero elijan una acción, después el tema y al final un contexto que delimite la respuesta.',
    misconception: 'Etiquetas genéricas como #viral o #fyp no explican el tema ni la audiencia del contenido.',
    visual: 'content',
  },
  {
    slug: 'actividad-reescribe-la-busqueda', number: 'A2', eyebrow: 'ACTIVIDAD · 12 MIN',
    title: 'De tema amplio a búsqueda útil.', thesis: 'Cambien una sola variable y observen cómo cambia la promesa.',
    keywords: ['ACCIÓN', 'TEMA', 'CONTEXTO'],
    explanation: 'Forma equipos. Todos empiezan con “estados financieros”. Cada equipo elige una intención distinta y añade acción y contexto. Comparen los resultados en voz alta y seleccionen la frase que permite imaginar mejor el contenido.',
    exampleLabel: 'PUNTO DE PARTIDA', example: 'estados financieros → cómo leer estados financieros → cómo leer estados financieros paso a paso para emprendedores',
    teacherPrompt: 'Pregunta qué palabra cambió más la expectativa de la audiencia y por qué.',
    misconception: 'Hacer una frase más larga no siempre la hace más clara.', visual: 'content', duration: '12 min', expected: 'Producen una consulta natural, específica y alineada con una intención.',
    activity: { instruction: 'Cada equipo transforma el mismo tema en una búsqueda diferente.', steps: ['Elige una intención', 'Añade acción y contexto', 'Lee la frase como si fuera una persona real'], output: 'Una keyword defendida en una sola oración.' },
  },
  {
    slug: 'como-lee-un-video', number: '05', eyebrow: 'SEÑALES DEL CONTENIDO',
    title: 'El algoritmo escucha, lee y observa.',
    thesis: 'Audio, texto y comportamiento construyen una misma señal de contexto.',
    keywords: ['AUDIO', 'TEXTO', 'RETENCIÓN'],
    duration: '10 min', expected: 'Identifican señales editoriales y señales de comportamiento.',
    badExample: 'Título claro, pero apertura sobre otro asunto.', goodExample: 'Audio, texto y desarrollo confirman la misma promesa.',
    explanation: 'TikTok, Instagram, YouTube y Google reúnen varias pistas para clasificar una pieza. Las señales editoriales dicen de qué trata; la retención, los guardados, las compartidas y otras interacciones ayudan a estimar si cumplió la promesa. Una señal aislada no reemplaza una experiencia útil.',
    exampleLabel: 'UNA IDEA, CINCO LUGARES',
    example: 'Di “cómo leer un Estado de Resultados”, muéstralo en pantalla, úsalo como base del título, descríbelo con naturalidad y desarrolla exactamente ese proceso.',
    teacherPrompt: 'Muestra un video sin título y pregunta: ¿qué podría inferir una plataforma solo por lo que escucha y ve en los primeros segundos?',
    misconception: 'Los metadatos ayudan a clasificar; no pueden salvar un video cuya promesa no se cumple.',
    visual: 'signals',
  },
  {
    slug: 'buscador-de-tiktok', number: '06', eyebrow: 'CÓMO BUSCA TIKTOK',
    title: 'TikTok convierte cada video en una respuesta posible.',
    thesis: 'Cruza la consulta con lo que dices, muestras, escribes y con la reacción de la audiencia.',
    keywords: ['CONSULTA', 'CONTEXTO', 'RESPUESTA'],
    duration: '10 min', expected: 'TikTok compara la consulta con señales del contenido y respuesta de la audiencia.',
    badExample: 'Depender únicamente de #fyp y #viral.', goodExample: 'Nombrar la pregunta en audio, pantalla y caption, y responderla pronto.',
    explanation: 'Cuando alguien busca en TikTok, la plataforma compara la consulta con señales del video: palabras pronunciadas, texto en pantalla, caption, hashtags específicos y tema de la cuenta. Después usa señales de experiencia —como retención, repetición, guardados y compartidas— para ajustar qué resultados parecen más útiles.',
    exampleLabel: 'RECORRIDO DE UNA BÚSQUEDA',
    example: 'La persona escribe “cómo leer un estado de resultados”. TikTok identifica videos cuyo audio y texto responden esa frase, y prioriza los que además mantienen la atención.',
    teacherPrompt: 'Escribe una búsqueda en pantalla. Pide al grupo señalar qué partes del video ayudarían a TikTok a conectarlo con esa consulta.',
    misconception: 'TikTok no depende únicamente de hashtags: analiza el contenido del video y cómo responde la audiencia.',
    visual: 'tiktok',
  },
  {
    slug: 'actividad-busqueda-tiktok', number: 'A3', eyebrow: 'DEMOSTRACIÓN · 15 MIN',
    title: 'Abramos el buscador de TikTok.', thesis: 'Una búsqueda real revela lenguaje, formatos y preguntas de la audiencia.',
    keywords: ['BUSCAR', 'COMPARAR', 'DEDUCIR'],
    explanation: 'Haz la demostración desde tu pantalla. Escribe la consulta sin terminar y lee las sugerencias. Abre tres resultados, revisa los primeros segundos y compara audio, texto, caption y promesa. La meta no es copiar: es reconocer patrones de claridad.',
    exampleLabel: 'CONSULTA PARA LA DEMO', example: '“cómo leer un estado de resultados…”',
    teacherPrompt: 'Pregunta: ¿qué señales se repiten en los resultados y cuál parece influir más en que entendamos el tema?',
    misconception: 'Los primeros resultados son pistas del sistema, no una fórmula garantizada.', visual: 'tiktok', duration: '15 min', expected: 'Detectan al menos tres señales que conectan consulta y video.',
    activity: { instruction: 'Realiza una búsqueda en vivo y auditen tres videos sin juzgar su popularidad.', steps: ['Lee las sugerencias', 'Observa los primeros 5 segundos', 'Registra señales que se repiten'], output: 'Una lista de tres patrones aplicables al video del grupo.' },
  },
  {
    slug: 'autoridad-y-presencia', number: '07', eyebrow: 'SEO EN 2026',
    title: 'La claridad necesita autoridad.',
    thesis: 'Los buscadores y agentes conectan entidades, menciones, referencias y consistencia para decidir qué fuentes merecen confianza.',
    keywords: ['CONTENIDO', 'AUTORIDAD', 'PRESENCIA'],
    duration: '10 min', expected: 'La confianza surge de contenido útil, evidencia y presencia consistente.',
    badExample: 'Artículo genérico sin autor, ejemplos ni referencias.', goodExample: 'Experiencia propia, fuente identificable y datos verificables.',
    explanation: 'El primer video resume el SEO actual en contenido, autoridad y presencia. El contenido responde con profundidad; la autoridad se construye con experiencia, referencias y menciones; la presencia distribuye esa evidencia en buscadores, directorios y espacios relevantes. El SEO técnico sigue siendo la base: sitio rápido, móvil, seguro y comprensible.',
    exampleLabel: 'DE PIEZA AISLADA A FUENTE',
    example: 'Un tutorial firmado por una persona experta, acompañado por una plantilla, preguntas frecuentes, ejemplos propios y referencias consistentes es más verificable que un texto genérico.',
    teacherPrompt: 'Pide al grupo distinguir qué señales demuestran experiencia real y cuáles solo hacen que el contenido parezca profesional.',
    misconception: 'Publicar mucho contenido genérico creado con IA no construye autoridad por sí mismo.',
    visual: 'authority',
  },
  {
    slug: 'aeo', number: '08', eyebrow: 'DE ENLACES A RESPUESTAS',
    title: 'AEO convierte contenido en respuestas citables.',
    thesis: 'La IA necesita respuestas claras, específicas y comprobables.',
    keywords: ['RESPONDER', 'ESTRUCTURAR', 'CITAR'],
    duration: '10 min', expected: 'AEO facilita respuestas directas sin abandonar las bases del SEO.',
    badExample: 'Introducción larga antes de responder.', goodExample: 'Respuesta directa primero; evidencia y explicación después.',
    explanation: 'Los agentes buscan fragmentos que respondan preguntas concretas, conecten conceptos y presenten hechos fáciles de verificar. Ayudan los encabezados descriptivos, preguntas y respuestas, tablas, listas, datos estructurados y actualizaciones visibles. El SEO tradicional no desaparece: una buena base facilita que esas fuentes sean encontradas.',
    exampleLabel: 'RESPUESTA EXTRAÍBLE',
    example: 'Pregunta: “¿Cuáles son los tres estados financieros clave?”. Respuesta directa: Balance General, Estado de Resultados y Flujo de Efectivo. Después se explica la función de cada uno.',
    teacherPrompt: 'Pide una respuesta de dos oraciones y luego una explicación de dos minutos. Comparen qué parte podría citar una IA sin perder contexto.',
    misconception: 'AEO no es escribir frases para que una IA las “robe”; es facilitar una respuesta útil y atribuible.',
    visual: 'aeo',
  },
  {
    slug: 'actividad-empaque-final', number: 'A4', eyebrow: 'ACTIVIDAD FINAL · 18 MIN',
    title: 'Una keyword debe convertirse en una pieza.', thesis: 'La promesa tiene que sobrevivir del buscador al primer segundo del video.',
    keywords: ['KEYWORD', 'TÍTULO', 'APERTURA'],
    explanation: 'Abre el laboratorio final. Cada equipo evalúa su keyword y después construye título, texto en pantalla y primera frase. Revisa coherencia: los cuatro elementos deben prometer y comenzar a resolver la misma necesidad.',
    exampleLabel: 'CADENA DE COHERENCIA', example: 'Keyword → título → texto en pantalla → apertura hablada',
    teacherPrompt: 'Antes de cerrar, pregunta: ¿una persona sabría en cinco segundos que llegó al video correcto?',
    misconception: 'Repetir exactamente la misma frase en cuatro lugares puede sonar artificial.', visual: 'aeo', duration: '18 min', expected: 'Cada equipo sale con un empaque SEO completo y coherente.',
    activity: { instruction: 'Usen el laboratorio y completen los cuatro elementos del video.', steps: ['Evalúa la keyword', 'Redacta título y texto', 'Ensaya la primera frase'], output: 'Keyword + título + texto en pantalla + apertura de 15 segundos.' },
  },
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}

export type PresentationView = 'idea' | 'visual' | 'example' | 'activity';

export type PresentationPage = {
  slug: string;
  view: PresentationView;
  concept: Concept;
};

export const presentationPages: PresentationPage[] = concepts.flatMap((concept) => {
  if (concept.activity) return [{ slug: concept.slug, view: 'activity' as const, concept }];

  return [
    { slug: concept.slug, view: 'idea' as const, concept },
    { slug: `${concept.slug}-visual`, view: 'visual' as const, concept },
    { slug: `${concept.slug}-ejemplo`, view: 'example' as const, concept },
  ];
});

export function getPresentationPage(slug: string) {
  return presentationPages.find((page) => page.slug === slug);
}
