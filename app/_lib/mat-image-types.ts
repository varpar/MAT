/**
 * Single source of truth for every image rendered through `<MatImage>`.
 *
 *   - `source: "cloudinary"` → `publicId` is a Cloudinary public_id like
 *     `mat/weddings/riya-sang-mohit/01`. The custom next/image loader
 *     resolves it into a fully-transformed delivery URL.
 *   - `source: "fallback"`   → `publicId` is a full https URL (typically
 *     Unsplash during the placeholder phase). The loader returns it as-is.
 *
 * `blurDataURL` is a ~3 KB base64 JPEG generated at migration time from the
 * BlurHash of the original. Used directly as `next/image`'s `blurDataURL` so
 * the swap is paint-ready with zero runtime decoding.
 */
export type MatImageRecord = {
  publicId: string;
  blurDataURL: string;
  width: number;
  height: number;
  alt?: string;
  source: "cloudinary" | "fallback";
};

/**
 * Tiny 8×8 sage-tinted JPEG. Used as a temporary `blurDataURL` for fallback
 * (Unsplash) entries that don't have a real blurhash yet. Once the migration
 * runs and an entry flips to `source: "cloudinary"`, its blurDataURL becomes
 * a proper hash of that image.
 */
export const FALLBACK_BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCMRXhpZgAATU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAAigAwAEAAAAAQAAAAgAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAAgACAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAACf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAUf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==";

/** Helper for fallback entries — keeps the call-site tidy. */
export function fallback(
  url: string,
  width: number,
  height: number,
  alt?: string,
): MatImageRecord {
  return {
    publicId: url,
    blurDataURL: FALLBACK_BLUR_DATA_URL,
    width,
    height,
    alt,
    source: "fallback",
  };
}
