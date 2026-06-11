"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { MatImageRecord } from "../_lib/mat-image-types";
import { SANS } from "./tokens";

type LightboxItem = { img: MatImageRecord; alt?: string };

type LightboxCtx = {
  open: (img: MatImageRecord, alt?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const Ctx = createContext<LightboxCtx | null>(null);

/** Returns the lightbox controller when a <LightboxProvider> is mounted
 *  above this component, otherwise null. MatImage consumes this — if null,
 *  it renders normally; if non-null, the image becomes click-to-zoom. */
export function useLightbox(): LightboxCtx | null {
  return useContext(Ctx);
}

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const open = useCallback(
    (img: MatImageRecord, alt?: string) => setItem({ img, alt }),
    [],
  );
  const close = useCallback(() => setItem(null), []);

  // ESC to close + scroll lock while the lightbox is open.
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, close]);

  return (
    <Ctx.Provider value={{ open, close, isOpen: !!item }}>
      {children}
      {mounted && item
        ? createPortal(<LightboxOverlay item={item} onClose={close} />, document.body)
        : null}
    </Ctx.Provider>
  );
}

function LightboxOverlay({
  item,
  onClose,
}: {
  item: LightboxItem;
  onClose: () => void;
}) {
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photograph viewer"
      data-cursor="Close"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(10, 10, 10, 0.94)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 4vw, 56px)",
        cursor: "zoom-out",
        animation: "matLb-fade 320ms cubic-bezier(.2,.7,.2,1)",
      }}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photograph viewer"
        style={{
          position: "absolute",
          top: "clamp(16px, 2.4vw, 28px)",
          right: "clamp(16px, 2.4vw, 28px)",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.32)",
          color: "#fff",
          fontFamily: SANS,
          fontSize: 22,
          lineHeight: 1,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 180ms ease, transform 180ms ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget.style.background = "rgba(255,255,255,0.18)"),
          (e.currentTarget.style.transform = "scale(1.04)"))
        }
        onMouseLeave={(e) =>
          ((e.currentTarget.style.background = "rgba(255,255,255,0.08)"),
          (e.currentTarget.style.transform = "scale(1)"))
        }
      >
        ×
      </button>

      {/* Hairline brand mark, bottom-left — keeps the modal feeling like part
          of the site, not a generic image viewer. */}
      <div
        style={{
          position: "absolute",
          left: "clamp(16px, 2.4vw, 28px)",
          bottom: "clamp(16px, 2.4vw, 24px)",
          color: "#fff",
          fontFamily: SANS,
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          opacity: 0.55,
          pointerEvents: "none",
        }}
      >
        Mi Amor Tales
      </div>

      {/* The image — original aspect, contained within the viewport. Native
          <img> (not next/image) so we serve the raw asset at original size. */}
      <img
        src={item.img.publicId}
        alt={item.alt ?? ""}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
          cursor: "default",
          animation: "matLb-zoom 360ms cubic-bezier(.2,.7,.2,1)",
        }}
        draggable={false}
      />

      <style>{`
        @keyframes matLb-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes matLb-zoom {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
