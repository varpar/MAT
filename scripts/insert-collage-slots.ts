/**
 * One-off: hand-insert the 6 homepage-collage slots into the HAND-MAINTAINED
 * app/_components/data.ts. NOTE: scripts/write-data-ts.ts is STALE and would
 * clobber the real featured stories — do NOT run it. data.ts is the source of
 * truth, so we surgically inject these slots into the MAT_IMAGES block.
 * Idempotent.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const MANIFEST = path.join(__dirname, "manifest.json");
const DATA_TS = path.join(__dirname, "..", "app", "_components", "data.ts");

// collage slot -> manifest key
const SLOTS: [string, string][] = [
  ["collage1", "a6a1052-copy"],
  ["collage2", "aks06033"],
  ["collage3", "aks03162"],
  ["collage4", "aks09821-2"],
  ["collage5", "aks07141-2"],
  ["collage6", "aks02142"],
];

async function main() {
  const manifest = JSON.parse(await readFile(MANIFEST, "utf8"));
  let data = await readFile(DATA_TS, "utf8");

  if (data.includes("collage1:")) {
    console.log("collage slots already present — nothing to do.");
    return;
  }

  const records = SLOTS.map(([slot, key]) => {
    const m = manifest[key];
    if (!m) throw new Error(`manifest missing key "${key}"`);
    return [
      `  ${slot}: {`,
      `    publicId: ${JSON.stringify(m.src)},`,
      `    blurDataURL: ${JSON.stringify(m.blurDataURL)},`,
      `    width: ${m.width},`,
      `    height: ${m.height},`,
      `    source: "cloudinary",`,
      `  },`,
    ].join("\n");
  }).join("\n");

  const block = `\n  // ── Homepage collage refresh (Jun 2026 client round) ─────────────\n  // Editorial replacements for the 6 event/stage shots in the triptych +\n  // film reel. Dedicated slots so the shared pool (About team, Weddings\n  // archive, Featured stories) is untouched. Hand-maintained — write-data-ts.ts\n  // is stale; do not regenerate.\n${records}\n`;

  // Find the MAT_IMAGES block and inject before its closing "};".
  const startIdx = data.indexOf("export const MAT_IMAGES");
  if (startIdx === -1) throw new Error("MAT_IMAGES not found");
  const closeIdx = data.indexOf("\n};", startIdx);
  if (closeIdx === -1) throw new Error("MAT_IMAGES closing not found");

  data = data.slice(0, closeIdx) + "\n" + block + data.slice(closeIdx + 1);
  await writeFile(DATA_TS, data);
  console.log(`✓ Inserted ${SLOTS.length} collage slots into data.ts MAT_IMAGES`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
