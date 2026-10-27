import type { Metadata } from "next";
import { HomeClient } from "./_pages/HomeClient";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from "./_lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  title: { absolute: DEFAULT_TITLE },
};

export default function HomePage() {
  return <HomeClient />;
}
