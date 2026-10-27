import type { Metadata } from "next";
import { ContactClient } from "../_pages/ContactClient";
import { JsonLd } from "../_components/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "../_lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Wedding Photography Enquiries",
  description:
    "Contact Mi Amor Tales for wedding photography and film enquiries in Jaipur and destination venues across India. Share your date, city, and celebration plans.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactClient />
    </>
  );
}
