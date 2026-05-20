/**
 * Builds a single contact-sheet PNG (8 × 12 grid) of every processed photo,
 * each with its slug overlaid in small white text. Used as a one-shot
 * visual reference for assigning photos to MAT_IMAGES slots.
 */
import { readFile, writeFile, readdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const OUT_DIR = path.join(__dirname, "..", "public", "images", "weddings");
const SHEET_PATH = path.join(__dirname, "contact-sheet.png");

const COLS = 6;
const CELL_W = 200;
const CELL_H = 200;
const PAD = 4;
const LABEL_H = 26;
const PER_SHEET = 24;

async function buildSheet(batch: string[], offset: number, outPath: string) {
  const rows = Math.ceil(batch.length / COLS);
  const totalW = COLS * (CELL_W + PAD) + PAD;
  const totalH = rows * (CELL_H + LABEL_H + PAD) + PAD;

  const tiles = await Promise.all(
    batch.map(async (file, i) => {
      const buf = await readFile(path.join(OUT_DIR, file));
      const idx = offset + i + 1;
      const thumb = await sharp(buf)
        .resize(CELL_W, CELL_H, { fit: "cover" })
        .extend({
          bottom: LABEL_H,
          background: { r: 0, g: 0, b: 0 },
        })
        .composite([
          {
            input: Buffer.from(
              `<svg width="${CELL_W}" height="${LABEL_H}">
                <rect width="${CELL_W}" height="${LABEL_H}" fill="rgba(0,0,0,0.9)"/>
                <text x="6" y="18" font-family="monospace" font-size="14" fill="white" font-weight="bold">#${idx} ${file.replace(".jpg", "").replace(/^\d+-/, "").slice(0, 18)}</text>
              </svg>`,
            ),
            top: CELL_H,
            left: 0,
          },
        ])
        .jpeg({ quality: 75 })
        .toBuffer();
      return {
        buf: thumb,
        x: PAD + (i % COLS) * (CELL_W + PAD),
        y: PAD + Math.floor(i / COLS) * (CELL_H + LABEL_H + PAD),
      };
    }),
  );

  const sheet = await sharp({
    create: { width: totalW, height: totalH, channels: 3, background: "#1a1a1a" },
  })
    .composite(tiles.map((t) => ({ input: t.buf, top: t.y, left: t.x })))
    .jpeg({ quality: 80 })
    .toBuffer();

  await writeFile(outPath, sheet);
  console.log(`✓ ${outPath}`);
}

async function main() {
  const files = (await readdir(OUT_DIR)).filter((f) => f.endsWith(".jpg")).sort();

  console.log(`Building contact sheets for ${files.length} photos…`);

  for (let i = 0; i < files.length; i += PER_SHEET) {
    const batch = files.slice(i, i + PER_SHEET);
    const sheetNum = Math.floor(i / PER_SHEET) + 1;
    await buildSheet(batch, i, path.join(__dirname, `contact-sheet-${sheetNum}.jpg`));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
