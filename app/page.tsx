import Link from 'next/link';
import { ArrowRight, BookOpenText, FlaskConical, Play, Search, Sparkles } from 'lucide-react';
import { CourseHeader } from './components/course-header';
import { concepts } from '@/lib/course-data';

export default function Home() {
  return (
    <main className="restart-app">
      <CourseHeader />
      <section className="cover-page">
        <div className="cover-copy">
          <span>SESIÓN GUIADA · SEO + AEO</span>
          <h1>Haz que el algoritmo <em>entienda</em> tu contenido.</h1>
          <p>Una clase en siete conceptos para pasar de “publicar y esperar” a diseñar contenido que una persona pueda encontrar, comprender y recordar.</p>
          <div className="cover-actions">
            <Link href={`/conceptos/${concepts[0].slug}`}><Play/> Comenzar la clase</Link>
            <Link className="secondary" href="/practica"><FlaskConical/> Abrir práctica</Link>
          </div>
        </div>
        <div className="cover-map">
          <div className="cover-stat"><strong>7</strong><span>CONCEPTOS<br/>UNA IDEA POR PÁGINA</span></div>
          <div className="search-demo"><Search/><div><small>LA PREGUNTA DE LA CLASE</small><b>¿Cómo lograr que mi contenido aparezca?</b></div><Sparkles/></div>
          <div className="cover-principle"><i/><p><b>EL RETO:</b> hablar con claridad para dos audiencias al mismo tiempo: las personas y las máquinas.</p></div>
        </div>
      </section>
      <section className="route-overview">
        <div><span>RUTA DE ENSEÑANZA</span><h2>Un concepto, una conversación.</h2><p>La práctica se mantiene separada para que puedas decidir en qué momento de la clase abrirla.</p></div>
        <div className="route-grid">{concepts.map((concept) => <Link key={concept.slug} href={`/conceptos/${concept.slug}`}><em>{concept.number}</em><span><small>{concept.eyebrow}</small><b>{concept.title}</b></span><ArrowRight/></Link>)}</div>
      </section>
      <footer className="source-footer"><BookOpenText/><p>Contenido docente adaptado y reorganizado a partir de dos videos de referencia: <a href="https://youtu.be/vK_okaxe8HY" target="_blank" rel="noreferrer">SEO con IA en 2026</a> y <a href="https://youtu.be/acEiInKlG9c" target="_blank" rel="noreferrer">SEO y palabras clave en redes sociales</a>.</p></footer>
    </main>
  );
}
