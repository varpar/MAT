"use client";

import React from "react";
import Link from "next/link";
import { SERIF, SANS, SCRIPT, T } from "../_components/tokens";
import { Sang } from "../_components/Sang";
import { useReveal, useScrollProgress } from "../_components/hooks";
import { MAT_IMAGES, RITUALS, type Couple } from "../_components/data";
import { MehendiSVG } from "../_components/MehendiSVG";
import { SelectiveColorImage } from "../_components/SelectiveColorImage";
import { VinylIcon } from "../_components/Icons";

/* ─────────────────────────────────────────────────────────────
   TITLE — quiet, no marigolds, single Sang Devanagari ligature.
   ───────────────────────────────────────────────────────────── */
function FeaturedTitle({ couple, idx }: { couple: Couple; idx: number }) {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  return (
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
          marginBottom: 36,
          opacity: vis ? 1 : 0,
          transition: "opacity 800ms ease",
        }}
      >
        Featured — No. {String(idx).padStart(2, "0")} — {couple.place}, January 2026
      </div>
      <h1
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontWeight: 300,
          fontSize: "clamp(56px, 9vw, 104px)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.2s cubic-bezier(.2,.7,.2,1)",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "center",
          gap: 20,
          flexWrap: "wrap",
        }}
      >
        <span style={{ fontStyle: "italic" }}>{couple.bride}</span>
        <span
          style={{
            display: "inline-block",
            transform: "translateY(-0.3em)",
          }}
        >
          <Sang size={48} color={T.sage} />
        </span>
        <span style={{ fontStyle: "italic" }}>{couple.groom}</span>
        <span style={{ color: T.sage }}>.</span>
      </h1>
      <div
        style={{
          marginTop: 36,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 18,
          opacity: vis ? 0.7 : 0,
          transition: "opacity 1s ease 0.3s",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 18,
          flexWrap: "wrap",
        }}
      >
        <span>Three days</span>
        <span style={{ width: 1, height: 12, background: T.sage, opacity: 0.6 }} />
        <span>1,840 frames</span>
        <span style={{ width: 1, height: 12, background: T.sage, opacity: 0.6 }} />
        <span>Lake Pichola</span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO — clean cinematic full-bleed image, vinyl in corner only.
   ───────────────────────────────────────────────────────────── */
