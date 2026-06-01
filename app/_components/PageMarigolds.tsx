"use client";

import React from "react";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { Marigold } from "./Marigold";
import { T } from "./tokens";

/** Routes that render the editorial paper hero — marigolds belong here. */
const MARIGOLD_PATHS = new Set<string>([
  "/about",
  "/weddings",
  "/tales",
  "/contact",
]);

function showFor(pathname: string | null): boolean {
  if (!pathname) return false;
  return MARIGOLD_PATHS.has(pathname);
}

/**
 * Decorative marigolds flanking the hero region. Rendered at the layout
 * level (outside the PageTransition fade wrapper) so they remain on screen
 * while page content fades in and out. Position is ABSOLUTE (not fixed), so
 * they scroll with the page just like the hero content — they're decorative
 * flanking, not a persistent overlay. Opacity fades on path change so they
 * gracefully disappear when navigating to non-editorial pages (home, slug).
 */
export function PageMarigolds() {
  const pathname = usePathname();
  const show = showFor(pathname);

  // Absolute positioning anchored to the document, ~28vh below the top.
  // That lands them next to the hero on initial paint; as the user scrolls
  // they leave the viewport naturally with the rest of the page.
  const base: React.CSSProperties = {
    position: "absolute",
    top: "28vh",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 1,
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="mat-page-marigold"
        animate={{ opacity: show ? 0.18 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ ...base, left: -260 }}
      >
        <Marigold size={520} color={T.sage} />
      </motion.div>
      <motion.div
        aria-hidden
        className="mat-page-marigold"
        animate={{ opacity: show ? 0.18 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ ...base, right: -260 }}
      >
        <Marigold size={520} color={T.sage} />
      </motion.div>
      {/* Decorative — hide on small screens; they dominate the viewport and
         compete with content. Body is already position:relative so absolute
         positioning is clipped, but we still want them gone on phones. */}
      <style>{`
        @media (max-width: 880px) {
          .mat-page-marigold { display: none !important; }
        }
      `}</style>
    </>
  );
}
