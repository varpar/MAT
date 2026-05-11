"use client";

import React from "react";

type Props = {
  src: string;
  intensity?: number;
  style?: React.CSSProperties;
  redSpot?: { x: number; y: number; r: number };
  alt?: string;
};

/** Greyscale photo with a red sindoor highlight at the parting. */
export function SelectiveColorImage({
  src,
  intensity = 1,
  style = {},
  redSpot = { x: 0.5, y: 0.18, r: 0.06 },
  alt = "",
}: Props) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: `grayscale(${intensity})`,
        }}
      />
      {intensity > 0 && (
        <div
          style={{
            position: "absolute",
            left: `${(redSpot.x - redSpot.r) * 100}%`,
            top: `${(redSpot.y - redSpot.r) * 100}%`,
            width: `${redSpot.r * 200}%`,
            height: `${redSpot.r * 200}%`,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196,30,30,0.65) 0%, rgba(196,30,30,0.25) 40%, transparent 70%)",
            mixBlendMode: "multiply",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
