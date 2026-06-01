"use client";

import React, { useState } from "react";
import { SERIF, SANS, BODY, T } from "../_components/tokens";
import { useReveal } from "../_components/hooks";
import { MAT_IMAGES } from "../_components/data";
import { Marigold } from "../_components/Marigold";
import { MatImage } from "../_components/MatImage";
import { Sep } from "../_components/Punc";
import type { MatImageRecord } from "../_lib/mat-image-types";

type Person = { name: string; role: string; img: MatImageRecord };

function TeamCard({ t }: { t: Person }) {
  const [hov, setHov] = useState(false);
  return (
    <article
      className="mat-team-card"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: "3/4",
          overflow: "hidden",
          background: "#222",
        }}
      >
        <MatImage
          image={t.img}
          variant="Thumbnail"
          alt={t.name}
          filter="grayscale(1)"
          style={{
            objectFit: "cover",
            transform: hov ? "scale(1.03)" : "scale(1)",
            transition: "all 1s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <div
        className="mat-team-name"
        style={{
          marginTop: 16,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: "clamp(18px, 2.2vw, 22px)",
          fontWeight: 400,
          lineHeight: 1.2,
        }}
      >
        {t.name}
      </div>
      <div
        className="mat-team-role"
        style={{
          marginTop: 4,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          opacity: 0.6,
          lineHeight: 1.4,
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
      className="mat-philosophy"
      style={{
        background: T.paper,
        color: T.ink,
        padding: "100px 40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: 720,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        aria-hidden
        className="mat-philosophy-marigold"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0.18,
          pointerEvents: "none",
          maxWidth: "90vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Marigold size={520} color={T.sage} />
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
        className="mat-philosophy-text"
        style={{
          margin: 0,
          maxWidth: 920,
          marginInline: "auto",
          fontFamily: SERIF,
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(28px, 5.5vw, 64px)",
          lineHeight: 1.14,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "all 1.4s cubic-bezier(.2,.7,.2,1)",
          position: "relative",
          zIndex: 1,
          textWrap: "balance",
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
      <style>{`
        @media (max-width: 1024px) {
          .mat-philosophy {
            min-height: 560px !important;
            padding: 80px 32px !important;
          }
          .mat-philosophy-marigold svg {
            width: 420px !important;
            height: 420px !important;
            max-width: 80vw !important;
            height: auto !important;
          }
        }
        @media (max-width: 720px) {
          .mat-philosophy {
            min-height: 460px !important;
            padding: 72px 24px !important;
          }
          .mat-philosophy-marigold svg {
            width: 320px !important;
            max-width: 78vw !important;
            height: auto !important;
          }
          .mat-philosophy-text {
            line-height: 1.18 !important;
          }
        }
        @media (max-width: 414px) {
          .mat-philosophy {
            min-height: 400px !important;
            padding: 64px 20px !important;
          }
          .mat-philosophy-marigold svg {
            width: 260px !important;
            max-width: 75vw !important;
            height: auto !important;
          }
        }
      `}</style>
    </section>
  );
}

export function AboutClient() {
  const stats: [string, string][] = [
    ["218", "Weddings"],
    ["41", "Cities"],
    ["8", "Years"],
    ["12", "Awards"],
  ];
  const team: Person[] = [
    { name: "Rahul Sharma",      role: "Founder",                            img: MAT_IMAGES.teamRahulSharma },
    { name: "Harshita Sharma",   role: "Creative Director",                  img: MAT_IMAGES.teamHarshitaSharma },
    { name: "Nandini Shekhawat", role: "Marketing Head",                     img: MAT_IMAGES.teamNandiniShekhawat },
    { name: "Prem Kant",         role: "Head of Cinematography & Editing",   img: MAT_IMAGES.teamPremKant },
    { name: "Akash Pandey",      role: "Head of Photography",                img: MAT_IMAGES.teamAkashPandey },
    { name: "Daksh Sharma",      role: "Head of Editing",                    img: MAT_IMAGES.teamDakshSharma },
    { name: "Rahul Yadav",       role: "Photographer",                       img: MAT_IMAGES.couple1 },
    { name: "Harshit Morwani",   role: "Video Editor",                       img: MAT_IMAGES.teamHarshitMorwani },
  ];
  return (
    <main>
      <section
        className="mat-about-hero"
        style={{
          padding: "180px 40px 80px",
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
          About<Sep />The Studio<Sep />Jaipur, IN
        </div>
        <h1
          className="mat-about-hero-title"
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
          We&apos;re a bunch of{" "}
          <span style={{ fontStyle: "italic" }}>curious creatives</span>
          <span style={{ color: T.sage }}>,</span>
          <br />
          obsessed with storytelling
          <span style={{ color: T.sage }}>.</span>
        </h1>
        <style>{`
          @media (max-width: 1024px) {
            .mat-about-hero {
              padding: 150px 32px 70px !important;
            }
          }
          @media (max-width: 720px) {
            .mat-about-hero {
              padding: 130px 24px 56px !important;
            }
            .mat-about-hero-title {
              line-height: 1.0 !important;
            }
          }
          @media (max-width: 414px) {
            .mat-about-hero {
              padding: 120px 20px 48px !important;
            }
          }
        `}</style>
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
        <div
          className="mat-origin-image"
          style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}
        >
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
            01<Sep />Origin
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: SERIF,
              fontWeight: 300,
              fontStyle: "italic",
              fontSize: "clamp(26px, 3.6vw, 40px)",
              lineHeight: 1.15,
              maxWidth: 540,
              textWrap: "balance",
            }}
          >
            It began with a story worth telling.
          </h2>
          <p
            className="mat-origin-p"
            style={{
              marginTop: 24,
              fontFamily: BODY,
              fontStyle: "italic",
              fontSize: "clamp(17px, 1.6vw, 19px)",
              lineHeight: 1.7,
              maxWidth: 540,
              opacity: 0.82,
            }}
          >
            Mi Amor Tales was never meant to be just another wedding photography
            company. Founded by Rahul, it was envisioned as a space where emotions
            take centre stage<Sep />where moments aren&apos;t posed but truly lived,
            and where every wedding unfolds like a timeless cinematic experience.
          </p>
          <p
            className="mat-origin-p"
            style={{
              marginTop: 18,
              fontFamily: BODY,
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.7,
              maxWidth: 540,
              opacity: 0.82,
            }}
          >
            We document weddings not as events, but as experiences<Sep />honest,
            layered, and deeply personal. Every frame is shaped by intent, every
            film carries a sense of feeling, and every story is told with the
            depth it deserves.
          </p>
          <p
            className="mat-origin-p"
            style={{
              marginTop: 18,
              fontFamily: BODY,
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.7,
              maxWidth: 540,
              opacity: 0.88,
            }}
          >
            This isn&apos;t just photography. It&apos;s storytelling, the way it
            was always meant to be.
          </p>
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-origin {
              padding: 96px 32px !important;
              gap: 48px !important;
            }
          }
          @media (max-width: 880px) {
            .mat-origin {
              grid-template-columns: 1fr !important;
              gap: 36px !important;
              padding: 80px 24px !important;
            }
            .mat-origin-image {
              max-width: 480px;
              margin-inline: auto;
              width: 100%;
            }
          }
          @media (max-width: 414px) {
            .mat-origin {
              padding: 72px 20px !important;
              gap: 32px !important;
            }
          }
        `}</style>
      </section>

      {/* Stats — sage band, cream type. */}
      <section
        className="mat-stats-band"
        style={{
          padding: "80px 40px",
          background: T.sage,
          color: T.paper,
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
              className="mat-stat-cell"
              style={{
                textAlign: "center",
                padding: "24px 0",
                borderLeft:
                  i > 0
                    ? "1px solid rgba(255,255,255,0.22)"
                    : "1px solid transparent",
              }}
            >
              <div
                className="mat-stat-number"
                style={{
                  fontFamily: SERIF,
                  fontWeight: 300,
                  fontSize: "clamp(48px, 5.5vw, 64px)",
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
                  opacity: 0.75,
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-stats-band { padding: 72px 32px !important; }
          }
          @media (max-width: 720px) {
            .mat-stats-band { padding: 64px 24px !important; }
            .mat-stats {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 32px 16px !important;
            }
            .mat-stats > div { border-left: none !important; }
            /* Re-introduce a divider between the two columns on tablet/phone
               so the band still reads as a structured strip, not a soup. */
            .mat-stat-cell:nth-child(2n) {
              border-left: 1px solid rgba(255,255,255,0.22) !important;
            }
            .mat-stat-number {
              font-size: clamp(44px, 12vw, 60px) !important;
            }
          }
          @media (max-width: 414px) {
            .mat-stats-band { padding: 56px 20px !important; }
            .mat-stats { gap: 28px 12px !important; }
            .mat-stat-number {
              font-size: clamp(42px, 13vw, 56px) !important;
            }
          }
        `}</style>
      </section>

      {/* Team — top rule, eyebrow row, centered heading, 4-column photo
          grid with name + role underneath each (8 people = two rows of 4).
          Bottom padding is 0 so the PhilosophySlab's symmetric internal
          padding produces equal visual space above and below the marigold. */}
      <section
        className="mat-team-section"
        style={{ padding: "0 40px 0", background: T.paper }}
      >
        <div
          style={{
            borderTop: `1px solid ${T.ink}20`,
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 56,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.sage,
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span>Our Team</span>
          <span>02<Sep />The Studio</span>
        </div>
        <h2
          className="mat-team-heading"
          style={{
            margin: "0 0 64px",
            textAlign: "center",
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(34px, 6vw, 72px)",
            lineHeight: 1.02,
            letterSpacing: "-0.015em",
            textWrap: "balance",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Eight hands</span>
          <span style={{ color: T.sage }}>.</span> One studio
          <span style={{ color: T.sage }}>.</span>
        </h2>
        <div
          className="mat-team"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: 32,
            rowGap: 56,
            alignItems: "start",
          }}
        >
          {team.map((t, i) => (
            <TeamCard key={i} t={t} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-team-section { padding: 0 32px 0 !important; }
            .mat-team-heading { margin: 0 0 48px !important; }
            .mat-team {
              grid-template-columns: repeat(2, 1fr) !important;
              column-gap: 28px !important;
              row-gap: 48px !important;
            }
          }
          @media (max-width: 720px) {
            .mat-team-section { padding: 0 24px 0 !important; }
            .mat-team-heading { margin: 0 0 40px !important; }
            .mat-team {
              column-gap: 20px !important;
              row-gap: 40px !important;
            }
          }
          @media (max-width: 600px) {
            .mat-team {
              grid-template-columns: 1fr !important;
              column-gap: 0 !important;
              row-gap: 40px !important;
            }
            .mat-team-card {
              max-width: 420px;
              margin-inline: auto;
              width: 100%;
              text-align: center;
            }
          }
          @media (max-width: 414px) {
            .mat-team-section { padding: 0 20px 0 !important; }
            .mat-team-heading { margin: 0 0 32px !important; }
          }
        `}</style>
      </section>

      <PhilosophySlab />

    </main>
  );
}
