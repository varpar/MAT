/**
 * One-off: take the 6 chosen (of 7) optimized collage photos from
 * scripts/.staging-collage, copy them into public/images/collage/, and append
 * proper manifest entries (blurhash + blurDataURL + dims) so write-data-ts.ts
 * can wire them into MAT_IMAGES via SLOT_MAP. Durable (survives data.ts regen).
 */
import { readFile, readdir, mkdir, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

import { encode } from "blurhash";
import sharp from "sharp";

const STAGING = path.join(__dirname, ".staging-collage");
const OUT_DIR = path.join(__dirname, "..", "public", "images", "collage");
const MANIFEST_PATH = path.join(__dirname, "manifest.json");

// The 6 chosen ids (drop aks01692 — haldi groom candid).
const CHOSEN = ["a6a1052-copy", "aks06033", "aks03162", "aks09821-2", "aks07141-2", "aks02142"];

type Orient = "portrait" | "landscape" | "square";
function classify(w: number, h: number): Orient {
  const r = w / h;
  if (r > 1.15) return "landscape";
  if (r < 0.87) return "portrait";
  return "square";
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const manifest: Record<string, unknown> = existsSync(MANIFEST_PATH)
    ? JSON.parse(await readFile(MANIFEST_PATH, "utf8"))
    : {};

  const staged = (await readdir(STAGING)).filter((f) => /\.jpg$/i.test(f));

  for (const id of CHOSEN) {
    const file = `${id}.jpg`;
    if (!staged.includes(file)) throw new Error(`Missing staged file: ${file}`);
    const srcPath = path.join(STAGING, file);
    const buf = await readFile(srcPath);
    const meta = await sharp(buf).metadata();
    const w = meta.width ?? 0;
    const h = meta.height ?? 0;

    // blurhash from a 32px-edge raw thumbnail.
    const bhScale = 32 / Math.max(w, h);
    const bhW = Math.max(8, Math.round(w * bhScale));
    const bhH = Math.max(8, Math.round(h * bhScale));
    const { data: pixels } = await sharp(buf)
      .resize(bhW, bhH, { fit: "fill" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    const blurhash = encode(new Uint8ClampedArray(pixels), bhW, bhH, 4, 4);

    const blurJpeg = await sharp(buf).resize(16, 16, { fit: "fill" }).jpeg({ quality: 40 }).toBuffer();
    const blurDataURL = `data:image/jpeg;base64,${blurJpeg.toString("base64")}`;

    await copyFile(srcPath, path.join(OUT_DIR, file));

    manifest[id] = {
      src: `/images/collage/${file}`,
      source: file,
      width: w,
      height: h,
      orient: classify(w, h),
      blurhash,
      blurDataURL,
    };
    console.log(`+ ${id.padEnd(14)} ${w}x${h} ${classify(w, h)} -> /images/collage/${file}`);
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\n✓ ${CHOSEN.length} collage photos added to manifest + public/images/collage/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
