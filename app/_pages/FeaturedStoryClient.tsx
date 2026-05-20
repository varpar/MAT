"use client";

import React from "react";
import Link from "next/link";
import { SERIF, SANS, SCRIPT, T } from "../_components/tokens";
import { Sang } from "../_components/Sang";
import { useReveal } from "../_components/hooks";
import { MatImage } from "../_components/MatImage";
import { SelectiveColorImage } from "../_components/SelectiveColorImage";
import type { Couple } from "../_components/data";
import type { FeaturedStory, StorySection } from "../_lib/featured-story";

const EASE = "cubic-bezier(.2,.7,.2,1)";

/* ─────────────────────────────────────────────────────────────
   COVER — Stacked serif names on sage, mirrors page 4 / 10 of
   the magazine PDF. Eyebrow + intro body below.
   ───────────────────────────────────────────────────────────── */
function Cover({ couple, story }: { couple: Couple; story: FeaturedStory }) {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: T.sage,
        color: "#f1f4f3",
        padding: "180px 40px 140px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.18) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          opacity: vis ? 0.85 : 0,
          transition: "opacity 1s ease",
          marginBottom: 64,
        }}
      >
        A story by Mi Amor Tales
      </div>
      <h1
        style={{
          position: "relative",
          zIndex: 1,
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          fontFamily: SERIF,
          fontWeight: 400,
          textTransform: "uppercase",
          lineHeight: 0.88,
          letterSpacing: "-0.025em",
          fontSize: "clamp(72px, 14vw, 220px)",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(28px)",
          transition: `all 1.4s ${EASE}`,
        }}
      >
        <span>{couple.bride}</span>
        <span
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(24px, 3.2vw, 44px)",
            textTransform: "lowercase",
            opacity: 0.78,
            letterSpacing: "0.04em",
          }}
        >
          sang
        </span>
        <span>{couple.groom}</span>
      </h1>
      <p
        style={{
          position: "relative",
          zIndex: 1,
          margin: "72px auto 0",
          maxWidth: 640,
          fontFamily: SANS,
          fontSize: 11,
          lineHeight: 1.8,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: vis ? 0.85 : 0,
          transition: `opacity 1.4s ease 0.4s`,
        }}
      >
        {story.coverIntro}
      </p>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULL-BLEED HERO photo immediately under the cover, with the
   date/detail line tucked into a bottom strip.
   ───────────────────────────────────────────────────────────── */
function StoryHero({ couple, story }: { couple: Couple; story: FeaturedStory }) {
  return (
    <section
      style={{
        position: "relative",
        height: "92svh",
        minHeight: 560,
        overflow: "hidden",
        background: "#0e0e0e",
      }}
    >
      <MatImage
        image={story.photos.hero}
        variant="Hero"
        alt={`${couple.bride} and ${couple.groom} — ${couple.place}`}
        filter="brightness(0.92)"
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
          right: 40,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 40,
          flexWrap: "wrap",
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
        }}
      >
        <div style={{ opacity: 0.85 }}>{story.date}</div>
        <div style={{ opacity: 0.85 }}>{story.detailLine}</div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   STORY SECTION — body paragraphs with either a script-style
   headline ("Celebration / OF LOVE") or a serif headline
   ("Chosen, Then Felt"). Optionally paired with a side photo.
   ───────────────────────────────────────────────────────────── */
