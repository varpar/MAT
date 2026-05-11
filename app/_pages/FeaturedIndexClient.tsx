"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SERIF, SANS, T } from "../_components/tokens";
import { useReveal } from "../_components/hooks";
import { FEATURED, type Couple } from "../_components/data";

function FeatCard({
  couple,
  idx,
  visible,
}: {
  couple: Couple;
  idx: number;
  visible: boolean;
}) {
  const [hov, setHov] = useState(false);
  const router = useRouter();
  const tall = idx % 3 === 0;
  return (
    <article
      onClick={() =>
        router.push(`/featured/${couple.slug ?? "riya-sang-mohit"}`)
      }
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        cursor: "pointer",
        gridRow: tall ? "span 2" : "auto",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 1s cubic-bezier(.2,.7,.2,1) ${idx * 0.05}s, transform 1s cubic-bezier(.2,.7,.2,1) ${idx * 0.05}s`,
      }}
    >
      <div
        style={{
          position: "relative",
          aspectRatio: tall ? "3/4.4" : "3/2",
          overflow: "hidden",
          background: "#222",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={couple.img}
          alt={`${couple.bride} sang ${couple.groom} — ${couple.place}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hov ? "scale(1.03)" : "scale(1)",
            transition: "transform 1.2s cubic-bezier(.2,.7,.2,1)",
          }}
        />
      </div>
      <div
        style={{
          marginTop: 18,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: SERIF,
              fontSize: tall ? 28 : 24,
              lineHeight: 1.2,
              fontWeight: 400,
            }}
          >
            <span style={{ fontStyle: "italic" }}>{couple.bride}</span>{" "}
            <span style={{ fontStyle: "italic", color: T.sage, fontSize: "0.55em" }}>
              sang
            </span>{" "}
            <span style={{ fontStyle: "italic" }}>{couple.groom}</span>
          </div>
          <div
            style={{
              marginTop: 6,
              fontFamily: SANS,
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.6,
            }}
          >
            {couple.place} — Three Days
          </div>
        </div>
        <div
          style={{
            fontFamily: SANS,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: T.sage,
            opacity: 0.7,
          }}
        >
          No. {String(idx + 1).padStart(2, "0")}
        </div>
      </div>
    </article>
  );
}

export function FeaturedIndexClient() {
  const [ref, vis] = useReveal<HTMLElement>(0.05);
  const items = [...FEATURED, ...FEATURED.slice(0, 2)];
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
        <div
          className="mat-feat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 32,
          }}
        >
          {items.map((c, i) => (
            <FeatCard key={i} couple={c} idx={i} visible={vis} />
          ))}
        </div>
        <style>{`
          @media (max-width: 720px) {
            .mat-feat-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
        `}</style>
      </section>
    </main>
  );
}
