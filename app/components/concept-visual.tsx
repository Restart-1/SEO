import { ArrowRight, Bot, Captions, CheckCircle2, FileText, Hash, Images, MessageSquareText, Mic2, Search, ShieldCheck, Smartphone, Video } from 'lucide-react';
import type { Concept } from '@/lib/course-data';

export function ConceptVisual({ type }: { type: Concept['visual'] }) {
  if (type === 'bridge') return <div className="visual-flow"><div><span>PERSONA</span><b>Necesidad real</b></div><ArrowRight/><div className="hot"><Search/><b>Búsqueda clara</b></div><ArrowRight/><div><span>CONTENIDO</span><b>Respuesta útil</b></div></div>;
  if (type === 'intent') return <div className="intent-cards"><div><span>01 · APRENDER</span><b>¿Qué son?</b></div><div><span>02 · HACER</span><b>¿Cómo los leo?</b></div><div><span>03 · OBTENER</span><b>¿Dónde descargo?</b></div></div>;
  if (type === 'content') return <div className="keyword-formula"><div><small>ACCIÓN</small><b>cómo leer</b></div><i>+</i><div><small>TEMA</small><b>estados financieros</b></div><i>+</i><div><small>CONTEXTO</small><b>paso a paso</b></div></div>;
  if (type === 'signals') return <div className="signal-cloud"><div><Mic2/><span>Audio</span></div><div><Captions/><span>Texto</span></div><div><FileText/><span>Descripción</span></div><div><Hash/><span>Etiquetas</span></div><i/><strong><Smartphone/> VIDEO</strong></div>;
  if (type === 'platforms') return <div className="platform-flow"><div><span><Smartphone/></span><small>DESCUBRIR</small><b>TikTok</b></div><ArrowRight/><div><span><Images/></span><small>RELACIONAR</small><b>Instagram</b></div><ArrowRight/><div><span><Video/></span><small>PROFUNDIZAR</small><b>YouTube</b></div></div>;
  if (type === 'authority') return <div className="authority-stack"><div><FileText/><span><small>01</small><b>Contenido</b></span></div><div><ShieldCheck/><span><small>02</small><b>Autoridad</b></span></div><div><Search/><span><small>03</small><b>Presencia</b></span></div></div>;
  return <div className="aeo-flow"><div><MessageSquareText/><span><small>PREGUNTA</small><b>¿Cuáles son los 3 estados clave?</b></span></div><ArrowRight/><div className="hot"><Bot/><span><small>RESPUESTA</small><b>Directa + verificable</b></span></div><ArrowRight/><CheckCircle2/></div>;
}
