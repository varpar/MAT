"use client";

import React, { useEffect, useRef, useState } from "react";
import { SERIF, SANS, BODY, DISPLAY, T, LAYOUT } from "../_components/tokens";
import { useReveal } from "../_components/hooks";
import { MAT_IMAGES } from "../_components/data";
import { Marigold } from "../_components/Marigold";
import { MatImage } from "../_components/MatImage";
import { Sep } from "../_components/Punc";
import type { MatImageRecord } from "../_lib/mat-image-types";

type Person = { name: string; role: string; img: MatImageRecord };

/* Count-up — eases a number from 0 to `target` once it scrolls into view.
   Honours prefers-reduced-motion by snapping straight to the final value, so
   the counter is always correct and never animates against a visitor's
   stated preference. */
function useCountUp(target: number, run: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!run || started.current) return;
    started.current = true;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}

function StatCell({ n, label, run, first }: { n: number; label: string; run: boolean; first: boolean }) {
  const value = useCountUp(n, run);
  return (
    <div
      className="mat-stat-cell"
      style={{
        textAlign: "center",
        padding: "24px 0",
        borderLeft: first
          ? "1px solid transparent"
          : "1px solid rgba(255,255,255,0.22)",
      }}
    >
      <div
        className="mat-stat-number"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 300,
          fontSize: "clamp(48px, 5.5vw, 64px)",
          lineHeight: 1,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
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
        {label}
      </div>
    </div>
  );
}

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

/* Philosophy slice — "The Art of Noticing". MAT's brand philosophy
   statement, elevated. A large DISPLAY-serif title over a thin rule, an
   italic subtitle, then the body in the editorial serif (BODY/Times), and
   a wide-tracked uppercase closing line set apart like a signature.
   Marigold backdrop kept faint behind the text for atmosphere; legibility
   first. Reveal uses the established useReveal + CSS-transition pattern,
   which globals.css neutralises under prefers-reduced-motion. */
function PhilosophySlab() {
  const [ref, vis] = useReveal<HTMLElement>(0.2);
  const enter = (delay: number, restOpacity = 1): React.CSSProperties => ({
    opacity: vis ? restOpacity : 0,
    transform: vis ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 1.2s cubic-bezier(.2,.7,.2,1) ${delay}s, transform 1.2s cubic-bezier(.2,.7,.2,1) ${delay}s`,
  });
  const para: React.CSSProperties = {
    margin: "0 auto",
    maxWidth: LAYOUT.maxText,
    fontFamily: BODY,
    fontSize: "clamp(17px, 1.6vw, 20px)",
    lineHeight: 1.78,
    textWrap: "pretty",
  };
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="mat-philosophy"
      style={{
        background: T.paper,
        color: T.ink,
        padding: `${LAYOUT.section} ${LAYOUT.gutter}`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
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
          opacity: 0.1,
          pointerEvents: "none",
          maxWidth: "90vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Marigold size={620} color={T.sage} />
      </div>

      <div
        className="mat-philosophy-inner"
        style={{ position: "relative", zIndex: 1, marginInline: "auto", maxWidth: 880 }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 28,
            ...enter(0),
          }}
        >
          03<Sep />A Philosophy
        </div>

        <h2
          className="mat-philosophy-title"
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(40px, 7vw, 88px)",
            lineHeight: 1.02,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            textWrap: "balance",
            ...enter(0.08),
          }}
        >
          The Art of Noticing
        </h2>

        <div
          aria-hidden
          className="mat-philosophy-rule"
          style={{
            width: 72,
            height: 1,
            background: `${T.ink}40`,
            margin: "32px auto 28px",
            transformOrigin: "center",
            opacity: vis ? 1 : 0,
            transform: vis ? "scaleX(1)" : "scaleX(0)",
            transition: "opacity 1s cubic-bezier(.2,.7,.2,1) 0.2s, transform 1s cubic-bezier(.2,.7,.2,1) 0.2s",
          }}
        />

        <p
          className="mat-philosophy-subtitle"
          style={{
            margin: "0 0 56px",
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(20px, 2.6vw, 30px)",
            lineHeight: 1.3,
            textWrap: "balance",
            ...enter(0.28, 0.78),
          }}
        >
          What lingers is rarely what was planned
        </p>

        <div
          className="mat-philosophy-body"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            ...enter(0.36),
          }}
        >
          <p style={{ ...para, opacity: 0.86 }}>
            Most people remember a wedding through moments. We remember it
            through feelings. The music fades. The decorations are taken down.
            The celebrations come to an end. Yet somehow, years later, certain
            things remain. A father&apos;s trembling smile. A friend trying not
            to cry. A hand held a little tighter than usual. Words spoken
            softly, but remembered forever.
          </p>
          <p style={{ ...para, opacity: 0.86 }}>
            These moments are easy to miss because they rarely ask for
            attention. They happen in between. In the pauses between
            conversations. In the silence before an embrace. In the fleeting
            seconds that often become the memories we carry for a lifetime.
          </p>
          <p
            style={{
              ...para,
              fontStyle: "italic",
              fontFamily: SERIF,
              fontSize: "clamp(19px, 2vw, 24px)",
              opacity: 0.92,
              lineHeight: 1.5,
            }}
          >
            This is what we call the art of noticing.
          </p>
          <p style={{ ...para, opacity: 0.86 }}>
            The practice of slowing down enough to see what truly matters.
            Because time fades. But stories remain. And when a story is told
            with care, the emotions it carries never really leave us. That is
            what we believe. That is what we preserve.
          </p>
        </div>

        <div
          className="mat-philosophy-signature"
          style={{
            marginTop: 64,
            fontFamily: SANS,
            fontSize: "clamp(11px, 1.1vw, 13px)",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: T.sage,
            ...enter(0.5),
          }}
        >
          And that is what makes us Mi&nbsp;Amor
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .mat-philosophy-marigold svg {
            width: 480px !important;
            max-width: 80vw !important;
            height: auto !important;
          }
        }
        @media (max-width: 720px) {
          .mat-philosophy-marigold svg {
            width: 360px !important;
            max-width: 80vw !important;
            height: auto !important;
          }
          .mat-philosophy-signature {
            letter-spacing: 0.32em !important;
          }
        }
        @media (max-width: 414px) {
          .mat-philosophy-marigold svg {
            width: 300px !important;
            max-width: 78vw !important;
            height: auto !important;
          }
          .mat-philosophy-title {
            letter-spacing: 0.02em !important;
          }
          .mat-philosophy-signature {
            letter-spacing: 0.26em !important;
          }
        }
      `}</style>
    </section>
  );
}

