import { notFound } from 'next/navigation';
import { ConceptDeck } from '@/app/components/concept-deck';
import { concepts, getConcept } from '@/lib/course-data';

export function generateStaticParams() {
  return concepts.map(({ slug }) => ({ slug }));
}

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const concept = getConcept(slug);
  if (!concept) notFound();
  return <ConceptDeck concept={concept} />;
}
