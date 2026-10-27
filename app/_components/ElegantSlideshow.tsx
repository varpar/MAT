"use client";

import { useEffect, useMemo, useState } from "react";
import type { MatImageRecord } from "../_lib/mat-image-types";
import { MatImage } from "./MatImage";

type Props = {
  images: MatImageRecord[];
  label: string;
  intervalMs?: number;
};

/**
 * A deliberately quiet slideshow: one photograph dissolves into the next.
 * There is no pan, zoom, shake, filter animation, or simulated film movement.
 */
export function ElegantSlideshow({ images, label, intervalMs = 5200 }: Props) {
  const slides = useMemo(() => {
    const seen = new Set<string>();
    return images.filter((image) => {
      if (seen.has(image.publicId)) return false;
      seen.add(image.publicId);
      return true;
    });
  }, [images]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, slides.length]);

  if (!slides[0]) return null;

  return (
    <div className="mat-elegant-slideshow" role="img" aria-label={label}>
      {slides.map((image, index) => (
        <div
          key={image.publicId}
          className="mat-elegant-slide"
          data-active={index === active ? "true" : "false"}
          aria-hidden={index === active ? undefined : true}
        >
          <MatImage
            image={image}
            variant={index === 0 ? "Hero" : "Grid"}
            priority={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            sizesOverride="100vw"
            alt=""
            noLightbox
          />
        </div>
      ))}

      <div className="mat-elegant-shade" aria-hidden />

      {slides.length > 1 && (
        <div className="mat-elegant-progress" aria-label="Choose photograph">
          {slides.map((image, index) => (
            <button
              key={image.publicId}
              type="button"
              aria-label={`Show photograph ${index + 1} of ${slides.length}`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
            >
              <span />
            </button>
          ))}
        </div>
      )}

      <style>{`
        .mat-elegant-slideshow,
        .mat-elegant-slide,
        .mat-elegant-shade {
          position: absolute;
          inset: 0;
        }

        .mat-elegant-slideshow {
          overflow: hidden;
          background: #171714;
        }

        .mat-elegant-slide {
          opacity: 0;
          transition: opacity 1.35s cubic-bezier(.22,.61,.36,1);
          pointer-events: none;
        }

        .mat-elegant-slide[data-active="true"] {
          opacity: 1;
          z-index: 1;
        }

        .mat-elegant-shade {
          z-index: 2;
          background: linear-gradient(180deg, transparent 68%, rgba(0,0,0,.22));
          pointer-events: none;
        }

        .mat-elegant-progress {
          position: absolute;
          z-index: 3;
          left: 50%;
          bottom: clamp(18px, 2.2vw, 34px);
          display: flex;
          gap: 7px;
          transform: translateX(-50%);
        }

        .mat-elegant-progress button {
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          margin: 0;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .mat-elegant-progress span {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,.42);
          transition: background-color .45s ease;
        }

        .mat-elegant-progress button[aria-current="true"] span {
          background: rgba(255,255,255,.96);
        }

        @media (prefers-reduced-motion: reduce) {
          .mat-elegant-slide,
          .mat-elegant-progress span {
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
