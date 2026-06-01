"use client";

import React, { useMemo, useState } from "react";
import { SERIF, SANS, BODY, T } from "../_components/tokens";
import { Sep } from "../_components/Punc";
import { Sang } from "../_components/Sang";
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
  // Uniform grid — every tile is the same aspect, no offset, no masonry
  // stagger. The grid container handles spacing via its `gap`.
  return (
    <figure
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="mat-archive-tile"
      style={{
        margin: 0,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 1s cubic-bezier(.2,.7,.2,1) ${(idx % 8) * 0.05}s, transform 1s cubic-bezier(.2,.7,.2,1) ${(idx % 8) * 0.05}s`,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "4/5",
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
          marginTop: 10,
          fontFamily: BODY,
          fontStyle: "italic",
          fontSize: 15,
          lineHeight: 1.4,
          opacity: hov ? 1 : 0.7,
          transition: "opacity 250ms ease",
        }}
      >
        {f.couple.bride}{" "}
        <Sang size={13} />{" "}
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
          <Sep />{f.couple.place}
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
        className="mat-weddings-hero"
        style={{
          padding: "180px 40px 60px",
          background: T.paper,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="mat-weddings-eyebrow"
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 32,
            position: "relative",
            zIndex: 1,
          }}
        >
          The Full Archive<Sep />218 Frames<Sep />Eight Years
        </div>
        <h1
          className="mat-weddings-h1"
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(40px, 9vw, 96px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            maxWidth: 1080,
            marginInline: "auto",
            position: "relative",
            zIndex: 1,
            textWrap: "balance",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Weddings</span>
          <span style={{ color: T.sage }}>,</span> documented
          <span style={{ color: T.sage }}>.</span>
          <br className="mat-weddings-h1-br" />{" "}
          Not directed
          <span style={{ color: T.sage }}>.</span>
        </h1>
      </section>

      {/* Filter row — light editorial, typographic only, no colored band */}
      <div
        className="mat-archive-filter-bar"
        style={{
          position: "sticky",
          top: 72,
          zIndex: 10,
          padding: "18px 40px",
          background: T.paper,
          borderBottom: `1px solid rgba(26,26,26,0.12)`,
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
              className="mat-archive-filter-btn"
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
                color: active ? T.ink : "rgba(26,26,26,0.5)",
                borderBottom: active
                  ? `1px solid ${T.sage}`
                  : "1px solid transparent",
                transition: "color 250ms ease, border-color 250ms ease",
                whiteSpace: "nowrap",
                minHeight: 44,
              }}
            >
              {f}
            </button>
          );
        })}
      </div>

      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="mat-archive-section"
        style={{ padding: "40px 16px 140px", background: T.paper }}
      >
        <div
          className="mat-archive-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
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
          className="mat-archive-endnote"
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
          End of selection<Sep />200 more in the archive
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-archive-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .mat-weddings-hero { padding: 140px 24px 48px !important; }
            .mat-archive-filter-bar { padding: 16px 24px !important; gap: 24px !important; }
            .mat-archive-section { padding: 32px 12px 120px !important; }
          }
          @media (max-width: 720px) {
            /* Horizontal-scroll filter bar — keeps all 6 filters reachable
               without shrinking type. Sticky bar still respects top:72. */
            .mat-archive-filter-bar {
              justify-content: flex-start !important;
              flex-wrap: nowrap !important;
              overflow-x: auto !important;
              -webkit-overflow-scrolling: touch !important;
              scrollbar-width: none !important;
              gap: 24px !important;
              padding: 14px 20px !important;
              scroll-snap-type: x proximity;
            }
            .mat-archive-filter-bar::-webkit-scrollbar { display: none; }
            .mat-archive-filter-btn { scroll-snap-align: start; }
          }
          @media (max-width: 600px) {
            .mat-archive-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
            .mat-weddings-hero { padding: 120px 20px 40px !important; }
            .mat-weddings-eyebrow { margin-bottom: 24px !important; }
            /* Same fix as Tales — the <br /> creates a tiny first line on
               small phones. Let the headline wrap on its own. */
            .mat-weddings-h1-br { display: none !important; }
            .mat-weddings-h1 {
              font-size: clamp(36px, 11vw, 56px) !important;
              line-height: 1.02 !important;
            }
            .mat-archive-section { padding: 28px 16px 96px !important; }
            /* Ensure first tile clears the sticky filter bar comfortably. */
            .mat-archive-section { scroll-margin-top: 120px; }
            .mat-archive-endnote { margin-top: 56px !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
