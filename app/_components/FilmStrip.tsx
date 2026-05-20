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
    </div>
  );
}

function StaticRow({ images, height }: { images: Frame[]; height: number }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <div
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
        height,
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
