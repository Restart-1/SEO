import { ArrowRight, BookOpenText, FlaskConical, Play } from 'lucide-react';
import { CourseHeader } from './components/course-header';
import { concepts } from '@/lib/course-data';
import { sitePath } from '@/lib/site-path';

export default function Home() {
  return (
    <main className="restart-app">
      <CourseHeader />
      <section className="restart-cover">
        <img src={sitePath('/restart-cover.png')} alt="RESTART — Empieza diferente" />
        <div className="restart-cover-actions">
          <a href={sitePath(`/conceptos/${concepts[0].slug}/`)}><Play/> Comenzar la clase</a>
          <a className="secondary" href={sitePath('/practica/')}><FlaskConical/> Abrir práctica</a>
        </div>
      </section>
      <section className="route-overview">
        <div><span>RUTA DE ENSEÑANZA</span><h2>Diapositiva, conversación, actividad.</h2><p>El recorrido intercala práctica cada dos conceptos y termina en el laboratorio de producción.</p></div>
        <div className="route-grid">{concepts.map((concept) => <a key={concept.slug} href={sitePath(`/conceptos/${concept.slug}/`)}><em>{concept.number}</em><span><small>{concept.eyebrow}</small><b>{concept.title}</b></span><ArrowRight/></a>)}</div>
      </section>
      <footer className="source-footer"><BookOpenText/><p>Contenido docente adaptado y reorganizado a partir de dos videos de referencia: <a href="https://youtu.be/vK_okaxe8HY" target="_blank" rel="noreferrer">SEO con IA en 2026</a> y <a href="https://youtu.be/acEiInKlG9c" target="_blank" rel="noreferrer">SEO y palabras clave en redes sociales</a>.</p></footer>
    </main>
  );
}
