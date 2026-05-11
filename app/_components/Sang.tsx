"use client";

import React from "react";
import { SERIF } from "./tokens";
import { T } from "./tokens";

type Props = {
  size?: number;
  color?: string;
  italic?: boolean;
  latin?: boolean;
  accent?: string;
};

/** Devanagari "sang" ligature with sage bindu. */
export function Sang({
  size = 24,
  color = T.sage,
  italic = true,
  latin = false,
  accent,
}: Props) {
  const c = accent || T.sage;
  if (latin) {
    return (
      <span
        style={{
          fontStyle: italic ? "italic" : "normal",
          fontFamily: SERIF,
          color,
          fontSize: size,
        }}
      >
        sang
      </span>
    );
  }
  return (
    <span
      style={{
        fontFamily: `${SERIF}, "Tiro Devanagari Hindi", serif`,
        fontStyle: italic ? "italic" : "normal",
        color,
        fontSize: size,
        letterSpacing: "0.01em",
        display: "inline-flex",
        alignItems: "baseline",
        gap: 0,
      }}
    >
      <span>स</span>
      <span
        style={{
          display: "inline-block",
          width: size * 0.18,
          height: size * 0.18,
          background: c,
          borderRadius: "50%",
          alignSelf: "flex-start",
          marginLeft: -size * 0.04,
          marginTop: size * 0.05,
          boxShadow: `0 0 ${size * 0.18}px ${c}55`,
          animation: "ma-bindu-pulse 3.6s ease-in-out infinite",
        }}
      />
      <span style={{ marginLeft: size * 0.04 }}>ग</span>
    </span>
  );
}
