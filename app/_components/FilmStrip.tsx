"use client";

import React, { useState } from "react";
import { MatImage } from "./MatImage";
import type { MatImageRecord } from "../_lib/mat-image-types";

export type Frame = {
  image: MatImageRecord;
  aspect?: string;
};

type FilmStripProps = {
  rows?: Frame[][];
  images?: Frame[];
  heights?: number[];
  /** Retained for backwards compatibility; no longer wired to scroll. */
  travels?: number[];
};

/**
 * Map a desktop pixel height to a fluid `clamp()` that scales down on small
 * viewports. Capped at the original `px` value on large screens (≥1280) so
 * the existing reel looks identical there. Drops to ~50% of the desktop
 * height on 360px phones so frames are glance-able, not dominant.
 *
 * Solve y = a*vw + b for (360,0.5*px) and (1280,px):
 *   a = (px - 0.5*px) / (1280 - 360) = px * 0.5 / 920 ≈ px * 0.000543 (in vw)
 *   At 1vw on a 100vw viewport, 1vw = 1% of viewport. We want a expressed in
 *   `vw` units, so a per viewport-pixel-percentage. With 0.5px range over
 *   920px range, that's 0.054% of px per vw → ~5.4%*px/100 = 0.054*px in vw.
 *   Simpler: ratio of vw-component = 0.5*px / 920 * 100vw — use plain math.
 */
function fluidHeight(px: number): string {
  const minPx = Math.round(px * 0.5);
  const maxPx = px;
  // Linear between viewport 360 and 1280: vw-coefficient and px-offset.
  // h = (maxPx - minPx) * (vw - 360) / (1280 - 360) + minPx
  //   = (maxPx - minPx)/920 * vw + (minPx - (maxPx - minPx)*360/920)
  const slope = (maxPx - minPx) / 920; // px per 1vw (when vw treated as px)
  const offset = minPx - slope * 360;
  // Express slope in vw: 1vw = 1% viewport. So slope-vw = slope * 100.
  const vwCoef = (slope * 100).toFixed(3);
  const pxOffset = Math.round(offset);
  // CSS clamp's middle term needs calc() to mix vw + px units.
  return `clamp(${minPx}px, calc(${vwCoef}vw + ${pxOffset}px), ${maxPx}px)`;
}

/**
 * Static editorial reel. Originally a scroll-scrubbed parallax strip; the
 * motion was distracting and conflicted with hovers/clicks, so the rows are
 * now anchored — quiet typography-meets-photography, no drift.
 *
 * Each row clips with overflow:hidden and centres around its midpoint so the
 * first and last frames bleed off the edges (still feels editorial without
 * the scrub).
 */
export function FilmStrip({
  rows,
  images,
  heights = [320, 260, 300, 240],
}: FilmStripProps) {
  // Build up to 4 row sets.
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

  return (
    <div
      className="mat-filmstrip"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        overflow: "hidden",
      }}
    >
      {rowSets.map((set, i) => (
        <StaticRow
          key={i}
          images={set.length ? set : rowSets[0]}
          height={heights[i] ?? 320}
        />
      ))}
      <style>{`
        @media (max-width: 767px) {
          .mat-filmstrip { gap: 10px !important; }
          .mat-filmstrip .mat-filmstrip-row { gap: 10px !important; }
        }
      `}</style>
    </div>
  );
}

function StaticRow({ images, height }: { images: Frame[]; height: number }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <div
        className="mat-filmstrip-row"
        style={{
          display: "flex",
          gap: 16,
          width: "max-content",
          // Anchor at -50% so the duplicated track centres in the viewport
          // and the edges bleed off — keeps the cinematic feel without motion.
          transform: "translateX(-50%)",
        }}
      >
        {[...images, ...images].map((img, i) => (
          <FilmFrame key={i} img={img} height={height} />
        ))}
      </div>
    </div>
  );
}

function FilmFrame({ img, height }: { img: Frame; height: number }) {
  const [hov, setHov] = useState(false);
  const aspect = img.aspect ?? "4/3";
  return (
    <figure
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        margin: 0,
        flex: "0 0 auto",
        // Fluid height — caps at the desktop value, scales down to ~55% on phones.
        height: fluidHeight(height),
        aspectRatio: aspect,
        position: "relative",
        overflow: "hidden",
        background: "#0e0e0e",
      }}
    >
      <MatImage
        image={img.image}
        variant="Thumbnail"
        style={{
          objectFit: "cover",
          transform: hov ? "scale(1.04)" : "scale(1)",
          transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
        }}
      />
    </figure>
  );
}