export function AboutClient() {
  const [statsRef, statsVis] = useReveal<HTMLElement>(0.3);
  const stats: [number, string][] = [
    [218, "Weddings"],
    [41, "Cities"],
    [8, "Years"],
    [12, "Awards"],
  ];
  const team: Person[] = [
    { name: "Rahul Sharma",      role: "Founder",                            img: MAT_IMAGES.teamRahulSharma },
    { name: "Harshita Sharma",   role: "Creative Director",                  img: MAT_IMAGES.teamHarshitaSharma },
    { name: "Nandini Shekhawat", role: "Marketing Head",                     img: MAT_IMAGES.teamNandiniShekhawat },
    { name: "Prem Kant",         role: "Head of Cinematography & Editing",   img: MAT_IMAGES.teamPremKant },
    { name: "Akash Pandey",      role: "Head of Photography",                img: MAT_IMAGES.teamAkashPandey },
    { name: "Daksh Sharma",      role: "Head of Editing",                    img: MAT_IMAGES.teamDakshSharma },
    { name: "Rahul Yadav",       role: "Photographer",                       img: MAT_IMAGES.teamRahulYadav },
    { name: "Harshit Morwani",   role: "Video Editor",                       img: MAT_IMAGES.teamHarshitMorwani },
  ];
  return (
    <main>
      <section
        className="mat-about-hero"
        style={{
          padding: `180px ${LAYOUT.gutter} ${LAYOUT.sectionTight}`,
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
          We&apos;re storytellers
          <span style={{ color: T.sage }}>,</span>
          <br />
          quietly obsessed with the unnoticed
          <span style={{ color: T.sage }}>.</span>
        </h1>
        <style>{`
          @media (max-width: 1024px) {
            .mat-about-hero {
              padding-top: 150px !important;
            }
          }
          @media (max-width: 720px) {
            .mat-about-hero {
              padding-top: 130px !important;
            }
            .mat-about-hero-title {
              line-height: 1.0 !important;
            }
          }
          @media (max-width: 414px) {
            .mat-about-hero {
              padding-top: 120px !important;
            }
          }
        `}</style>
      </section>

      {/* Origin — near-full-bleed imagery (inset 8px off the side edges via
          LAYOUT.edge); the narrative column carries the text gutter and reads
          at LAYOUT.maxText. */}
      <section
        className="mat-origin"
        style={{
          padding: `${LAYOUT.section} ${LAYOUT.edge}`,
          background: T.paper,
          display: "grid",
          gridTemplateColumns: "5fr 7fr",
          gap: LAYOUT.gap,
          alignItems: "center",
        }}
      >
        <div
          className="mat-origin-image"
          style={{ aspectRatio: "3/4", overflow: "hidden", position: "relative" }}
        >
          <MatImage image={MAT_IMAGES.detail1} variant="Grid" alt="" />
        </div>
        <div
          className="mat-origin-copy"
          style={{ paddingInline: LAYOUT.gutter }}
        >
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
              fontFamily: DISPLAY,
              fontWeight: 300,
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
            Mi Amor Tales was never meant to be just another studio. Rahul began
            it as a place where emotion comes first<Sep />where nothing is posed,
            everything is lived, and a wedding unfolds like a film.
          </p>
          <p
            className="mat-origin-p"
            style={{
              marginTop: 18,
              fontFamily: BODY,
              fontSize: "clamp(16px, 1.5vw, 18px)",
              lineHeight: 1.7,
              maxWidth: 540,
              opacity: 0.86,
            }}
          >
            We don&apos;t document events. We hold on to feelings<Sep />honest,
            layered, yours. This is storytelling, the way it was always meant
            to be.
          </p>
        </div>
        <style>{`
          @media (max-width: 880px) {
            .mat-origin {
              grid-template-columns: 1fr !important;
            }
            .mat-origin-copy {
              max-width: 600px;
              margin-inline: auto;
            }
          }
        `}</style>
      </section>

      {/* Stats — full-width sage band, cream type. Inset 8px off the side edges
          via LAYOUT.edge so it doesn't touch the screen edges. Counters count
          up on scroll into view. */}
      <section
        ref={statsRef as React.RefObject<HTMLElement>}
        className="mat-stats-band"
        style={{
          padding: `${LAYOUT.sectionTight} ${LAYOUT.edge}`,
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
            <StatCell key={l} n={n} label={l} run={statsVis} first={i === 0} />
          ))}
        </div>
        <style>{`
          @media (max-width: 720px) {
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
            .mat-stats { gap: 28px 12px !important; }
            .mat-stat-number {
              font-size: clamp(42px, 13vw, 56px) !important;
            }
          }
        `}</style>
      </section>

      {/* Team — header (eyebrow + heading) keeps the text gutter; the photo
          grid runs near-full-bleed, inset 8px off the side edges via
          LAYOUT.edge, at LAYOUT.gap. Two rows of 4. */}
      <section
        className="mat-team-section"
        style={{ padding: `${LAYOUT.sectionTight} ${LAYOUT.edge} 0`, background: T.paper }}
      >
        <div className="mat-team-head" style={{ paddingInline: LAYOUT.gutter }}>
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
              fontFamily: DISPLAY,
              fontWeight: 300,
              fontSize: "clamp(34px, 6vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.015em",
              textWrap: "balance",
            }}
          >
            <span>Eight hands</span>
            <span style={{ color: T.sage }}>.</span> One studio
            <span style={{ color: T.sage }}>.</span>
          </h2>
        </div>
        <div
          className="mat-team"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: LAYOUT.gap,
            alignItems: "start",
          }}
        >
          {team.map((t, i) => (
            <TeamCard key={i} t={t} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            .mat-team-heading { margin: 0 0 48px !important; }
            .mat-team {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 720px) {
            .mat-team-heading { margin: 0 0 40px !important; }
          }
          @media (max-width: 600px) {
            .mat-team {
              grid-template-columns: 1fr !important;
            }
            .mat-team-card {
              text-align: center;
            }
            /* Photo sits near the edge (grid inset 8px); caption keeps the text gutter. */
            .mat-team-card .mat-team-name,
            .mat-team-card .mat-team-role {
              padding-inline: ${LAYOUT.gutter};
            }
          }
          @media (max-width: 414px) {
            .mat-team-heading { margin: 0 0 32px !important; }
          }
        `}</style>
      </section>

      <PhilosophySlab />

    </main>
  );
}
