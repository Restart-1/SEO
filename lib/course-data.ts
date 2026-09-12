export type Concept = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  thesis: string;
  keywords: [string, string, string];
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
    explanation: 'Durante años, la conversación de SEO giró alrededor de densidad de palabras clave, metaetiquetas, volumen de enlaces y pequeños ajustes técnicos. Algunas bases todavía importan, pero los sistemas actuales combinan contexto, calidad, autoridad y comportamiento humano. La técnica dejó de ser el objetivo; ahora sostiene una respuesta útil.',
    exampleLabel: 'ANTES → AHORA',
    example: 'Antes: repetir “estados financieros” muchas veces. Ahora: resolver con claridad una pregunta concreta y demostrar que la respuesta satisface a la audiencia.',
    teacherPrompt: 'Pregunta qué trucos de posicionamiento ha escuchado el grupo. Clasifíquenlos: ¿base técnica, práctica obsoleta o señal vigente?',
    misconception: 'Que una técnica haya perdido protagonismo no significa que el SEO técnico ya no importe.',
    visual: 'legacy',
  },
  {
    slug: 'intencion-de-busqueda', number: '03', eyebrow: 'LA PREGUNTA DETRÁS DE LA FRASE',
    title: 'Toda búsqueda esconde una intención.',
    thesis: 'El mismo tema puede pedir una definición, un proceso o una herramienta.',
    keywords: ['APRENDER', 'HACER', 'OBTENER'],
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
    explanation: 'Las plataformas entienden cada vez mejor el lenguaje conversacional. Conviene observar las sugerencias del buscador y las preguntas reales de la audiencia, y después redactar una frase natural. Las palabras clave deben guiar el guion; no tienen que aparecer de forma mecánica en cada línea.',
    exampleLabel: 'ANATOMÍA DE UNA KEYWORD',
    example: 'cómo leer + estados financieros + paso a paso para principiantes',
    teacherPrompt: 'Construyan una frase entre todos. Primero elijan una acción, después el tema y al final un contexto que delimite la respuesta.',
    misconception: 'Etiquetas genéricas como #viral o #fyp no explican el tema ni la audiencia del contenido.',
    visual: 'content',
  },
  {
    slug: 'como-lee-un-video', number: '05', eyebrow: 'SEÑALES DEL CONTENIDO',
    title: 'El algoritmo escucha, lee y observa.',
    thesis: 'Audio, texto y comportamiento construyen una misma señal de contexto.',
    keywords: ['AUDIO', 'TEXTO', 'RETENCIÓN'],
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
    explanation: 'Cuando alguien busca en TikTok, la plataforma compara la consulta con señales del video: palabras pronunciadas, texto en pantalla, caption, hashtags específicos y tema de la cuenta. Después usa señales de experiencia —como retención, repetición, guardados y compartidas— para ajustar qué resultados parecen más útiles.',
    exampleLabel: 'RECORRIDO DE UNA BÚSQUEDA',
    example: 'La persona escribe “cómo leer un estado de resultados”. TikTok identifica videos cuyo audio y texto responden esa frase, y prioriza los que además mantienen la atención.',
    teacherPrompt: 'Escribe una búsqueda en pantalla. Pide al grupo señalar qué partes del video ayudarían a TikTok a conectarlo con esa consulta.',
    misconception: 'TikTok no depende únicamente de hashtags: analiza el contenido del video y cómo responde la audiencia.',
    visual: 'tiktok',
  },
  {
    slug: 'autoridad-y-presencia', number: '07', eyebrow: 'SEO EN 2026',
    title: 'La claridad necesita autoridad.',
    thesis: 'Los buscadores y agentes conectan entidades, menciones, referencias y consistencia para decidir qué fuentes merecen confianza.',
    keywords: ['CONTENIDO', 'AUTORIDAD', 'PRESENCIA'],
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
    explanation: 'Los agentes buscan fragmentos que respondan preguntas concretas, conecten conceptos y presenten hechos fáciles de verificar. Ayudan los encabezados descriptivos, preguntas y respuestas, tablas, listas, datos estructurados y actualizaciones visibles. El SEO tradicional no desaparece: una buena base facilita que esas fuentes sean encontradas.',
    exampleLabel: 'RESPUESTA EXTRAÍBLE',
    example: 'Pregunta: “¿Cuáles son los tres estados financieros clave?”. Respuesta directa: Balance General, Estado de Resultados y Flujo de Efectivo. Después se explica la función de cada uno.',
    teacherPrompt: 'Pide una respuesta de dos oraciones y luego una explicación de dos minutos. Comparen qué parte podría citar una IA sin perder contexto.',
    misconception: 'AEO no es escribir frases para que una IA las “robe”; es facilitar una respuesta útil y atribuible.',
    visual: 'aeo',
  },
];

export function getConcept(slug: string) {
  return concepts.find((concept) => concept.slug === slug);
}
