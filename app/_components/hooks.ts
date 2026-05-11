"use client";

import { useEffect, useRef, useState } from "react";

/** Reveal hook — fires once when target intersects viewport. */
export function useReveal<T extends Element = HTMLDivElement>(
  threshold = 0.15,
  once = true
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);
  return [ref, visible] as const;
}

/** Scroll progress 0..1 of `target` element through the viewport. */
export function useScrollProgress<T extends Element = HTMLDivElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    let raf = 0;
    const tick = () => {
      const t = target.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh; // entered bottom
      const end = -t.height; // left top
      const cur = t.top;
      const prog = (start - cur) / (start - end);
      setP(Math.max(0, Math.min(1, prog)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    tick();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

/** Tilt hook — perspective rotation based on cursor position. */
export function useTilt<T extends HTMLElement = HTMLDivElement>(strength = 6) {
  const ref = useRef<T | null>(null);
  const [transform, setTransform] = useState("perspective(900px)");
  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setTransform(
      `perspective(900px) rotateX(${(-dy * strength).toFixed(2)}deg) rotateY(${(dx * strength).toFixed(2)}deg)`
    );
  };
  const onMouseLeave = () => setTransform("perspective(900px)");
  return [ref, transform, { onMouseMove, onMouseLeave }] as const;
}
