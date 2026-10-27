import type { MetadataRoute } from "next";
import { FEATURED } from "./_components/data";
import { absoluteUrl } from "./_lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-26T00:00:00+05:30");
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/featured"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/weddings"), lastModified: updated, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/tales"), lastModified: updated, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: updated, changeFrequency: "yearly", priority: 0.7 },
  ];

  const stories: MetadataRoute.Sitemap = FEATURED.flatMap((couple) =>
    couple.slug
      ? [
          {
            url: absoluteUrl(`/featured/${couple.slug}`),
            lastModified: updated,
            changeFrequency: "yearly" as const,
            priority: 0.8,
            images: [absoluteUrl(couple.img.publicId)],
          },
        ]
      : [],
  );

  return [...staticPages, ...stories];
}
