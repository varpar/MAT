/** One-off: optimize new team headshots (Harshit, Daksh) over the existing
 * team image paths + patch their dims/blur in data.ts. */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(__dirname, "..");
const DATA_TS = path.join(ROOT, "app", "_components", "data.ts");
const Q = 82;

async function finish(pipeline: sharp.Sharp, outRel: string) {
  const out = await pipeline.jpeg({ quality: Q, progressive: true, mozjpeg: true }).toBuffer({ resolveWithObject: true });
  await writeFile(path.join(ROOT, "public", outRel), out.data);
  const blurJpeg = await sharp(out.data).resize(16, 16, { fit: "fill" }).jpeg({ quality: 40 }).toBuffer();
  return { w: out.info.width, h: out.info.height, blur: `data:image/jpeg;base64,${blurJpeg.toString("base64")}` };
}

function patch(data: string, slot: string, r: { w: number; h: number; blur: string }) {
  const re = new RegExp(`(${slot}: \\{[\\s\\S]*?blurDataURL: ")[^"]*(",[\\s\\S]*?width: )\\d+([\\s\\S]*?height: )\\d+`);
  if (!re.test(data)) throw new Error(`slot ${slot} not matched`);
  return data.replace(re, `$1${r.blur}$2${r.w}$3${r.h}`);
}

async function main() {
  // Harshit — tall full-body shot (1836x4080); crop head→hip portrait (face ~30% down).
  const hBuf = await readFile("/Users/varunparmar/Downloads/IMG_20250301_234853.jpg");
  const h = await finish(
    sharp(hBuf).rotate().extract({ left: 0, top: 950, width: 1836, height: 2400 }),
    "images/team/harshit-morwani.jpg",
  );
  console.log(`harshit-morwani ${h.w}x${h.h}`);

  // Daksh — 4:5 seated portrait (1080x1350); optimize as-is.
  const dBuf = await readFile("/Users/varunparmar/Downloads/Untitled-1.jpg");
  const d = await finish(
    sharp(dBuf).rotate().resize({ height: 2400, fit: "inside", withoutEnlargement: true }),
    "images/team/daksh-sharma.jpg",
  );
  console.log(`daksh-sharma ${d.w}x${d.h}`);

  let data = await readFile(DATA_TS, "utf8");
  data = patch(data, "teamHarshitMorwani", h);
  data = patch(data, "teamDakshSharma", d);
  await writeFile(DATA_TS, data);
  console.log("✓ patched data.ts (dims + blur)");
}
main().catch((e) => { console.error(e); process.exit(1); });
