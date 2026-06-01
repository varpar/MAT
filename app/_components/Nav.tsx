"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SERIF, SANS, T } from "./tokens";

const LOGO_W = 156;
const LOGO_H = 48; // logo file is ~3.24:1; height of 48 gives a width of ~156
// Mobile logo is slightly smaller so the nav stays calm on 360px viewports.
const LOGO_H_MOBILE = 36;
const LOGO_W_MOBILE = 117;

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
  const reduceMotion = useReducedMotion() ?? false;
  // Pages that open with a dark full-bleed hero — nav must read white initially.
  const hasDarkHero =
    pathname === "/" ||
    /^\/featured\/[^/]+/.test(pathname);
  const overDark = hasDarkHero && !scrolled && !drawerOpen;

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

  // close drawer on Escape
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

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
        className="mat-nav-bar"
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
          className="mat-nav-logo"
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
              height: "100%",
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

        {/* Mobile menu toggle — editorial serif word, not a 3-line icon */}
        <button
          type="button"
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          aria-expanded={drawerOpen}
          aria-controls="mat-mobile-menu"
          onClick={() => setDrawerOpen((v) => !v)}
          className="mat-nav-menu-toggle"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "10px 4px",
            minHeight: 44,
            display: "none",
            alignItems: "center",
            gap: 10,
            color: "inherit",
            fontFamily: SERIF,
            fontWeight: 400,
            fontSize: 20,
            lineHeight: 1,
            letterSpacing: "0.01em",
            fontStyle: "italic",
          }}
        >
          <span
            aria-hidden
            className="mat-nav-menu-toggle-rule"
            style={{
              display: "inline-block",
              width: 22,
              height: 1,
              background: "currentColor",
              opacity: 0.7,
              transition: "width 280ms ease, opacity 280ms ease",
            }}
          />
          <span aria-hidden style={{ display: "inline-block", minWidth: 56, textAlign: "right" }}>
            {drawerOpen ? "Close" : "Menu"}
          </span>
        </button>
      </nav>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        pathname={pathname}
        onClose={() => setDrawerOpen(false)}
        reduceMotion={reduceMotion}
      />

      <style>{`
        .mat-nav-menu-toggle { -webkit-tap-highlight-color: transparent; }
        .mat-nav-menu-toggle:hover .mat-nav-menu-toggle-rule { width: 36px; opacity: 1; }
        @media (max-width: 1023px) {
          .mat-nav-links { display: none !important; }
          .mat-nav-menu-toggle { display: inline-flex !important; }
          .mat-nav-bar { padding: 0 24px !important; height: 64px !important; }
          .mat-nav-logo { height: ${LOGO_H_MOBILE}px !important; }
        }
        @media (max-width: 414px) {
          .mat-nav-bar { padding: 0 18px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .mat-nav-menu-toggle .mat-nav-menu-toggle-rule { transition: none !important; }
        }
      `}</style>
    </>
  );
}

function MobileDrawer({
  open,
  pathname,
  onClose,
  reduceMotion,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const links: [string, string][] = [["Home", "/"], ...NAV_LINKS];

  // Framer transitions — skipped under reduced-motion (just visibility).
  const overlayTransition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.2, 0.7, 0.2, 1] as const };
  const itemBase = reduceMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: 18 };
  const itemActive = { opacity: 1, y: 0 };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mat-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
          transition={overlayTransition}
          style={{
            position: "fixed",
            inset: 0,
            background: T.paper,
            zIndex: 60,
            display: "flex",
            flexDirection: "column",
            padding: "0 24px",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {/* Top bar — mirrors the nav layout so the toggle sits in place. */}
          <div
            style={{
              height: 64,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flex: "0 0 auto",
            }}
          >
            <Link
              href="/"
              onClick={onClose}
              aria-label="Mi Amor Tales — Home"
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: LOGO_H_MOBILE,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Image
                src="/brand/mat-logo-ink.webp"
                alt="Mi Amor Tales"
                width={LOGO_W_MOBILE}
                height={LOGO_H_MOBILE}
                style={{ height: LOGO_H_MOBILE, width: "auto", display: "block" }}
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
                padding: "10px 4px",
                minHeight: 44,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                color: T.ink,
                fontFamily: SERIF,
                fontWeight: 400,
                fontStyle: "italic",
                fontSize: 20,
                lineHeight: 1,
                letterSpacing: "0.01em",
              }}
            >
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  width: 22,
                  height: 1,
                  background: "currentColor",
                  opacity: 0.7,
                }}
              />
              <span style={{ minWidth: 56, textAlign: "right" }}>Close</span>
            </button>
          </div>

          {/* Eyebrow */}
          <div
            style={{
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: T.sage,
              opacity: 0.75,
              padding: "clamp(20px, 6vh, 56px) 0 clamp(12px, 3vh, 24px)",
            }}
          >
            Index
          </div>

          {/* Serif link list */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 4,
              flex: "1 1 auto",
            }}
          >
            {links.map(([label, href], i) => {
              const a = isActive(pathname, href);
              return (
                <motion.li
                  key={href}
                  initial={itemBase}
                  animate={itemActive}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.5,
                          ease: [0.2, 0.7, 0.2, 1] as const,
                          delay: 0.12 + i * 0.05,
                        }
                  }
                >
                  <Link
                    href={href}
                    onClick={onClose}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 16,
                      fontFamily: SERIF,
                      fontSize: "clamp(36px, 10vw, 64px)",
                      lineHeight: 1.05,
                      fontWeight: 300,
                      fontStyle: a ? "italic" : "normal",
                      color: "inherit",
                      textDecoration: "none",
                      padding: "14px 0",
                      minHeight: 56,
                      borderBottom: `1px solid ${T.ink}12`,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "baseline",
                        gap: 14,
                      }}
                    >
                      {a ? (
                        <span
                          aria-hidden
                          style={{
                            display: "inline-block",
                            width: 18,
                            height: 1,
                            background: T.sage,
                            transform: "translateY(-0.3em)",
                          }}
                        />
                      ) : null}
                      <span>{label}</span>
                    </span>
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
                </motion.li>
              );
            })}
          </ul>

          {/* Footer note */}
          <div
            style={{
              marginTop: "auto",
              padding: "32px 0 28px",
              fontFamily: SANS,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              opacity: 0.55,
              flex: "0 0 auto",
            }}
          >
            Booking 26 / 27
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
