"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { SANS, BODY, DISPLAY, T, LAYOUT } from "../_components/tokens";
import { FEATURED, type Couple } from "../_components/data";
import { MatImage } from "../_components/MatImage";
import { Sep } from "../_components/Punc";
import { Sang } from "../_components/Sang";
import { useReveal } from "../_components/hooks";
import { LightboxProvider } from "../_components/Lightbox";
import type { FeaturedStory } from "../_lib/featured-story";
import type { MatImageRecord } from "../_lib/mat-image-types";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** Only couples backed by a real magazine story get stories + albums. */
const STORY_COUPLES: Couple[] = FEATURED.filter((c) => c.story);

/* ─────────────────────────────────────────────────────────────
   ALBUM PHOTO SET — gathers a single couple's own photographs
   (story slots + their private `extras`), deduped, in a stable
   order. Mirrors FeaturedStoryClient's wall logic so an album is
   entirely THIS couple's frames — never the generic backfill pool.
   ───────────────────────────────────────────────────────────── */
function buildAlbum(story: FeaturedStory): MatImageRecord[] {
  // Lead with the curated portraits/rituals, then the wider extras.
  const ordered: (MatImageRecord | undefined)[] = [
    story.photos.hero,
    story.photos.bride,
    story.photos.groom,
    story.photos.storyImage1,
    story.photos.storyImage2,
    story.photos.haldi,
    story.photos.mehendi,
    story.photos.sangeet,
    story.photos.pheras,
    story.photos.vidaai,
    story.photos.intimateBW,
    story.photos.closing,
    ...(story.extras ?? []),
  ];
  const seen = new Set<string>();
  const out: MatImageRecord[] = [];
  for (const p of ordered) {
    if (!p || seen.has(p.publicId)) continue;
    seen.add(p.publicId);
    out.push(p);
  }
  return out;
}

/* How many frames an album shows before the "open the full story" link.
   Keeps the page light — the full archive lives on the story page. */
const ALBUM_PREVIEW = 9;

/* ─────────────────────────────────────────────────────────────
   COUPLE STORY CARD — editorial card linking to /featured/[slug].
   Reuses the FeaturedIndexClient spread language: a tall feature
   photo with a sage name-plate, names in DISPLAY uppercase italic
   with the `Sang` separator. Fades up on scroll; image eases in
   on hover.
   ───────────────────────────────────────────────────────────── */
