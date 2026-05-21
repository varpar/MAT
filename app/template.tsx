"use client";

import React from "react";

/**
 * Next.js App Router re-mounts `template.tsx` on every navigation. We let
 * `<PageTransition>` in layout.tsx own the page fade — this template just
 * passes children through with no animation of its own.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
