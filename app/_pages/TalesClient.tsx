"use client";

import React, { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SERIF, SANS, BODY, T } from "../_components/tokens";
import { MAT_IMAGES } from "../_components/data";
import { MatImage } from "../_components/MatImage";
import { Sep, withSeps } from "../_components/Punc";
import type { MatImageRecord } from "../_lib/mat-image-types";

const EASE = [0.2, 0.7, 0.2, 1] as const;

type Post = {
  cat: string;
  title: string;
  date: string;
  img: MatImageRecord;
  read: string;
  /** Editorial lede — italic pull-quote line that opens the entry. */
  lede: string;
  /** Story prose paragraph beneath the lede. */
  body: string;
};

const POSTS: Post[] = [
  {
    cat: "Behind the Lens",
    title:
      "Photographing the Vidaai — and the eight seconds that ruin most of them",
    date: "Mar 2026",
    img: MAT_IMAGES.vidaai,
    read: "7 min",
    lede: "The Vidaai is the hardest ceremony to photograph and the easiest to ruin.",
    body: "A short essay on what we look for and what we deliberately miss — the held breath before the doorway, the father who turns away, the second the rice leaves her hand. We have learned that the frame you do not take is often the kindest one you can offer.",
  },
  {
    cat: "Venue Guides",
    title: "Five winter venues in Rajasthan we keep returning to",
    date: "Feb 2026",
    img: MAT_IMAGES.detail2,
    read: "12 min",
    lede: "Some courtyards hold the light long after the music has stopped.",
    body: "From the lake-facing terraces of Udaipur to the sandstone forts of Jaisalmer, these are the rooms where a December morning turns gold and a photograph almost makes itself. A field guide written from behind the camera.",
  },
  {
    cat: "Wedding Tips",
    title: "A short letter to the bride who wants no posed photographs",
    date: "Feb 2026",
    img: MAT_IMAGES.bride3,
    read: "5 min",
    lede: "You asked us not to make you pose. We have never been more relieved.",
    body: "The most honest pictures arrive when no one is asked to perform. Here is how we work the room so quietly that you forget we are there — and why that single decision changes everything you will keep.",
  },
  {
    cat: "Real Stories",
    title: "On photographing a 200-year-old haveli wedding by candlelight",
    date: "Jan 2026",
    img: MAT_IMAGES.detail4,
    read: "9 min",
    lede: "There was no electricity that night, and we were grateful for it.",
    body: "Two hundred candles, a courtyard older than the country, and a family that had married within those walls for six generations. We shot it the way it was meant to be lived — slow, warm, and entirely by flame.",
  },
  {
    cat: "Behind the Lens",
    title: "Why we shoot the Haldi on film, and only the Haldi",
    date: "Jan 2026",
    img: MAT_IMAGES.haldi,
    read: "4 min",
    lede: "Turmeric forgives digital nothing. Film forgives it everything.",
    body: "The Haldi is colour at its most reckless, and film is the only thing that holds that yellow without screaming. We load a single roll for this one ceremony, and only this one, every single time.",
  },
  {
    cat: "Wedding Tips",
    title: "A timeline that gives the bride time to actually eat",
    date: "Dec 2025",
    img: MAT_IMAGES.couple2,
    read: "6 min",
    lede: "A wedding day is long. We build ours around the small mercies.",
    body: "Twenty quiet minutes before the guests arrive, a plate that does not go cold, a moment alone with your mother. The photographs are better for it — but mostly the day is.",
  },
];

const CATEGORIES = [
  "All Tales",
  "Behind the Lens",
  "Venue Guides",
  "Wedding Tips",
  "Real Stories",
] as const;

/** Derive a stable URL slug from a story title. */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/—/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ─────────────────────────────────────────────────────────────
   STORY ENTRY — a single full-width editorial article in the
   single-column story-stream. Fade-up reveal on scroll, gentle
   image scale on hover. The lead entry runs slightly larger to
   anchor the page.
   ───────────────────────────────────────────────────────────── */
