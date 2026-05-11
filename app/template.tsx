"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

/**
 * Route transition — Next.js App Router re-renders `template.tsx` on every
 * navigation (unlike `layout.tsx`), so we use it to mount each page fresh
 * and play an entrance animation. The effect is a quiet "album page turn":
 * the incoming page fades up slightly while a sage hairline sweeps across
 * the top edge.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion() ?? false;
  return (
    <motion.div
      key={pathname}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reduce ? 0.2 : 0.8,
        ease: [0.2, 0.7, 0.2, 1],
      }}
    >
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "#436c67",
            opacity: 0.45,
            transformOrigin: "0% 50%",
            zIndex: 70,
            pointerEvents: "none",
          }}
        />
      )}
      {children}
    </motion.div>
  );
}