function StoryCard({
  couple,
  idx,
  reduceMotion,
}: {
  couple: Couple;
  idx: number;
  reduceMotion: boolean | null;
}) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const cover = couple.story?.photos.hero ?? couple.img;
  const go = () => router.push(`/featured/${couple.slug ?? "riya-sang-mohit"}`);

  const initial = reduceMotion ? false : { opacity: 0, y: 30 };

  return (
    <motion.article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={go}
      data-cursor="Read story"
      initial={initial}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, ease: EASE, delay: (idx % 3) * 0.06 }}
      className="mat-story-card"
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        background: T.sage,
        overflow: "hidden",
      }}
    >
      {/* Feature photo */}
      <div
        style={{
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        <motion.div
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
          animate={{ scale: hov && !reduceMotion ? 1.045 : 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <MatImage
            image={cover}
            variant="Grid"
            noLightbox
            alt={`${couple.bride} sang ${couple.groom} — ${couple.place}`}
          />
        </motion.div>
      </div>

      {/* Sage name-plate */}
      <div
        className="mat-story-plate"
        style={{
          color: "#f1f4f3",
          padding: "clamp(22px, 2.6vw, 32px) clamp(20px, 2.4vw, 30px) clamp(24px, 2.8vw, 34px)",
          display: "flex",
          flexDirection: "column",
          gap: 14,
          position: "relative",
          flex: 1,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          A Mi Amor Tales Story
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <span
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(30px, 3.6vw, 52px)",
              lineHeight: 0.94,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {couple.bride}
          </span>
          <span style={{ display: "inline-flex", opacity: 0.92, margin: "4px 0" }}>
            <Sang size={20} color="#f4f7f7" />
          </span>
          <span
            style={{
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(30px, 3.6vw, 52px)",
              lineHeight: 0.94,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {couple.groom}
          </span>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: 14,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: BODY,
              fontStyle: "italic",
              fontSize: "clamp(13px, 1.3vw, 15px)",
              opacity: 0.85,
              lineHeight: 1.5,
            }}
          >
            {couple.place}
          </span>
          <motion.span
            className="mat-story-cta"
            animate={{ x: hov && !reduceMotion ? 5 : 0, opacity: hov ? 1 : 0.78 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(255,255,255,0.55)",
              paddingBottom: 4,
              whiteSpace: "nowrap",
            }}
          >
            Read the story →
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   ALBUM TILE — one lazily-revealed photo. Varied aspect ratios
   give the cluster a hand-laid, album-page rhythm. Clicking opens
   the shared full-screen Lightbox (MatImage reads the provider
   mounted by AlbumsSection automatically). prefers-reduced-motion
   drops the fade/translate.
   ───────────────────────────────────────────────────────────── */
function AlbumTile({
  image,
  idx,
  alt,
  reduceMotion,
}: {
  image: MatImageRecord;
  idx: number;
  alt: string;
  reduceMotion: boolean | null;
}) {
  const [ref, vis] = useReveal<HTMLDivElement>(0.08);
  const aspect = ["3/4", "4/3", "3/4", "1/1", "4/3", "3/4"][idx % 6];
  const show = reduceMotion ? true : vis;
  return (
    <div
      ref={ref}
      style={{
        aspectRatio: aspect,
        overflow: "hidden",
        background: "#0e0e0e",
        position: "relative",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(22px)",
        transition: reduceMotion
          ? "none"
          : `opacity 0.9s ${EASE} ${(idx % 3) * 0.07}s, transform 0.9s ${EASE} ${(idx % 3) * 0.07}s`,
      }}
    >
      <MatImage image={image} variant="Polaroid" alt={alt} />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   COUPLE ALBUM — a titled photo cluster for one couple. Reads
   like flipping an album page: a serif title in "A sang B" form,
   a masonry-ish grid capped at ALBUM_PREVIEW frames, then a link
   into the full story for the complete archive.
   ───────────────────────────────────────────────────────────── */
function CoupleAlbum({
  couple,
  reduceMotion,
}: {
  couple: Couple;
  reduceMotion: boolean | null;
}) {
  const router = useRouter();
  const all = useMemo(
    () => (couple.story ? buildAlbum(couple.story) : []),
    [couple.story],
  );
  const shown = all.slice(0, ALBUM_PREVIEW);
  const more = all.length - shown.length;
  const slug = couple.slug ?? "riya-sang-mohit";
  const alt = `${couple.bride} sang ${couple.groom} — ${couple.place}`;

  return (
    <article className="mat-album">
      <header className="mat-album-head">
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
          The Album<Sep />
          {couple.place}
        </div>
        <h3
          className="mat-album-title"
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(30px, 4.4vw, 58px)",
            lineHeight: 0.96,
            letterSpacing: "-0.02em",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "baseline",
            columnGap: 14,
            rowGap: 2,
          }}
        >
          <span>{couple.bride}</span>
          <span style={{ display: "inline-flex", alignSelf: "center" }}>
            <Sang size={22} />
          </span>
          <span>{couple.groom}</span>
        </h3>
      </header>

      <div className="mat-album-grid">
        {shown.map((p, i) => (
          <AlbumTile
            key={p.publicId}
            image={p}
            idx={i}
            alt={alt}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      {/* Into the full story — the complete archive lives there. */}
      <div className="mat-album-foot">
        <button
          type="button"
          onClick={() => router.push(`/featured/${slug}`)}
          data-cursor="Read story"
          className="mat-album-link"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontFamily: SANS,
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.ink,
            borderBottom: `1px solid ${T.ink}`,
            paddingBottom: 4,
            minHeight: 44,
            transition: "border-color 250ms ease",
          }}
        >
          {more > 0 ? `Open all ${all.length} frames →` : "Open the full story →"}
        </button>
      </div>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────
   ALBUMS SECTION — wraps every couple album in a single
   LightboxProvider so any photo, in any album, opens the shared
   full-screen viewer. (TalesClient sits below the root layout,
   which does NOT mount a provider, so we mount one here.)
   ───────────────────────────────────────────────────────────── */
function AlbumsSection({
  couples,
  reduceMotion,
}: {
  couples: Couple[];
  reduceMotion: boolean | null;
}) {
  return (
    <LightboxProvider>
      <div
        className="mat-albums"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: LAYOUT.section,
        }}
      >
        {couples.map((c) => (
          <CoupleAlbum
            key={c.slug ?? `${c.bride}-${c.groom}`}
            couple={c}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>
    </LightboxProvider>
  );
}

export function TalesClient() {
  // "All" or a single couple slug — filters BOTH the story cards and the albums.
  const [filter, setFilter] = useState<string>("all");
  const reduceMotion = useReducedMotion();

  const visible =
    filter === "all"
      ? STORY_COUPLES
      : STORY_COUPLES.filter((c) => (c.slug ?? "") === filter);

  return (
    <main>
      {/* Hero */}
      <section
        className="mat-tales-hero"
        style={{
          padding: `180px ${LAYOUT.gutter} ${LAYOUT.sectionTight}`,
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
          Tales<Sep />Stories &amp; Albums
        </div>
        <h1
          className="mat-tales-h1"
          style={{
            margin: 0,
            fontFamily: DISPLAY,
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
          The weddings we lived
          <span style={{ color: T.sage }}>.</span>
          <br className="mat-tales-h1-br" />{" "}
          Told, and kept
          <span style={{ color: T.sage }}>.</span>
        </h1>

        <p
          className="mat-tales-lede"
          style={{
            margin: "26px auto 0",
            maxWidth: 600,
            fontFamily: BODY,
            fontStyle: "italic",
            fontSize: "clamp(15px, 1.8vw, 20px)",
            lineHeight: 1.6,
            color: T.sage,
            position: "relative",
            zIndex: 1,
          }}
        >
          Real couples, their full stories, and the albums we filled along the
          way.
        </p>
      </section>

      {/* Couple filter — repurposed from the old category bar. */}
      <section
        className="mat-tales-filter-section"
        style={{ padding: `0 ${LAYOUT.gutterTight}`, background: T.paper }}
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
          {[{ slug: "all", label: "All Couples" }, ...STORY_COUPLES.map((c) => ({
            slug: c.slug ?? "",
            label: `${c.bride} sang ${c.groom}`,
          }))].map((opt) => {
            const active = filter === opt.slug;
            return (
              <button
                key={opt.slug}
                onClick={() => setFilter(opt.slug)}
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
                {opt.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION A — Couple Stories. The photo-card grid runs full-bleed;
          only the header keeps the text gutter. */}
      <section
        className="mat-tales-stories-section"
        style={{
          padding: `${LAYOUT.section} 0 ${LAYOUT.sectionTight}`,
          background: T.paper,
        }}
      >
        <header
          className="mat-section-head"
          style={{ paddingInline: LAYOUT.gutter }}
        >
          <span className="mat-section-kicker">Section One</span>
          <h2 className="mat-section-h2">Couple Stories</h2>
          <p className="mat-section-sub">
            The full features — three days, every frame kept.
          </p>
        </header>

        <div className="mat-story-grid">
          {visible.map((c, i) => (
            <StoryCard
              key={c.slug ?? `${c.bride}-${c.groom}`}
              couple={c}
              idx={i}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </section>

      {/* SECTION B — Albums. The header keeps the text gutter; each album's
          photo grid runs full-bleed inside AlbumsSection. */}
      <section
        className="mat-tales-albums-section"
        style={{ padding: `${LAYOUT.section} 0`, background: T.paper }}
      >
        <header
          className="mat-section-head"
          style={{ paddingInline: LAYOUT.gutter }}
        >
          <span className="mat-section-kicker">Section Two</span>
          <h2 className="mat-section-h2">The Albums</h2>
          <p className="mat-section-sub">
            Flip through each wedding. Tap any frame to open it full-screen.
          </p>
        </header>

        <AlbumsSection couples={visible} reduceMotion={reduceMotion} />
      </section>

      <style>{`
        .mat-section-head {
          text-align: center;
          max-width: 760px;
          margin: 0 auto clamp(40px, 6vw, 64px);
        }
        .mat-section-kicker {
          display: inline-block;
          font-family: ${SANS};
          font-size: 10px;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: ${T.sage};
          margin-bottom: 20px;
        }
        .mat-section-h2 {
          margin: 0;
          font-family: ${DISPLAY};
          font-weight: 300;
          font-size: clamp(30px, 5vw, 58px);
          line-height: 1.0;
          letter-spacing: -0.02em;
        }
        .mat-section-sub {
          margin: 18px auto 0;
          max-width: 520px;
          font-family: ${BODY};
          font-style: italic;
          font-size: clamp(14px, 1.6vw, 18px);
          line-height: 1.55;
          color: ${T.ink};
          opacity: 0.7;
        }

        /* Couple-story cards — near-full-bleed grid; photos sit just off the edge. */
        .mat-story-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: ${LAYOUT.gap};
          padding-inline: ${LAYOUT.edge};
        }

        /* Albums — head/foot copy keeps the text gutter; the photo grid sits just off the edge. */
        .mat-album-head,
        .mat-album-foot { padding-inline: ${LAYOUT.gutter}; }
        .mat-album-head { margin-bottom: clamp(28px, 4vw, 44px); }
        .mat-album-foot { margin-top: clamp(28px, 3.6vw, 44px); text-align: center; }
        .mat-album-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: ${LAYOUT.gap};
          padding-inline: ${LAYOUT.edge};
        }

        /* Touch devices: keep the read-cta visible (no hover state). */
        @media (hover: none) {
          .mat-story-cta { opacity: 1 !important; }
        }

        @media (max-width: 1000px) {
          .mat-story-grid,
          .mat-album-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        @media (max-width: 900px) {
          .mat-tales-filter-section { padding: 0 !important; }
          /* Horizontal-scroll filter row — keeps every couple legible. */
          .mat-tales-filter-row {
            justify-content: flex-start !important;
            gap: 24px !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            padding: 4px ${LAYOUT.gutterTight} !important;
            scroll-snap-type: x proximity;
          }
          .mat-tales-filter-row::-webkit-scrollbar { display: none; }
          .mat-tales-filter-btn { scroll-snap-align: start; }
        }

        @media (max-width: 640px) {
          .mat-story-grid { grid-template-columns: 1fr !important; }
        }

        /* Tighten the hero's fixed top-padding so it clears the nav on
           small screens; horizontal + bottom stay on the LAYOUT tokens. */
        @media (max-width: 900px) {
          .mat-tales-hero { padding-top: 140px !important; }
        }
        @media (max-width: 600px) {
          .mat-tales-hero { padding-top: 120px !important; }
          .mat-tales-eyebrow { margin-bottom: 24px !important; }
          .mat-tales-h1-br { display: none !important; }
          .mat-tales-h1 {
            font-size: clamp(36px, 11vw, 56px) !important;
            line-height: 1.02 !important;
          }
          .mat-tales-lede { max-width: 88vw !important; }
        }

        @media (max-width: 480px) {
          .mat-album-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
