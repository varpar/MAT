"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { SERIF, SANS, BODY, DISPLAY, T } from "../_components/tokens";
import { FEATURED, type Couple } from "../_components/data";
import { MatImage } from "../_components/MatImage";
import { Sep } from "../_components/Punc";
import { Sang } from "../_components/Sang";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/* ─────────────────────────────────────────────────────────────
   Editorial spread per couple — sage name-plate beside a tall
   feature photo. Layout alternates side-to-side. Lifted from the
   MAT magazine PDF (Harsh / Pooja cover spread, page 10).
   ───────────────────────────────────────────────────────────── */
function CoupleSpread({ couple, idx }: { couple: Couple; idx: number }) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const reverse = idx % 2 === 1;
  const go = () => router.push(`/featured/${couple.slug ?? "riya-sang-mohit"}`);

  return (
    <motion.article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={go}
      data-cursor="Read story"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: EASE }}
      className={`mat-spread ${reverse ? "mat-spread-reverse" : ""}`}
      style={{
        cursor: "pointer",
        display: "grid",
        gridTemplateColumns: reverse ? "5fr 7fr" : "7fr 5fr",
        gap: 0,
        alignItems: "stretch",
      }}
    >
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

      <div
        className="mat-spread-pane"
        style={{
          gridColumn: reverse ? 1 : 2,
          gridRow: 1,
          background: T.sage,
          color: "#f1f4f3",
          padding: "clamp(36px, 4.5vw, 56px) clamp(24px, 3.6vw, 40px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(420px, 56vw, 640px)",
        }}
      >
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

        {/* Top eyebrow — sits above the names so the green pane reads
            balanced top→middle→bottom instead of empty above the title. */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 8,
            alignItems: reverse ? "flex-end" : "flex-start",
            textAlign: reverse ? "right" : "left",
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: "#f1f4f3",
          }}
        >
          <span style={{ opacity: 0.92 }}>A Mi Amor Tales Story</span>
          <span style={{ opacity: 0.7 }}>
            No. {String(idx + 1).padStart(2, "0")}<Sep />January 2026
          </span>
        </div>

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
              display: "inline-flex",
              opacity: 0.92,
              margin: "10px 0",
            }}
          >
            <Sang size={26} color="#f4f7f7" accent={T.cream} />
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
          className="mat-spread-foot"
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
              fontFamily: BODY,
              fontStyle: "italic",
              fontSize: "clamp(14px, 1.4vw, 16px)",
              opacity: 0.85,
              maxWidth: 320,
              lineHeight: 1.55,
            }}
          >
            {couple.place}<Sep />three days, one quiet sit-down, every frame kept.
          </div>
          <motion.span
            className="mat-spread-cta"
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
              minHeight: 44,
              display: "inline-flex",
              alignItems: "center",
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
   Video hero — a looping feature reel with tastefully overlaid
   billing + title. Lighter and more cohesive with the paper-
   background rest of the site than the old all-black title card.
   Reduced-motion users get a static FEATURED cover image instead
   of the video. White text uses mixBlendMode:"difference" so it
   stays legible over both light and dark footage; a bottom scrim
   reinforces the lower billing block.
   ───────────────────────────────────────────────────────────── */
/**
 * Featured hero — just the video and the word FEATURED.
 *
 * The video loads first; once it's ready to play, the letters of
 * "FEATURED" animate in one by one. Under prefers-reduced-motion we
 * skip the video for a static cover image and the word lands instantly.
 */
function VideoHero() {
  const reduce = useReducedMotion();
  const cover = FEATURED[0]?.img;
  const [videoReady, setVideoReady] = useState(false);

  // Under reduced motion there is no video event to wait on — let the
  // word render immediately. (Effect, not initial state, so the value
  // tracks the hook even when it resolves after first render.)
  useEffect(() => {
    if (reduce) setVideoReady(true);
  }, [reduce]);

  const word = "FEATURED";
  const letters = Array.from(word);

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.18,
      },
    },
  };
  const letter = reduce
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 22 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      };

  return (
    <section
      className="mat-feat-hero"
      style={{
        position: "relative",
        height: "clamp(560px, 80vh, 860px)",
        background: T.ink,
        overflow: "hidden",
      }}
    >
      {/* Media — looping video, or a static cover under reduced motion */}
      <div style={{ position: "absolute", inset: 0 }}>
        {reduce ? (
          cover ? (
            <MatImage
              image={cover}
              variant="Hero"
              alt="Mi Amor Tales — featured weddings"
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: T.ink }} />
          )
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/video/featured-loop.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* Subtle scrim — keeps the letters readable and eases the section
          into the paper rows below. */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(14,14,14,0.28) 0%, rgba(14,14,14,0.04) 35%, rgba(14,14,14,0.08) 65%, rgba(14,14,14,0.55) 100%)",
          zIndex: 2,
        }}
      />

      {/* FEATURED — letter by letter, after the video is ready */}
      <motion.h1
        aria-label="Featured"
        initial="hidden"
        animate={videoReady ? "show" : "hidden"}
        variants={container}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          margin: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: "clamp(64px, 14vw, 220px)",
          lineHeight: 1,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#ffffff",
          mixBlendMode: "difference",
          pointerEvents: "none",
        }}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            aria-hidden
            variants={letter}
            style={{
              display: "inline-block",
              willChange: "transform, opacity",
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  );
}

export function FeaturedIndexClient() {
  return (
    <main>
      <VideoHero />
      <section
        className="mat-feat-list"
        style={{ padding: "clamp(28px, 4vw, 40px) clamp(16px, 3vw, 24px) clamp(80px, 12vw, 160px)", background: T.paper }}
      >
        <div
          className="mat-feat-list-inner"
          style={{ display: "flex", flexDirection: "column", gap: "clamp(40px, 6vw, 64px)" }}
        >
          {FEATURED.map((c, i) => (
            <CoupleSpread key={i} couple={c} idx={i} />
          ))}
        </div>
        <style>{`
          /* Featured video hero — keep section short on narrow viewports
             so it doesn't dominate above the fold on mobile. */
          @media (max-width: 720px) {
            .mat-feat-hero { height: clamp(320px, 56vh, 520px) !important; }
          }

          /* CoupleSpread — stacked, image on top, sage pane below.
             Preserves the top-eyebrow / middle-names / bottom-place rhythm
             vertically. The reverse variant collapses to the same stack. */
          @media (max-width: 880px) {
            .mat-spread { grid-template-columns: 1fr !important; }
            .mat-spread > *:first-child {
              aspect-ratio: 4/5 !important;
              grid-column: 1 !important;
              grid-row: 1 !important;
            }
            .mat-spread > *:nth-child(2) {
              grid-column: 1 !important;
              grid-row: 2 !important;
              min-height: clamp(420px, 90vw, 560px) !important;
            }
            /* Always align stacked panel content left, regardless of reverse */
            .mat-spread-pane > div { align-items: flex-start !important; text-align: left !important; }
            /* Force the read-cta to be visible on touch (no hover) */
            .mat-spread-cta { opacity: 1 !important; transform: none !important; }
          }
          @media (max-width: 540px) {
            .mat-spread-foot { flex-direction: column !important; align-items: flex-start !important; gap: 18px !important; }
            .mat-spread-foot > div { max-width: 100% !important; }
          }
          /* Touch devices: surface the read-the-story affordance permanently. */
          @media (hover: none) {
            .mat-spread-cta { opacity: 1 !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
