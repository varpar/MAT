"use client";

import React from "react";
import { MatImage, type MatImageVariant } from "./MatImage";
import type { MatImageRecord } from "../_lib/mat-image-types";

type Props = {
  image: MatImageRecord;
  intensity?: number;
  style?: React.CSSProperties;
  redSpot?: { x: number; y: number; r: number };
  alt?: string;
  /** MatImage variant — drives `sizes`. Defaults to "Grid". */
  variant?: MatImageVariant;
};

/** Greyscale photo with a red sindoor highlight at the parting. */
export function SelectiveColorImage({
  image,
  intensity = 1,
  style = {},
  redSpot = { x: 0.5, y: 0.18, r: 0.06 },
  alt = "",
  variant = "Grid",
}: Props) {
  return (
    <div style={{ position: "relative", overflow: "hidden", ...style }}>
      <MatImage
        image={image}
        variant={variant}
        alt={alt}
        filter={`grayscale(${intensity})`}
        style={{ objectFit: "cover" }}
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
