'use client';

import Link from 'next/link';
import { ArrowLeft, ArrowRight, MessageCircleQuestion, TriangleAlert } from 'lucide-react';
import { useEffect } from 'react';
import type { Concept } from '@/lib/course-data';
import { concepts } from '@/lib/course-data';
import { CourseHeader } from './course-header';
import { ConceptVisual } from './concept-visual';

export function ConceptDeck({ concept }: { concept: Concept }) {
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
          <header>
            <span>{concept.number} / {concept.eyebrow}</span>
            <h1>{concept.title}</h1>
            <p>{concept.thesis}</p>
          </header>
          <div className="concept-body">
            <div className="concept-explanation">
              <span>IDEA PARA EXPLICAR</span>
              <p>{concept.explanation}</p>
              <div className="misconception"><TriangleAlert/><div><small>ACLARACIÓN IMPORTANTE</small><b>{concept.misconception}</b></div></div>
            </div>
            <div className="concept-example">
              <ConceptVisual type={concept.visual}/>
              <div><span>{concept.exampleLabel}</span><p>{concept.example}</p></div>
            </div>
          </div>
          <footer className="teacher-cue"><MessageCircleQuestion/><div><span>PAUSA DOCENTE</span><p>{concept.teacherPrompt}</p></div></footer>
        </article>
        <nav className="page-controls">
          {previous ? <Link href={`/conceptos/${previous.slug}`}><ArrowLeft/> Anterior</Link> : <Link href="/"><ArrowLeft/> Portada</Link>}
          <span>Usa ← → para avanzar</span>
          {next ? <Link className="next" href={`/conceptos/${next.slug}`}>Siguiente <ArrowRight/></Link> : <Link className="next practice" href="/practica">Ir a la práctica <ArrowRight/></Link>}
        </nav>
      </section>
    </main>
  );
}
