import type { Metadata } from "next";
import { FeaturedIndexClient } from "../_pages/FeaturedIndexClient";
import { JsonLd } from "../_components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Featured Wedding Films & Stories",
  description:
    "Explore documentary wedding films and editorial photo stories by Mi Amor Tales, photographed in Jaipur and destination venues across India.",
  path: "/featured",
});

export default function FeaturedIndexPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Featured", path: "/featured" },
        ])}
      />
      <FeaturedIndexClient />
    </>
  );
}
