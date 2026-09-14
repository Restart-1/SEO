import { notFound } from 'next/navigation';
import { ConceptDeck } from '@/app/components/concept-deck';
import { getPresentationPage, presentationPages } from '@/lib/course-data';

export function generateStaticParams() {
  return presentationPages.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export default async function ConceptPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPresentationPage(slug);
  if (!page) notFound();
  return <ConceptDeck concept={page.concept} view={page.view} pageSlug={page.slug} />;
}
