import type { Metadata } from "next";
import { AboutClient } from "../_pages/AboutClient";
import { JsonLd } from "../_components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About Our Jaipur Wedding Photography Studio",
  description:
    "Meet the founders and team behind Mi Amor Tales, a Jaipur wedding photography studio preserving honest emotion through documentary and editorial imagery.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <AboutClient />
    </>
  );
}