function StoryBody({
  section,
  imageLeft,
  imageRight,
  idx,
}: {
  section: StorySection;
  imageLeft?: React.ReactNode;
  imageRight?: React.ReactNode;
  idx: number;
}) {
  const [ref, vis] = useReveal<HTMLElement>(0.1);
  const hasImage = imageLeft || imageRight;
  const reverse = idx % 2 === 1;

  // Decide whether the section's body copy looks like an all-caps editorial
  // pull paragraph (e.g. "The Elegant Bride" on Pooja's spread). If yes,
  // render it centred in larger spacing.
  const isAllCaps = section.paragraphs.every(
    (p) => p === p.toUpperCase() && p.length < 600,
  );

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="mat-story-body"
      style={{
        background: T.paper,
        padding: "120px 40px",
        display: hasImage ? "grid" : "block",
        gridTemplateColumns: hasImage ? (reverse ? "5fr 7fr" : "7fr 5fr") : undefined,
        gap: 64,
        alignItems: "center",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(24px)",
        transition: `all 1.2s ${EASE}`,
      }}
    >
      {imageLeft && (
        <div style={{ gridColumn: reverse ? 2 : 1, aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
          {imageLeft}
        </div>
      )}
      <div
        style={{
          gridColumn: hasImage ? (reverse ? 1 : 2) : undefined,
          maxWidth: hasImage ? undefined : 720,
          marginInline: hasImage ? undefined : "auto",
          textAlign: isAllCaps && !hasImage ? "center" : "left",
        }}
      >
        {section.style === "script" ? (
          <h2
            style={{
              margin: 0,
              fontFamily: SCRIPT,
              fontWeight: 400,
              fontSize: "clamp(48px, 7vw, 96px)",
              lineHeight: 0.85,
              letterSpacing: "0.005em",
              color: T.ink,
            }}
          >
            {section.heading.split(/\s+of\s+/i).map((part, i, arr) => (
              <span key={i} style={{ display: "block", marginLeft: i === 1 ? "1.2em" : 0 }}>
                {part}
                {i < arr.length - 1 && (
                  <span
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 400,
                      fontStyle: "normal",
                      textTransform: "uppercase",
                      fontSize: "0.62em",
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
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(32px, 4.5vw, 52px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
              color: T.ink,
              textAlign: isAllCaps && !hasImage ? "center" : "left",
            }}
          >
            {section.heading}
            <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
          </h2>
        )}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 18 }}>
          {section.paragraphs.map((p, i) =>
            isAllCaps ? (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontFamily: SANS,
                  fontSize: 12,
                  lineHeight: 1.95,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  opacity: 0.78,
                  maxWidth: 680,
                  marginInline: hasImage ? undefined : "auto",
                }}
              >
                {p}
              </p>
            ) : (
              <p
                key={i}
                style={{
                  margin: 0,
                  fontFamily: SERIF,
                  fontSize: 17,
                  lineHeight: 1.7,
                  opacity: 0.82,
                  maxWidth: 580,
                }}
              >
                {p}
              </p>
            ),
          )}
        </div>
      </div>
      {imageRight && (
        <div style={{ gridColumn: reverse ? 1 : 2, aspectRatio: "4/5", overflow: "hidden", position: "relative" }}>
          {imageRight}
        </div>
      )}
      <style>{`
        @media (max-width: 880px) {
          .mat-story-body { grid-template-columns: 1fr !important; gap: 32px !important; padding: 80px 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PULL-QUOTE CHAPTER DIVIDER — full-bleed B&W photo with an
   oversized accent word overlaid (e.g. "QUIETUDE", "THEM").
   Lifted from PDF pages 9 ("THEM" red), 20 ("QUIETUDE"), 25
   ("HEAVENLY BLESSED").
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
        filter="grayscale(1) brightness(0.6)"
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
            fontFamily: SERIF,
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: pullQuote.color ?? "#fff",
            fontSize: "clamp(72px, 18vw, 280px)",
            lineHeight: 0.85,
            opacity: 0.92,
            mixBlendMode: pullQuote.color ? "normal" : "difference",
          }}
        >
          {pullQuote.word}
        </span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   THE BRIDE — full-bleed bride portrait on the left, sage panel
   with editorial uppercase paragraph on the right. Mirrors PDF
   page 30 ("Pooja holds a presence…").
   ───────────────────────────────────────────────────────────── */
function BridePanel({
  bride,
  bridePortrait,
  body,
}: {
  bride: string;
  bridePortrait: FeaturedStory["photos"]["bride"];
  /** Optional all-caps body paragraph (e.g. Pooja's "The Elegant Bride"). */
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
      {/* image column — explicit height via aspect-ratio + relative-positioned
          inner div so the SelectiveColorImage's fill MatImage can size. */}
      <div style={{ position: "relative", overflow: "hidden", background: "#0e0e0e", minHeight: 520 }}>
        <SelectiveColorImage
          image={bridePortrait}
          intensity={0.35}
          redSpot={{ x: 0.48, y: 0.16, r: 0.04 }}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
      <div
        style={{
          padding: "80px 56px",
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
          The Elegant Bride
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1.05,
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
          .mat-bride-panel > div:last-child { padding: 48px 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RITUAL LINEUP — five-up ceremony strip. Compact, no descriptions
   (the story prose already covered emotion).
   ───────────────────────────────────────────────────────────── */
const RITUAL_NAMES = ["Haldi", "Mehendi", "Sangeet", "Pheras", "Vidaai"] as const;
type RitualKey = "haldi" | "mehendi" | "sangeet" | "pheras" | "vidaai";
const RITUAL_KEYS: RitualKey[] = ["haldi", "mehendi", "sangeet", "pheras", "vidaai"];

function RitualStrip({ photos }: { photos: FeaturedStory["photos"] }) {
  const [ref, vis] = useReveal<HTMLElement>(0.1);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: T.paper,
        padding: "160px 40px",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 64 }}>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 24,
          }}
        >
          The Three Days
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(32px, 4.5vw, 52px)",
            lineHeight: 1.05,
          }}
        >
          Five ceremonies, in the order they happened
          <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
        </h2>
      </header>
      <ol
        className="mat-ritual-strip"
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 16,
        }}
      >
        {RITUAL_KEYS.map((k, i) => (
          <li
            key={k}
            style={{
              opacity: vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(24px)",
              transition: `all 1s ${EASE} ${i * 0.08}s`,
            }}
          >
            <div style={{ aspectRatio: "3/4", overflow: "hidden", background: "#0e0e0e", position: "relative" }}>
              <MatImage image={photos[k]} variant="Polaroid" alt={RITUAL_NAMES[i]} />
            </div>
            <div
              style={{
                marginTop: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: SERIF,
                  fontStyle: "italic",
                  fontSize: 22,
                  fontWeight: 400,
                }}
              >
                {RITUAL_NAMES[i]}
              </span>
              <span
                style={{
                  fontFamily: SANS,
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  color: T.sage,
                }}
              >
                0{i + 1}
              </span>
            </div>
          </li>
        ))}
      </ol>
      <style>{`
        @media (max-width: 880px) {
          .mat-ritual-strip { grid-template-columns: repeat(2, 1fr) !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .mat-ritual-strip { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLOSING — full-bleed final photo + closing line + return-to-
   featured CTAs.
   ───────────────────────────────────────────────────────────── */
function Closing({ couple, story }: { couple: Couple; story: FeaturedStory }) {
  return (
    <>
      <section
        style={{
          position: "relative",
          height: "92svh",
          minHeight: 560,
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        <MatImage image={story.photos.closing} variant="Hero" alt="" filter="brightness(0.78)" />
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%)",
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
            padding: "0 40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              opacity: 0.8,
              marginBottom: 32,
            }}
          >
            End of this story
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1.05,
              maxWidth: 880,
            }}
          >
            And then <span style={{ fontStyle: "normal" }}>{couple.bride}</span>{" "}
            <span style={{ opacity: 0.78, fontSize: "0.6em" }}>
              <Sang size={20} latin />
            </span>{" "}
            <span style={{ fontStyle: "normal" }}>{couple.groom}</span>
            <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
          </h2>
        </div>
      </section>
      <section
        style={{
          padding: "120px 40px",
          background: T.paper,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 48,
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
            }}
          >
            ← Back to featured
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
            }}
          >
            Begin yours →
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

  // Locate the "elegant bride" section (if any) so BridePanel can absorb its
  // body copy directly — otherwise it would render twice.
  const isBrideSection = (s: StorySection) => /elegant bride/i.test(s.heading);
  const brideSection = story.sections.find(isBrideSection);
  const otherSections = story.sections.filter((s) => !isBrideSection(s));

  return (
    <main>
      <Cover couple={couple} story={story} />
      <StoryHero couple={couple} story={story} />

      {otherSections[0] && (
        <StoryBody
          section={otherSections[0]}
          idx={0}
          imageRight={
            <MatImage image={story.photos.storyImage1} variant="Grid" alt="" />
          }
        />
      )}

      {story.pullQuote && (
        <PullQuoteFrame pullQuote={story.pullQuote} bgImage={story.photos.intimateBW} />
      )}

      {otherSections[1] && (
        <StoryBody
          section={otherSections[1]}
          idx={1}
          imageLeft={
            <MatImage image={story.photos.storyImage2} variant="Grid" alt="" />
          }
        />
      )}

      <RitualStrip photos={story.photos} />

      <BridePanel
        bride={couple.bride}
        bridePortrait={story.photos.bride}
        body={brideSection?.paragraphs[0]}
      />

      {otherSections.slice(2).map((s, i) => (
        <StoryBody key={i} section={s} idx={i + 2} />
      ))}

      <Closing couple={couple} story={story} />
    </main>
  );
}
