/**
 * Targeted section screenshot — scrolls to a CSS selector and snaps a
 * focused viewport shot. Used to verify section-level edits.
 *
 * Usage: npx tsx scripts/screenshot-section.ts <path> <selector> <out>
 */
import { chromium } from "playwright";
import path from "node:path";

async function main() {
  const [, , urlPath = "/", selector = ".mat-vidsection", outName = "section.jpg"] =
    process.argv;
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto(`http://localhost:3000${urlPath}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);

  const el = await page.$(selector);
  if (!el) throw new Error(`selector not found: ${selector}`);

  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);

  const box = await el.boundingBox();
  if (!box) throw new Error("could not measure element");

  // Capture viewport including some bleed above/below.
  const top = Math.max(0, box.y - 80);
  const height = Math.min(900, box.height + 160);
  await page.screenshot({
    path: path.join(__dirname, "shots", outName),
    clip: { x: 0, y: top, width: 1440, height },
    type: "jpeg",
    quality: 88,
  });
  console.log(`✓ ${outName}`);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
