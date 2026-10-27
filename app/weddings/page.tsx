import type { Metadata } from "next";
import { WeddingsClient } from "../_pages/WeddingsClient";
import { JsonLd } from "../_components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Indian Wedding Photography Portfolio",
  description:
    "Explore documentary and editorial Indian wedding photography by Mi Amor Tales, captured in Jaipur and destination venues across India.",
  path: "/weddings",
});

export default function WeddingsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Weddings", path: "/weddings" },
        ])}
      />
      <WeddingsClient />
    </>
  );
}
