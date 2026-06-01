"use client";

import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { T } from "./tokens";

/**
 * Thin sage hairline at the very top of the viewport that tracks
 * document scroll. Sits above the fixed nav so it reads as page chrome.
 * Honours `prefers-reduced-motion` (skips the spring, just the raw value).
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      // z-index 55 sits ABOVE the fixed nav (z 50) so the hairline shows on
      // top of the blurred nav background, but BELOW the mobile menu overlay
      // (z 60) so opening the menu cleanly covers it.
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: T.sage,
        transformOrigin: "0% 50%",
        scaleX: reduceMotion ? scrollYProgress : scaleX,
        zIndex: 55,
        pointerEvents: "none",
        opacity: 0.85,
      }}
    />
  );
}
