/**
 * One-off: insert Shubham & Aishwarya (sa*) image slots into the hand-maintained
 * app/_components/data.ts MAT_IMAGES block, reading exact dims/blur from the
 * optimizer's meta.json. (write-data-ts.ts is STALE — never run it.) Idempotent.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const META = path.join(__dirname, "..", "public", "images", "shubham-sang-aishwarya", "meta.json");
const DATA_TS = path.join(__dirname, "..", "app", "_components", "data.ts");

// sa* slot -> meta id (role mapping from photo categorization)
const SLOTS: [string, string][] = [
  ["saHero", "aks09326-copy"],
  ["saBride", "aks01761-2"],
  ["saGroom", "aks01765"],
  ["saStory1", "aks09493-2"],
  ["saStory2", "dsw01481"],
  ["saHaldi", "dscf4073"],
  ["saMehendi", "aks09484"],
  ["saSangeet", "dscf3658"],
  ["saPheras", "aks01725"],
  ["saVidaai", "aks01760"],
  ["saIntimateBW", "dsw01436"],
  ["saClosing", "aks01779"],
  ["saExtra1", "aks01769"],
  ["saExtra2", "dscf4084"],
  ["saExtra3", "dsw03042"],
  ["saExtra4", "dsw03061"],
  ["saExtra5", "dsw03109"],
  ["saExtra6", "dsw08402-copy"],
  ["saExtra7", "dsw08446-copy"],
  ["saExtra8", "dsw08474-copy"],
];

async function main() {
  const meta = JSON.parse(await readFile(META, "utf8"));
  let data = await readFile(DATA_TS, "utf8");
  if (data.includes("saHero:")) {
    console.log("sa* slots already present — nothing to do.");
    return;
  }
  const records = SLOTS.map(([slot, id]) => {
    const m = meta[id];
    if (!m) throw new Error(`meta missing id "${id}"`);
    return `  ${slot}: { publicId: ${JSON.stringify(m.src)}, blurDataURL: ${JSON.stringify(m.blurDataURL)}, width: ${m.width}, height: ${m.height}, source: "cloudinary" },`;
  }).join("\n");

  const block = `\n  // ── Shubham & Aishwarya (Chokhi Dhani) — replaces Monika in Best Six ──\n${records}\n`;
  const start = data.indexOf("export const MAT_IMAGES");
  const close = data.indexOf("\n};", start);
  if (start === -1 || close === -1) throw new Error("MAT_IMAGES block not found");
  data = data.slice(0, close) + "\n" + block + data.slice(close + 1);
  await writeFile(DATA_TS, data);
  console.log(`✓ Inserted ${SLOTS.length} sa* slots into MAT_IMAGES`);
}
main().catch((e) => { console.error(e); process.exit(1); });
