'use client';

import Link from 'next/link';
import { CalendarClock, FlaskConical, Maximize2, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { concepts } from '@/lib/course-data';

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
        <Link className="restart-logo" href="/" aria-label="Inicio RE:START"><span>RE:</span>START</Link>
        <div className="course-label"><small>CLASE GUIADA</small><b>SEO + AEO PARA CREADORES</b></div>
        <div className="header-tools">
          <Link className="agenda-link" href="/agenda"><CalendarClock /> Agenda</Link>
          <Link className="practice-link" href="/practica"><FlaskConical /> Práctica</Link>
          <button onClick={present}><Maximize2 /> Presentar</button>
          <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-label="Abrir navegación">{open ? <X /> : <Menu />}</button>
        </div>
      </header>
      <aside className={`course-drawer ${open ? 'open' : ''}`}>
        <span>RECORRIDO DE ENSEÑANZA</span>
        <Link className={active === 'agenda' ? 'drawer-practice active' : 'drawer-practice'} href="/agenda"><CalendarClock /> Agenda de 150 minutos</Link>
        <nav>
          {concepts.map((concept) => (
            <Link key={concept.slug} className={active === concept.slug ? 'active' : ''} href={`/conceptos/${concept.slug}`} onClick={() => setOpen(false)}>
              <em>{concept.number}</em><div><small>{concept.eyebrow}</small><b>{concept.title}</b></div>
            </Link>
          ))}
        </nav>
        <Link className={active === 'practica' ? 'drawer-practice active' : 'drawer-practice'} href="/practica"><FlaskConical /> Laboratorio de keywords</Link>
      </aside>
    </>
  );
}
