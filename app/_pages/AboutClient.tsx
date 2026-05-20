"use client";

import React, { useState } from "react";
import { SERIF, SANS, T } from "../_components/tokens";
import { useReveal } from "../_components/hooks";
import { MAT_IMAGES } from "../_components/data";
import { Marigold } from "../_components/Marigold";
import { MatImage } from "../_components/MatImage";
import type { MatImageRecord } from "../_lib/mat-image-types";

type Person = { name: string; role: string; img: MatImageRecord };

function TeamCard({ t }: { t: Person }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          aspectRatio: "3/4",
          overflow: "hidden",
          background: "#222",
        }}
      >
        <MatImage
          image={t.img}
          variant="Thumbnail"
          alt={t.name}
          filter={hov ? "grayscale(0)" : "grayscale(0.4)"}
          style={{
            objectFit: "cover",
            transform: hov ? "scale(1.03)" : "scale(1)",
            transition: "all 1s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 16,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 22,
          fontWeight: 400,
        }}
      >
        {t.name}
      </div>
      <div
        style={{
          marginTop: 4,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        {t.role}
      </div>
    </article>
  );
}

function PhilosophySlab() {
  const [ref, vis] = useReveal<HTMLElement>(0.25);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
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
      <p
        style={{
          margin: 0,
          maxWidth: 920,
          marginInline: "auto",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(36px, 5.5vw, 64px)",
          lineHeight: 1.14,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "all 1.4s cubic-bezier(.2,.7,.2,1)",
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
      </p>
    </section>
  );
}

export function AboutClient() {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  const stats: [string, string][] = [
    ["218", "Weddings"],
    ["41", "Cities"],
    ["8", "Years"],
    ["12", "Awards"],
  ];
  const team: Person[] = [
    { name: "Aanya Mehra", role: "Founder · Lead Photographer", img: MAT_IMAGES.bride2 },
    { name: "Devansh Roy", role: "Cinematographer · Editor", img: MAT_IMAGES.couple3 },
    { name: "Karan Singh", role: "Second Lens · Motion", img: MAT_IMAGES.bride1 },
    { name: "Meher Joshi", role: "Studio Director", img: MAT_IMAGES.couple2 },
  ];
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
          }}
        >
          About — The Studio — Jaipur, IN
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
          We <span style={{ fontStyle: "italic" }}>sit</span> with families
          <span style={{ color: T.sage }}>,</span> before we ever lift a lens
          <span style={{ color: T.sage }}>.</span>
        </h1>
      </section>

      {/* Origin */}
      <section
        className="mat-origin"
        style={{
          padding: "120px 40px",
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: 64,
          alignItems: "center",
        }}
      >
        <div style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}>
          <MatImage image={MAT_IMAGES.detail1} variant="Grid" alt="" />
        </div>
        <div>
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
            01 — Origin
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.6vw, 40px)",
              lineHeight: 1.15,
              maxWidth: 540,
            }}
          >
            A small studio, founded after one wedding.
          </h2>
          <p
            style={{
              marginTop: 24,
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 520,
              opacity: 0.78,
            }}
          >
            In the winter of 2018, Aanya photographed her cousin&apos;s wedding in
            Bikaner with a borrowed camera. The album was passed around for months at
            family kitties, and by the next April she was photographing strangers. Mi
            Amor Tales has been a small studio ever since — six weddings a season, not
            eighty. We sit with the family, drink the chai, and then we make pictures.
          </p>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .mat-origin { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </section>

      {/* Stats */}
      <section
        style={{
          padding: "80px 40px",
          background: T.paperDeep,
        }}
      >
        <div
          className="mat-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            maxWidth: 1100,
            marginInline: "auto",
          }}
        >
          {stats.map(([n, l], i) => (
            <div
              key={l}
              style={{
                textAlign: "center",
                padding: "24px 0",
                borderLeft:
                  i > 0 ? `1px solid ${T.sage}30` : "1px solid transparent",
              }}
            >
              <div
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: "clamp(40px, 5.5vw, 64px)",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {n}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: SANS,
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  opacity: 0.65,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 720px) {
            .mat-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .mat-stats > div { border-left: none !important; }
          }
        `}</style>
      </section>

      <PhilosophySlab />

      {/* Team */}
      <section style={{ padding: "120px 40px", background: T.paper }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontSize: "clamp(32px, 4vw, 48px)",
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontStyle: "italic" }}>Four hands</span>, one studio
            <span style={{ color: T.sage }}>.</span>
          </h2>
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
            }}
          >
            02 — The Team
          </div>
        </header>
        <div
          className="mat-team"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {team.map((t, i) => (
            <TeamCard key={i} t={t} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-team { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 600px) {
            .mat-team { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* As seen in */}
      <section
        style={{
          padding: "60px 40px",
          background: T.sageLight,
          borderTop: `1px solid ${T.sage}25`,
          borderBottom: `1px solid ${T.sage}25`,
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 28,
          }}
        >
          As Seen In
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 56,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 18,
            opacity: 0.7,
            flexWrap: "wrap",
          }}
        >
          {[
            "Vogue India",
            "Brides Today",
            "WedMeGood",
            "The Knot",
            "Architectural Digest",
          ].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
