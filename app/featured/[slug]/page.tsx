import { notFound } from "next/navigation";
import { FEATURED } from "../../_components/data";
import { FeaturedSlugClient } from "../../_pages/FeaturedSlugClient";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return FEATURED.map((c) => ({ slug: c.slug ?? "" })).filter((p) => p.slug);
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const couple = FEATURED.find((c) => c.slug === slug);
  if (!couple) return { title: "Featured · Mi Amor Tales" };
  return {
    title: `${couple.bride} sang ${couple.groom} · Mi Amor Tales`,
    description: `${couple.bride} sang ${couple.groom} — three days in ${couple.place}, photographed by Mi Amor Tales.`,
  };
}

export default async function FeaturedSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const index = FEATURED.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const couple = FEATURED[index];
  return <FeaturedSlugClient couple={couple} index={index} />;
}
