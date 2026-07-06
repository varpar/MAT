import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SANS, T, LAYOUT } from "./tokens";

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
      <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 6 }}>
        {links.map(([label, href]) => (
          <li key={label} style={{ opacity: 0.85 }}>
            {href ? (
              <Link
                href={href}
                style={{
                  color: "inherit",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "8px 0",
                }}
              >
                {label}
              </Link>
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: 44,
                  padding: "8px 0",
                }}
              >
                {label}
              </span>
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
      className="mat-footer"
      style={{
        background: T.sage,
        color: T.paper,
        padding: `${LAYOUT.section} ${LAYOUT.gutter} ${LAYOUT.sectionTight}`,
        fontFamily: SANS,
      }}
    >
      <div
        className="mat-footer-top"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 60,
          flexWrap: "wrap",
          gap: 40,
        }}
      >
        <div className="mat-footer-brand">
          <Image
            src="/brand/mat-logo-cream.webp"
            alt="Mi Amor Tales"
            width={220}
            height={68}
            className="mat-footer-logo"
            style={{ height: 68, width: "auto", display: "block" }}
          />
          <div
            className="mat-footer-meta"
            style={{
              marginTop: 16,
              fontSize: 11,
              opacity: 0.6,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Studio<span style={{ color: T.cream, margin: "0 8px" }}>·</span>
            Jaipur, IN<span style={{ color: T.cream, margin: "0 8px" }}>·</span>
            est<span style={{ color: T.cream }}>.</span> 2018
          </div>
        </div>
        <div
          className="mat-footer-cols"
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
              ["Check availability", "/contact"],
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
        className="mat-footer-bottom"
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
          <span style={{ color: T.cream, margin: "0 8px" }}>·</span>
          All stories held in trust
          <span style={{ color: T.cream }}>.</span>
        </span>
        <span>
          Mi Amor Tales <span style={{ color: T.cream }}>sang</span> their first wedding in 2018
          <span style={{ color: T.cream }}>.</span>
        </span>
      </div>

      {/* Mobile-only stacking — horizontal/vertical padding stays on the
          shared LAYOUT clamps (matches the page gutter site-wide); only the
          column structure restacks here. */}
      <style>{`
        @media (max-width: 1023px) {
          .mat-footer-cols { gap: 36px !important; }
        }
        @media (max-width: 767px) {
          .mat-footer-top {
            flex-direction: column !important;
            gap: 44px !important;
            margin-bottom: 44px !important;
          }
          .mat-footer-cols {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 28px 24px !important;
            width: 100% !important;
          }
          .mat-footer-logo { height: 56px !important; }
          .mat-footer-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 414px) {
          .mat-footer-cols {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px 20px !important;
          }
          .mat-footer-logo { height: 48px !important; }
          .mat-footer-meta { letter-spacing: 0.18em !important; }
        }
      `}</style>
    </footer>
  );
}
