import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mi Amor Tales — Wedding Photography & Films",
    short_name: "Mi Amor Tales",
    description:
      "Documentary wedding photography and cinematic films from Jaipur, India.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f3ee",
    theme_color: "#4b756e",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