function StoryEntry({
  p,
  lead,
  reduceMotion,
}: {
  p: Post;
  lead: boolean;
  reduceMotion: boolean | null;
}) {
  const [hov, setHov] = useState(false);

  const initial = reduceMotion ? false : { opacity: 0, y: 30 };

  return (
    <motion.article
      initial={initial}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 1, ease: EASE }}
    >
      {/* Non-navigating container: detail pages (/tales/[slug]) don't exist
          yet, so the entry reads inline rather than linking to a 404. */}
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: "block", color: "inherit" }}
      >
        {/* Meta line */}
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: lead ? 22 : 18,
          }}
        >
          {lead ? (
            <>
              Featured Tale<Sep />
              {p.cat}
              <Sep />
              {p.date}
              <Sep />
              {p.read} read
            </>
          ) : (
            <>
              {p.cat}
              <Sep />
              {p.date}
              <Sep />
              {p.read} read
            </>
          )}
        </div>

        {/* Title */}
        <h2
          className="mat-tale-title"
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: lead
              ? "clamp(28px, 5vw, 60px)"
              : "clamp(22px, 3.4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-0.015em",
            maxWidth: 900,
          }}
        >
          {withSeps(p.title)}
        </h2>

        {/* Wide landscape hero image */}
        <div
          className="mat-tale-figure"
          style={{
            marginTop: lead ? 36 : 30,
            aspectRatio: lead ? "2 / 1" : "16 / 9",
            overflow: "hidden",
            position: "relative",
            background: "#1c1c1c",
          }}
        >
          <MatImage
            image={p.img}
            variant={lead ? "Hero" : "Grid"}
            sizesOverride="(min-width: 1100px) 1040px, 92vw"
            alt=""
            style={{
              objectFit: "cover",
              transform: hov && !reduceMotion ? "scale(1.04)" : "scale(1)",
              transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
            }}
          />
        </div>

        {/* Prose */}
        <div
          className="mat-tale-prose"
          style={{
            marginTop: lead ? 36 : 30,
            maxWidth: 720,
            marginInline: "auto",
            textAlign: "center",
          }}
        >
          {/* A single short italic lede keeps each entry image-forward
              rather than essay-like. */}
          <p
            style={{
              margin: 0,
              fontFamily: BODY,
              fontStyle: "italic",
              fontSize: lead ? "clamp(19px, 2vw, 25px)" : "clamp(18px, 1.7vw, 21px)",
              lineHeight: 1.5,
              color: T.ink,
            }}
          >
            {p.lede}
          </p>

          {/* Closing flourish (non-navigating — see container note above) */}
          <span
            className="mat-tale-readlink"
            style={{
              display: "inline-block",
              marginTop: 28,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.ink,
              borderBottom: `1px solid ${hov ? T.sage : T.ink}`,
              paddingBottom: 4,
              transition: "border-color 250ms ease",
            }}
          >
            Read the tale →
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export function TalesClient() {
  const [filter, setFilter] = useState<string>("All Tales");
  const reduceMotion = useReducedMotion();

  // Newest first — POSTS is already authored in reverse-chronological order.
  const stream =
    filter === "All Tales"
      ? POSTS
      : POSTS.filter((p) => p.cat === filter);

  return (
    <main>
      {/* Hero */}
      <section
        className="mat-tales-hero"
        style={{
          padding: "180px 40px 56px",
          background: T.paper,
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="mat-tales-eyebrow"
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
          className="mat-tales-h1"
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
          <span style={{ fontStyle: "italic" }}>Images</span> you don&apos;t just see
          <span style={{ color: T.sage }}>.</span>
          <br className="mat-tales-h1-br" />{" "}
          You sit with them
          <span style={{ color: T.sage }}>.</span>
        </h1>

        {/* Sage intro lede — one line, kept short. */}
        <p
          className="mat-tales-lede"
          style={{
            margin: "26px auto 0",
            maxWidth: 560,
            fontFamily: BODY,
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.8vw, 20px)",
            lineHeight: 1.6,
            color: T.sage,
            position: "relative",
            zIndex: 1,
          }}
        >
          A reading room for the weddings we have lived through.
        </p>
      </section>

      {/* Category filter — light, editorial, above the stream */}
      <section
        className="mat-tales-filter-section"
        style={{ padding: "0 40px", background: T.paper }}
      >
        <div
          className="mat-tales-filter-row"
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((c) => {
            const active = filter === c;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="mat-tales-filter-btn"
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
                  opacity: active ? 1 : 0.5,
                  borderBottom: active
                    ? `1px solid ${T.sage}`
                    : "1px solid transparent",
                  transition: "opacity 250ms ease, border-color 250ms ease",
                  whiteSpace: "nowrap",
                  minHeight: 44,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </section>

      {/* Single-column editorial story-stream */}
      <section
        className="mat-tales-stream-section"
        style={{
          padding: "64px 40px 160px",
          background: T.paper,
        }}
      >
        <div
          className="mat-tale-stream"
          style={{
            maxWidth: 1040,
            marginInline: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(72px, 9vw, 144px)",
          }}
        >
          {stream.map((p, i) => (
            <StoryEntry
              key={`${filter}-${slugify(p.title)}`}
              p={p}
              lead={i === 0}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .mat-tale-stream {
            max-width: 640px !important;
            gap: clamp(56px, 11vw, 96px) !important;
          }
          .mat-tales-hero {
            padding: 140px 24px 48px !important;
          }
          .mat-tales-stream-section {
            padding: 48px 24px 120px !important;
          }
          .mat-tales-filter-section {
            padding: 0 !important;
          }
          /* Horizontal-scroll filter row — keeps all categories legible */
          .mat-tales-filter-row {
            justify-content: flex-start !important;
            gap: 24px !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding: 4px 24px !important;
            scroll-snap-type: x proximity;
          }
          .mat-tales-filter-row::-webkit-scrollbar { display: none; }
          .mat-tales-filter-btn { scroll-snap-align: start; }
        }
        @media (max-width: 600px) {
          .mat-tale-figure {
            aspect-ratio: 4 / 3 !important;
            margin-top: 24px !important;
          }
          .mat-tale-prose {
            margin-top: 24px !important;
          }
          .mat-tale-stream {
            gap: 56px !important;
          }
          .mat-tales-hero {
            padding: 120px 20px 40px !important;
          }
          .mat-tales-eyebrow {
            margin-bottom: 24px !important;
          }
          /* On phones the <br /> creates a tiny first line ("Images you don't just see.") —
             let the headline wrap naturally instead. */
          .mat-tales-h1-br { display: none !important; }
          .mat-tales-h1 {
            font-size: clamp(36px, 11vw, 56px) !important;
            line-height: 1.02 !important;
          }
          .mat-tales-lede {
            margin-top: 20px !important;
            max-width: 88vw !important;
          }
          .mat-tales-stream-section {
            padding: 40px 20px 96px !important;
          }
          .mat-tales-filter-row {
            padding: 4px 20px !important;
            gap: 20px !important;
          }
        }
      `}</style>
    </main>
  );
}
