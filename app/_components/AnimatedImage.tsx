"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { MatImage, type MatImageVariant } from "./MatImage";
import type { MatImageRecord } from "../_lib/mat-image-types";

type Props = {
  image: MatImageRecord;
  alt?: string;
  aspect?: string;
  parallax?: number; // px to translate vertically across the visible window
  reveal?: "wipe-up" | "wipe-down" | "wipe-left" | "wipe-right" | "fade" | "none";
  hoverScale?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  filter?: string;
  priority?: boolean;
  /** MatImage variant — drives `sizes`. Defaults to "Grid". */
  variant?: MatImageVariant;
};

const REVEAL_VARIANTS = {
  "wipe-up":    { from: "inset(100% 0 0 0)", to: "inset(0 0 0 0)" },
  "wipe-down":  { from: "inset(0 0 100% 0)", to: "inset(0 0 0 0)" },
  "wipe-left":  { from: "inset(0 0 0 100%)", to: "inset(0 0 0 0)" },
  "wipe-right": { from: "inset(0 100% 0 0)", to: "inset(0 0 0 0)" },
};

export function AnimatedImage({
  image,
  alt = "",
  aspect = "3/4",
  parallax = 0,
  reveal = "fade",
  hoverScale = 1.04,
  delay = 0,
  className,
  style,
  filter,
  priority,
  variant = "Grid",
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yShift: MotionValue<number> | number = parallax
    ? useTransform(scrollYProgress, [0, 1], [parallax, -parallax])
    : 0;

  const wipeFrom =
    reveal !== "fade" && reveal !== "none"
      ? REVEAL_VARIANTS[reveal].from
      : "inset(0 0 0 0)";

  const initial = reduceMotion
    ? { opacity: 0 }
    : reveal === "fade"
      ? { opacity: 0, y: 24 }
      : reveal === "none"
        ? {}
        : { clipPath: wipeFrom, opacity: 0.0001 };

  const target = reduceMotion
    ? { opacity: 1 }
    : reveal === "fade"
      ? { opacity: 1, y: 0 }
      : reveal === "none"
        ? {}
        : { clipPath: "inset(0 0 0 0)", opacity: 1 };

  return (
    <motion.div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        aspectRatio: aspect,
        background: "#0e0e0e",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        ...style,
      }}
      initial={initial}
      whileInView={target}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        duration: reveal === "fade" ? 0.9 : 1.2,
        ease: [0.2, 0.7, 0.2, 1],
        delay,
      }}
      whileHover="hover"
    >
      <motion.div
        style={{
          position: "absolute",
          // Pre-offset the inner image UP by `parallax` so when the dynamic
          // y-shift starts at +parallax (image entering viewport), the image
          // sits flush with the container top — no black gap. The extra
          // height = parallax*2 still gives full parallax travel.
          top: parallax ? -Math.abs(parallax) : 0,
          left: 0,
          right: 0,
          width: "100%",
          height: parallax ? `calc(100% + ${Math.abs(parallax) * 2}px)` : "100%",
          y: yShift,
          willChange: "transform",
        }}
        variants={
          reduceMotion
            ? undefined
            : {
                hover: { scale: hoverScale },
                rest: { scale: 1 },
              }
        }
        initial="rest"
        animate="rest"
        transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <MatImage
          image={image}
          variant={variant}
          alt={alt}
          priority={priority}
          filter={filter}
          style={{ objectFit: "cover" }}
        />
      </motion.div>
    </motion.div>
  );
}
