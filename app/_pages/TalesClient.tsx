"use client";

import React, { useState } from "react";
import { SERIF, SANS, T } from "../_components/tokens";
import { MAT_IMAGES } from "../_components/data";
import { MatImage } from "../_components/MatImage";
import { Sep, withSeps } from "../_components/Punc";
import type { MatImageRecord } from "../_lib/mat-image-types";

type Post = {
  cat: string;
  title: string;
  date: string;
  img: MatImageRecord;
  read: string;
};

const POSTS: Post[] = [
  {
    cat: "Behind the Lens",
    title:
      "Photographing the Vidaai — and the eight seconds that ruin most of them",
    date: "Mar 2026",
    img: MAT_IMAGES.vidaai,
    read: "7 min",
  },
  {
    cat: "Venue Guides",
    title: "Five winter venues in Rajasthan we keep returning to",
    date: "Feb 2026",
    img: MAT_IMAGES.detail2,
    read: "12 min",
  },
  {
    cat: "Wedding Tips",
    title: "A short letter to the bride who wants no posed photographs",
    date: "Feb 2026",
    img: MAT_IMAGES.bride3,
    read: "5 min",
  },
  {
    cat: "Real Stories",
    title: "On photographing a 200-year-old haveli wedding by candlelight",
    date: "Jan 2026",
    img: MAT_IMAGES.detail4,
    read: "9 min",
  },
  {
    cat: "Behind the Lens",
    title: "Why we shoot the Haldi on film, and only the Haldi",
    date: "Jan 2026",
    img: MAT_IMAGES.haldi,
    read: "4 min",
  },
  {
    cat: "Wedding Tips",
    title: "A timeline that gives the bride time to actually eat",
    date: "Dec 2025",
    img: MAT_IMAGES.couple2,
    read: "6 min",
  },
];

const CATEGORIES = [
  "All Tales",
  "Behind the Lens",
  "Venue Guides",
  "Wedding Tips",
  "Real Stories",
] as const;

function TaleCard({ p }: { p: Post }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ cursor: "pointer" }}
    >
      <div style={{ aspectRatio: "3/2", overflow: "hidden", background: "#222", position: "relative" }}>
        <MatImage
          image={p.img}
          variant="Grid"
          alt=""
          style={{
            objectFit: "cover",
            transform: hov ? "scale(1.03)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 18,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: T.sage,
        }}
      >
        {p.cat}<Sep />{p.date}
      </div>
      <h3
        style={{
          margin: "10px 0 0",
          fontFamily: SERIF,
          fontWeight: 300,
          fontSize: 22,
          lineHeight: 1.25,
          fontStyle: "italic",
        }}
      >
        {withSeps(p.title)}
      </h3>
      <div
        style={{
          marginTop: 14,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: 0.55,
        }}
      >
        {p.read} read · Continue →
      </div>
    </article>
  );
}

export function TalesClient() {
  const [filter, setFilter] = useState<string>("All Tales");
  const featured = POSTS[0];
  const grid = (
    filter === "All Tales" ? POSTS.slice(1) : POSTS.filter((p) => p.cat === filter)
  );
  return (
    <main>
      <section
        style={{
          padding: "180px 40px 60px",
          background: T.paper,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
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
            position: "relative",
            zIndex: 1,
          }}
        >
          The Tales Journal<Sep />Issue No. 24
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
            position: "relative",
            zIndex: 1,
            textWrap: "balance",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Tales</span> we tell
          <br />
          when the camera is down
          <span style={{ color: T.sage }}>.</span>
        </h1>
      </section>

      {/* Featured tale */}
      <section
        className="mat-tale-feat"
        style={{
          padding: "40px 40px 100px",
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          gap: 40,
        }}
      >
        <div
          style={{
            aspectRatio: "4/3",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
          }}
        >
          <MatImage image={featured.img} variant="Grid" alt="" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 18,
            }}
          >
            Featured Tale<Sep />{featured.cat}<Sep />{featured.date}<Sep />{featured.read}
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(28px, 3.5vw, 40px)",
              lineHeight: 1.15,
              fontStyle: "italic",
            }}
          >
            {withSeps(featured.title)}
          </h2>
          <p
            style={{
              marginTop: 22,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.6,
              opacity: 0.78,
              maxWidth: 480,
            }}
          >
            The Vidaai is the hardest ceremony to photograph and the easiest to ruin. A
            short essay on what we look for, and what we deliberately miss.
          </p>
          <div
            style={{
              marginTop: 28,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              borderBottom: `1px solid ${T.ink}`,
              paddingBottom: 4,
              alignSelf: "flex-start",
            }}
          >
            Read the tale →
          </div>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .mat-tale-feat { grid-template-columns: 1fr !important; gap: 24px !important; }
          }
        `}</style>
      </section>

      {/* Categories + grid */}
      <section style={{ padding: "0 40px 160px", background: T.paper }}>
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            marginBottom: 48,
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "4px 0",
                  cursor: "pointer",
                  fontFamily: SANS,
                  fontSize: 11,
                  letterSpacing: "0.28em",
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
                {c}
              </button>
            );
          })}
        </div>
        <div
          className="mat-tale-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 40,
          }}
        >
          {grid.map((p, i) => (
            <TaleCard key={`${filter}-${i}`} p={p} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-tale-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .mat-tale-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
