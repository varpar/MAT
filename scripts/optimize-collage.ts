/**
 * One-off: optimize the client's 6-of-7 collage replacement photos the SAME way
 * process-local.ts does (EXIF-rotate, resize long edge <= 2400, JPEG q82
 * progressive/mozjpeg) + compute next/image blurDataURL. Outputs to a staging
 * folder + a meta.json so the slot swap is a fast copy + data.ts edit.
 */
import { readFile, readdir, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

import sharp from "sharp";

const SRC_DIR = "/Users/varunparmar/Downloads/collage pictures ";
const OUT_DIR = path.join(__dirname, ".staging-collage");
const MAX_W = 2400;
const QUALITY = 82;

type Orient = "portrait" | "landscape" | "square";
function classify(w: number, h: number): Orient {
  const r = w / h;
  if (r > 1.15) return "landscape";
  if (r < 0.87) return "portrait";
  return "square";
}
function clean(filename: string): string {
  return filename
    .replace(/^Copy of /i, "")
    .replace(/\.[A-Za-z]+$/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9-]/g, "")
    .toLowerCase();
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();

  const meta: Record<string, unknown> = {};
  for (const file of files) {
    const id = clean(file);
    const outPath = path.join(OUT_DIR, `${id}.jpg`);
    const inputBuf = await readFile(path.join(SRC_DIR, file));

    const rotated = sharp(inputBuf).rotate();
    const m = await rotated.metadata();
    const srcW = m.width ?? 0;
    const srcH = m.height ?? 0;

    const outBuf = await rotated
      .resize({
        width: srcW >= srcH ? MAX_W : undefined,
        height: srcH > srcW ? MAX_W : undefined,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });

    await writeFile(outPath, outBuf.data);
    const { width: outW, height: outH } = outBuf.info;

    const blurJpegBuf = await sharp(outBuf.data)
      .resize(16, 16, { fit: "fill" })
      .jpeg({ quality: 40 })
      .toBuffer();
    const blurDataURL = `data:image/jpeg;base64,${blurJpegBuf.toString("base64")}`;

    const inKB = ((await stat(path.join(SRC_DIR, file))).size / 1024).toFixed(0);
    const outKB = (outBuf.data.length / 1024).toFixed(0);
    meta[id] = { id, source: file, width: outW, height: outH, orient: classify(outW, outH), blurDataURL };

    console.log(
      `${id.padEnd(22)} ${String(outW).padStart(4)}x${String(outH).padStart(4)}  ` +
        `${classify(outW, outH).padEnd(9)} ${inKB}KB -> ${outKB}KB`,
    );
  }

  await writeFile(path.join(OUT_DIR, "meta.json"), JSON.stringify(meta, null, 2));
  console.log(`\n✓ ${files.length} optimized -> ${OUT_DIR}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
