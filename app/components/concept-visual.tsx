import type { Concept } from '@/lib/course-data';

export function ConceptVisual({ type }: { type: Concept['visual'] }) {
  const labels: Record<Concept['visual'], string> = {
    bridge: 'Robot buscador clasificando piezas de contenido',
    legacy: 'Caja de herramientas del SEO tradicional',
    intent: 'Tres caminos que representan intenciones de búsqueda',
    content: 'Acción, tema y contexto formando una palabra clave',
    signals: 'Señales de audio, texto y comportamiento alrededor de un video',
    tiktok: 'Buscador de TikTok ordenando resultados de video',
    authority: 'Capas de contenido, autoridad y presencia',
    aeo: 'Fuentes estructuradas convergiendo en una respuesta verificable',
  };
  return <div className={`concept-art art-${type}`} role="img" aria-label={labels[type]} />;
}
