/**
 * Drive → Cloudinary migration. Run once after `scripts/rclone-pull.sh`.
 *
 * What it does, per file under ~/mat-archive/<wedding-slug>/<filename>:
 *   1. Resize a 32×32 thumbnail with `sharp`, encode it to a blurhash.
 *   2. Decode the blurhash → re-encode to a tiny base64 JPEG (~3 KB) used
 *      directly as next/image's `blurDataURL` at runtime — zero client-side
 *      decode cost.
 *   3. Read the original's intrinsic dimensions (also via `sharp`).
 *   4. Upload to Cloudinary as `mat/weddings/<slug>/<padded-index>` with
 *      eager transforms for the four delivery breakpoints.
 *   5. Append the result to `scripts/manifest.json`.
 *
 * Resumability: each iteration first checks if Cloudinary already has the
 * public_id. If yes, we skip the upload and just rebuild the manifest entry
 * from the existing resource (so partial runs are safe to re-launch).
 *
 * Concurrency: 6 simultaneous uploads via `p-limit`. Drop this if your
 * connection chokes.
 *
 * Environment:
 *   CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
 * (see .env.example).
 */
import { readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";

import { v2 as cloudinary } from "cloudinary";
import { encode } from "blurhash";
import sharp from "sharp";
import pLimit from "p-limit";
import cliProgress from "cli-progress";

import "dotenv/config";

// ─── Config ──────────────────────────────────────────────────────────────
const ARCHIVE_DIR = process.env.ARCHIVE_DIR ?? path.join(os.homedir(), "mat-archive");
const MANIFEST_PATH = path.join(__dirname, "manifest.json");
const CONCURRENCY = 6;
const EAGER_WIDTHS = [640, 1080, 1920, 2560];

// ─── Init ────────────────────────────────────────────────────────────────
const cloud = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloud || !apiKey || !apiSecret) {
  console.error(
    "✖ Missing Cloudinary env vars. Set CLOUDINARY_CLOUD_NAME, " +
      "CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in .env.local.",
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: cloud,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

// ─── Types ──────────────────────────────────────────────────────────────
type ManifestEntry = {
  publicId: string;
  width: number;
  height: number;
  blurhash: string;
  blurDataURL: string;
  source: "cloudinary";
};

type Manifest = Record<string, ManifestEntry>; // key = "<slug>:<filename>"

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  if (!existsSync(ARCHIVE_DIR)) {
    console.error(`✖ Archive directory not found: ${ARCHIVE_DIR}`);
    console.error("  Run scripts/rclone-pull.sh first.");
    process.exit(1);
  }

  const manifest: Manifest = existsSync(MANIFEST_PATH)
    ? JSON.parse(await readFile(MANIFEST_PATH, "utf8"))
    : {};

  // Walk one level deep — top-level subfolders are wedding slugs.
  const subdirs = (await readdir(ARCHIVE_DIR, { withFileTypes: true }))
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (subdirs.length === 0) {
    console.warn("⚠  No wedding folders found in", ARCHIVE_DIR);
    return;
  }

  const tasks: { slug: string; file: string; absPath: string; idx: number }[] = [];
  for (const slug of subdirs) {
    const slugPath = path.join(ARCHIVE_DIR, slug);
    const files = (await readdir(slugPath))
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort();
    files.forEach((file, idx) => {
      tasks.push({ slug, file, absPath: path.join(slugPath, file), idx: idx + 1 });
    });
  }

  console.log(`Found ${tasks.length} images across ${subdirs.length} weddings.\n`);

  const bar = new cliProgress.SingleBar(
    {
      format: "  [{bar}] {percentage}% | {value}/{total} | {slug}",
      hideCursor: true,
    },
    cliProgress.Presets.shades_classic,
  );
  bar.start(tasks.length, 0, { slug: "" });

  const limit = pLimit(CONCURRENCY);
  let completed = 0;

  await Promise.all(
    tasks.map((task) =>
      limit(async () => {
        const publicId = `mat/weddings/${task.slug}/${String(task.idx).padStart(2, "0")}`;
        const manifestKey = `${task.slug}:${task.file}`;

        try {
          // Skip if already uploaded AND already in manifest with blurhash.
          if (manifest[manifestKey]?.publicId === publicId) {
            bar.increment(1, { slug: task.slug });
            return;
          }

          // Probe Cloudinary — resumable upload skip.
          let resource: { width?: number; height?: number } | null = null;
          try {
            resource = await cloudinary.api.resource(publicId, { resource_type: "image" });
          } catch {
            resource = null;
          }

          // 1. Generate blurhash + blurDataURL via sharp.
          const buf = await readFile(task.absPath);
          const meta = await sharp(buf).metadata();
          const { width: srcW = 0, height: srcH = 0 } = meta;

          // Downscale to ~32px on the long edge for the blurhash sample.
          const longEdge = 32;
          const scale = longEdge / Math.max(srcW, srcH);
          const bhW = Math.max(8, Math.round(srcW * scale));
          const bhH = Math.max(8, Math.round(srcH * scale));

          const { data: pixels } = await sharp(buf)
            .resize(bhW, bhH, { fit: "fill" })
            .ensureAlpha()
            .raw()
            .toBuffer({ resolveWithObject: true });

          const blurhash = encode(new Uint8ClampedArray(pixels), bhW, bhH, 4, 4);

          // Re-encode the same low-res frame to a small JPEG → base64 data URL.
          const blurJpegBuf = await sharp(buf)
            .resize(16, 16, { fit: "fill" })
            .jpeg({ quality: 40 })
            .toBuffer();
          const blurDataURL = `data:image/jpeg;base64,${blurJpegBuf.toString("base64")}`;

          // 2. Upload (or skip if Cloudinary already has it).
          if (!resource) {
            await cloudinary.uploader.upload(task.absPath, {
              public_id: publicId,
              resource_type: "image",
              tags: [task.slug, "mat", "wedding"],
              overwrite: false,
              eager: EAGER_WIDTHS.map((w) => ({
                width: w,
                crop: "limit",
                fetch_format: "auto",
                quality: "auto:good",
              })),
              eager_async: true,
            });
          }

          manifest[manifestKey] = {
            publicId,
            width: srcW,
            height: srcH,
            blurhash,
            blurDataURL,
            source: "cloudinary",
          };

          // Persist after each upload so a kill mid-batch doesn't lose state.
          await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
          completed++;
        } catch (err) {
          console.error(`\n✖ Failed: ${task.slug}/${task.file}\n  `, err);
        } finally {
          bar.increment(1, { slug: task.slug });
        }
      }),
    ),
  );

  bar.stop();
  console.log(`\n✓ Uploaded ${completed} images. Manifest at ${MANIFEST_PATH}`);
  console.log("Next: npm run migrate:apply");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
