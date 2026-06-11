/**
 * Team headshot processor — extracts headshots from the MAT magazine PDF,
 * converts to grayscale, resizes to 1600px on long edge, writes /public/images/team/<slug>.jpg
 * and emits a manifest snippet with blurDataURL / width / height for MAT_IMAGES.
 *
 * Expects pdfimages-extracted JPEGs at /tmp/mat-team-extract/p-0NN.jpg.
 * Run after:
 *   pdfimages -j -f 72 -l 75 "/path/to/MI AMOR Magzine-3 (1).pdf" /tmp/mat-team-extract/p
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

import { encode } from "blurhash";
import sharp from "sharp";

const SRC_DIR = "/tmp/mat-team-extract";
const OUT_DIR = path.join(__dirname, "..", "public", "images", "team");
const MAX_EDGE = 1600;
const QUALITY = 82;

// Source-extract index → slug + display name. p-006 (Rahul Yadav) intentionally
// skipped — the client has not approved his portrait yet, so the AboutClient
// keeps a placeholder for him.
const MAPPING: { file: string; slug: string; name: string }[] = [
  { file: "p-000.jpg", slug: "rahul-sharma",      name: "Rahul Sharma" },
  { file: "p-001.jpg", slug: "harshita-sharma",   name: "Harshita Sharma" },
  { file: "p-002.jpg", slug: "nandini-shekhawat", name: "Nandini Shekhawat" },
  { file: "p-003.jpg", slug: "prem-kant",         name: "Prem Kant" },
  { file: "p-005.jpg", slug: "akash-pandey",      name: "Akash Pandey" },
  { file: "p-004.jpg", slug: "daksh-sharma",      name: "Daksh Sharma" },
  { file: "p-007.jpg", slug: "harshit-morwani",   name: "Harshit Morwani" },
];

type Entry = {
  slug: string;
  name: string;
  publicId: string;
  width: number;
  height: number;
  blurDataURL: string;
};

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const out: Entry[] = [];

  for (const m of MAPPING) {
    const inputPath = path.join(SRC_DIR, m.file);
    const inputBuf = await readFile(inputPath);

    const rotated = sharp(inputBuf).rotate();
    const meta = await rotated.metadata();
    const srcW = meta.width ?? 0;
    const srcH = meta.height ?? 0;

    const resized = rotated
      .resize({
        width: srcW >= srcH ? MAX_EDGE : undefined,
        height: srcH > srcW ? MAX_EDGE : undefined,
        fit: "inside",
        withoutEnlargement: true,
      })
      .grayscale();

    const outBuf = await resized
      .jpeg({ quality: QUALITY, progressive: true, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });

    const outPath = path.join(OUT_DIR, `${m.slug}.jpg`);
    await writeFile(outPath, outBuf.data);

    const { width: outW, height: outH } = outBuf.info;

    // Blurhash (informational; we only need blurDataURL for MAT_IMAGES, but we
    // mirror the process-local.ts pipeline so the records look identical.)
    const bhMaxEdge = 32;
    const bhScale = bhMaxEdge / Math.max(outW, outH);
    const bhW = Math.max(8, Math.round(outW * bhScale));
    const bhH = Math.max(8, Math.round(outH * bhScale));

    const { data: pixels } = await sharp(outBuf.data)
      .resize(bhW, bhH, { fit: "fill" })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Compute (and discard) the blurhash string to keep parity with the
    // wedding pipeline. The MAT_IMAGES record only uses blurDataURL.
    encode(new Uint8ClampedArray(pixels), bhW, bhH, 4, 4);

    const blurJpegBuf = await sharp(outBuf.data)
      .resize(16, 16, { fit: "fill" })
      .jpeg({ quality: 40 })
      .toBuffer();
    const blurDataURL = `data:image/jpeg;base64,${blurJpegBuf.toString("base64")}`;

    out.push({
      slug: m.slug,
      name: m.name,
      publicId: `/images/team/${m.slug}.jpg`,
      width: outW,
      height: outH,
      blurDataURL,
    });

    console.log(`  ✓ ${m.name.padEnd(22)} → ${m.slug}.jpg  ${outW}×${outH}  (${(outBuf.data.length / 1024).toFixed(0)} KB)`);
  }

  // Emit a snippet to paste into MAT_IMAGES.
  const snippet =
    out
      .map((e) => {
        const key =
          "team" +
          e.name
            .replace(/[^A-Za-z]/g, " ")
            .split(/\s+/)
            .filter(Boolean)
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join("");
        return `  ${key}: {\n    publicId: "${e.publicId}",\n    blurDataURL: "${e.blurDataURL}",\n    width: ${e.width},\n    height: ${e.height},\n    source: "cloudinary",\n  },`;
      })
      .join("\n");

  const snippetPath = path.join(__dirname, "team-snippet.txt");
  await writeFile(snippetPath, snippet + "\n");
  console.log(`\nSnippet written to ${snippetPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
