/** Re-crop Harshit tighter (head→waist, filling the tile like the other team
 * portraits) + rename both team files to bust the Next dev image cache, then
 * repoint their data.ts slots. */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(__dirname, "..");
const DATA_TS = path.join(ROOT, "app", "_components", "data.ts");

async function finish(pipeline: sharp.Sharp, outRel: string) {
  const out = await pipeline.jpeg({ quality: 82, progressive: true, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  await writeFile(path.join(ROOT, "public", outRel), out.data);
  const blurJpeg = await sharp(out.data).resize(16, 16, { fit: "fill" }).jpeg({ quality: 40 }).toBuffer();
  return { src: "/" + outRel, w: out.info.width, h: out.info.height, blur: `data:image/jpeg;base64,${blurJpeg.toString("base64")}` };
}

function patch(data: string, slot: string, r: { src: string; w: number; h: number; blur: string }) {
  const re = new RegExp(`(${slot}: \\{\\s*publicId: ")[^"]*(",\\s*blurDataURL: ")[^"]*(",\\s*width: )\\d+(,\\s*height: )\\d+`);
  if (!re.test(data)) throw new Error(`slot ${slot} not matched`);
  return data.replace(re, `$1${r.src.replace(/^\/images/, "/images")}$2${r.blur}$3${r.w}$4${r.h}`);
}

async function main() {
  // Harshit — tighter head→waist crop from the original full-body shot, centered on him.
  const hBuf = await readFile("/Users/varunparmar/Downloads/IMG_20250301_234853.jpg");
  const h = await finish(
    sharp(hBuf).rotate().extract({ left: 400, top: 980, width: 1050, height: 1400 }),
    "images/team/harshit-morwani-2.jpg",
  );
  console.log(`harshit ${h.w}x${h.h}`);

  // Daksh — same seated portrait, new filename to bust the cache.
  const dBuf = await readFile("/Users/varunparmar/Downloads/Untitled-1.jpg");
  const d = await finish(
    sharp(dBuf).rotate().resize({ height: 2400, fit: "inside", withoutEnlargement: true }),
    "images/team/daksh-sharma-2.jpg",
  );
  console.log(`daksh ${d.w}x${d.h}`);

  let data = await readFile(DATA_TS, "utf8");
  data = patch(data, "teamHarshitMorwani", { ...h, src: "/images/team/harshit-morwani-2.jpg" });
  data = patch(data, "teamDakshSharma", { ...d, src: "/images/team/daksh-sharma-2.jpg" });
  await writeFile(DATA_TS, data);
  console.log("✓ repointed data.ts slots to -2 filenames");
}
main().catch((e) => { console.error(e); process.exit(1); });
