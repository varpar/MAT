"use client";

import React from "react";

type Props = {
  progress?: number;
  color?: string;
  nameProgress?: number;
  name?: string;
};

/** Mandala-paisley mehendi that draws on; `name` is hidden inside. */
export function MehendiSVG({
  progress = 1,
  color = "#1a1a1a",
  nameProgress = 1,
  name = "Mohit",
}: Props) {
  const dash = 2400;
  const offset = dash * (1 - progress);
  const nameDash = 600;
  const nameOffset = nameDash * (1 - nameProgress);
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: dash,
          strokeDashoffset: offset,
          transition: "stroke-dashoffset 0.1s linear",
        }}
      >
        <circle cx="200" cy="200" r="170" />
        <circle cx="200" cy="200" r="158" strokeDasharray="2 4" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 8;
          const cx = 200 + Math.cos(a) * 120;
          const cy = 200 + Math.sin(a) * 120;
          return (
            <g
              key={i}
              transform={`translate(${cx} ${cy}) rotate(${(a * 180) / Math.PI + 90})`}
            >
              <path d="M 0 -22 C 12 -18, 16 -8, 14 4 C 12 14, 4 18, 0 14 C -4 18, -12 14, -14 4 C -16 -8, -12 -18, 0 -22 Z" />
              <path d="M 0 -14 C 6 -12, 8 -6, 6 0 C 4 6, 0 8, 0 6" />
              <circle cx="0" cy="-4" r="1.5" fill={color} />
            </g>
          );
        })}
        {Array.from({ length: 16 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 16;
          const x1 = 200 + Math.cos(a) * 60;
          const y1 = 200 + Math.sin(a) * 60;
          const x2 = 200 + Math.cos(a) * 90;
          const y2 = 200 + Math.sin(a) * 90;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="48" strokeDasharray="1 3" />
        {Array.from({ length: 6 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 6;
          const x = 200 + Math.cos(a) * 32;
          const y = 200 + Math.sin(a) * 32;
          return <circle key={i} cx={x} cy={y} r="6" />;
        })}
        <circle cx="200" cy="200" r="6" fill={color} />
        <path d="M 200 30 Q 210 80, 200 130 Q 190 80, 200 30 Z" />
        <path d="M 200 370 Q 210 320, 200 270 Q 190 320, 200 370 Z" />
        <path d="M 30 200 Q 80 210, 130 200 Q 80 190, 30 200 Z" />
        <path d="M 370 200 Q 320 210, 270 200 Q 320 190, 370 200 Z" />
      </g>
      <g
        style={{
          strokeDasharray: nameDash,
          strokeDashoffset: nameOffset,
          transition: "stroke-dashoffset 0.1s linear",
        }}
      >
        <text
          x="200"
          y="208"
          textAnchor="middle"
          fontFamily="var(--font-cormorant), 'Cormorant Garamond', serif"
          fontStyle="italic"
          fontSize="28"
          fill="none"
          stroke={color}
          strokeWidth="0.6"
        >
          {name}
        </text>
      </g>
    </svg>
  );
}
