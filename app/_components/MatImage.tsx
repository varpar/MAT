"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import type { MatImageRecord } from "../_lib/mat-image-types";
import { useLightbox } from "./Lightbox";

type VariantPreset = {
  sizes: string;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Variant presets — each is a (sizes, priority?, fetchPriority?) triple. These
 * are the five real layouts on this site; using one of them is preferred over
 * passing `sizes` ad-hoc because Lighthouse penalises missing or wrong sizes
 * far more often than missing AVIF.
 */
const VARIANTS = {
  /** Full-bleed hero image. Always above the fold. */
  Hero: {
    sizes: "100vw",
    priority: true,
    fetchPriority: "high",
  },
  /**
   * 3-up / 4-up content grids (showcase, ritual timeline, mosaic). Tracks the
   * real layout: 33vw on desktop (≥1024), 50vw on tablets (≥640), full-bleed
   * on phones — grid cards now go full-width with ~16px gutters at ≤640.
   */
  Grid: {
    sizes:
      "(min-width: 1280px) 33vw, (min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw",
  },
  /** Weddings-archive polaroid columns. 4-up desktop → 2-up tablet → 1-up phone. */
  Polaroid: {
    sizes:
      "(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  },
  /** Small portraits — about/team, film-strip frames. */
  Thumbnail: {
    sizes: "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
  },
  /** Featured-couples marquee preview tiles. */
  Marquee: {
    sizes: "(min-width: 1024px) 40vw, (min-width: 640px) 60vw, 85vw",
  },
} as const satisfies Record<string, VariantPreset>;

export type MatImageVariant = keyof typeof VARIANTS;

type Props = Omit<ImageProps, "src" | "loader" | "placeholder" | "blurDataURL" | "alt" | "sizes" | "width" | "height" | "fill"> & {
  image: MatImageRecord;
  variant: MatImageVariant;
  alt?: string;
  /**
   * Default true — image fills its parent (which sets `aspect-ratio`).
   * Set to false and pass `width`/`height` if you need an intrinsic-size image.
   */
  fill?: boolean;
  width?: number;
  height?: number;
  /** Override the variant's `sizes` if you really need to. */
  sizesOverride?: string;
  /** Pass a CSS filter (e.g. selective-color grayscale). */
  filter?: string;
  /** Opt out of lightbox click-to-zoom even when a <LightboxProvider> is
   *  mounted above. Use for hero backgrounds and similar atmospheric images
   *  where clicking shouldn't open a full-screen viewer. */
  noLightbox?: boolean;
};

/**
 * The one image render path. Wraps `next/image` with:
 *   • the custom Cloudinary loader (set globally in `next.config.ts`)
 *   • `placeholder="blur"` with the record's pre-generated `blurDataURL`
 *   • a required `variant` that drives `sizes` and above-fold priority
 *   • a `data-mat-image` hook so `globals.css` can stretch the swap to 600ms
 *     using the brand easing curve.
 */
export function MatImage({
  image,
  variant,
  alt,
  fill = true,
  width,
  height,
  sizesOverride,
  filter,
  noLightbox,
  style,
  className,
  ...rest
}: Props) {
  const preset: VariantPreset = VARIANTS[variant];
  const isHero = variant === "Hero";
  const lightbox = useLightbox();
  const lbActive = lightbox && !noLightbox;

  const commonStyle: React.CSSProperties = {
    objectFit: "cover",
    filter,
    ...(lbActive ? { cursor: "zoom-in" } : null),
    ...style,
  };

  const lbHandlers = lbActive
    ? {
        onClick: () => lightbox.open(image, alt ?? image.alt),
        onKeyDown: (e: React.KeyboardEvent<HTMLImageElement>) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            lightbox.open(image, alt ?? image.alt);
          }
        },
        role: "button" as const,
        tabIndex: 0,
        "aria-label": `Open photograph — ${alt ?? image.alt ?? "untitled"}`,
        // Brand sage cursor reads data-cursor — show "View" on hover.
        "data-cursor": "View",
      }
    : null;

  if (fill) {
    return (
      <Image
        {...rest}
        {...lbHandlers}
        src={image.publicId}
        alt={alt ?? image.alt ?? ""}
        fill
        sizes={sizesOverride ?? preset.sizes}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        priority={isHero ? preset.priority : rest.priority}
        fetchPriority={isHero ? preset.fetchPriority : rest.fetchPriority}
        className={className}
        style={commonStyle}
        data-mat-image=""
      />
    );
  }

  return (
    <Image
      {...rest}
      {...lbHandlers}
      src={image.publicId}
      alt={alt ?? image.alt ?? ""}
      width={width ?? image.width}
      height={height ?? image.height}
      sizes={sizesOverride ?? preset.sizes}
      placeholder="blur"
      blurDataURL={image.blurDataURL}
      priority={isHero ? preset.priority : rest.priority}
      fetchPriority={isHero ? preset.fetchPriority : rest.fetchPriority}
      className={className}
      style={commonStyle}
      data-mat-image=""
    />
  );
}
