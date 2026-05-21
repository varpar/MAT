"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SERIF, SANS, T } from "./tokens";

const LOGO_W = 156;
const LOGO_H = 48; // logo file is ~3.24:1; height of 48 gives a width of ~156

const NAV_LINKS: [string, string][] = [
  ["Featured", "/featured"],
  ["Weddings", "/weddings"],
  ["About", "/about"],
  ["Tales", "/tales"],
  ["Contact", "/contact"],
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();
  // Pages that open with a dark full-bleed hero — nav must read white initially.
  const hasDarkHero =
    pathname === "/" ||
    /^\/featured\/[^/]+/.test(pathname);
  const overDark = hasDarkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // lock body scroll while drawer open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <>
      <nav
        aria-label="Primary"
        data-mat-nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 40px",
          height: 72,
          background: scrolled ? "rgba(250,250,247,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
          color: overDark ? "#fff" : T.ink,
          transition: "background 350ms ease, border-color 350ms ease, color 350ms ease",
          borderBottom: scrolled
            ? `1px solid ${T.ink}10`
            : "1px solid transparent",
        }}
      >
        <Link
          href="/"
          aria-label="Mi Amor Tales — Home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: LOGO_H,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Image
            src={overDark ? "/brand/mat-logo-cream.webp" : "/brand/mat-logo-ink.webp"}
            alt="Mi Amor Tales"
            width={LOGO_W}
            height={LOGO_H}
            priority
            style={{
              height: LOGO_H,
              width: "auto",
              display: "block",
              transition: "opacity 350ms ease",
            }}
          />
        </Link>

        {/* Desktop link row */}
        <div
          className="mat-nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
          }}
        >
          {NAV_LINKS.map(([label, href]) => {
            const a = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                style={{
                  fontFamily: SANS,
                  fontSize: 11,
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "inherit",
                  textDecoration: "none",
                  position: "relative",
                  paddingBottom: 2,
                  borderBottom: a
                    ? `1px solid ${T.sage}`
                    : "1px solid transparent",
                  transition: "border-color 250ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!a) e.currentTarget.style.borderBottomColor = T.ink;
                }}
                onMouseLeave={(e) => {
                  if (!a) e.currentTarget.style.borderBottomColor = "transparent";
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen((v) => !v)}
          className="mat-nav-burger"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            color: T.ink,
          }}
        >
          <span
            aria-hidden
            style={{
              display: "inline-block",
              width: 22,
              height: 1,
              background: "currentColor",
              boxShadow: "0 6px 0 currentColor, 0 -6px 0 currentColor",
            }}
          />
        </button>
      </nav>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        pathname={pathname}
        onClose={() => setDrawerOpen(false)}
      />

      <style>{`
        @media (max-width: 880px) {
          .mat-nav-links { display: none !important; }
          .mat-nav-burger { display: inline-flex !important; }
        }
      `}</style>
    </>
  );
}

function MobileDrawer({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const links: [string, string][] = [["Home", "/"], ...NAV_LINKS];
  return (
    <div
      role="dialog"
      aria-hidden={!open}
      style={{
        position: "fixed",
        inset: 0,
        background: T.paper,
        zIndex: 60,
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 320ms ease",
        display: "flex",
        flexDirection: "column",
        padding: "0 24px",
      }}
    >
      <div
        style={{
          height: 72,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Link
          href="/"
          onClick={onClose}
          aria-label="Mi Amor Tales — Home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: LOGO_H,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <Image
            src="/brand/mat-logo-ink.webp"
            alt="Mi Amor Tales"
            width={LOGO_W}
            height={LOGO_H}
            style={{ height: LOGO_H, width: "auto", display: "block" }}
          />
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: T.ink,
            fontSize: 24,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
      <ul
        style={{
          listStyle: "none",
          padding: "40px 0",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        {links.map(([label, href], i) => {
          const a = isActive(pathname, href);
          return (
            <li
              key={href}
              style={{
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(8px)",
                transition: `opacity 360ms ease ${i * 40 + 80}ms, transform 360ms ease ${i * 40 + 80}ms`,
              }}
            >
              <Link
                href={href}
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  fontFamily: SERIF,
                  fontSize: 36,
                  fontWeight: 300,
                  fontStyle: a ? "italic" : "normal",
                  color: "inherit",
                  textDecoration: "none",
                  padding: "12px 0",
                  borderBottom: `1px solid ${T.ink}10`,
                }}
              >
                <span>{label}</span>
                <span
                  style={{
                    fontFamily: SANS,
                    fontSize: 10,
                    letterSpacing: "0.32em",
                    color: T.sage,
                    opacity: 0.7,
                  }}
                >
                  0{i + 1}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div
        style={{
          marginTop: "auto",
          padding: "32px 0",
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          opacity: 0.55,
        }}
      >
        Booking 26 / 27
      </div>
    </div>
  );
}
