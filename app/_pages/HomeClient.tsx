"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { SERIF, SANS, BODY, DISPLAY, T, LAYOUT } from "../_components/tokens";
import { Sang } from "../_components/Sang";
import { FEATURED, MAT_IMAGES, type Couple } from "../_components/data";
import type { MatImageRecord } from "../_lib/mat-image-types";
import { AnimatedImage } from "../_components/AnimatedImage";
import { FilmStrip } from "../_components/FilmStrip";
import { MatImage } from "../_components/MatImage";
import { Sep } from "../_components/Punc";

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
      className="mat-hero"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 640,
        background: T.paper,
        paddingInline: LAYOUT.edge,
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
        className="mat-hero-foot"
        style={{
          position: "absolute",
          left: LAYOUT.gutter,
          right: LAYOUT.gutter,
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
            fontSize: "clamp(22px, 3.2vw, 40px)",
            lineHeight: 1.18,
            textWrap: "balance",
          }}
        >
          Moments that don&apos;t just look good. They feel right.
        </motion.p>
        <motion.div
          className="mat-hero-scroll"
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
            flexShrink: 0,
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
      <style>{`
        @media (max-width: 1024px) {
          .mat-hero-foot { bottom: 48px !important; gap: 24px !important; }
        }
        @media (max-width: 720px) {
          .mat-hero { min-height: 560px !important; }
          .mat-hero-foot {
            bottom: 40px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
        }
        @media (max-width: 480px) {
          .mat-hero { min-height: 520px !important; }
          .mat-hero-foot { bottom: 32px !important; }
          .mat-hero-scroll { display: none !important; }
        }
      `}</style>
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
      className="mat-tript-sec"
      style={{
        padding: `${LAYOUT.section} ${LAYOUT.edge}`,
        background: T.paper,
      }}
    >
      <div
        className="mat-tript"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: LAYOUT.gap,
          alignItems: "stretch",
        }}
      >
        <AnimatedImage
          image={MAT_IMAGES.collage1}
          aspect="3/4"
          reveal="wipe-up"
          parallax={40}
          delay={0}
          variant="Grid"
        />
        <div
          className="mat-tript-copy"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: `40px ${LAYOUT.gutterTight}`,
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
            Studio, Jaipur<Sep />est. 2018
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(32px, 4.2vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-0.015em",
              maxWidth: 420,
            }}
          >
            <span>
              We don&apos;t direct your day
            </span>
            <span style={{ color: T.sage }}>.</span> We follow it like a heartbeat
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
              fontFamily: BODY,
              fontStyle: "italic",
              fontSize: 19,
              lineHeight: 1.6,
              textWrap: "balance",
            }}
          >
            Documentary photography<Sep />Cinematic films<Sep />Edited like an album, not a feed.
          </motion.p>
        </div>
        <AnimatedImage
          image={MAT_IMAGES.portrait2}
          aspect="3/4"
          reveal="wipe-up"
          parallax={40}
          delay={0.15}
          variant="Grid"
        />
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .mat-tript { grid-template-columns: 1fr 1fr !important; }
          .mat-tript-copy {
            grid-column: 1 / -1 !important;
            order: -1;
            padding-left: 0 !important;
            padding-right: 0 !important;
            margin-bottom: 40px;
          }
        }
        @media (max-width: 720px) {
          .mat-tript { grid-template-columns: 1fr !important; gap: ${LAYOUT.gap} !important; }
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
  const [strip, setStrip] = useState<{ heights: number[]; rows: number }>({
    heights: [320, 260, 300, 240],
    rows: 4,
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = window.innerWidth;
      if (w <= 480) setStrip({ heights: [180, 160], rows: 2 });
      else if (w <= 720) setStrip({ heights: [220, 180, 200], rows: 3 });
      else if (w <= 1024) setStrip({ heights: [260, 220, 240, 200], rows: 4 });
      else setStrip({ heights: [320, 260, 300, 240], rows: 4 });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const allRows = [
    // Row 1 — wide cinematic frames (left → right)
    [
      { image: MAT_IMAGES.reel1, aspect: "16/10" },
      { image: MAT_IMAGES.collage2, aspect: "4/3" },
      { image: MAT_IMAGES.collage4, aspect: "16/10" },
      { image: MAT_IMAGES.haldi, aspect: "4/3" },
      { image: MAT_IMAGES.reel3, aspect: "16/10" },
      { image: MAT_IMAGES.couple3, aspect: "4/3" },
      { image: MAT_IMAGES.detail1, aspect: "16/10" },
    ],
    // Row 2 — portraits + details (right → left)
    [
      { image: MAT_IMAGES.collage1, aspect: "3/4" },
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
      { image: MAT_IMAGES.collage5, aspect: "4/3" },
      { image: MAT_IMAGES.collage6, aspect: "16/10" },
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
      { image: MAT_IMAGES.collage3, aspect: "1/1" },
      { image: MAT_IMAGES.reel5, aspect: "3/4" },
      { image: MAT_IMAGES.detail4, aspect: "4/3" },
      { image: MAT_IMAGES.reel6, aspect: "16/10" },
      { image: MAT_IMAGES.portrait2, aspect: "3/4" },
      { image: MAT_IMAGES.atmos1, aspect: "4/3" },
    ],
  ];
  const allTravels = [0.55, 0.8, 0.45, 0.95];

  return (
    <section
      className="mat-reel-sec"
      style={{
        background: T.paper,
        padding: `${LAYOUT.sectionTight} 0 ${LAYOUT.section}`,
      }}
    >
      <div
        className="mat-reel-head"
        style={{
          padding: `0 ${LAYOUT.gutter}`,
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
          From the reel<Sep />2024 to 2026
        </div>
        <div
          style={{
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 16,
            opacity: 0.65,
          }}
        >
          a few frames from the last two seasons
        </div>
      </div>
      <div style={{ paddingInline: LAYOUT.edge }}>
        <FilmStrip
          heights={strip.heights}
          travels={allTravels.slice(0, strip.rows)}
          rows={allRows.slice(0, strip.rows)}
        />
      </div>
      <style>{`
        @media (max-width: 720px) {
          .mat-reel-head { margin-bottom: 24px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MARQUEE — couple names. Hovering any name dims the rest of the
   page (fixed paper-tinted overlay) and surfaces a single
   "View Story" call-to-action. Click anywhere on the name to
   navigate to /featured/[slug].
   ───────────────────────────────────────────────────────────── */
function CouplePreview() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE }}
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
    </>
  );
}

function HomeMarquee() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const hovered = FEATURED.find((c) => c.slug === hoveredSlug);
  const isAnyHovered = hoveredSlug !== null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (hoveredSlug !== null) {
      document.body.setAttribute("data-marquee-preview", "true");
    } else {
      document.body.removeAttribute("data-marquee-preview");
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.removeAttribute("data-marquee-preview");
      }
    };
  }, [hoveredSlug]);

  return (
    <section
      className="mat-marquee-sec"
      onMouseLeave={() => setHoveredSlug(null)}
      style={{
        position: "relative",
        zIndex: isAnyHovered ? 70 : "auto",
        padding: `${LAYOUT.sectionTight} 0`,
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
          className={`mat-marquee-track${isAnyHovered ? " is-name-hover" : ""}`}
          style={{
            display: "inline-flex",
            gap: 80,
            animation: "mat-marquee 64s linear infinite",
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
                onMouseEnter={isTouch ? undefined : () => setHoveredSlug(slug)}
                onFocus={isTouch ? undefined : () => setHoveredSlug(slug)}
                onMouseLeave={isTouch ? undefined : () => setHoveredSlug(null)}
                onBlur={isTouch ? undefined : () => setHoveredSlug(null)}
                aria-label={`${c.bride} sang ${c.groom} — ${c.place}`}
                data-cursor="View story"
                className="mat-marquee-link"
                style={{
                  fontFamily: DISPLAY,
                  textTransform: "uppercase",
                  fontSize: "clamp(32px, 5vw, 56px)",
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
                  paddingTop: 12,
                  paddingBottom: 12,
                  minHeight: 44,
                }}
              >
                <span>{c.bride}</span>
                <span style={{ alignSelf: "center", display: "inline-flex" }}>
                  <Sang size={22} />
                </span>
                <span>{c.groom}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <AnimatePresence>
        {hovered && !isTouch && <CouplePreview key={hovered.slug} />}
      </AnimatePresence>
      <style>{`
        /* Name hover (cursor on a specific link) → freeze so the user can click. */
        .mat-marquee-track.is-name-hover { animation-play-state: paused !important; }
        @media (max-width: 1024px) {
          .mat-marquee-track { gap: 56px !important; padding-left: 56px !important; }
        }
        @media (max-width: 720px) {
          .mat-marquee-track {
            gap: 40px !important;
            padding-left: 40px !important;
            animation-duration: 48s !important;
          }
          .mat-marquee-link { gap: 10px !important; }
        }
        @media (max-width: 480px) {
          .mat-marquee-track { gap: 32px !important; padding-left: 32px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RECENT — staircase grid. Each row has 3 tiles capped at ~30vw;
   the 2nd descends by 20% of its own height, the 3rd by 40%.
   Hover reveals the couple name + CTA; click navigates to story.
   ───────────────────────────────────────────────────────────── */
function CoupleTile({
  couple,
  step,
}: {
  couple: Couple;
  step: 0 | 1 | 2;
}) {
  const [hov, setHov] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const router = useRouter();
  const go = () => router.push(`/featured/${couple.slug ?? "riya-sang-mohit"}`);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  // On touch devices, the hover veil never appears — surface caption by default
  const showCaption = hov || isTouch;

  return (
    <motion.article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={go}
      data-cursor="Open story"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: EASE, delay: step * 0.08 }}
      className="mat-stair"
      style={{
        cursor: "pointer",
        position: "relative",
        aspectRatio: "3/4",
        overflow: "hidden",
        background: "#0e0e0e",
      }}
    >
      <motion.div
        style={{ position: "absolute", inset: 0, willChange: "transform" }}
        animate={{ scale: hov ? 1.05 : 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <MatImage
          image={couple.img}
          variant="Grid"
          alt={`${couple.bride} sang ${couple.groom} — ${couple.place}`}
        />
      </motion.div>

      {/* HOVER VEIL — sage wash + names + CTA */}
      <motion.div
        animate={{ opacity: showCaption ? 1 : 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(67,108,103,0) 0%, rgba(67,108,103,0.05) 35%, rgba(20,28,27,0.78) 100%)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        animate={{ opacity: showCaption ? 1 : 0, y: showCaption ? 0 : 12 }}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "28px 26px 24px",
          color: "#f4f7f7",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 9,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            opacity: 0.78,
            marginBottom: 12,
          }}
        >
          A story by Mi Amor Tales
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            textTransform: "uppercase",
            fontSize: "clamp(23px, 2.5vw, 34px)",
            lineHeight: 1.05,
            letterSpacing: "0",
          }}
        >
          {couple.bride}{" "}
          <Sang size={20} color="#f4f7f7" accent={T.cream} />{" "}
          {couple.groom}
        </h3>
        <div
          style={{
            marginTop: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 13,
              opacity: 0.85,
            }}
          >
            {couple.place}
          </div>
          <span
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              borderBottom: "1px solid rgba(255,255,255,0.55)",
              paddingBottom: 3,
              whiteSpace: "nowrap",
            }}
          >
            Read →
          </span>
        </div>
      </motion.div>
    </motion.article>
  );
}

function HomeRecent() {
  const items = FEATURED.slice(0, 6);
  const rows: Couple[][] = [];
  for (let i = 0; i < items.length; i += 3) rows.push(items.slice(i, i + 3));

  return (
    <section className="mat-recent-sec" style={{ padding: `${LAYOUT.section} 0`, background: T.paper }}>
      <header
        className="mat-recent-head"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: 80,
          padding: `0 ${LAYOUT.gutter}`,
          gap: 28,
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
            Best Six Couples<Sep />{String(items.length).padStart(2, "0")} of 24
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: EASE }}
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(36px, 4.6vw, 58px)",
              lineHeight: 1.02,
              letterSpacing: "-0.005em",
            }}
          >
            Six we hold closest<span style={{ color: T.sage }}>.</span>
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
            paddingTop: 14,
            paddingBottom: 4,
            borderBottom: `1px solid ${T.ink}`,
            display: "inline-flex",
            alignItems: "center",
            minHeight: 44,
          }}
        >
          View archive →
        </Link>
      </header>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: LAYOUT.gap,
          paddingInline: LAYOUT.edge,
        }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="mat-stair-row"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              alignItems: "flex-start",
              gap: LAYOUT.gap,
            }}
          >
            {row.map((c, ci) => (
              <CoupleTile
                key={c.slug ?? `${ri}-${ci}`}
                couple={c}
                step={ci as 0 | 1 | 2}
              />
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mat-recent-head { margin-bottom: 64px !important; }
          .mat-stair-row { grid-template-columns: 1fr 1fr !important; }
          .mat-stair { margin-top: 0 !important; }
        }
        @media (max-width: 880px) {
          .mat-stair-row { grid-template-columns: 1fr !important; }
          .mat-stair { margin-top: 0 !important; }
        }
        @media (max-width: 720px) {
          .mat-recent-head { margin-bottom: 48px !important; gap: 20px !important; }
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
        padding: `${LAYOUT.section} ${LAYOUT.edge}`,
        overflow: "visible",
      }}
    >
      <div
        className="mat-vidsection-frame"
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

      <style>{`
        @media (max-width: 1024px) {
          .mat-vidsection-frame { height: min(60vh, 560px) !important; min-height: 380px !important; }
        }
        @media (max-width: 720px) {
          .mat-vidsection-frame { height: min(56vh, 460px) !important; min-height: 320px !important; }
        }
        @media (max-width: 480px) {
          .mat-vidsection-frame { height: 56vh !important; min-height: 280px !important; }
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
      className="mat-quote-frame"
      style={{
        position: "relative",
        height: "100svh",
        minHeight: 600,
        background: T.paper,
        paddingInline: LAYOUT.edge,
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
        className="mat-quote-inner"
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
            textWrap: "balance",
          }}
        >
          &ldquo;They didn&apos;t photograph our wedding. They watched it the way our
          grandmothers watched ours<Sep />slowly, with feeling.&rdquo;
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
      <style>{`
        @media (max-width: 720px) {
          .mat-quote-frame { min-height: 520px !important; }
          .mat-quote-inner { padding: 0 24px !important; }
        }
        @media (max-width: 480px) {
          .mat-quote-frame { min-height: 480px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   MOSAIC — a 2x2 atmospheric image block with mixed aspect
   ratios, each image revealing on scroll.
   ───────────────────────────────────────────────────────────── */
function HomeMosaic() {
  return (
    <section className="mat-mosaic-sec" style={{ padding: `${LAYOUT.section} 0`, background: T.paper }}>
      <header className="mat-mosaic-head" style={{ marginBottom: 48, padding: `0 ${LAYOUT.gutter}`, textAlign: "center" }}>
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
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 48px)",
            lineHeight: 1.1,
          }}
        >
          <span>Three days</span>, told in light, dust, and
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
          gap: LAYOUT.gap,
          paddingInline: LAYOUT.edge,
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
        @media (max-width: 1024px) {
          .mat-mosaic-head { margin-bottom: 40px !important; }
          .mat-mosaic > :first-child { min-height: 420px !important; }
        }
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
          .mat-mosaic > :first-child { grid-column: span 2 !important; min-height: 360px !important; }
        }
        @media (max-width: 720px) {
          .mat-mosaic { grid-auto-rows: minmax(180px, auto) !important; }
        }
        @media (max-width: 480px) {
          .mat-mosaic { grid-template-columns: 1fr !important; }
          .mat-mosaic > :first-child { grid-column: span 1 !important; min-height: 320px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOCATIONS — five wedding venues told as an editorial spread.
   Each venue is a full alternating image/text row: an image-forward
   reveal on one side, the venue name (DISPLAY), a city label and the
   complete write-up in BODY on the other. Rows mirror left/right
   down the page so it reads like flipping a magazine.

   NOTE: the photos below are STAND-INS drawn from existing wedding
   image records — they are venue/architecture-evocative frames, not
   official venue press shots. Swap each `image` for a real photo of
   the named venue when the client supplies them.

   Image mapping (existing MAT_IMAGES slots only — no new data.ts slots):
     • Fairmont Jaipur     → aoWall1  (Anvesha sang Omkar — wedding was at
                                       Fairmont; candle-lit colonnade walkway)
     • ITC Mementos Udaipur→ atmos1   (B&W aerial courtyard — scenic stand-in,
                                       no couple tied to this venue yet)
     • Ananta              → atmos3   (036-…ananta — fog-lit chhatri stage)
     • ITC Agra            → reel1    (Harsh sang Pooja — wedding was at ITC
                                       Mughal, Agra; B&W Mughal colonnade)
     • Anantara            → vvHero   (Varun sang Vanya — wedding was at
                                       Anantara, Jaipur; chandelier ballroom)
   ───────────────────────────────────────────────────────────── */
type Venue = {
  name: string;
  city: string;
  image: MatImageRecord;
  body: string;
};

const HOME_VENUES: Venue[] = [
  {
    name: "Fairmont Jaipur",
    city: "Jaipur, Rajasthan",
    image: MAT_IMAGES.aoWall1,
    body:
      "Fairmont Jaipur has been the backdrop to some of the most unforgettable stories we've had the privilege of documenting. Grand in scale yet remarkably intimate in experience, it has a way of holding celebration and emotion in equal measure. Across its courtyards, gardens, and sweeping architecture, we've witnessed quiet moments before ceremonies, laughter carried across generations, and dance floors that seemed to keep going long after the music ended. Every wedding feels different here, yet the atmosphere remains unmistakable — a sense of occasion, warmth, and grandeur that allows every story to unfold with remarkable ease. For us, Fairmont is not simply a venue. It is a place where memories seem larger, emotions linger longer, and every chapter feels worthy of being remembered.",
  },
  {
    name: "ITC Mementos, Udaipur",
    city: "Udaipur, Rajasthan",
    image: MAT_IMAGES.atmos1,
    body:
      "Set against the lakes, hills, and open landscapes of Udaipur, ITC Mementos offers a setting that feels beautifully removed from the pace of everyday life. The celebrations we've documented here have always carried a sense of ease where conversations linger a little longer, sunsets become part of the experience, and every moment seems to unfold at its own rhythm. Surrounded by nature yet elevated in every detail, the venue creates space for both intimacy and grandeur to exist together. What remains most memorable, however, is not the view or the architecture, but the way stories seem to settle into the landscape itself, becoming part of the place long after the celebrations have ended.",
  },
  {
    name: "Ananta",
    city: "Pushkar, Rajasthan",
    image: MAT_IMAGES.atmos3,
    body:
      "By the time a celebration reaches its final evening, Ananta rarely feels like a venue anymore. It begins to feel like a world built entirely around the people gathered within it. Over the years, we've documented weddings here that unfolded with remarkable freedom, where laughter travelled easily, emotions surfaced naturally, and every chapter seemed connected to the next. The result is not simply a collection of events, but a story that feels immersive from beginning to end, shaped as much by the people as the place itself.",
  },
  {
    name: "ITC Agra",
    city: "Agra, Uttar Pradesh",
    image: MAT_IMAGES.reel1,
    body:
      "ITC Agra has a way of making a celebration feel larger than the moments themselves. The weddings we've documented here are remembered not only for their beauty, but for the feeling they leave behind — the feeling of being completely present with the people who matter most. Across every gathering, every conversation, and every quiet pause between events, the venue creates an atmosphere that allows memories to form naturally and linger long after the celebrations have ended. And just beyond it all, the Taj Mahal appears on the horizon, adding a quiet reminder that the stories we carry forward are often the ones rooted in love, connection, and time. Together, they create an experience that feels both deeply personal and impossible to forget.",
  },
  {
    name: "Anantara",
    city: "Jaipur, Rajasthan",
    image: MAT_IMAGES.vvHero,
    body:
      "Anantara invites people to slow down and experience a celebration fully. The weddings we've documented here have always felt deeply immersive, where every detail contributes to a larger story and every moment has space to unfold naturally. There is an effortless balance between intimacy and luxury that shapes the experience, allowing guests to feel connected not only to the celebration, but to one another. Long after the festivities end, what remains is not simply the memory of a beautiful venue, but the feeling of having been part of something meaningful, personal, and unforgettable.",
  },
];

function VenueRow({ venue, index }: { venue: Venue; index: number }) {
  const reduceMotion = useReducedMotion();
  const flipped = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className={`mat-venue-row${flipped ? " is-flipped" : ""}`}>
      <div className="mat-venue-img">
        <AnimatedImage
          image={venue.image}
          aspect="auto"
          reveal={flipped ? "wipe-left" : "wipe-right"}
          parallax={40}
          variant="Grid"
          alt={`${venue.name} — ${venue.city}`}
          style={{ minHeight: 520, aspectRatio: "auto", height: "100%" }}
        />
      </div>
      <div className="mat-venue-copy">
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 24,
          }}
        >
          <span>{num}</span>
          <span
            aria-hidden
            style={{ width: 36, height: 1, background: `${T.sage}66` }}
          />
          <span>Venue</span>
        </motion.div>
        <motion.h3
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.06 }}
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(30px, 3.6vw, 48px)",
            lineHeight: 1.04,
            letterSpacing: "-0.01em",
          }}
        >
          {venue.name}
          <span style={{ color: T.sage }}>.</span>
        </motion.h3>
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1, ease: EASE, delay: 0.12 }}
          style={{
            marginTop: 14,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 16,
            opacity: 0.7,
          }}
        >
          {venue.city}
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.82 }}
          viewport={{ once: true, margin: "-12%" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.18 }}
          style={{
            margin: "28px 0 0",
            maxWidth: 540,
            fontFamily: BODY,
            fontSize: 17,
            lineHeight: 1.7,
            textWrap: "pretty",
          }}
        >
          {venue.body}
        </motion.p>
      </div>

      <style>{`
        .mat-venue-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
          gap: clamp(32px, 4vw, 64px);
        }
        .mat-venue-row.is-flipped .mat-venue-img { order: 2; }
        .mat-venue-row.is-flipped .mat-venue-copy { order: 1; }
        .mat-venue-img { min-height: 520px; }
        /* Photo bleeds to the viewport edge; copy carries the text gutter so
           reading copy never touches the edge. Flipped rows mirror the side. */
        .mat-venue-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: ${LAYOUT.gutter};
        }
        .mat-venue-row.is-flipped .mat-venue-copy {
          padding-right: 0;
          padding-left: ${LAYOUT.gutter};
        }
        @media (max-width: 1024px) {
          .mat-venue-img { min-height: 460px; }
        }
        @media (max-width: 880px) {
          .mat-venue-row {
            grid-template-columns: 1fr;
          }
          .mat-venue-row.is-flipped .mat-venue-img { order: 0; }
          .mat-venue-row.is-flipped .mat-venue-copy { order: 0; }
          .mat-venue-img { min-height: 380px; }
          /* Stacked: copy gets a symmetric gutter, photo still bleeds full-width. */
          .mat-venue-copy,
          .mat-venue-row.is-flipped .mat-venue-copy {
            padding: 0 ${LAYOUT.gutter};
          }
        }
        @media (max-width: 480px) {
          .mat-venue-img { min-height: 320px; }
        }
      `}</style>
    </div>
  );
}

