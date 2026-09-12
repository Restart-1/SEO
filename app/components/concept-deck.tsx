'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpenText, Check, Clock3, MessageCircleQuestion, Target, TriangleAlert, X } from 'lucide-react';
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
        <div className="page-index"><span>PÁGINA {String(index + 1).padStart(2, '0')} / {String(concepts.length).padStart(2, '0')}</span><div>{concepts.map((item, itemIndex) => <i key={item.slug} className={itemIndex <= index ? 'filled' : ''}/>)}</div></div>
        <article className={`concept-slide ${concept.activity ? 'is-activity' : ''}`}>
          {concept.activity ? <div className="activity-stage">
            <div className="activity-brief">
              <span>{concept.number} / {concept.eyebrow}</span>
              <div className="activity-time"><Clock3/>{concept.duration}</div>
              <h1>{concept.title}</h1>
              <p>{concept.activity.instruction}</p>
              <div className="activity-output"><Target/><div><small>ENTREGABLE</small><b>{concept.activity.output}</b></div></div>
            </div>
            <div className="activity-steps">
              <span>INSTRUCCIONES</span>
              {concept.activity.steps.map((step, stepIndex) => <div key={step}><em>{String(stepIndex + 1).padStart(2, '0')}</em><b>{step}</b></div>)}
              <footer><MessageCircleQuestion/><p>{concept.teacherPrompt}</p></footer>
            </div>
          </div> : <div className="zoom-slide">
            <div className="zoom-copy">
              <span>{concept.number} / {concept.eyebrow}</span>
              <h1>{concept.title}</h1>
              <p>{concept.thesis}</p>
              <div className="anchor-words">{concept.keywords.map((keyword, keywordIndex) => <b key={keyword}><i>{String(keywordIndex + 1).padStart(2, '0')}</i>{keyword}</b>)}</div>
            </div>
            <div className="zoom-visual">
              <ConceptVisual type={concept.visual}/>
              <div className="visual-caption"><span>{concept.exampleLabel}</span><p>{concept.example}</p></div>
              {concept.badExample && concept.goodExample && <div className="micro-compare"><p><X/><span>{concept.badExample}</span></p><p><Check/><span>{concept.goodExample}</span></p></div>}
            </div>
          </div>}
          <footer className="slide-footer"><span>RE:START · SEO + AEO PARA CREADORES</span><b>{concept.number}</b></footer>
        </article>
        <nav className="page-controls">
          {previous ? <Link href={`/conceptos/${previous.slug}`}><ArrowLeft/> Anterior</Link> : <Link href="/"><ArrowLeft/> Portada</Link>}
          <button className="notes-button" onClick={() => setShowNotes(!showNotes)}>{showNotes ? <X/> : <BookOpenText/>}{showNotes ? 'Cerrar notas' : 'Notas para explicar'}</button>
          {next ? <Link className="next" href={`/conceptos/${next.slug}`}>Siguiente <ArrowRight/></Link> : <Link className="next practice" href="/practica">Ir a la práctica <ArrowRight/></Link>}
        </nav>
        {showNotes && <aside className="speaker-notes">
          <div><span>EXPLICACIÓN · {concept.duration ?? '10 min'}</span><p>{concept.explanation}</p></div>
          <div className="note-warning"><TriangleAlert/><section><span>ACLARACIÓN</span><p>{concept.misconception}</p></section></div>
          <div className="note-prompt"><MessageCircleQuestion/><section><span>PREGUNTA AL GRUPO</span><p>{concept.teacherPrompt}</p></section></div>
          <div className="note-expected"><Check/><section><span>RESPUESTA ESPERADA</span><p>{concept.expected}</p></section></div>
        </aside>}
      </section>
    </main>
  );
}
