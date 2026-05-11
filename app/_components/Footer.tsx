import React from "react";
import Link from "next/link";
import { SERIF, SANS, T } from "./tokens";

type FootLink = [label: string, href: string | null];

function FootCol({ head, links }: { head: string; links: FootLink[] }) {
  return (
    <div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: 0.5,
          marginBottom: 14,
        }}
      >
        {head}
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
        {links.map(([label, href]) => (
          <li key={label} style={{ opacity: 0.85 }}>
            {href ? (
              <Link href={href} style={{ color: "inherit", textDecoration: "none" }}>
                {label}
              </Link>
            ) : (
              <span>{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      style={{
        background: T.ink,
        color: T.paper,
        padding: "80px 40px 36px",
        fontFamily: SANS,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 60,
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: SERIF,
              fontStyle: "italic",
              fontSize: 40,
              fontWeight: 400,
              lineHeight: 1,
            }}
          >
            Mi Amor<span style={{ color: T.sage }}>.</span> Tales
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 11,
              opacity: 0.6,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Studio<span style={{ color: T.sage, margin: "0 8px" }}>·</span>
            Jaipur, IN<span style={{ color: T.sage, margin: "0 8px" }}>·</span>
            est<span style={{ color: T.sage }}>.</span> 2018
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, auto)",
            gap: 60,
            fontSize: 12,
          }}
        >
          <FootCol
            head="Studio"
            links={[
              ["Featured", "/featured"],
              ["Weddings", "/weddings"],
              ["Tales", "/tales"],
              ["About", "/about"],
            ]}
          />
          <FootCol
            head="Reach"
            links={[
              ["hello@miamortales.com", null],
              ["+91 99 28 41 21 12", null],
              ["WhatsApp", null],
              ["Booking 26 / 27", "/contact"],
            ]}
          />
          <FootCol
            head="Elsewhere"
            links={[
              ["Instagram", null],
              ["Pinterest", null],
              ["Vimeo", null],
              ["Behance", null],
            ]}
          />
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #ffffff20",
          paddingTop: 22,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          opacity: 0.55,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>
          © 2026 Mi Amor Tales
          <span style={{ color: T.sage, margin: "0 8px" }}>·</span>
          All stories held in trust
          <span style={{ color: T.sage }}>.</span>
        </span>
        <span>
          Mi Amor Tales <span style={{ color: T.sage }}>sang</span> their first wedding in 2018
          <span style={{ color: T.sage }}>.</span>
        </span>
      </div>
    </footer>
  );
}
