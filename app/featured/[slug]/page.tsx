import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FEATURED } from "../../_components/data";
import { JsonLd } from "../../_components/JsonLd";
import { FeaturedSlugClient } from "../../_pages/FeaturedSlugClient";
import { breadcrumbJsonLd, pageMetadata } from "../../_lib/seo";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return FEATURED.map((c) => ({ slug: c.slug ?? "" })).filter((p) => p.slug);
}

const descriptions: Record<string, string> = {
  "anvesha-sang-omkar":
    "Anvesha and Omkar's wedding at Fairmont Jaipur, documented through honest family moments, refined portraiture, and a cinematic wedding film.",
  "shrenik-sang-ishika":
    "Ishika and Shrenik's Fairmont Jaipur wedding story, photographed with a documentary eye across intimate rituals and palace celebrations.",
  "riya-sang-mohit":
    "Riya and Mohit's Jaibagh Palace wedding in Jaipur—a fourteen-year love story preserved through candid photographs and a cinematic film.",
  "harsh-sang-joyeeta":
    "Joyeeta and Harsh's Bengali–UP wedding story, where two family traditions meet in a joyful documentary photography and film collection.",
  "shubham-sang-aishwarya":
    "Aishwarya and Shubham's wedding at Chokhi Dhani, Jaipur, documented from colourful daytime celebrations through their evening and wedding rituals.",
  "varun-sang-vanya":
    "Vanya and Varun's wedding at Anantara Jaipur Resort, preserved through elegant portraits, honest moments, and an editorial wedding story.",
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const couple = FEATURED.find((c) => c.slug === slug);
  if (!couple) return { title: "Featured · Mi Amor Tales" };
  const bride = couple.brideName ?? couple.bride;
  const groom = couple.groomName ?? couple.groom;
  return pageMetadata({
    title: `${bride} & ${groom} Wedding — ${couple.place}`,
    description:
      descriptions[slug] ??
      `${bride} and ${groom}'s wedding story in ${couple.place}, photographed and filmed by Mi Amor Tales.`,
    path: `/featured/${slug}`,
  });
}

export default async function FeaturedSlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const index = FEATURED.findIndex((c) => c.slug === slug);
  if (index === -1) notFound();
  const couple = FEATURED[index];
  const bride = couple.brideName ?? couple.bride;
  const groom = couple.groomName ?? couple.groom;
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Featured", path: "/featured" },
          { name: `${bride} & ${groom}`, path: `/featured/${slug}` },
        ])}
      />
      <FeaturedSlugClient couple={couple} index={index} />
    </>
  );
}
