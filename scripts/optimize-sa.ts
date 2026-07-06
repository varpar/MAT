/**
 * One-off: optimize Shubham & Aishwarya's photos → public/images/shubham-sang-aishwarya/
 * (same pipeline as the rest of the site: EXIF-rotate, long edge <= 2400, q82
 * progressive/mozjpeg) + blurhash/blurDataURL/dims into a meta.json so the
 * data.ts slot records can be wired up by content role.
 */
import { readFile, readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

import { encode } from "blurhash";
import sharp from "sharp";

const SRC_DIR = "/Users/varunparmar/Downloads/shubham aiswarya";
const OUT_DIR = path.join(__dirname, "..", "public", "images", "shubham-sang-aishwarya");
const META = path.join(OUT_DIR, "meta.json");
const MAX_W = 2400;
const QUALITY = 82;

type Orient = "portrait" | "landscape" | "square";
function classify(w: number, h: number): Orient {
  const r = w / h;
  if (r > 1.15) return "landscape";
  if (r < 0.87) return "portrait";
  return "square";
}
function clean(f: string): string {
  return f.replace(/\.[A-Za-z]+$/, "").replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
  const meta: Record<string, unknown> = {};

  for (const file of files) {
    const id = clean(file);
    const outPath = path.join(OUT_DIR, `${id}.jpg`);
    const buf = await readFile(path.join(SRC_DIR, file));
    const rotated = sharp(buf).rotate();
    const m = await rotated.metadata();
    const srcW = m.width ?? 0, srcH = m.height ?? 0;

    const out = await rotated
      .resize({ width: srcW >= srcH ? MAX_W : undefined, height: srcH > srcW ? MAX_W : undefined, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });
    await writeFile(outPath, out.data);
    const { width: w, height: h } = out.info;

    const bhScale = 32 / Math.max(w, h);
    const bhW = Math.max(8, Math.round(w * bhScale)), bhH = Math.max(8, Math.round(h * bhScale));
    const { data: px } = await sharp(out.data).resize(bhW, bhH, { fit: "fill" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const blurhash = encode(new Uint8ClampedArray(px), bhW, bhH, 4, 4);
    const blurJpeg = await sharp(out.data).resize(16, 16, { fit: "fill" }).jpeg({ quality: 40 }).toBuffer();
    const blurDataURL = `data:image/jpeg;base64,${blurJpeg.toString("base64")}`;

    const inKB = ((await stat(path.join(SRC_DIR, file))).size / 1024).toFixed(0);
    meta[id] = { id, source: file, src: `/images/shubham-sang-aishwarya/${id}.jpg`, width: w, height: h, orient: classify(w, h), blurhash, blurDataURL };
    console.log(`${id.padEnd(18)} ${String(w).padStart(4)}x${String(h).padStart(4)} ${classify(w, h).padEnd(9)} ${inKB}KB->${(out.data.length / 1024).toFixed(0)}KB`);
  }

  await writeFile(META, JSON.stringify(meta, null, 2));
  console.log(`\n✓ ${files.length} optimized -> ${OUT_DIR}`);
}
main().catch((e) => { console.error(e); process.exit(1); });