function FeaturedHero({ couple }: { couple: Couple }) {
  return (
    <div
      style={{
        position: "relative",
        height: "90svh",
        minHeight: 560,
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={couple.img}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.86)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 32,
          right: 40,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            textAlign: "right",
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            opacity: 0.8,
          }}
        >
          Their Wedding Playlist
          <br />
          <span style={{ opacity: 0.7 }}>Thirty-One Songs</span>
        </div>
        <VinylIcon spinning size={36} color="#fff" />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MEHENDI — signature scroll-driven SVG. Restrained copy.
   ───────────────────────────────────────────────────────────── */
function MehendiSection({ couple }: { couple: Couple }) {
  const [wrapRef, progress] = useScrollProgress<HTMLElement>();
  const drawP = Math.min(1, progress * 1.4);
  const nameP = Math.max(0, Math.min(1, (progress - 0.4) * 2));
  return (
    <section
      ref={wrapRef as React.RefObject<HTMLElement>}
      className="mat-mehendi"
      style={{
        background: T.paper,
        padding: "160px 40px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 80,
        alignItems: "center",
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
            marginBottom: 24,
          }}
        >
          One — The Mehendi
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(32px, 4.5vw, 52px)",
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ fontStyle: "italic" }}>Hidden in the henna</span>
          <span style={{ color: T.sage }}>,</span> a name written in turmeric ink
          <span style={{ color: T.sage }}>.</span>
        </h2>
        <p
          style={{
            marginTop: 28,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.6,
            maxWidth: 460,
            opacity: 0.78,
          }}
        >
          {couple.bride}&apos;s mehendi held {couple.groom}&apos;s name folded between
          paisleys — a tradition that asks the groom to find his name on the wedding
          night. Scroll, and the pattern draws itself the way it took the henna artist
          nine hours to set.
        </p>
        <div
          style={{
            marginTop: 36,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.sage,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span>{Math.floor(drawP * 100)}% drawn</span>
          <span style={{ width: 1, height: 11, background: T.sage, opacity: 0.5 }} />
          <span>{Math.floor(nameP * 100)}% revealed</span>
        </div>
      </div>
      <div
        style={{
          aspectRatio: "1/1",
          maxWidth: 480,
          marginInline: "auto",
        }}
      >
        <MehendiSVG
          progress={drawP}
          nameProgress={nameP}
          color={T.ink}
          name={couple.groom}
        />
      </div>
      <style>{`
        @media (max-width: 880px) {
          .mat-mehendi { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SELECTIVE COLOR — signature moment. Cleaner grid, less prose.
   ───────────────────────────────────────────────────────────── */
function SelectiveColorSection() {
  const [ref, vis] = useReveal<HTMLElement>(0.1);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{ background: T.paperDeep, padding: "160px 40px" }}
    >
      <header
        style={{
          marginBottom: 64,
          maxWidth: 980,
        }}
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
          Two — The Sindoor Series
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(32px, 4.5vw, 48px)",
            lineHeight: 1.1,
          }}
        >
          Only the{" "}
          <span style={{ color: T.sindoor, fontStyle: "italic" }}>red</span> of the
          parting remains
          <span style={{ color: T.sage }}>.</span> Everything else is held in
          greyscale, the way memory keeps it
          <span style={{ color: T.sage }}>.</span>
        </h2>
      </header>
      <div
        className="mat-sind-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: 16,
        }}
      >
        <div
          style={{
            gridColumn: "1 / 6",
            aspectRatio: "3/4",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(24px)",
            transition: "all 1.1s ease",
          }}
        >
          <SelectiveColorImage
            src={MAT_IMAGES.bride1}
            style={{ width: "100%", height: "100%" }}
            redSpot={{ x: 0.5, y: 0.16, r: 0.04 }}
          />
        </div>
        <div
          style={{
            gridColumn: "6 / 9",
            aspectRatio: "1/1",
            marginTop: 56,
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(24px)",
            transition: "all 1.1s ease 0.15s",
          }}
        >
          <SelectiveColorImage
            src={MAT_IMAGES.detail3}
            style={{ width: "100%", height: "100%" }}
            redSpot={{ x: 0.45, y: 0.4, r: 0.08 }}
          />
        </div>
        <div
          style={{
            gridColumn: "9 / 13",
            aspectRatio: "3/4",
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(24px)",
            transition: "all 1.1s ease 0.3s",
          }}
        >
          <SelectiveColorImage
            src={MAT_IMAGES.bride2}
            style={{ width: "100%", height: "100%" }}
            redSpot={{ x: 0.5, y: 0.18, r: 0.05 }}
          />
        </div>
      </div>
      <blockquote
        style={{
          margin: "100px auto 0",
          maxWidth: 720,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 26,
          lineHeight: 1.4,
          fontWeight: 300,
          textAlign: "center",
          opacity: vis ? 1 : 0,
          transition: "opacity 1.2s ease 0.6s",
        }}
      >
        &ldquo;In the moment my mother put the sindoor on, the room held its breath. We
        have it on film, and on her hands.&rdquo;
        <footer
          style={{
            marginTop: 22,
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.sage,
            fontStyle: "normal",
          }}
        >
          Riya — The Morning After
        </footer>
      </blockquote>
      <style>{`
        @media (max-width: 880px) {
          .mat-sind-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .mat-sind-grid > * { grid-column: 1 / -1 !important; margin-top: 0 !important; }
        }
      `}</style>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   RITUAL TIMELINE — single-column editorial chapter list.
   No pulsing, no zigzag. Just typography + photography.
   ───────────────────────────────────────────────────────────── */
function RitualTimeline() {
  return (
    <section style={{ padding: "160px 40px", background: T.paper }}>
      <header style={{ textAlign: "center", marginBottom: 80 }}>
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
          Three — The Three Days
        </div>
        <h2
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(32px, 4.5vw, 52px)",
            lineHeight: 1.05,
          }}
        >
          Five ceremonies<span style={{ color: T.sage }}>,</span>{" "}
          <span style={{ fontStyle: "italic" }}>in the order they happened</span>
          <span style={{ color: T.sage }}>.</span>
        </h2>
      </header>
      <ol
        style={{
          listStyle: "none",
          margin: 0,
          padding: 0,
          maxWidth: 980,
          marginInline: "auto",
        }}
      >
        {RITUALS.map((r, i) => (
          <RitualRow r={r} idx={i} key={r.num} />
        ))}
      </ol>
    </section>
  );
}

function RitualRow({
  r,
  idx,
}: {
  r: (typeof RITUALS)[number];
  idx: number;
}) {
  const [ref, vis] = useReveal<HTMLLIElement>(0.2);
  const reverse = idx % 2 === 1;
  return (
    <li
      ref={ref}
      className="mat-ritual"
      style={{
        display: "grid",
        gridTemplateColumns: reverse ? "5fr 7fr" : "7fr 5fr",
        gap: 48,
        alignItems: "center",
        padding: "48px 0",
        borderTop: idx === 0 ? `1px solid ${T.ink}10` : "none",
        borderBottom: `1px solid ${T.ink}10`,
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "all 1s cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <div
        style={{
          gridColumn: reverse ? 2 : 1,
          aspectRatio: "4/3",
          overflow: "hidden",
          background: "#222",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={r.img}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          gridColumn: reverse ? 1 : 2,
          gridRow: 1,
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 16,
          }}
        >
          {r.num} — Day {Math.ceil(parseInt(r.num, 10) / 2)}
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(32px, 4vw, 44px)",
            lineHeight: 1.05,
            fontStyle: "italic",
          }}
        >
          {r.name}
        </h3>
        <p
          style={{
            marginTop: 16,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.55,
            opacity: 0.78,
            maxWidth: 460,
          }}
        >
          {r.desc}
        </p>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .mat-ritual { grid-template-columns: 1fr !important; gap: 24px !important; }
          .mat-ritual > div { grid-column: 1 !important; grid-row: auto !important; }
        }
      `}</style>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────
   VENDOR LIST — editorial table (key → value rows, hairline rules).
   ───────────────────────────────────────────────────────────── */
function VendorTags() {
  const tags: [string, string][] = [
    ["Venue", "Taj Lake Palace, Udaipur"],
    ["Decor", "The Wedding Design Co."],
    ["Makeup", "Akanksha Khurana"],
    ["Couture", "Sabyasachi"],
    ["Mehendi", "Veena Nagda"],
    ["Catering", "Mughal Mahal"],
  ];
  return (
    <section
      style={{
        background: T.paperDeep,
        padding: "120px 40px",
      }}
    >
      <header
        style={{
          marginBottom: 48,
          maxWidth: 980,
          marginInline: "auto",
        }}
      >
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
          Credits — Riya sang Mohit
        </div>
        <h3
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontWeight: 300,
            fontSize: "clamp(28px, 3.5vw, 40px)",
            fontStyle: "italic",
            lineHeight: 1.1,
          }}
        >
          The hands behind the day.
        </h3>
      </header>
      <dl
        style={{
          margin: 0,
          maxWidth: 980,
          marginInline: "auto",
        }}
      >
        {tags.map(([k, v], i) => (
          <div
            key={k}
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 24,
              padding: "24px 0",
              borderTop: i === 0 ? `1px solid ${T.ink}15` : "none",
              borderBottom: `1px solid ${T.ink}15`,
              alignItems: "baseline",
            }}
          >
            <dt
              style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: 11,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: T.sage,
              }}
            >
              {k}
            </dt>
            <dd
              style={{
                margin: 0,
                fontFamily: SERIF,
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.3,
              }}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   PHOTOGRAPHER'S LETTER — italic signed note, paper-deep panel,
   handwritten Caveat sign-off. Editorial closer.
   ───────────────────────────────────────────────────────────── */
function PhotographerLetter({ couple }: { couple: Couple }) {
  const [ref, vis] = useReveal<HTMLElement>(0.2);
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        padding: "180px 40px",
        background: T.paperDeep,
        position: "relative",
      }}
    >
      <article
        style={{
          maxWidth: 720,
          marginInline: "auto",
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
          transition: "all 1.4s cubic-bezier(.2,.7,.2,1)",
        }}
      >
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: T.sage,
            marginBottom: 36,
            textAlign: "center",
          }}
        >
          A letter from the photographer
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(22px, 2.6vw, 28px)",
            lineHeight: 1.55,
          }}
        >
          Dear {couple.bride} and {couple.groom},
        </p>
        <p
          style={{
            marginTop: 24,
            fontFamily: SERIF,
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(18px, 2vw, 22px)",
            lineHeight: 1.7,
            opacity: 0.85,
          }}
        >
          We sat with you for three days, drank chai with your mothers, and stood at
          the back of the mandap so we wouldn&apos;t be in the way. What we have here
          is yours — every frame, every laugh in the corner of the room. We are
          grateful you let us tell it.
        </p>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "baseline",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: SCRIPT,
              fontSize: 38,
              lineHeight: 1,
              color: T.ink,
            }}
          >
            — Aanya
          </span>
          <span
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: T.sage,
              opacity: 0.75,
            }}
          >
            for Mi Amor Tales — Jaipur, the morning after
          </span>
        </div>
      </article>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CLOSING — single line + two text-link CTAs, no marigold halo.
   ───────────────────────────────────────────────────────────── */
function FeaturedClosing() {
  return (
    <section
      style={{
        padding: "180px 40px",
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
          marginBottom: 40,
        }}
      >
        End of Story No. 17
      </div>
      <h2
        style={{
          margin: 0,
          fontFamily: SERIF,
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(32px, 4.5vw, 56px)",
          lineHeight: 1.05,
        }}
      >
        And then they were married
        <span style={{ color: T.sage, fontStyle: "normal" }}>.</span>
      </h2>
      <div
        style={{
          marginTop: 56,
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
  );
}

export function FeaturedSlugClient({
  couple,
  index,
}: {
  couple: Couple;
  index: number;
}) {
  return (
    <main>
      <FeaturedTitle couple={couple} idx={index + 1} />
      <FeaturedHero couple={couple} />
      <MehendiSection couple={couple} />
      <SelectiveColorSection />
      <RitualTimeline />
      <VendorTags />
      <PhotographerLetter couple={couple} />
      <FeaturedClosing />
    </main>
  );
}
