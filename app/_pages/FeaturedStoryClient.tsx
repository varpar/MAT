"use client";

import React from "react";
import Link from "next/link";
import { SERIF, SANS, SCRIPT, DISPLAY, T, LAYOUT } from "../_components/tokens";
import { Sang } from "../_components/Sang";
import { useReveal } from "../_components/hooks";
import { MatImage } from "../_components/MatImage";
import { FilmPlayer } from "../_components/FilmPlayer";
import { LightboxProvider } from "../_components/Lightbox";
import { withSeps } from "../_components/Punc";
import { type Couple, MAT_IMAGES } from "../_components/data";
import type { FeaturedStory, StorySection } from "../_lib/featured-story";
import type { MatImageRecord } from "../_lib/mat-image-types";

const EASE = "cubic-bezier(.2,.7,.2,1)";

/* ─────────────────────────────────────────────────────────────
   COVER+HERO — photo first (full-bleed), then a paper panel
   with the names (smaller) and the intro copy below.
   ───────────────────────────────────────────────────────────── */
function CoverHero({ couple, story }: { couple: Couple; story: FeaturedStory }) {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  return (
    <>
      <section
        className="mat-cover-hero"
        style={{
          position: "relative",
          height: "88svh",
          minHeight: 560,
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        {couple.heroVideo ? (
          <FilmPlayer
            src={couple.heroVideo.src}
            poster={couple.heroVideo.poster}
            duration={couple.heroVideo.duration}
            label={`Play ${couple.bride} sang ${couple.groom} — ${couple.heroVideo.duration}`}
          />
        ) : (
          <>
            <MatImage
              image={story.photos.hero}
              variant="Hero"
              alt={`${couple.bride} sang ${couple.groom} — ${couple.place}`}
              filter="brightness(0.94)"
            />
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(180deg, rgba(0,0,0,0.0) 55%, rgba(0,0,0,0.55) 100%)",
                pointerEvents: "none",
              }}
            />
            {/* Bottom date / detail overlay — only on the image hero. When a
                video is playing the FilmPlayer's controls own the bottom, so
                this would collide. The same info already lives on the paper
                panel below. pointer-events:none so clicks pass through to the
                image (lightbox click-to-zoom). */}
            <div
              style={{
                position: "absolute",
                bottom: LAYOUT.gutter,
                left: LAYOUT.gutter,
                right: LAYOUT.gutter,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "clamp(12px, 2vw, 24px)",
                flexWrap: "wrap",
                color: "#fff",
                fontFamily: SANS,
                fontSize: 10,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                opacity: 0.88,
                pointerEvents: "none",
              }}
            >
              <div>{withSeps(story.date)}</div>
              <div>{story.detailLine}</div>
            </div>
          </>
        )}
        <style>{`
          @media (max-width: 720px) {
            .mat-cover-hero { height: 72svh !important; min-height: 460px !important; }
          }
        `}</style>
      </section>

      <section
        ref={ref as React.RefObject<HTMLElement>}
        style={{
          background: T.paper,
          padding: `${LAYOUT.section} ${LAYOUT.gutter}`,
          textAlign: "center",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: `all 1.1s ${EASE}`,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 28,
          }}
        >
          A Mi Amor Tales story
        </div>
        <h1
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(40px, 6.4vw, 88px)",
            lineHeight: 1.0,
            letterSpacing: "-0.015em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "0.28em",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 300 }}>
            {couple.bride}
          </span>
          <Sang size={32} />
          <span style={{ fontWeight: 300 }}>
            {couple.groom}
          </span>
        </h1>
        <p
          style={{
            margin: "40px auto 0",
            maxWidth: LAYOUT.maxText,
            fontFamily: SANS,
            fontSize: 11,
            lineHeight: 1.85,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            opacity: 0.72,
          }}
        >
          {withSeps(story.coverIntro)}
        </p>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   STORY SECTION — body paragraphs with either a script-style
   headline ("Celebration / OF LOVE") or a serif headline.
   Optionally paired with a side photo on left or right.
   Text always takes the wider column.
   ───────────────────────────────────────────────────────────── */
function StoryBody({
  section,
  image,
}: {
  section: StorySection;
  image?: React.ReactNode;
}) {
  const [ref, vis] = useReveal<HTMLElement>(0.1);
  const hasImage = Boolean(image);

  const isAllCaps = section.paragraphs.every(
    (p) => p === p.toUpperCase() && p.length < 600,
  );

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="mat-story-body"
      style={{
        background: T.paper,
        // Image runs full-bleed (padding 0); only the text column below
        // carries the gutter + maxText reading width.
        paddingTop: hasImage ? 0 : LAYOUT.section,
        paddingBottom: LAYOUT.section,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `all 1.2s ${EASE}`,
      }}
    >
      {image && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            overflow: "hidden",
            position: "relative",
            marginBottom: LAYOUT.section,
          }}
        >
          {image}
        </div>
      )}

      <div
        style={{
          maxWidth: LAYOUT.maxText,
          marginInline: "auto",
          paddingInline: LAYOUT.gutter,
          textAlign: isAllCaps ? "center" : "left",
        }}
      >
        {section.style === "script" ? (
          <h2
            style={{
              margin: 0,
              fontFamily: SCRIPT,
              fontWeight: 400,
              fontSize: "clamp(40px, 5.6vw, 76px)",
              lineHeight: 0.9,
              letterSpacing: "0.005em",
              color: T.ink,
            }}
          >
            {section.heading.split(/\s+of\s+/i).map((part, i, arr) => (
              <span
                key={i}
                style={{ display: "block", marginLeft: i === 1 ? "1.2em" : 0 }}
              >
                {part}
                {i < arr.length - 1 && (
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontStyle: "normal",
                      textTransform: "uppercase",
                      fontSize: "0.58em",
                      letterSpacing: "0.04em",
                      marginLeft: "0.3em",
                      color: T.sage,
                    }}
                  >
                    of
                  </span>
                )}
              </span>
            ))}
          </h2>
        ) : (
          <h2
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(28px, 3.6vw, 44px)",
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: T.ink,
              textAlign: isAllCaps ? "center" : "left",
            }}
          >
            {section.heading}
            <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
          </h2>
        )}
        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {section.paragraphs.map((p, i) =>
            isAllCaps ? (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontSize: 11,
                  lineHeight: 1.95,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.78,
                  marginInline: "auto",
                }}
              >
                {withSeps(p)}
              </p>
            ) : (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontSize: 16,
                  lineHeight: 1.72,
                  opacity: 0.84,
                }}
              >
                {withSeps(p)}
              </p>
            ),
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .mat-story-body > div:first-child { aspect-ratio: 4/5 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PULL-QUOTE CHAPTER DIVIDER — full-bleed B&W photo with an
   oversized accent word in cream, blended into the image.
   No sindoor red here — the photo carries the mood.
   ───────────────────────────────────────────────────────────── */
function PullQuoteFrame({
  pullQuote,
  bgImage,
}: {
  pullQuote: NonNullable<FeaturedStory["pullQuote"]>;
  bgImage: FeaturedStory["photos"]["intimateBW"];
}) {
  return (
    <section
      className="mat-pullquote"
      style={{
        position: "relative",
        height: "92svh",
        minHeight: 560,
        background: "#0e0e0e",
        overflow: "hidden",
      }}
    >
      <MatImage
        image={bgImage}
        variant="Hero"
        alt=""
        filter="grayscale(1) brightness(0.62)"
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: "#fff",
            fontSize: "clamp(56px, 18vw, 280px)",
            lineHeight: 0.85,
            opacity: 0.86,
            mixBlendMode: "difference",
            padding: "0 16px",
            textAlign: "center",
          }}
        >
          {pullQuote.word}
        </span>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .mat-pullquote { height: 60svh !important; min-height: 360px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEGMENTED RITUALS — one section per ceremony (Haldi, Mehendi,
   Sangeet, Pheras, Vidaai). Each section uses the staircase grid
   pattern: 3 photos with progressive 20% / 40% descent. Photos
   fade-up on scroll into view.
   ───────────────────────────────────────────────────────────── */
const RITUAL_DEFS: {
  key: "haldi" | "mehendi" | "sangeet" | "pheras" | "vidaai";
  label: string;
  num: string;
  blurb: string;
}[] = [
  {
    key: "haldi",
    label: "Haldi",
    num: "01",
    blurb:
      "A morning of turmeric, laughter, and family hands — colour worn before the gold.",
  },
  {
    key: "mehendi",
    label: "Mehendi",
    num: "02",
    blurb:
      "Hours of henna while the women sing — the groom's name hidden in the paisleys.",
  },
  {
    key: "sangeet",
    label: "Sangeet",
    num: "03",
    blurb:
      "The night before. Dholki, dance, dupatta blur — sound carrying every story forward.",
  },
  {
    key: "pheras",
    label: "Pheras",
    num: "04",
    blurb:
      "Seven steps around the fire. The vow itself, witnessed by elders and silence.",
  },
  {
    key: "vidaai",
    label: "Vidaai",
    num: "05",
    blurb:
      "The threshold. The handful of rice. The car door — and a new house to walk into.",
  },
];

/** Order matters: used to index into `story.extras` so each ritual gets
 *  two distinct extras (cycling if the extras run out). */
const RITUAL_ORDER: (typeof RITUAL_DEFS)[number]["key"][] = [
  "haldi",
  "mehendi",
  "sangeet",
  "pheras",
  "vidaai",
];

function ritualPhotosFor(
  story: FeaturedStory,
  k: (typeof RITUAL_DEFS)[number]["key"],
): MatImageRecord[] {
  const main = story.photos[k];

  // If the story provides its own extras, build the 3-up from THIS couple's
  // photos only — no leakage from the generic MAT_IMAGES pool.
  if (story.extras && story.extras.length > 0) {
    const idx = RITUAL_ORDER.indexOf(k);
    const start = idx * 2;
    const len = story.extras.length;
    const a = story.extras[start % len];
    const b = story.extras[(start + 1) % len];
    return [main, a, b].filter(Boolean);
  }

  // Legacy: 3 photos = the dedicated ritual photo + two from the broader pool.
  const pools: Record<typeof k, MatImageRecord[]> = {
    haldi: [main, MAT_IMAGES.atmos1, MAT_IMAGES.detail1],
    mehendi: [main, MAT_IMAGES.detail2, MAT_IMAGES.detail3],
    sangeet: [main, MAT_IMAGES.reel1, MAT_IMAGES.atmos2],
    pheras: [main, MAT_IMAGES.detail4, MAT_IMAGES.reel2],
    vidaai: [main, MAT_IMAGES.detail5, MAT_IMAGES.atmos3],
  };
  return pools[k];
}

function RitualSection({
  def,
  photos,
}: {
  def: (typeof RITUAL_DEFS)[number];
  photos: MatImageRecord[];
}) {
  const [ref, vis] = useReveal<HTMLElement>(0.1);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: T.paper,
        // Full-bleed photo row: no horizontal padding. The header below
        // carries the text gutter.
        paddingTop: LAYOUT.sectionTight,
        paddingBottom: LAYOUT.sectionTight,
      }}
    >
      <header
        style={{
          margin: `0 auto ${LAYOUT.sectionTight}`,
          padding: `0 ${LAYOUT.gutter}`,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: "clamp(20px, 3vw, 32px)",
          flexWrap: "wrap",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 16,
            }}
          >
            Ceremony {def.num}
          </div>
          <h3
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.04,
              letterSpacing: "-0.01em",
            }}
          >
            {def.label}
            <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
          </h3>
        </div>
        <p
          style={{
            margin: 0,
            maxWidth: 380,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 16,
            lineHeight: 1.55,
            opacity: 0.78,
          }}
        >
          {def.blurb}
        </p>
      </header>

      {/* Photos go edge-to-edge in a straight full-bleed 3-up row with tight
          gutters, matching the Weddings archive feel. No staircase offset. */}
      <div
        className="mat-rit-stair"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          alignItems: "stretch",
          gap: LAYOUT.gap,
        }}
      >
        {photos.map((p, i) => (
          <div
            key={`${def.key}-${i}`}
            style={{
              aspectRatio: "3/4",
              overflow: "hidden",
              background: "#0e0e0e",
              position: "relative",
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(36px)",
              transition: `all 1s ${EASE} ${i * 0.12}s`,
            }}
          >
            <MatImage
              image={p}
              variant="Grid"
              alt={`${def.label} ceremony — photograph ${i + 1}`}
            />
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mat-rit-stair { grid-template-columns: repeat(2, 1fr) !important; }
          .mat-rit-stair > *:nth-child(3) { grid-column: 1 / -1 !important; aspect-ratio: 3/2 !important; }
        }
        @media (max-width: 540px) {
          .mat-rit-stair { grid-template-columns: 1fr !important; }
          .mat-rit-stair > *:nth-child(3) { grid-column: auto !important; aspect-ratio: 3/4 !important; }
        }
      `}</style>
    </section>
  );
}

function SegmentedRituals({ story }: { story: FeaturedStory }) {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  return (
    <section style={{ background: T.paper }}>
      <header
        ref={ref as React.RefObject<HTMLElement>}
        style={{
          textAlign: "center",
          padding: `${LAYOUT.section} ${LAYOUT.gutter} 0`,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(16px)",
          transition: `all 1s ${EASE}`,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 22,
          }}
        >
          The Ceremonies
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            lineHeight: 1.1,
            maxWidth: LAYOUT.maxText,
            marginInline: "auto",
          }}
        >
          Five rituals, in the order they unfolded
          <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
        </h2>
      </header>

      {RITUAL_DEFS.map((def) => (
        <RitualSection
          key={def.key}
          def={def}
          photos={ritualPhotosFor(story, def.key)}
        />
      ))}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   WALL OF IMAGES — dense editorial grid of the couple's photos
   beyond the curated rituals. Three columns, mixed aspects, each
   image fades up on scroll into view.
   ───────────────────────────────────────────────────────────── */
function buildWall(story: FeaturedStory): MatImageRecord[] {
  const fromStory = Object.values(story.photos);
  const fromExtras = story.extras ?? [];
  // When the story provides its own extras, do NOT fall back to the generic
  // MAT_IMAGES pool — the wall stays entirely this couple's photos.
  const fromPool: MatImageRecord[] = story.extras
    ? []
    : [
        MAT_IMAGES.detail6,
        MAT_IMAGES.detail7,
        MAT_IMAGES.detail8,
        MAT_IMAGES.reel3,
        MAT_IMAGES.reel4,
        MAT_IMAGES.reel5,
        MAT_IMAGES.reel6,
        MAT_IMAGES.portrait3,
        MAT_IMAGES.portrait4,
      ].filter(Boolean);
  const seen = new Set<string>();
  const out: MatImageRecord[] = [];
  for (const p of [...fromStory, ...fromExtras, ...fromPool]) {
    if (!p || seen.has(p.publicId)) continue;
    seen.add(p.publicId);
    out.push(p);
  }
  return out;
}

function WallTile({ image, idx }: { image: MatImageRecord; idx: number }) {
  const [ref, vis] = useReveal<HTMLDivElement>(0.08);
  // Vary aspect ratios for visual rhythm.
  const aspect = ["3/4", "4/3", "3/4", "1/1", "3/4", "4/5"][idx % 6];
  return (
    <div
      ref={ref}
      style={{
        aspectRatio: aspect,
        overflow: "hidden",
        background: "#0e0e0e",
        position: "relative",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `all 0.9s ${EASE} ${(idx % 3) * 0.08}s`,
      }}
    >
      <MatImage image={image} variant="Grid" alt="" />
    </div>
  );
}

function WallOfImages({
  story,
  couple,
}: {
  story: FeaturedStory;
  couple: Couple;
}) {
  const photos = buildWall(story);
  return (
    <section
      style={{
        background: T.paper,
        // Full-bleed photo wall: no horizontal padding on the section.
        paddingTop: LAYOUT.section,
        paddingBottom: LAYOUT.section,
      }}
    >
      <header style={{ textAlign: "center", marginBottom: LAYOUT.sectionTight, padding: `0 ${LAYOUT.gutter}` }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 22,
          }}
        >
          The Full Gallery
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(28px, 3.6vw, 44px)",
            lineHeight: 1.1,
            maxWidth: LAYOUT.maxText,
            marginInline: "auto",
          }}
        >
          {couple.bride}{" "}
          <Sang size={20} />{" "}
          {couple.groom}
          <span style={{ color: T.sage, fontStyle: "normal" }}>
            {" "}— every frame.
          </span>
        </h2>
      </header>

      <div
        className="mat-wall"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: LAYOUT.gap,
        }}
      >
        {photos.map((p, i) => (
          <WallTile key={p.publicId} image={p} idx={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 880px) {
          .mat-wall { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .mat-wall { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE BRIDE — full-bleed bride portrait (B&W) on the left, sage
   panel with editorial uppercase paragraph on the right.
   No sindoor red — keep the photo monochrome.
   ───────────────────────────────────────────────────────────── */
function BridePanel({
  bride,
  bridePortrait,
  body,
}: {
  bride: string;
  bridePortrait: FeaturedStory["photos"]["bride"];
  body?: string;
}) {
  return (
    <section
      className="mat-bride-panel"
      style={{
        display: "grid",
        gridTemplateColumns: "6fr 6fr",
        alignItems: "stretch",
        background: T.paperDeep,
      }}
    >
      <div
        className="mat-bride-photo"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#0e0e0e",
          minHeight: 520,
        }}
      >
        <div
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <MatImage
            image={bridePortrait}
            variant="Grid"
            alt={`${bride} — bridal portrait`}
            filter="grayscale(1) brightness(0.96)"
          />
        </div>
      </div>
      <div
        style={{
          padding: `${LAYOUT.section} ${LAYOUT.gutter}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          The Bride
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(32px, 4.2vw, 56px)",
            lineHeight: 1.06,
          }}
        >
          {bride}
          <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
        </h3>
        {body && (
          <p
            style={{
              marginTop: 32,
              fontFamily: SANS,
              fontSize: 12,
              lineHeight: 1.95,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.78,
              maxWidth: 520,
            }}
          >
            {body}
          </p>
        )}
      </div>
      <style>{`
        @media (max-width: 880px) {
          .mat-bride-panel { grid-template-columns: 1fr !important; }
          .mat-bride-photo { min-height: clamp(360px, 80vw, 520px) !important; aspect-ratio: 3/4; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLOSING — full-bleed final photo + closing line in proper
   serif with the Sang Devanagari ligature visible at heading
   size + return-to-featured CTAs.
   ───────────────────────────────────────────────────────────── */
function Closing({ couple, story }: { couple: Couple; story: FeaturedStory }) {
  return (
    <>
      <section
        className="mat-story-closing-hero"
        style={{
          position: "relative",
          height: "92svh",
          minHeight: 560,
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        <MatImage image={story.photos.closing} variant="Hero" alt="" filter="brightness(0.74)" />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            padding: `0 ${LAYOUT.gutter}`,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              opacity: 0.82,
              marginBottom: 28,
            }}
          >
            Their forever
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(26px, 4.6vw, 64px)",
              lineHeight: 1.08,
              maxWidth: 980,
              display: "inline-flex",
              flexWrap: "wrap",
              gap: "0.34em",
              alignItems: "baseline",
              justifyContent: "center",
              textWrap: "balance",
            }}
          >
            <span>And then</span>
            <span style={{ fontStyle: "normal" }}>{couple.bride}</span>
            <Sang size={42} color="#fff" accent={T.cream} />
            <span style={{ fontStyle: "normal" }}>{couple.groom}</span>
            <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
          </h2>
        </div>
        <style>{`
          @media (max-width: 720px) {
            .mat-story-closing-hero { height: 70svh !important; min-height: 420px !important; }
          }
        `}</style>
      </section>
      <section
        style={{
          padding: `${LAYOUT.section} ${LAYOUT.gutter}`,
          background: T.paper,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "clamp(20px, 4vw, 48px)",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/featured"
            style={{
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "inherit",
              textDecoration: "none",
              paddingBottom: 4,
              borderBottom: `1px solid ${T.ink}`,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            ← See more stories
          </Link>
          <Link
            href="/contact"
            style={{
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "inherit",
              textDecoration: "none",
              paddingBottom: 4,
              borderBottom: `1px solid ${T.ink}`,
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            Begin your story →
          </Link>
        </div>
      </section>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ROOT — composition for a couple with a populated `story`
   payload. Falls back to FeaturedSlugClient otherwise.
   ───────────────────────────────────────────────────────────── */
export function FeaturedStoryClient({ couple }: { couple: Couple }) {
  const story = couple.story;
  if (!story) return null;

  const isBrideSection = (s: StorySection) => /elegant bride/i.test(s.heading);
  const brideSection = story.sections.find(isBrideSection);
  const otherSections = story.sections.filter((s) => !isBrideSection(s));

  return (
    <LightboxProvider>
    <main>
      <CoverHero couple={couple} story={story} />

      {otherSections[0] && (
        <StoryBody
          section={otherSections[0]}
          image={
            <MatImage
              image={story.photos.storyImage1}
              variant="Hero"
              alt=""
            />
          }
        />
      )}

      {story.pullQuote && (
        <PullQuoteFrame
          pullQuote={story.pullQuote}
          bgImage={story.photos.intimateBW}
        />
      )}

      {otherSections[1] && (
        <StoryBody
          section={otherSections[1]}
          image={
            <MatImage
              image={story.photos.storyImage2}
              variant="Hero"
              alt=""
            />
          }
        />
      )}

      <SegmentedRituals story={story} />

      <BridePanel
        bride={couple.bride}
        bridePortrait={story.photos.bride}
        body={brideSection?.paragraphs[0]}
      />

      {otherSections.slice(2).map((s, i) => (
        <StoryBody key={i} section={s} />
      ))}

      <WallOfImages story={story} couple={couple} />

      <Closing couple={couple} story={story} />
    </main>
    </LightboxProvider>
  );
}
