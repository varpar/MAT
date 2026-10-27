import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const source = path.join(here, "mi-amor-tales-website-handover.html");
const outputDir = path.resolve(here, "../output/pdf");
const output = path.join(outputDir, "mi-amor-tales-website-handover.pdf");

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto(pathToFileURL(source).href, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({ path: output, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(output);
