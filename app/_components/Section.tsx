"use client";

import React, { type ElementType } from "react";

type Tone = "paper" | "paper-deep" | "sage" | "ink";
type Pad = "compact" | "standard" | "hero" | "statement" | "none";

type Props<E extends ElementType = "section"> = {
  as?: E;
  tone?: Tone;
  pad?: Pad;
  centered?: boolean;
  bordered?: "top" | "bottom" | "y" | "none";
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
};

const TONE_BG: Record<Tone, string> = {
  paper: "#fafaf7",
  "paper-deep": "#f3f1ec",
  sage: "#436c67",
  ink: "#1a1a1a",
};
const TONE_FG: Record<Tone, string> = {
  paper: "#1a1a1a",
  "paper-deep": "#1a1a1a",
  sage: "#ffffff",
  ink: "#fafaf7",
};
const PAD_Y: Record<Pad, string> = {
  compact: "80px",
  standard: "120px",
  hero: "160px",
  statement: "200px",
  none: "0px",
};

/**
 * Section — single primitive enforcing the design-system spacing scale.
 *   tone     paper | paper-deep | sage | ink
 *   pad      compact 80 | standard 120 | hero 160 | statement 200 | none
 *   bordered top | bottom | y | none
 *
 * Horizontal padding is fixed at 40px (24 on mobile via globals.css clamps
 * applied where needed) — that's the project rule.
 */
export function Section({
  as,
  tone = "paper",
  pad = "standard",
  centered = false,
  bordered = "none",
  className,
  style,
  children,
}: Props) {
  const Tag = (as ?? "section") as ElementType;
  const border = "1px solid rgba(26,26,26,0.10)";
  return (
    <Tag
      className={className}
      style={{
        background: TONE_BG[tone],
        color: TONE_FG[tone],
        padding: `${PAD_Y[pad]} 40px`,
        textAlign: centered ? "center" : undefined,
        borderTop: bordered === "top" || bordered === "y" ? border : undefined,
        borderBottom: bordered === "bottom" || bordered === "y" ? border : undefined,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
