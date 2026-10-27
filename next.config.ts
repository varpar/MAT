import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/featured/harsh-sang-pooja",
        destination: "/featured/shrenik-sang-ishika",
        permanent: true,
      },
    ];
  },
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
