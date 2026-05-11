"use client";

import React, { useEffect, useState } from "react";
import { SERIF, SANS, T } from "./tokens";

type Props = {
  images: string[];
  bg?: string;
  accent?: string;
  onDone?: () => void;
};

/** First-load loader: photos cascade in then settle as a 0→100 counter ticks. */
export function PhotoCascadeLoader({
  images,
  bg = "#0e0e0e",
  accent = "#fff",
  onDone,
}: Props) {
  const [count, setCount] = useState(0);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / dur);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setCount(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setHidden(true);
          onDone?.();
        }, 480);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  if (hidden) return null;
  const fadeOut = count >= 100;

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        background: bg,
        color: accent,
        zIndex: 100,
        overflow: "hidden",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.5s ease",
        pointerEvents: fadeOut ? "none" : "auto",
      }}
    >
      {images.slice(0, 7).map((src, i) => {
        const tStart = i * 0.08;
        const tProg = Math.max(0, Math.min(1, (count / 100 - tStart) * 2.5));
        const eased = 1 - Math.pow(1 - tProg, 3);
        const rot = (i - 3) * 4 + (i % 2 === 0 ? -2 : 2);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 220,
              height: 290,
              marginLeft: -110,
              marginTop: -145,
              transform: `translate(${(i - 3) * 14}px, ${(i - 3) * 8}px) translateY(${(1 - eased) * 120}px) rotate(${rot * eased}deg) scale(${0.85 + eased * 0.15})`,
              opacity: eased,
              background: T.ink,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              zIndex: i,
              transition: "transform 0.06s linear, opacity 0.06s linear",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "grayscale(0.3)",
              }}
            />
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 36,
          bottom: 28,
          fontFamily: SANS,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        Mi Amor Tales · Loading
      </div>
      <div
        style={{
          position: "absolute",
          right: 36,
          bottom: 22,
          fontFamily: SERIF,
          fontSize: 64,
          lineHeight: 1,
          letterSpacing: "-0.02em",
          fontWeight: 300,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {String(count).padStart(2, "0")}
        <span style={{ opacity: 0.4, fontSize: 28, marginLeft: 6 }}>/100</span>
      </div>
      <div
        style={{
          position: "absolute",
          left: 36,
          top: 28,
          fontFamily: SERIF,
          fontStyle: "italic",
          fontSize: 22,
          letterSpacing: "0.02em",
        }}
      >
        Mi Amor Tales
      </div>
      <div
        style={{
          position: "absolute",
          right: 36,
          top: 32,
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        Est. Jaipur · IN
      </div>
    </div>
  );
}
