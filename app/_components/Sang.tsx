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

/** Sage-coloured ampersand used in place of "sang" / "&". */
export function Sang({
  size = 24,
  color = T.sage,
  italic = true,
  // `latin` and `accent` are kept for call-site compatibility but unused.
  latin: _latin,
  accent: _accent,
}: Props) {
  void _latin;
  void _accent;
  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: SERIF,
        fontStyle: italic !== false ? "italic" : "normal",
        fontWeight: 400,
        color,
        fontSize: size,
      }}
    >
      &amp;
    </span>
  );
}
