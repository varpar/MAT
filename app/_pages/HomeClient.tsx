"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { SERIF, SANS, T } from "../_components/tokens";
import { Sang } from "../_components/Sang";
import { FEATURED, MAT_IMAGES, type Couple } from "../_components/data";
import { Marigold } from "../_components/Marigold";
import { AnimatedImage } from "../_components/AnimatedImage";
import { FilmStrip } from "../_components/FilmStrip";
import { MatImage } from "../_components/MatImage";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/* ─────────────────────────────────────────────────────────────
   HERO — full-bleed image with Ken-Burns drift, slow scale-out,
   subtle parallax on scroll, italic line bottom-left.
   ───────────────────────────────────────────────────────────── */
function HomeHero() {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1, 1.08]);
  const fade = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.6]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 640,
        background: "#000",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "112%",
          y,
          scale,
          willChange: "transform",
        }}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <MatImage
          image={MAT_IMAGES.hero}
          variant="Hero"
          alt=""
          filter="brightness(0.86)"
        />
      </motion.div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 60%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 56,
          color: "#fff",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 40,
          opacity: fade,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
          style={{
            margin: 0,
            maxWidth: 540,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(28px, 3.2vw, 40px)",
            lineHeight: 1.18,
          }}
        >
          Where love meets legacy.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.75 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.36em",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 14,
            whiteSpace: "nowrap",
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 1,
              height: 28,
              background: "rgba(255,255,255,0.7)",
            }}
          />
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRIPTYCH — three tall portraits, staggered wipe-up, with a
   compact intro line in the centre. Reads as a magazine spread.
   ───────────────────────────────────────────────────────────── */
