"use client";

import React from "react";
import { T } from "./tokens";

type Props = {
  children: React.ReactNode;
  color?: string;
  weight?: number;
};

/** Tints `, . ; : — ·` in a serif sentence. Pass plain strings only. */
export function Punc({ children, color = T.sage, weight = 600 }: Props) {
  if (typeof children !== "string") return <>{children}</>;
  const parts: React.ReactNode[] = [];
  const re = /([.,;:—·])/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(children)) !== null) {
    if (m.index > last) parts.push(children.slice(last, m.index));
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
        {m[1]}
      </span>
    );
    last = m.index + 1;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}
