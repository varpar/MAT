"use client";

import React from "react";

type VinylProps = {
  size?: number;
  spinning?: boolean;
  color?: string;
};

export function VinylIcon({ size = 36, spinning = false, color = "currentColor" }: VinylProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={size}
      height={size}
      style={{ animation: spinning ? "mat-spin 4s linear infinite" : "none" }}
    >
      <circle cx="20" cy="20" r="18" fill="none" stroke={color} strokeWidth="0.6" />
      <circle cx="20" cy="20" r="14" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <circle cx="20" cy="20" r="10" fill="none" stroke={color} strokeWidth="0.4" opacity="0.5" />
      <circle cx="20" cy="20" r="6" fill={color} opacity="0.15" />
      <circle cx="20" cy="20" r="2" fill={color} />
      <circle cx="20" cy="20" r="0.6" fill="#fff" />
    </svg>
  );
}

type TickProps = { size?: number; color?: string };
export function CornerTick({ size = 8, color = "currentColor" }: TickProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8">
      <line x1="4" y1="0" x2="4" y2="8" stroke={color} strokeWidth="0.5" />
      <line x1="0" y1="4" x2="8" y2="4" stroke={color} strokeWidth="0.5" />
    </svg>
  );
}

export function Hair({
  w = 28,
  c,
  op = 0.7,
}: {
  w?: number;
  c?: string;
  op?: number;
}) {
  const color = c || "#436c67";
  return (
    <span
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        width: w,
        height: 1,
        background: color,
        opacity: op,
        marginInline: 12,
      }}
    />
  );
}