function HomeLocations() {
  return (
    <section
      className="mat-loc-sec"
      style={{ padding: `${LAYOUT.section} 0`, background: T.paper }}
    >
      <header
        className="mat-loc-head"
        style={{ marginBottom: 80, padding: `0 ${LAYOUT.gutter}`, textAlign: "center" }}
      >
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
          Locations<Sep />Five we return to
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(36px, 4.6vw, 58px)",
            lineHeight: 1.02,
            letterSpacing: "-0.005em",
          }}
        >
          Where the stories unfold<span style={{ color: T.sage }}>.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.75 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.12 }}
          style={{
            margin: "26px auto 0",
            maxWidth: 540,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 19,
            lineHeight: 1.6,
            textWrap: "balance",
          }}
        >
          The palaces, courtyards and ballrooms that have held our couples&apos;
          closest moments.
        </motion.p>
      </header>

      <div
        className="mat-loc-list"
        style={{ display: "flex", flexDirection: "column", gap: LAYOUT.section, paddingInline: LAYOUT.edge }}
      >
        {HOME_VENUES.map((v, i) => (
          <VenueRow key={v.name} venue={v} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mat-loc-head { margin-bottom: 64px !important; }
        }
        @media (max-width: 720px) {
          .mat-loc-head { margin-bottom: 48px !important; }
        }
      `}</style>
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
        paddingLeft: 0,
        paddingRight: LAYOUT.edge,
      }}
    >
      <AnimatedImage
        image={MAT_IMAGES.heroAlt}
        aspect="auto"
        reveal="wipe-right"
        parallax={50}
        variant="Grid"
        className="mat-cta-img"
        style={{ minHeight: 520, aspectRatio: "auto" }}
      />
      <div
        className="mat-cta-copy"
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
          Begin
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 300,
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-0.015em",
          }}
        >
          <span>Tell us</span> about your day
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
            textWrap: "balance",
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
              minHeight: 44,
              lineHeight: 1,
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
          .mat-cta-img { min-height: 400px !important; }
        }
        @media (max-width: 720px) {
          .mat-cta-img { min-height: 340px !important; }
        }
        @media (max-width: 480px) {
          .mat-cta-img { min-height: 280px !important; }
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
      <HomeLocations />
      <HomeCTA />
    </main>
  );
}
