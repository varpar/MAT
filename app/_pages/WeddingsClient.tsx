"use client";

import React, { useMemo, useState } from "react";
import { SERIF, SANS, T } from "../_components/tokens";
import { useReveal } from "../_components/hooks";
import { FEATURED, MAT_IMAGES, type Couple } from "../_components/data";
import { MatImage } from "../_components/MatImage";
import type { MatImageRecord } from "../_lib/mat-image-types";

const ARCHIVE_FILTERS = ["All", "Bride", "Couple", "B&W", "Party", "Venue"] as const;

type Frame = {
  img: MatImageRecord;
  couple: Couple;
  ratio: number; // width / height — controls grid span
  filter: (typeof ARCHIVE_FILTERS)[number][];
};

const FRAMES: Frame[] = (() => {
  const couples = FEATURED;
  const base = [
    { img: MAT_IMAGES.couple1, ratio: 3 / 4, filter: ["Couple"] },
    { img: MAT_IMAGES.bride1, ratio: 3 / 4, filter: ["Bride"] },
    { img: MAT_IMAGES.detail3, ratio: 4 / 3, filter: ["Venue"] },
    { img: MAT_IMAGES.couple2, ratio: 4 / 3, filter: ["Couple"] },
    { img: MAT_IMAGES.bride2, ratio: 3 / 4, filter: ["Bride"] },
    { img: MAT_IMAGES.sangeet, ratio: 4 / 3, filter: ["Party"] },
    { img: MAT_IMAGES.bride3, ratio: 3 / 4, filter: ["Bride", "B&W"] },
    { img: MAT_IMAGES.detail1, ratio: 1, filter: ["Venue"] },
    { img: MAT_IMAGES.couple3, ratio: 4 / 3, filter: ["Couple"] },
    { img: MAT_IMAGES.detail5, ratio: 1, filter: ["Venue"] },
    { img: MAT_IMAGES.haldi, ratio: 4 / 3, filter: ["Party"] },
    { img: MAT_IMAGES.mehendi, ratio: 3 / 4, filter: ["B&W"] },
    { img: MAT_IMAGES.detail7, ratio: 4 / 3, filter: ["Venue"] },
    { img: MAT_IMAGES.detail2, ratio: 3 / 4, filter: ["Couple"] },
    { img: MAT_IMAGES.detail4, ratio: 4 / 3, filter: ["B&W"] },
    { img: MAT_IMAGES.pheras, ratio: 3 / 4, filter: ["Couple"] },
  ] as const;
  return base.map((f, i) => ({
    img: f.img,
    couple: couples[i % couples.length],
    ratio: f.ratio,
    filter: [...(f.filter as readonly (typeof ARCHIVE_FILTERS)[number][])],
  }));
})();

function FrameTile({
  f,
  idx,
  visible,
}: {
  f: Frame;
  idx: number;
  visible: boolean;
}) {
  const [hov, setHov] = useState(false);
  const isBW = f.filter.includes("B&W");
  return (
    <figure
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        margin: 0,
        gridColumn: f.ratio >= 1.2 ? "span 2" : "span 1",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1s cubic-bezier(.2,.7,.2,1) ${(idx % 8) * 0.05}s, transform 1s cubic-bezier(.2,.7,.2,1) ${(idx % 8) * 0.05}s`,
      }}
    >
      <div
        style={{
          aspectRatio: `${f.ratio}`,
          overflow: "hidden",
          background: "#222",
        }}
      >
        <MatImage
          image={f.img}
          variant="Polaroid"
          alt={`${f.couple.bride} sang ${f.couple.groom}`}
          filter={isBW ? "grayscale(1)" : "grayscale(0)"}
          style={{
            objectFit: "cover",
            transform: hov ? "scale(1.03)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <figcaption
        style={{
          marginTop: 12,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 14,
          lineHeight: 1.4,
          opacity: hov ? 1 : 0.7,
          transition: "opacity 250ms ease",
        }}
      >
        {f.couple.bride}{" "}
        <span style={{ color: T.sage, fontSize: 12 }}>sang</span>{" "}
        {f.couple.groom}
        <span
          style={{
            marginLeft: 10,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.55,
            fontStyle: "normal",
          }}
        >
          — {f.couple.place}
        </span>
      </figcaption>
    </figure>
  );
}

export function WeddingsClient() {
  const [filter, setFilter] = useState<(typeof ARCHIVE_FILTERS)[number]>("All");
  const [ref, vis] = useReveal<HTMLElement>(0.02);

  const frames = useMemo(() => {
    if (filter === "All") return FRAMES;
    return FRAMES.filter((f) => f.filter.includes(filter));
  }, [filter]);

  return (
    <main>
      <section
        style={{
          padding: "180px 40px 60px",
          background: T.paper,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 32,
          }}
        >
          The Full Archive — 218 Frames — Eight Years
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(56px, 9vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            maxWidth: 1080,
            marginInline: "auto",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Every wedding</span>
          <span style={{ color: T.sage }}>,</span> kept whole
          <span style={{ color: T.sage }}>.</span>
        </h1>
      </section>

      {/* Filter row — typographic only, no pills */}
      <div
        style={{
          position: "sticky",
          top: 72,
          zIndex: 10,
          padding: "20px 40px",
          background: "rgba(250,250,247,0.92)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderTop: `1px solid ${T.ink}10`,
          borderBottom: `1px solid ${T.ink}10`,
          display: "flex",
          justifyContent: "center",
          gap: 32,
          flexWrap: "wrap",
        }}
      >
        {ARCHIVE_FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                fontWeight: active ? 500 : 400,
                color: T.ink,
                opacity: active ? 1 : 0.55,
                borderBottom: active
                  ? `1px solid ${T.sage}`
                  : "1px solid transparent",
                transition: "opacity 250ms ease, border-color 250ms ease",
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <section
        ref={ref as React.RefObject<HTMLElement>}
        style={{ padding: "60px 40px 160px", background: T.paper }}
      >
        <div
          className="mat-archive-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            alignItems: "start",
          }}
        >
          {frames.map((f, i) => (
            <FrameTile
              key={`${filter}-${i}`}
              f={f}
              idx={i}
              visible={vis}
            />
          ))}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: 80,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            opacity: 0.55,
          }}
        >
          End of selection — 200 more in the archive
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-archive-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
          @media (max-width: 720px) {
            .mat-archive-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .mat-archive-grid > * { grid-column: span 1 !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
