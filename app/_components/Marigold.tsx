"use client";

import React, { useEffect, useState } from "react";
import { useReveal } from "./hooks";

const MG_SRC = "/marigold.svg";
const MG_GOLD = "#e09a2b";
const MG_DEEP = "#b86a1f";
const MG_SAGE = "#5a7a73";

type SymbolWindow = Window & {
  __marigoldSymbolReady?: boolean;
  __marigoldSymbolLoading?: boolean;
  __marigoldRawInner?: string;
};

/** Lazily loads the marigold SVG and registers a global <symbol id="mg-marigold">. */
function useMarigoldSymbol() {
  const [ready, setReady] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return Boolean((window as SymbolWindow).__marigoldSymbolReady);
  });
  useEffect(() => {
    const w = window as SymbolWindow;
    if (w.__marigoldSymbolReady) {
      setReady(true);
      return;
    }
    if (w.__marigoldSymbolLoading) {
      const t = setInterval(() => {
        if (w.__marigoldSymbolReady) {
          setReady(true);
          clearInterval(t);
        }
      }, 60);
      return () => clearInterval(t);
    }
    w.__marigoldSymbolLoading = true;
    fetch(MG_SRC)
      .then((r) => r.text())
      .then((t) => {
        const inner = t
          .replace(/^[\s\S]*?<svg[^>]*>/, "")
          .replace(/<\/svg>\s*$/, "")
          .trim();
        w.__marigoldRawInner = inner;
        let host = document.getElementById("mg-marigold-host");
        if (!host) {
          host = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          ) as unknown as HTMLElement;
          host.setAttribute("id", "mg-marigold-host");
          host.setAttribute("aria-hidden", "true");
          host.style.cssText =
            "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
          document.body.appendChild(host);
        }
        host.innerHTML = `<symbol id="mg-marigold" viewBox="0 0 732 736">${inner}</symbol>`;
        if (!document.getElementById("mg-marigold-paint")) {
          const styleEl = document.createElement("style");
          styleEl.id = "mg-marigold-paint";
          styleEl.textContent = `
            #mg-marigold-host, svg use[href="#mg-marigold"] { color: inherit; }
            #mg-marigold path {
              fill: none;
              stroke: currentColor;
              stroke-width: 1.6;
              stroke-linecap: round;
              stroke-linejoin: round;
              vector-effect: non-scaling-stroke;
            }
            #mg-marigold #petals-outer  path { stroke-width: 1.8; }
            #mg-marigold #petals-mid    path { stroke-width: 1.6; }
            #mg-marigold #petals-inner  path { stroke-width: 1.4; }
            #mg-marigold #petals-center path { stroke-width: 1.2; }
            #mg-marigold #stamen        path { stroke-width: 1.0; }
          `;
          document.head.appendChild(styleEl);
        }
        w.__marigoldSymbolReady = true;
        setReady(true);
      });
  }, []);
  return ready;
}

type MarigoldProps = {
  size?: number;
  color?: string;
  rotate?: number;
  spin?: number;
  breathe?: boolean;
  flicker?: boolean;
  opacity?: number;
  strokeWidth?: number;
  style?: React.CSSProperties;
  className?: string;
};

export function Marigold({
  size = 80,
  color = MG_GOLD,
  rotate = 0,
  spin = 0,
  breathe = false,
  flicker = false,
  opacity = 1,
  strokeWidth = 1.6,
  style,
  className,
}: MarigoldProps) {
  useMarigoldSymbol();
  const wrapStyle: React.CSSProperties = {
    width: size,
    height: size,
    display: "inline-block",
    color,
    opacity,
    transformOrigin: "center",
    animation: [
      spin > 0 ? `mg-spin ${spin}s linear infinite` : null,
      breathe ? "mg-breathe 5s ease-in-out infinite" : null,
      flicker ? "mg-flicker 7s ease-in-out infinite" : null,
    ]
      .filter(Boolean)
      .join(", "),
    transform: `rotate(${rotate}deg)`,
    ...style,
  };
  return (
    <span className={className} style={wrapStyle}>
      <svg
        viewBox="0 0 732 736"
        width="100%"
        height="100%"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ overflow: "visible" }}
      >
        <use href="#mg-marigold" />
      </svg>
    </span>
  );
}

type HaloProps = {
  size?: number;
  color?: string;
  halo?: string;
  spin?: number;
  opacity?: number;
};

