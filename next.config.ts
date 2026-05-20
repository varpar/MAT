import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the multi-lockfile warning by pinning the Turbopack root to this
  // project. (We have a stray package-lock.json one level up.)
  turbopack: {
    root: __dirname,
  },
  images: {
    // Photos live in /public/images/ and are optimised by Next's built-in
    // image pipeline (Vercel image optimiser in production). It produces
    // AVIF/WebP variants at the breakpoints below and caches them at the
    // edge for the configured TTL.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31_536_000,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
