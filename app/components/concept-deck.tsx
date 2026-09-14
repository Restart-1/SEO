'use client';

import { ArrowLeft, ArrowRight, BookOpenText, Check, Clock3, MessageCircleQuestion, Target, TriangleAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Concept, PresentationView } from '@/lib/course-data';
import { presentationPages } from '@/lib/course-data';
import { CourseHeader } from './course-header';
import { ConceptVisual } from './concept-visual';

const visualTitles: Record<Concept['visual'], string> = {
  bridge: '¿Cómo decide un buscador?',
  legacy: 'La caja de herramientas del SEO tradicional',
  intent: 'Tres búsquedas. Tres resultados distintos.',
  content: 'La anatomía de una keyword',
  signals: 'Todo el video envía señales',
  tiktok: 'TikTok conecta señales con búsquedas',
  authority: 'La confianza se construye en capas',
  aeo: 'De fuentes claras a respuestas citables',
};

export function ConceptDeck({ concept, view, pageSlug }: { concept: Concept; view: PresentationView; pageSlug: string }) {
  const [showNotes, setShowNotes] = useState(false);
  const index = presentationPages.findIndex((item) => item.slug === pageSlug);
  const previous = presentationPages[index - 1];
  const next = presentationPages[index + 1];

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
      <CourseHeader active={pageSlug} />
      <section className="concept-page">
        <div className="page-index"><span>PÁGINA {String(index + 1).padStart(2, '0')} / {String(presentationPages.length).padStart(2, '0')}</span><div>{presentationPages.map((item, itemIndex) => <i key={item.slug} className={itemIndex <= index ? 'filled' : ''}/>)}</div></div>
        <article className={`concept-slide ${view === 'activity' ? 'is-activity' : ''}`}>
          {view === 'activity' && concept.activity ? <div className="activity-stage">
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
          </div> : null}
          {view === 'idea' ? <div className="idea-stage">
            <div className="idea-number">{concept.number}</div>
            <div className="idea-copy">
              <span>{concept.number} / {concept.eyebrow}</span>
              <h1>{concept.title}</h1>
              <p>{concept.thesis}</p>
            </div>
            <div className="idea-anchors">{concept.keywords.map((keyword, keywordIndex) => <b key={keyword}><i>{String(keywordIndex + 1).padStart(2, '0')}</i>{keyword}</b>)}</div>
          </div> : null}
          {view === 'visual' ? <div className="metaphor-stage">
            <header><span>{concept.number} / APOYO VISUAL</span><h1>{visualTitles[concept.visual]}</h1></header>
            <div className="metaphor-visual">
              <ConceptVisual type={concept.visual}/>
            </div>
            <p className="metaphor-caption">{concept.thesis}</p>
          </div> : null}
          {view === 'example' ? <div className="example-stage">
            <header><span>{concept.number} / EJEMPLO</span><h1>{concept.exampleLabel}</h1></header>
            {concept.badExample && concept.goodExample ? <div className="example-compare">
              <section><span><X/> ANTES</span><p>{concept.badExample}</p></section>
              <section><span><Check/> MEJOR</span><p>{concept.goodExample}</p></section>
            </div> : null}
            <div className="example-takeaway"><small>LLÉVATE ESTA IDEA</small><p>{concept.example}</p></div>
          </div> : null}
          <footer className="slide-footer"><span>RE:START · SEO + AEO PARA CREADORES</span><b>{concept.number}</b></footer>
        </article>
        <nav className="page-controls">
          {previous ? <a href={`/conceptos/${previous.slug}`}><ArrowLeft/> Anterior</a> : <a href="/"><ArrowLeft/> Portada</a>}
          <button className="notes-button" onClick={() => setShowNotes(!showNotes)}>{showNotes ? <X/> : <BookOpenText/>}{showNotes ? 'Cerrar notas' : 'Notas para explicar'}</button>
          {next ? <a className="next" href={`/conceptos/${next.slug}`}>Siguiente <ArrowRight/></a> : <a className="next practice" href="/practica">Ir a la práctica <ArrowRight/></a>}
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