export function MarigoldHalo({
  size = 100,
  color = MG_GOLD,
  halo = MG_DEEP,
  spin = 60,
  opacity = 1,
}: HaloProps) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        opacity,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: -size * 0.22,
          opacity: 0.55,
          filter: "blur(10px)",
          animation: `mg-spin ${spin * 1.6}s linear infinite reverse`,
        }}
      >
        <Marigold size={size * 1.44} color={halo} strokeWidth={2.8} />
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          animation: `mg-spin ${spin}s linear infinite, mg-breathe 6s ease-in-out infinite`,
        }}
      >
        <Marigold size={size} color={color} strokeWidth={1.8} />
      </span>
    </span>
  );
}

type ShowerProps = {
  count?: number;
  color?: string;
  opacity?: number;
};

export function MarigoldShower({
  count = 8,
  color = MG_GOLD,
  opacity = 0.32,
}: ShowerProps) {
  const items = React.useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random() * 100,
        delay: Math.random() * 14,
        dur: 22 + Math.random() * 24,
        size: 24 + Math.random() * 40,
        sway: 40 + Math.random() * 80,
        spin: 30 + Math.random() * 40,
      })),
    [count]
  );
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      {items.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: -80,
            animation: `mg-fall ${p.dur}s linear ${p.delay}s infinite`,
            ["--mg-sway" as string]: `${p.sway}px`,
          } as React.CSSProperties}
        >
          <Marigold size={p.size} color={color} spin={p.spin} opacity={opacity} />
        </span>
      ))}
    </div>
  );
}

type BouquetProps = {
  side?: "left" | "right";
  size?: number;
  color?: string;
  accent?: string;
  top?: number;
  opacity?: number;
};

export function MarigoldBouquet({
  side = "left",
  size = 220,
  color = MG_GOLD,
  accent = MG_DEEP,
  top = 40,
  opacity = 0.85,
}: BouquetProps) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top,
        [side]: -size * 0.25,
        width: size,
        height: size,
        pointerEvents: "none",
        opacity,
        zIndex: 2,
        transform: side === "right" ? "scaleX(-1)" : "none",
      }}
    >
      <Marigold
        size={size}
        color={color}
        spin={90}
        breathe
        style={{ position: "absolute", left: 0, top: 0 }}
      />
      <Marigold
        size={size * 0.55}
        color={accent}
        spin={60}
        flicker
        opacity={0.85}
        style={{ position: "absolute", left: size * 0.42, top: size * 0.36 }}
      />
      <Marigold
        size={size * 0.36}
        color={color}
        spin={45}
        breathe
        opacity={0.75}
        style={{ position: "absolute", left: size * 0.05, top: size * 0.55 }}
      />
    </div>
  );
}

type DividerProps = {
  color?: string;
  ruleColor?: string;
  size?: number;
  padding?: number;
};

export function MarigoldDivider({
  color = MG_GOLD,
  ruleColor = MG_SAGE,
  size = 36,
  padding = 60,
}: DividerProps) {
  const [ref, vis] = useReveal<HTMLDivElement>(0.3);
  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 26,
        padding: `${padding}px 40px`,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 1,
          background: ruleColor,
          opacity: 0.45,
          transformOrigin: "right",
          transform: vis ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)",
        }}
      />
      <span
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "scale(1)" : "scale(0.4) rotate(-90deg)",
          transition: "all 1.2s cubic-bezier(.2,.7,.2,1) 0.4s",
          display: "inline-block",
        }}
      >
        <Marigold size={size} color={color} spin={50} breathe />
      </span>
      <div
        style={{
          flex: 1,
          height: 1,
          background: ruleColor,
          opacity: 0.45,
          transformOrigin: "left",
          transform: vis ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 1.6s cubic-bezier(.2,.7,.2,1)",
        }}
      />
    </div>
  );
}

type CornerProps = {
  side?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  size?: number;
  color?: string;
  opacity?: number;
  offset?: number;
  spin?: number;
  z?: number;
};

export function MarigoldCorner({
  side = "top-left",
  size = 240,
  color = MG_GOLD,
  opacity = 0.85,
  offset = 0,
  spin = 80,
  z = 1,
}: CornerProps) {
  const half = -size * 0.55 + offset;
  const pos: React.CSSProperties = {
    "top-left":     { left: half,  top: half },
    "top-right":    { right: half, top: half },
    "bottom-left":  { left: half,  bottom: half },
    "bottom-right": { right: half, bottom: half },
  }[side];

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        ...pos,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: z,
        opacity,
      }}
    >
      <Marigold size={size} color={color} spin={spin} breathe />
    </div>
  );
}
