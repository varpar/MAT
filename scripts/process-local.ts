/**
 * Local photo processor — Drive selection → /public/images/.
 *
 *   1. Reads every .jpg / .jpeg / .png from SRC_DIR.
 *   2. Auto-rotates per EXIF, resizes to MAX_W on the long edge, encodes JPEG q82
 *      (mozjpeg if available) → /public/images/weddings/<n>.jpg.
 *   3. Generates a blurhash + tiny base64 JPEG thumbnail for next/image's
 *      `blurDataURL`.
 *   4. Classifies orientation: portrait / landscape / square.
 *   5. Emits scripts/manifest.json (used by the next step to map photos to
 *      MAT_IMAGES slots).
 *
 * Idempotent — already-processed files are skipped if both the output JPG and
 * a manifest entry already exist.
 */
import { readFile, readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import { encode } from "blurhash";
import sharp from "sharp";
import pLimit from "p-limit";
import cliProgress from "cli-progress";

const SRC_DIR = process.argv[2] ?? "/Users/varunparmar/Downloads/SELECTION  2";
const OUT_DIR = path.join(__dirname, "..", "public", "images", "weddings");
const MANIFEST_PATH = path.join(__dirname, "manifest.json");
const MAX_W = 2400;
const QUALITY = 82;
const CONCURRENCY = 4;

type Orient = "portrait" | "landscape" | "square";

type Entry = {
  /** Public URL path used in MAT_IMAGES. */
  src: string;
  /** Original filename for reference. */
  source: string;
  width: number;
  height: number;
  orient: Orient;
  blurhash: string;
  blurDataURL: string;
};

function classify(w: number, h: number): Orient {
  const r = w / h;
  if (r > 1.15) return "landscape";
  if (r < 0.87) return "portrait";
  return "square";
}

function slug(filename: string, idx: number): string {
  // Camera names like "Copy of AKS01386.jpg" → "aks01386".
  const base = filename
    .replace(/^Copy of /i, "")
    .replace(/\.[A-Za-z]+$/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
  return `${String(idx).padStart(3, "0")}-${base}`;
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    console.error(`✖ Source not found: ${SRC_DIR}`);
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const files = (await readdir(SRC_DIR))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort();

  console.log(`Found ${files.length} source photos.`);
  console.log(`Writing to: ${OUT_DIR}\n`);

  const manifest: Record<string, Entry> = existsSync(MANIFEST_PATH)
    ? JSON.parse(await readFile(MANIFEST_PATH, "utf8"))
    : {};

  const bar = new cliProgress.SingleBar(
    {
      format: "  [{bar}] {percentage}% | {value}/{total} | {name}",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(files.length, 0, { name: "" });

  const limit = pLimit(CONCURRENCY);

  await Promise.all(
    files.map((file, idx) =>
      limit(async () => {
        try {
          const id = slug(file, idx + 1);
          const outPath = path.join(OUT_DIR, `${id}.jpg`);
          const publicSrc = `/images/weddings/${id}.jpg`;

          if (existsSync(outPath) && manifest[id]) {
            bar.increment(1, { name: id });
            return;
          }

          const inputPath = path.join(SRC_DIR, file);
          const inputBuf = await readFile(inputPath);

          // Auto-rotate from EXIF, resize, encode.
          const rotated = sharp(inputBuf).rotate();
          const meta = await rotated.metadata();
          const srcW = meta.width ?? 0;
          const srcH = meta.height ?? 0;

          const resized = rotated.resize({
            width: srcW >= srcH ? MAX_W : undefined,
            height: srcH > srcW ? MAX_W : undefined,
            fit: "inside",
            withoutEnlargement: true,
          });

          const outBuf = await resized
            .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
            .toBuffer({ resolveWithObject: true });

          await writeFile(outPath, outBuf.data);

          const { width: outW, height: outH } = outBuf.info;

          // ─── Blurhash + blurDataURL ───────────────────────────────────
          const bhMaxEdge = 32;
          const bhScale = bhMaxEdge / Math.max(outW, outH);
          const bhW = Math.max(8, Math.round(outW * bhScale));
          const bhH = Math.max(8, Math.round(outH * bhScale));

          const { data: pixels } = await sharp(outBuf.data)
            .resize(bhW, bhH, { fit: "fill" })
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

          const blurhash = encode(new Uint8ClampedArray(pixels), bhW, bhH, 4, 4);

          const blurJpegBuf = await sharp(outBuf.data)
            .resize(16, 16, { fit: "fill" })
            .jpeg({ quality: 40 })
            .toBuffer();
          const blurDataURL = `data:image/jpeg;base64,${blurJpegBuf.toString("base64")}`;

          manifest[id] = {
            src: publicSrc,
            source: file,
            width: outW,
            height: outH,
            orient: classify(outW, outH),
            blurhash,
            blurDataURL,
          };

          // Persist after each so partial runs are safe.
          await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
          bar.increment(1, { name: id });
        } catch (err) {
          bar.increment(1, { name: `✖ ${file}` });
          console.error(`\n  Failed ${file}:`, err);
        }
      }),
    ),
  );

  bar.stop();

  const stats = {
    total: Object.keys(manifest).length,
    portrait: Object.values(manifest).filter((e) => e.orient === "portrait").length,
    landscape: Object.values(manifest).filter((e) => e.orient === "landscape").length,
    square: Object.values(manifest).filter((e) => e.orient === "square").length,
  };

  // Aggregate output size.
  let outBytes = 0;
  for (const entry of Object.values(manifest)) {
    try {
      const f = await stat(path.join(__dirname, "..", "public", entry.src));
      outBytes += f.size;
    } catch {
      /* skip */
    }
  }

  console.log(`\n✓ ${stats.total} processed`);
  console.log(`  ${stats.landscape} landscape, ${stats.portrait} portrait, ${stats.square} square`);
  console.log(`  Total /public/ size: ${(outBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
