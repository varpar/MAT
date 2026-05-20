"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { SERIF, SANS, T } from "../_components/tokens";
import { useReveal } from "../_components/hooks";
import { FEATURED, type Couple } from "../_components/data";
import { MatImage } from "../_components/MatImage";

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
        style={{
          gridColumn: reverse ? 1 : 2,
          gridRow: 1,
          background: T.sage,
          color: "#f1f4f3",
          padding: "56px 40px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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

export function FeaturedIndexClient() {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  return (
    <main>
      <section
        ref={ref as React.RefObject<HTMLElement>}
        style={{
          padding: "180px 40px 80px",
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
            opacity: vis ? 1 : 0,
            transition: "opacity 800ms ease",
          }}
        >
          The Featured Index — Twenty-Four Stories
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
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s cubic-bezier(.2,.7,.2,1)",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Stories</span> we have kept
          <span style={{ color: T.sage }}>,</span> in full
          <span style={{ color: T.sage }}>.</span>
        </h1>
        <p
          style={{
            margin: "32px auto 0",
            maxWidth: 580,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 19,
            lineHeight: 1.55,
            opacity: vis ? 0.78 : 0,
            transition: "opacity 1s ease 0.2s",
          }}
        >
          A curated room of weddings we return to often. Each opens into its full
          cinematic page — mehendi, sindoor, the three days.
        </p>
      </section>
      <section style={{ padding: "40px 40px 160px", background: T.paper }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {FEATURED.map((c, i) => (
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
    </main>
  );
}
