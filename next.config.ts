import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the multi-lockfile warning by pinning the Turbopack root to this
  // project. (We have a stray package-lock.json one level up.)
  turbopack: {
    root: __dirname,
  },
  images: {
    // Allow next/image to optimise Unsplash placeholders while we develop.
    // When the client provides real assets we will host them under /public
    // and switch to local paths.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
