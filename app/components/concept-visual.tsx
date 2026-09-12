import { Captions, FileText, Hash, Mic2, Search, ShieldCheck, Smartphone } from 'lucide-react';
import type { Concept } from '@/lib/course-data';

export function ConceptVisual({ type }: { type: Concept['visual'] }) {
  if (type === 'bridge' || type === 'legacy' || type === 'tiktok' || type === 'aeo') return <div className={`concept-art art-${type}`} role="img" aria-label={type === 'bridge' ? 'Buscador ordenando contenido relevante' : type === 'legacy' ? 'Caja de herramientas del SEO tradicional' : type === 'tiktok' ? 'Buscador de TikTok analizando señales de video' : 'Motor de inteligencia artificial construyendo una respuesta con fuentes'} />;
  if (type === 'intent') return <div className="intent-cards"><div><span>01 · APRENDER</span><b>¿Qué son?</b></div><div><span>02 · HACER</span><b>¿Cómo los leo?</b></div><div><span>03 · OBTENER</span><b>¿Dónde descargo?</b></div></div>;
  if (type === 'content') return <div className="keyword-formula"><div><small>ACCIÓN</small><b>cómo leer</b></div><i>+</i><div><small>TEMA</small><b>estados financieros</b></div><i>+</i><div><small>CONTEXTO</small><b>paso a paso</b></div></div>;
  if (type === 'signals') return <div className="signal-cloud"><div><Mic2/><span>Audio</span></div><div><Captions/><span>Texto</span></div><div><FileText/><span>Descripción</span></div><div><Hash/><span>Etiquetas</span></div><i/><strong><Smartphone/> VIDEO</strong></div>;
  if (type === 'authority') return <div className="authority-stack"><div><FileText/><span><small>01</small><b>Contenido</b></span></div><div><ShieldCheck/><span><small>02</small><b>Autoridad</b></span></div><div><Search/><span><small>03</small><b>Presencia</b></span></div></div>;
  return <div className="signal-cloud"><div><Mic2/><span>Audio</span></div><div><Captions/><span>Texto</span></div><div><FileText/><span>Descripción</span></div><div><Hash/><span>Etiquetas</span></div><i/><strong><Smartphone/> VIDEO</strong></div>;
}
