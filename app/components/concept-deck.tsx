'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenText, MessageCircleQuestion, TriangleAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Concept } from '@/lib/course-data';
import { concepts } from '@/lib/course-data';
import { CourseHeader } from './course-header';
import { ConceptVisual } from './concept-visual';

export function ConceptDeck({ concept }: { concept: Concept }) {
  const [showNotes, setShowNotes] = useState(false);
  const index = concepts.findIndex((item) => item.slug === concept.slug);
  const previous = concepts[index - 1];
  const next = concepts[index + 1];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && previous) window.location.href = `/conceptos/${previous.slug}`;
      if (event.key === 'ArrowRight') window.location.href = next ? `/conceptos/${next.slug}` : '/practica';
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [next, previous]);

  return (
    <main className="restart-app">
      <CourseHeader active={concept.slug} />
      <section className="concept-page">
        <div className="page-index"><span>{concept.number} / {String(concepts.length).padStart(2, '0')}</span><div>{concepts.map((item) => <i key={item.slug} className={Number(item.number) <= Number(concept.number) ? 'filled' : ''}/>)}</div></div>
        <article className="concept-slide">
          <div className="zoom-slide">
            <div className="zoom-copy">
              <span>{concept.number} / {concept.eyebrow}</span>
              <h1>{concept.title}</h1>
              <p>{concept.thesis}</p>
              <div className="anchor-words">{concept.keywords.map((keyword, keywordIndex) => <b key={keyword}><i>{String(keywordIndex + 1).padStart(2, '0')}</i>{keyword}</b>)}</div>
            </div>
            <div className="zoom-visual">
              <ConceptVisual type={concept.visual}/>
              <div className="visual-caption"><span>{concept.exampleLabel}</span><p>{concept.example}</p></div>
            </div>
          </div>
          <footer className="slide-footer"><span>RE:START · SEO + AEO PARA CREADORES</span><b>{concept.number}</b></footer>
        </article>
        <nav className="page-controls">
          {previous ? <Link href={`/conceptos/${previous.slug}`}><ArrowLeft/> Anterior</Link> : <Link href="/"><ArrowLeft/> Portada</Link>}
          <button className="notes-button" onClick={() => setShowNotes(!showNotes)}>{showNotes ? <X/> : <BookOpenText/>}{showNotes ? 'Cerrar notas' : 'Notas para explicar'}</button>
          {next ? <Link className="next" href={`/conceptos/${next.slug}`}>Siguiente <ArrowRight/></Link> : <Link className="next practice" href="/practica">Ir a la práctica <ArrowRight/></Link>}
        </nav>
        {showNotes && <aside className="speaker-notes">
          <div><span>EXPLICACIÓN</span><p>{concept.explanation}</p></div>
          <div className="note-warning"><TriangleAlert/><section><span>ACLARACIÓN</span><p>{concept.misconception}</p></section></div>
          <div className="note-prompt"><MessageCircleQuestion/><section><span>PREGUNTA AL GRUPO</span><p>{concept.teacherPrompt}</p></section></div>
        </aside>}
      </section>
    </main>
  );
}
