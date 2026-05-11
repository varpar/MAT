"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

export type Frame = {
  src: string;
  aspect?: string;
};

type RowProps = {
  images: Frame[];
  height: number;
  direction: "left" | "right";
  /** Smoothed 0..1 scroll progress driving the row. */
  progress: MotionValue<number>;
  /** Travel multiplier — controls how far the row drifts across the viewport. */
  travel?: number;
};

/**
 * A single scroll-scrubbed row. The track is duplicated so the visible window
 * always has frames in it. We translate from one half-width to the other —
 * direction "left" moves the row leftward as the user scrolls down,
 * "right" moves it rightward.
 */
function ScrubRow({
  images,
  height,
  direction,
  progress,
  travel = 1,
}: RowProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Gentle drift. Total stroke = `travel` × ~14% of the track width — small
  // enough that it reads as quiet parallax, not racing imagery.
  // Both directions are anchored around -50% (the seamless-loop midpoint),
  // moving symmetrically by ±half-range so no row ever exposes its edge.
  const range = travel * 14; // percent — keep ≤ 20 to stay luxurious
  const half = range / 2;
  const startPct = direction === "left" ? -50 + half : -50 - half;
  const endPct = direction === "left" ? -50 - half : -50 + half;

  const x = useTransform(
    progress,
    [0, 1],
    [`${startPct}%`, `${endPct}%`]
  );

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <motion.div
        ref={trackRef}
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          x,
          willChange: "transform",
        }}
      >
        {[...images, ...images].map((img, i) => {
          const aspect = img.aspect ?? "4/3";
          return (
            <figure
              key={i}
              style={{
                margin: 0,
                flex: "0 0 auto",
                height,
                aspectRatio: aspect,
                position: "relative",
                overflow: "hidden",
                background: "#0e0e0e",
              }}
            >
              <img
                src={img.src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.04)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
              />
            </figure>
          );
        })}
      </motion.div>
    </div>
  );
}

type FilmStripProps = {
  rows?: Frame[][];
  images?: Frame[];
  heights?: number[];
  /** Per-row travel multiplier — rows drift at slightly different rates. */
  travels?: number[];
};

/**
 * Four-row scroll-scrubbed cinematic reel. Rows alternate direction and
 * each one drifts at a slightly different rate, all driven by the same
 * scroll progress smoothed through a spring for a buttery scrub.
 *
 *   Row 1: left  ←  drifts as scroll increases
 *   Row 2: right →
 *   Row 3: left  ←
 *   Row 4: right →
 */
export function FilmStrip({
  rows,
  images,
  heights = [320, 260, 300, 240],
  travels = [1.0, 1.25, 0.85, 1.4],
}: FilmStripProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Build 4 row sets.
  const rowSets: Frame[][] = (() => {
    if (rows && rows.length > 0) {
      const r = [...rows];
      while (r.length < 4) r.push(r[r.length - 1]);
      return r.slice(0, 4);
    }
    const flat = images ?? [];
    if (flat.length === 0) return [[], [], [], []];
    return [0, 1, 2, 3].map((idx) => flat.filter((_, i) => i % 4 === idx));
  })();

  // Raw scroll progress through the section (0 when section enters bottom of
  // viewport, 1 when its bottom leaves the top).
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth the progress with a spring — this is the "scrub" feel.
  // Tighter stiffness = snappier follow; lower damping = more glide.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 22,
    mass: 0.4,
  });

  // If the user prefers reduced motion, freeze every row at the midpoint
  // by piping through a constant value.
  const progress = reduceMotion ? scrollYProgress : smooth;

  const directions: ("left" | "right")[] = ["left", "right", "left", "right"];

  return (
    <div
      ref={sectionRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        overflow: "hidden",
      }}
    >
      {rowSets.map((set, i) => (
        <ScrubRow
          key={i}
          images={set.length ? set : rowSets[0]}
          height={heights[i] ?? 320}
          direction={directions[i]}
          progress={progress}
          travel={travels[i] ?? 1}
        />
      ))}
    </div>
  );
}
