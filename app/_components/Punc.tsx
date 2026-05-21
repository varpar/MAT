"use client";

import React from "react";
import { T } from "./tokens";

type Props = {
  children: React.ReactNode;
  color?: string;
  weight?: number;
};

/** Tints `, . ; : ·` in a serif sentence. Pass plain strings only.
 *  Em-dashes (`—`) inside the string are rewritten to sage middle dots. */
export function Punc({ children, color = T.sage, weight = 600 }: Props) {
  if (typeof children !== "string") return <>{children}</>;
  const parts: React.ReactNode[] = [];
  const re = /\s—\s|[.,;:·]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(children)) !== null) {
    if (m.index > last) parts.push(children.slice(last, m.index));
    const isDash = m[0].includes("—");
    parts.push(
      <span
        key={i++}
        style={{
          color,
          fontWeight: weight,
          display: "inline-block",
          transform: "translateY(-0.02em)",
        }}
      >
        {isDash ? " · " : m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}

/** Inline sage middle-dot separator. Use to replace " — " in JSX inline text. */
export function Sep({ color = T.sage }: { color?: string } = {}) {
  return (
    <span
      style={{
        color,
        fontWeight: 600,
        display: "inline-block",
        margin: "0 0.45em",
        transform: "translateY(-0.04em)",
      }}
    >
      ·
    </span>
  );
}

/** Rewrites every " — " in a string to a sage middle-dot span.
 *  Use at render sites where the source string lives in data files. */
export function withSeps(
  text: string | null | undefined,
  color: string = T.sage
): React.ReactNode {
  if (!text) return text ?? null;
  if (!text.includes("—")) return text;
  const parts = text.split(/\s—\s/g);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}
      {i < parts.length - 1 ? <Sep color={color} /> : null}
    </React.Fragment>
  ));
}
