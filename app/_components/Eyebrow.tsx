"use client";

import React from "react";
import { SERIF, T } from "./tokens";

type EyebrowProps = {
  children: React.ReactNode;
  rule?: boolean;
  color?: string;
  align?: "left" | "center" | "right";
  style?: React.CSSProperties;
};

/** Italic Cormorant lowercase eyebrow with optional sage hairline rule. */
export function Eyebrow({
  children,
  rule = false,
  color,
  align = "left",
  style = {},
}: EyebrowProps) {
  const c = color || T.sage;
  const ruleEl = (
    <span
      style={{
        width: 28,
        height: 1,
        background: c,
        opacity: 0.7,
        display: "inline-block",
        verticalAlign: "middle",
      }}
    />
  );
  return (
    <span
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 1,
        color: c,
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        justifyContent:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        ...style,
      }}
    >
      {(rule || align !== "right") && ruleEl}
      <span>{children}</span>
      {(rule || align !== "left") && ruleEl}
    </span>
  );
}

/** Eyebrow row with default left/center alignment (used in pages). */
export function EyebrowRow({
  children,
  color,
  align = "left",
}: {
  children: React.ReactNode;
  color?: string;
  align?: "left" | "center" | "right";
}) {
  const c = color || T.sage;
  return (
    <div
      style={{
        fontFamily: SERIF,
        fontStyle: "italic",
        fontSize: 18,
        color: c,
        marginBottom: 18,
        display: "flex",
        alignItems: "center",
        gap: 14,
        justifyContent:
          align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {align !== "right" && (
        <span style={{ width: 28, height: 1, background: c, opacity: 0.7 }} />
      )}
      <span>{children}</span>
      {align !== "left" && (
        <span style={{ width: 28, height: 1, background: c, opacity: 0.7 }} />
      )}
    </div>
  );
}
