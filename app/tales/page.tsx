import type { Metadata } from "next";
import { TalesClient } from "../_pages/TalesClient";
import { JsonLd } from "../_components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Real Wedding Stories & Albums",
  description:
    "Read six real wedding stories and explore their complete photo albums, documented with an editorial and emotionally honest approach.",
  path: "/tales",
});

export default function TalesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tales", path: "/tales" },
        ])}
      />
      <TalesClient />
    </>
  );
}
