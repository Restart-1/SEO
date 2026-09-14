import { ArrowRight, Download } from 'lucide-react';
import { CourseHeader } from '@/app/components/course-header';
import { concepts, presentationPages } from '@/lib/course-data';
import { sitePath } from '@/lib/site-path';

const viewLabels = { idea: 'Idea', visual: 'Apoyo visual', example: 'Antes / Mejor', activity: 'Actividad' } as const;

export default function AgendaPage() {
  return <main className="restart-app"><CourseHeader active="agenda"/><section className="topics-page">
    <header className="topics-heading"><div><span>ÍNDICE DE LA PRESENTACIÓN</span><h1>Elige el tema o la <em>diapositiva.</em></h1><p>8 conceptos · 4 actividades · 28 páginas · sesión sugerida de 150 minutos</p></div><a href={sitePath('/notas-del-orador-seo-aeo.pdf')} download><Download/> Descargar notas del orador</a></header>
    <div className="topics-grid">{concepts.map((concept) => {
      const pages = presentationPages.filter((page) => page.concept.slug === concept.slug);
      return <article key={concept.slug} className={concept.activity ? 'topic-card activity' : 'topic-card'}>
        <header><em>{concept.number}</em><div><small>{concept.eyebrow}</small><h2>{concept.title}</h2></div></header>
        <nav>{pages.map((page, pageIndex) => <a key={page.slug} href={sitePath(`/conceptos/${page.slug}/`)}><span>{viewLabels[page.view]}</span><b>{pageIndex + 1}</b><ArrowRight/></a>)}</nav>
      </article>;
    })}</div>
    <nav className="page-controls"><a href={sitePath('/')}><span>←</span> Portada</a><span>Índice completo de la clase</span><a className="next" href={sitePath(`/conceptos/${concepts[0].slug}/`)}>Comenzar <ArrowRight/></a></nav>
  </section></main>;
}
