'use client';

import { CalendarClock, FlaskConical, Maximize2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { presentationPages } from '@/lib/course-data';

export function CourseHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const present = async () => {
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
      else await document.exitFullscreen();
    } catch { /* Fullscreen can be blocked by the browser. */ }
  };

  return (
    <>
      <div className="brand-stripe"><i /><i /></div>
      <header className="course-header">
        <a className="restart-logo" href="/" aria-label="Inicio RE:START"><span>RE:</span>START</a>
        <div className="course-label"><small>CLASE GUIADA</small><b>SEO + AEO PARA CREADORES</b></div>
        <div className="header-tools">
          <a className="agenda-link" href="/agenda"><CalendarClock /> Agenda</a>
          <a className="practice-link" href="/practica"><FlaskConical /> Práctica</a>
          <button onClick={present}><Maximize2 /> Presentar</button>
          <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label="Abrir navegación">{open ? <X /> : <Menu />}</button>
        </div>
      </header>
      <aside className={`course-drawer ${open ? 'open' : ''}`}>
        <span>RECORRIDO DE ENSEÑANZA</span>
        <a className={active === 'agenda' ? 'drawer-practice active' : 'drawer-practice'} href="/agenda"><CalendarClock /> Agenda de 150 minutos</a>
        <nav>
          {presentationPages.map((page) => (
            <a key={page.slug} className={`${active === page.slug ? 'active' : ''} ${page.view !== 'idea' && page.view !== 'activity' ? 'subpage' : ''}`} href={`/conceptos/${page.slug}`} onClick={() => setOpen(false)}>
              <em>{page.view === 'visual' ? '↳' : page.view === 'example' ? '↳' : page.concept.number}</em><div><small>{page.view === 'idea' ? 'IDEA' : page.view === 'visual' ? 'APOYO VISUAL' : page.view === 'example' ? 'EJEMPLO' : page.concept.eyebrow}</small><b>{page.view === 'idea' || page.view === 'activity' ? page.concept.title : page.view === 'visual' ? visualLabel(page.concept.visual) : page.concept.exampleLabel}</b></div>
            </a>
          ))}
        </nav>
        <a className={active === 'practica' ? 'drawer-practice active' : 'drawer-practice'} href="/practica"><FlaskConical /> Laboratorio de keywords</a>
      </aside>
    </>
  );
}

function visualLabel(visual: string) {
  const labels: Record<string, string> = {
    bridge: 'Cómo decide el buscador', legacy: 'Caja de herramientas', intent: 'Tres intenciones',
    content: 'Anatomía de la keyword', signals: 'Señales del video', tiktok: 'Ruta de búsqueda',
    authority: 'Capas de confianza', aeo: 'Respuesta citable',
  };
  return labels[visual] ?? 'Apoyo visual';
}