function HomeTriptych() {
  return (
    <section
      style={{
        padding: "120px 40px",
        background: T.paper,
      }}
    >
      <div
        className="mat-tript"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <AnimatedImage
          image={MAT_IMAGES.portrait1}
          aspect="3/4"
          reveal="wipe-up"
          parallax={40}
          delay={0}
          variant="Grid"
          style={{ marginTop: 40 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "40px 8px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: T.sage,
              marginBottom: 28,
            }}
          >
            Studio, Jaipur — est. 2018
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              maxWidth: 420,
            }}
          >
            <span style={{ fontStyle: "italic" }}>Quietly</span> photographed
            <span style={{ color: T.sage }}>,</span> in the language of light
            <span style={{ color: T.sage }}>.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.78 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.25 }}
            style={{
              margin: "32px 0 0",
              maxWidth: 360,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.55,
            }}
          >
            We accept six weddings a season — sat with, photographed, and remembered.
          </motion.p>
        </div>
        <AnimatedImage
          image={MAT_IMAGES.portrait2}
          aspect="3/4"
          reveal="wipe-up"
          parallax={40}
          delay={0.15}
          variant="Grid"
          style={{ marginBottom: 40 }}
        />
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .mat-tript { grid-template-columns: 1fr 1fr !important; }
          .mat-tript > :nth-child(2) {
            grid-column: 1 / -1 !important;
            order: -1;
            padding: 0 !important;
            margin-bottom: 40px;
          }
        }
        @media (max-width: 600px) {
          .mat-tript { grid-template-columns: 1fr !important; }
          .mat-tript > * { margin: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FILM REEL — horizontal cinematic strip with parallax drift.
   ───────────────────────────────────────────────────────────── */
function HomeFilmReel() {
  return (
    <section
      style={{
        background: T.paper,
        padding: "60px 0 120px",
      }}
    >
      <div
        style={{
          padding: "0 40px",
          marginBottom: 32,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
          }}
        >
          From the reel — 2024 to 2026
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 16,
            opacity: 0.65,
          }}
        >
          a quiet loop, four reels deep
        </div>
      </div>
      <FilmStrip
        heights={[320, 260, 300, 240]}
        travels={[0.55, 0.8, 0.45, 0.95]}
        rows={[
          // Row 1 — wide cinematic frames (left → right)
          [
            { image: MAT_IMAGES.reel1, aspect: "16/10" },
            { image: MAT_IMAGES.couple1, aspect: "4/3" },
            { image: MAT_IMAGES.reel4, aspect: "16/10" },
            { image: MAT_IMAGES.haldi, aspect: "4/3" },
            { image: MAT_IMAGES.reel3, aspect: "16/10" },
            { image: MAT_IMAGES.couple3, aspect: "4/3" },
            { image: MAT_IMAGES.detail1, aspect: "16/10" },
          ],
          // Row 2 — portraits + details (right → left)
          [
            { image: MAT_IMAGES.portrait1, aspect: "3/4" },
            { image: MAT_IMAGES.bride2, aspect: "3/4" },
            { image: MAT_IMAGES.detail3, aspect: "1/1" },
            { image: MAT_IMAGES.portrait3, aspect: "3/4" },
            { image: MAT_IMAGES.atmos1, aspect: "4/3" },
            { image: MAT_IMAGES.bride3, aspect: "3/4" },
            { image: MAT_IMAGES.detail5, aspect: "1/1" },
            { image: MAT_IMAGES.portrait4, aspect: "3/4" },
          ],
          // Row 3 — ceremony moments (left → right)
          [
            { image: MAT_IMAGES.mehendi, aspect: "4/3" },
            { image: MAT_IMAGES.sangeet, aspect: "16/10" },
            { image: MAT_IMAGES.pheras, aspect: "4/3" },
            { image: MAT_IMAGES.vidaai, aspect: "16/10" },
            { image: MAT_IMAGES.haldi, aspect: "4/3" },
            { image: MAT_IMAGES.reel2, aspect: "3/4" },
            { image: MAT_IMAGES.atmos3, aspect: "4/3" },
          ],
          // Row 4 — atmospherics + couples (right → left)
          [
            { image: MAT_IMAGES.atmos2, aspect: "16/10" },
            { image: MAT_IMAGES.couple2, aspect: "4/3" },
            { image: MAT_IMAGES.detail7, aspect: "1/1" },
            { image: MAT_IMAGES.reel5, aspect: "3/4" },
            { image: MAT_IMAGES.detail4, aspect: "4/3" },
            { image: MAT_IMAGES.reel6, aspect: "16/10" },
            { image: MAT_IMAGES.portrait2, aspect: "3/4" },
            { image: MAT_IMAGES.atmos1, aspect: "4/3" },
          ],
        ]}
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MARQUEE — couple names that scatter their photos on hover.
   Hovering any name:
     • dims the rest of the page (fixed paper-tinted overlay),
     • renders that couple's photos in a fixed-position scatter,
     • slows the marquee animation,
     • Click → /featured/[slug].
   ───────────────────────────────────────────────────────────── */
type ScatterPos = {
  /** CSS positioning relative to the viewport. */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: number;
  rotate: number;
  delay: number;
};

const SCATTER_POSITIONS: ScatterPos[] = [
  { top: "12vh",  left: "6vw",   width: 240, rotate: -4, delay: 0    },
  { top: "18vh",  right: "8vw",  width: 300, rotate:  5, delay: 0.08 },
  { bottom: "22vh", left: "14vw", width: 220, rotate:  7, delay: 0.16 },
  { bottom: "16vh", right: "12vw", width: 280, rotate: -3, delay: 0.24 },
  { top: "44vh",  left: "42vw",  width: 200, rotate:  2, delay: 0.32 },
];

function scatterPhotos(couple: Couple) {
  if (couple.story) {
    const { hero, bride, intimateBW, pheras, closing } = couple.story.photos;
    return [hero, bride, intimateBW, pheras, closing];
  }
  return [couple.img, couple.img, couple.img, couple.img, couple.img];
}

function CoupleScatter({ couple }: { couple: Couple }) {
  const photos = scatterPhotos(couple);
  return (
    <>
      {/* Dimmer — paper tint with mild blur, fades the rest of the page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 60,
          background: "rgba(250,250,247,0.86)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      {/* Scattered photos */}
      {SCATTER_POSITIONS.map((pos, i) => {
        const photo = photos[i % photos.length];
        return (
          <motion.div
            key={`${couple.slug}-${i}`}
            initial={{ opacity: 0, scale: 0.92, rotate: pos.rotate * 0.4 }}
            animate={{ opacity: 1, scale: 1, rotate: pos.rotate }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: pos.delay,
            }}
            style={{
              position: "fixed",
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              width: pos.width,
              aspectRatio: "3/4",
              zIndex: 65,
              boxShadow: "0 30px 80px rgba(0,0,0,0.18)",
              pointerEvents: "none",
              overflow: "hidden",
              background: "#0e0e0e",
              willChange: "transform, opacity",
            }}
          >
            <MatImage
              image={photo}
              variant="Thumbnail"
              alt={`${couple.bride} sang ${couple.groom}`}
            />
          </motion.div>
        );
      })}
    </>
  );
}

function HomeMarquee() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [sectionHovered, setSectionHovered] = useState(false);
  const hovered = FEATURED.find((c) => c.slug === hoveredSlug);
  const isAnyHovered = hoveredSlug !== null;

  return (
    <section
      onMouseEnter={() => setSectionHovered(true)}
      onMouseLeave={() => {
        setSectionHovered(false);
        setHoveredSlug(null);
      }}
      style={{
        position: "relative",
        zIndex: isAnyHovered ? 70 : "auto",
        padding: "60px 0",
        background: T.paper,
        borderTop: `1px solid ${T.ink}10`,
        borderBottom: `1px solid ${T.ink}10`,
        overflow: "hidden",
      }}
      aria-label="Featured couples"
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: 24,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: T.sage,
          opacity: 0.85,
          position: "relative",
          zIndex: 75, // sit above the in-section dimmer (z 60)
        }}
      >
        Featured Couples
      </div>
      <div style={{ position: "relative", whiteSpace: "nowrap", zIndex: 75 }}>
        <div
          className={`mat-marquee-track${sectionHovered ? " is-section-hover" : ""}${isAnyHovered ? " is-name-hover" : ""}`}
          style={{
            display: "inline-flex",
            gap: 80,
            animation: "mat-marquee 48s linear infinite",
            paddingLeft: 80,
            willChange: "transform",
          }}
        >
          {[...FEATURED, ...FEATURED, ...FEATURED].map((c, i) => {
            const slug = c.slug ?? "riya-sang-mohit";
            const isHov = hoveredSlug === slug;
            const fadeOther = isAnyHovered && !isHov;
            return (
              <Link
                key={i}
                href={`/featured/${slug}`}
                onMouseEnter={() => setHoveredSlug(slug)}
                onFocus={() => setHoveredSlug(slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onBlur={() => setHoveredSlug(null)}
                aria-label={`${c.bride} sang ${c.groom} — ${c.place}`}
                style={{
                  fontFamily: SERIF,
                  fontSize: "clamp(36px, 5vw, 56px)",
                  lineHeight: 1,
                  fontWeight: 300,
                  display: "inline-flex",
                  alignItems: "baseline",
                  gap: 16,
                  color: "inherit",
                  textDecoration: "none",
                  opacity: fadeOther ? 0.28 : 1,
                  transition: "opacity 360ms ease",
                  cursor: "pointer",
                }}
              >
                <span style={{ fontStyle: "italic" }}>{c.bride}</span>
                <span
                  style={{
                    fontFamily: SERIF,
                    fontStyle: "italic",
                    color: T.sage,
                    fontSize: "0.4em",
                    alignSelf: "center",
                  }}
                >
                  sang
                </span>
                <span style={{ fontStyle: "italic" }}>{c.groom}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {hovered && <CoupleScatter key={hovered.slug} couple={hovered} />}
      </AnimatePresence>
      <style>{`
        /* Section hover (cursor anywhere in the marquee band) → slow drift. */
        .mat-marquee-track.is-section-hover { animation-duration: 110s !important; }
        /* Name hover (cursor on a specific link) → freeze so the user can click. */
        .mat-marquee-track.is-name-hover { animation-play-state: paused !important; }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RECENT — magazine-style editorial spreads. Each couple gets a
   full-width row: oversized stacked-serif name plate on sage paired
   with a tall feature photo. Layout alternates side-to-side row by row.
   Lifted from the MAT magazine PDF (Harsh / Pooja cover spread).
   ───────────────────────────────────────────────────────────── */
function CoupleSpread({
  couple,
  idx,
}: {
  couple: Couple;
  idx: number;
}) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const reverse = idx % 2 === 1; // alternate text-left/right
  const go = () => router.push(`/featured/${couple.slug ?? "riya-sang-mohit"}`);

  return (
    <motion.article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={go}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: EASE }}
      className="mat-spread"
      style={{
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: reverse ? "5fr 7fr" : "7fr 5fr",
        gap: 0,
        alignItems: "stretch",
      }}
    >
      {/* IMAGE — taller column */}
      <div
        style={{
          gridColumn: reverse ? 2 : 1,
          position: "relative",
          aspectRatio: "4/5",
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        <motion.div
          style={{ position: "absolute", inset: 0, willChange: "transform" }}
          animate={{ scale: hov ? 1.04 : 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <MatImage
            image={couple.img}
            variant="Grid"
            alt={`${couple.bride} sang ${couple.groom} — ${couple.place}`}
          />
        </motion.div>
      </div>

      {/* SAGE NAME PLATE — stacked serif names, editorial cover */}
      <div
        style={{
          gridColumn: reverse ? 1 : 2,
          gridRow: 1,
          background: T.sage,
          color: "#f1f4f3",
          padding: "48px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* subtle grain via radial gradient — matches the PDF texture */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.08) 100%)",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              opacity: 0.78,
              marginBottom: 8,
            }}
          >
            No. {String(idx + 1).padStart(2, "0")} — A story by Mi Amor Tales
          </div>
        </div>

        {/* Stacked names — the editorial money shot */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: reverse ? "flex-end" : "flex-start",
            textAlign: reverse ? "right" : "left",
            margin: "8px 0",
          }}
        >
          <span
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 7.2vw, 124px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {couple.bride}
          </span>
          <span
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(20px, 2.4vw, 32px)",
              opacity: 0.85,
              margin: "8px 0",
            }}
          >
            sang
          </span>
          <span
            style={{
              fontFamily: SERIF,
              fontWeight: 400,
              fontSize: "clamp(48px, 7.2vw, 124px)",
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            {couple.groom}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 16,
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 15,
              opacity: 0.85,
              maxWidth: 320,
              lineHeight: 1.55,
            }}
          >
            {couple.place} — three days, one quiet sit-down, every frame kept.
          </div>
          <motion.span
            animate={{ x: hov ? 6 : 0, opacity: hov ? 1 : 0.78 }}
            transition={{ duration: 0.4, ease: EASE }}
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
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

function HomeRecent() {
  const items = FEATURED.slice(0, 4);
  return (
    <section style={{ padding: "120px 40px", background: T.paper }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 64,
          gap: 32,
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
              marginBottom: 18,
            }}
          >
            Recent Work — 04 of 24
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            <span style={{ fontStyle: "italic" }}>Stories</span> kept softly
            <span style={{ color: T.sage }}>.</span>
          </motion.h2>
        </div>
        <Link
          href="/weddings"
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
          View archive →
        </Link>
      </header>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 64,
        }}
      >
        {items.map((c, i) => (
          <CoupleSpread key={i} couple={c} idx={i} />
        ))}
      </div>
      <style>{`
        @media (max-width: 880px) {
          .mat-spread { grid-template-columns: 1fr !important; }
          .mat-spread > *:first-child { aspect-ratio: 4/5 !important; }
          .mat-spread > *:nth-child(2) {
            grid-column: 1 !important;
            grid-row: auto !important;
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FULL-BLEED VIDEO REEL — looping background video with two
   serif blocks that bleed past the video's top-left and
   bottom-right corners. The text uses mix-blend-mode: difference
   so the same white renders dark on paper (outside the video)
   and white over the darker video — one colour, both readable.

   Drop a video file at /public/video/home-loop.mp4 (h264, ~6-12s
   loop, ~1080p/2-5 MB). Until then the `poster` image is shown.
   ───────────────────────────────────────────────────────────── */
function HomeVideoSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section
      className="mat-vidsection"
      style={{
        position: "relative",
        background: T.paper,
        padding: "140px 0",
        overflow: "visible",
      }}
    >
      <div
        style={{
          position: "relative",
          height: "min(72vh, 720px)",
          minHeight: 480,
          overflow: "hidden",
          background: "#0e0e0e",
        }}
      >
        {reduceMotion ? (
          <MatImage
            image={MAT_IMAGES.cinemaQuote}
            variant="Hero"
            alt=""
            filter="brightness(0.78)"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={MAT_IMAGES.cinemaQuote.publicId}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.82)",
            }}
          >
            <source src="/video/home-loop.mp4" type="video/mp4" />
            <source src="/video/home-loop.webm" type="video/webm" />
          </video>
        )}
        {/* edge darkening so the bleed text reads cleanly */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0) 65%, rgba(0,0,0,0.45) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* TOP-LEFT — bleeds across the video's top edge, half on paper,
          half on the video. mix-blend-difference auto-inverts. */}
      <div
        className="mat-vidsection-tl"
        style={{
          position: "absolute",
          top: 140, // aligns to video top edge
          left: "4%",
          transform: "translateY(-50%)",
          color: "#fff",
          mixBlendMode: "difference",
          zIndex: 2,
          maxWidth: "60vw",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: 14,
            opacity: 0.85,
          }}
        >
          A Reel — The way light moves
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(56px, 11vw, 168px)",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
          }}
        >
          Cinema
        </h2>
      </div>

      {/* BOTTOM-RIGHT — mirror of the above, bleeds across the bottom edge */}
      <div
        className="mat-vidsection-br"
        style={{
          position: "absolute",
          bottom: 140,
          right: "4%",
          transform: "translateY(50%)",
          color: "#fff",
          mixBlendMode: "difference",
          zIndex: 2,
          maxWidth: "60vw",
          textAlign: "right",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: "clamp(56px, 11vw, 168px)",
            lineHeight: 0.92,
            letterSpacing: "-0.025em",
          }}
        >
          of the unspoken
        </h2>
        <div
          style={{
            marginTop: 14,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            opacity: 0.85,
          }}
        >
          Twelve seconds, looped
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .mat-vidsection { padding: 80px 0 !important; }
          .mat-vidsection-tl { top: 80px !important; left: 6% !important; }
          .mat-vidsection-br { bottom: 80px !important; right: 6% !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   QUOTE OVER IMAGE — full-bleed cinematic frame with parallax,
   italic pull-quote sits on it like a film title card.
   ───────────────────────────────────────────────────────────── */
function HomeQuoteFrame() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-80, 80]);
  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        background: "#000",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "115%",
          y,
          willChange: "transform",
        }}
      >
        <MatImage
          image={MAT_IMAGES.cinemaQuote}
          variant="Hero"
          alt=""
          filter="brightness(0.65)"
        />
      </motion.div>
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
          alignItems: "center",
          justifyContent: "center",
          padding: "0 40px",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            marginBottom: 36,
          }}
        >
          A Note from the Couple
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          style={{
            margin: 0,
            maxWidth: 880,
            fontFamily: SERIF,
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(26px, 3.2vw, 40px)",
            lineHeight: 1.35,
          }}
        >
          &ldquo;They didn&apos;t photograph our wedding. They watched it the way our
          grandmothers watched ours — slowly, with feeling.&rdquo;
        </motion.blockquote>
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.7 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
          style={{
            marginTop: 32,
            fontFamily: SANS,
            fontSize: 11,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          <Sang size={11} latin /> Riya & Mohit, Udaipur 2025
        </motion.footer>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOSAIC — a 2x2 atmospheric image block with mixed aspect
   ratios, each image revealing on scroll.
   ───────────────────────────────────────────────────────────── */
function HomeMosaic() {
  return (
    <section style={{ padding: "140px 40px", background: T.paper }}>
      <header style={{ marginBottom: 48, textAlign: "center" }}>
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
          The way the day moves
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
          }}
        >
          <span style={{ fontStyle: "italic" }}>Three days</span>, told in light, dust, and
          marigold
          <span style={{ color: T.sage }}>.</span>
        </motion.h2>
      </header>
      <div
        className="mat-mosaic"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gridAutoRows: "minmax(260px, auto)",
          gap: 16,
        }}
      >
        <AnimatedImage
          image={MAT_IMAGES.haldi}
          aspect="auto"
          reveal="wipe-up"
          parallax={50}
          variant="Grid"
          style={{ gridColumn: "1 / 7", gridRow: "1 / 3", aspectRatio: "auto", minHeight: 540 }}
        />
        <AnimatedImage
          image={MAT_IMAGES.atmos3}
          aspect="auto"
          reveal="wipe-down"
          parallax={30}
          delay={0.1}
          variant="Grid"
          style={{ gridColumn: "7 / 13", gridRow: "1 / 2", aspectRatio: "auto" }}
        />
        <AnimatedImage
          image={MAT_IMAGES.portrait3}
          aspect="auto"
          reveal="wipe-up"
          parallax={40}
          delay={0.2}
          variant="Grid"
          style={{ gridColumn: "7 / 10", gridRow: "2 / 3", aspectRatio: "auto" }}
        />
        <AnimatedImage
          image={MAT_IMAGES.portrait4}
          aspect="auto"
          reveal="wipe-up"
          parallax={50}
          delay={0.3}
          variant="Grid"
          style={{ gridColumn: "10 / 13", gridRow: "2 / 3", aspectRatio: "auto" }}
        />
      </div>
      <style>{`
        @media (max-width: 880px) {
          .mat-mosaic {
            grid-template-columns: 1fr 1fr !important;
            grid-auto-rows: minmax(220px, auto) !important;
          }
          .mat-mosaic > * {
            grid-column: span 1 !important;
            grid-row: auto !important;
            min-height: 0 !important;
          }
          .mat-mosaic > :first-child { grid-column: span 2 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHILOSOPHY — kept restrained, single still marigold.
   ───────────────────────────────────────────────────────────── */
function PhilosophySlab() {
  return (
    <section
      style={{
        background: T.sage,
        color: "#fff",
        padding: "180px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.07,
          pointerEvents: "none",
        }}
      >
        <Marigold size={520} color="#ffffff" />
      </div>
      <div
        style={{
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          opacity: 0.7,
          marginBottom: 40,
          position: "relative",
          zIndex: 1,
        }}
      >
        A Philosophy
      </div>
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1.4, ease: EASE }}
        style={{
          margin: 0,
          maxWidth: 920,
          marginInline: "auto",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(36px, 5.5vw, 64px)",
          lineHeight: 1.14,
          position: "relative",
          zIndex: 1,
        }}
      >
        We don&apos;t capture moments. We compose{" "}
        <span
          style={{
            textDecoration: "underline",
            textDecorationThickness: "1px",
            textUnderlineOffset: "0.18em",
          }}
        >
          legacies
        </span>
        .
      </motion.p>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CTA — bordered button, hero image left as compositional anchor.
   ───────────────────────────────────────────────────────────── */
function HomeCTA() {
  return (
    <section
      className="mat-cta"
      style={{
        background: T.paperDeep,
        display: "grid",
        gridTemplateColumns: "5fr 7fr",
        alignItems: "stretch",
        borderTop: `1px solid ${T.ink}10`,
      }}
    >
      <AnimatedImage
        image={MAT_IMAGES.heroAlt}
        aspect="auto"
        reveal="wipe-right"
        parallax={50}
        variant="Grid"
        style={{ minHeight: 520, aspectRatio: "auto" }}
      />
      <div
        style={{
          padding: "120px 40px",
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
          Begin
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Tell us</span> about your day
          <span style={{ color: T.sage }}>.</span>
        </motion.h2>
        <p
          style={{
            margin: "28px 0 0",
            maxWidth: 480,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.6,
            opacity: 0.78,
          }}
        >
          Six weddings per season. The Indian winters fill before the monsoon ends.
        </p>
        <div style={{ marginTop: 48 }}>
          <Link
            href="/contact"
            style={{
              display: "inline-block",
              padding: "18px 40px",
              border: `1px solid ${T.ink}`,
              background: "transparent",
              color: T.ink,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "background 350ms ease, color 350ms ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = T.ink;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = T.ink;
            }}
          >
            Check availability
          </Link>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .mat-cta { grid-template-columns: 1fr !important; }
          .mat-cta > div:last-child { padding: 80px 32px !important; }
        }
      `}</style>
    </section>
  );
}

export function HomeClient() {
  return (
    <main>
      <HomeHero />
      <HomeTriptych />
      <HomeFilmReel />
      <HomeMarquee />
      <HomeRecent />
      <HomeVideoSection />
      <HomeMosaic />
      <PhilosophySlab />
      <HomeCTA />
    </main>
  );
}
