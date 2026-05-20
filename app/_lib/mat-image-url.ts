import type { MatImageRecord } from "./mat-image-types";

/**
 * Resolve a `MatImageRecord` to a delivery URL. With no third-party image
 * host in play, this is either a `/public/` path or an external https URL.
 * Used by the OG image routes that don't go through next/image.
 */
export function matImageUrl(record: MatImageRecord, _width?: number): string {
  return record.publicId;
}
