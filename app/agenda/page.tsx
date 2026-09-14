import { ArrowRight, Coffee, FlaskConical, MessageCircleQuestion, Play, Search, Sparkles } from 'lucide-react';
import { CourseHeader } from '@/app/components/course-header';
import { concepts } from '@/lib/course-data';
import { sitePath } from '@/lib/site-path';

const blocks = [
  { time: '0–10', title: 'Abrir', detail: 'Diagnóstico y objetivo', icon: <Play/> },
  { time: '10–40', title: 'Entender', detail: 'SEO, técnicas de antes + A1', icon: <Search/> },
  { time: '40–72', title: 'Enfocar', detail: 'Intención, keywords + A2', icon: <MessageCircleQuestion/> },
  { time: '72–82', title: 'Pausa', detail: 'Receso', icon: <Coffee/> },
  { time: '82–117', title: 'Descubrir', detail: 'Señales, TikTok + A3', icon: <Sparkles/> },
  { time: '117–150', title: 'Convertir', detail: 'Autoridad, AEO + práctica', icon: <FlaskConical/> },
];

export default function AgendaPage() {
  return <main className="restart-app"><CourseHeader active="agenda"/><section className="agenda-page">
    <article className="agenda-slide">
      <header><span>SESIÓN COMPLETA · 150 MIN</span><h1>De “publicar” a ser <em>encontrable.</em></h1><p>8 conceptos · 4 actividades · 1 práctica final</p></header>
      <div className="agenda-timeline">{blocks.map((block) => <div key={block.time}><i>{block.icon}</i><strong>{block.time}<small>MIN</small></strong><span><b>{block.title}</b><small>{block.detail}</small></span></div>)}</div>
      <footer><b>RESULTADO DE LA SESIÓN</b><p>Cada equipo termina con keyword, título, texto en pantalla y apertura para un video de estados financieros.</p></footer>
    </article>
    <nav className="page-controls"><a href={sitePath('/')}><span>←</span> Portada</a><span>Agenda sugerida para Zoom</span><a className="next" href={sitePath(`/conceptos/${concepts[0].slug}/`)}>Comenzar <ArrowRight/></a></nav>
  </section></main>;
}
