export type Concept = {
  slug: string;
  number: string;
  eyebrow: string;
  title: string;
  thesis: string;
  explanation: string;
  example: string;
  exampleLabel: string;
  teacherPrompt: string;
  misconception: string;
  visual: 'bridge' | 'intent' | 'content' | 'signals' | 'platforms' | 'authority' | 'aeo';
};

export const concepts: Concept[] = [
  {
    slug: 'seo', number: '01', eyebrow: 'CONCEPTO BASE',
    title: 'SEO es ayudar a una máquina a entender para quién es útil tu contenido.',
    thesis: 'No se trata de repetir palabras. Se trata de conectar una pregunta real con una respuesta clara, relevante y fácil de descubrir.',
    explanation: 'Google, YouTube y las redes necesitan clasificar millones de piezas. El SEO les entrega contexto: tema, intención, formato y evidencia de que la respuesta sí ayudó. Por eso el trabajo empieza antes de grabar: entendiendo qué necesita resolver la audiencia.',
    exampleLabel: 'DEL TEMA A LA BÚSQUEDA',
    example: '“Estados financieros” es un tema. “Cómo leer estados financieros paso a paso” expresa una necesidad concreta y anticipa la solución.',
    teacherPrompt: 'Pregunta al grupo: si mañana tuvieran que presentar un Estado de Resultados, ¿qué frase escribirían exactamente en el buscador?',
    misconception: 'SEO no es escribir para robots ni llenar una descripción de términos repetidos.',
    visual: 'bridge',
  },
  {
    slug: 'intencion-de-busqueda', number: '02', eyebrow: 'LA PREGUNTA DETRÁS DE LA FRASE',
    title: 'La palabra clave funciona cuando representa una intención.',
    thesis: 'Dos personas pueden buscar el mismo tema, pero esperar respuestas completamente diferentes.',
    explanation: 'Una consulta puede buscar aprender, comparar, llegar a un lugar o realizar una acción. Antes de elegir una keyword, pregunta: “¿qué debería poder hacer la persona después de ver este contenido?”. Esa respuesta define el enfoque, la profundidad y el formato.',
    exampleLabel: 'MISMO TEMA, TRES INTENCIONES',
    example: '“Qué son los estados financieros” pide una definición. “Cómo leer un Estado de Resultados” pide un proceso. “Plantilla de Estado de Resultados” pide una herramienta.',
    teacherPrompt: 'Lee las tres búsquedas del ejemplo y pide al grupo que proponga un video distinto para cada una.',
    misconception: 'Una keyword con muchas búsquedas no sirve si promete algo distinto de lo que entrega el video.',
    visual: 'intent',
  },
  {
    slug: 'palabras-clave', number: '03', eyebrow: 'LENGUAJE NATURAL',
    title: 'Una buena keyword suena como una pregunta que alguien sí haría.',
    thesis: 'Acción + tema + contexto convierte una categoría amplia en una búsqueda utilizable.',
    explanation: 'Las plataformas entienden cada vez mejor el lenguaje conversacional. Conviene observar las sugerencias del buscador y las preguntas reales de la audiencia, y después redactar una frase natural. Las palabras clave deben guiar el guion; no tienen que aparecer de forma mecánica en cada línea.',
    exampleLabel: 'ANATOMÍA DE UNA KEYWORD',
    example: 'cómo leer + estados financieros + paso a paso para principiantes',
    teacherPrompt: 'Construyan una frase entre todos. Primero elijan una acción, después el tema y al final un contexto que delimite la respuesta.',
    misconception: 'Etiquetas genéricas como #viral o #fyp no explican el tema ni la audiencia del contenido.',
    visual: 'content',
  },
  {
    slug: 'como-lee-un-video', number: '04', eyebrow: 'SEÑALES DEL CONTENIDO',
    title: 'El algoritmo escucha, lee y observa la respuesta humana.',
    thesis: 'Un video comunica su tema en el audio, el texto en pantalla, el título, la descripción y los subtítulos.',
    explanation: 'TikTok, Instagram, YouTube y Google reúnen varias pistas para clasificar una pieza. Las señales editoriales dicen de qué trata; la retención, los guardados, las compartidas y otras interacciones ayudan a estimar si cumplió la promesa. Una señal aislada no reemplaza una experiencia útil.',
    exampleLabel: 'UNA IDEA, CINCO LUGARES',
    example: 'Di “cómo leer un Estado de Resultados”, muéstralo en pantalla, úsalo como base del título, descríbelo con naturalidad y desarrolla exactamente ese proceso.',
    teacherPrompt: 'Muestra un video sin título y pregunta: ¿qué podría inferir una plataforma solo por lo que escucha y ve en los primeros segundos?',
    misconception: 'Los metadatos ayudan a clasificar; no pueden salvar un video cuya promesa no se cumple.',
    visual: 'signals',
  },
  {
    slug: 'seo-en-redes', number: '05', eyebrow: 'DESCUBRIMIENTO POR PLATAFORMA',
    title: 'La misma idea cumple funciones distintas en TikTok, Instagram y YouTube.',
    thesis: 'Optimizar no significa publicar el mismo empaque en todas partes; significa respetar cómo descubre y profundiza cada audiencia.',
    explanation: 'El segundo video propone pensar TikTok como descubrimiento, Instagram como relación y YouTube como profundidad. La utilidad de este marco es docente: obliga a decidir qué debe lograr cada versión. En todas, el tema debe ser reconocible desde el inicio y la promesa debe coincidir con el desarrollo.',
    exampleLabel: 'UNA RUTA POSIBLE',
    example: 'TikTok: un error común al leer resultados. Instagram: carrusel con las tres preguntas clave. YouTube: tutorial completo con capítulos.',
    teacherPrompt: 'Asigna una plataforma a cada equipo. Todos reciben el mismo tema y deben cambiar objetivo, apertura y formato.',
    misconception: 'Copiar exactamente la misma pieza en tres plataformas no es una estrategia multicanal.',
    visual: 'platforms',
  },
  {
    slug: 'autoridad-y-presencia', number: '06', eyebrow: 'SEO EN 2026',
    title: 'Ser claro no basta: una fuente también necesita presencia y autoridad.',
    thesis: 'Los buscadores y agentes conectan entidades, menciones, referencias y consistencia para decidir qué fuentes merecen confianza.',
    explanation: 'El primer video resume el SEO actual en contenido, autoridad y presencia. El contenido responde con profundidad; la autoridad se construye con experiencia, referencias y menciones; la presencia distribuye esa evidencia en buscadores, directorios y espacios relevantes. El SEO técnico sigue siendo la base: sitio rápido, móvil, seguro y comprensible.',
    exampleLabel: 'DE PIEZA AISLADA A FUENTE',
    example: 'Un tutorial firmado por una persona experta, acompañado por una plantilla, preguntas frecuentes, ejemplos propios y referencias consistentes es más verificable que un texto genérico.',
    teacherPrompt: 'Pide al grupo distinguir qué señales demuestran experiencia real y cuáles solo hacen que el contenido parezca profesional.',
    misconception: 'Publicar mucho contenido genérico creado con IA no construye autoridad por sí mismo.',
    visual: 'authority',
  },
  {
    slug: 'aeo', number: '07', eyebrow: 'DE ENLACES A RESPUESTAS',
    title: 'AEO organiza la respuesta para que una IA pueda comprenderla y citarla.',
    thesis: 'En un motor de respuestas, la competencia no termina en el clic: importa convertirse en una fuente clara, específica y comprobable.',
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
