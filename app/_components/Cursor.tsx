"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { T } from "./tokens";

/**
 * Custom sage cursor. Small dot follows the mouse on fine-pointer devices.
 * When the user hovers an element with a `data-cursor="..."` attribute (or
 * any anchor without one), the dot expands and shows contextual label text.
 *
 * Native cursor is hidden via CSS (globals.css) on devices with hover/fine-
 * pointer. Touch devices fall back to the native cursor (this component
 * unmounts itself).
 */
export function Cursor() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);

  // Lightly damped spring — calm trailing motion, no jitter.
  const xs = useSpring(x, { damping: 30, stiffness: 420, mass: 0.45 });
  const ys = useSpring(y, { damping: 30, stiffness: 420, mass: 0.45 });

  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const tagged = target.closest("[data-cursor]") as HTMLElement | null;
      if (tagged) {
        const text = tagged.getAttribute("data-cursor");
        setLabel(text && text.length > 0 ? text : null);
        return;
      }
      const link = target.closest("a, button");
      if (link) {
        // Default label for any anchor or button that didn't set its own.
        setLabel("");
        return;
      }
      setLabel(null);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [enabled, visible, x, y]);

  if (!enabled) return null;

  const expanded = label !== null;
  const hasText = expanded && label !== "";
  const size = hasText ? 88 : expanded ? 28 : 10;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x: xs,
        y: ys,
        pointerEvents: "none",
        zIndex: 9999,
        translateX: "-50%",
        translateY: "-50%",
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease",
      }}
    >
      <motion.div
        animate={{
          width: size,
          height: size,
          backgroundColor: T.sage,
        }}
        transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
        style={{
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          textAlign: "center",
          padding: hasText ? 10 : 0,
          lineHeight: 1.2,
          willChange: "width, height",
          // White ring keeps the dot visible against same-color (sage)
          // backgrounds; sage drop-shadow gives lift on light paper bg.
          boxShadow: expanded
            ? "0 0 0 1px rgba(255,255,255,0.65), 0 10px 30px rgba(67,108,103,0.32)"
            : "0 0 0 1px rgba(255,255,255,0.65), 0 2px 8px rgba(67,108,103,0.28)",
        }}
      >
        {hasText ? label : null}
      </motion.div>
    </motion.div>
  );
}
