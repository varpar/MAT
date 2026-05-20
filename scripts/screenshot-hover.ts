/**
 * Captures the marquee scatter effect — scrolls to the marquee, pauses CSS
 * animation so the hovered name doesn't drift mid-screenshot, hovers it,
 * and snaps the viewport.
 *
 * Usage: npx tsx scripts/screenshot-hover.ts
 */
import { chromium } from "playwright";
import path from "node:path";

const OUT = path.join(__dirname, "shots", "marquee-hover.jpg");

async function main() {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);

  // Scroll the marquee into view.
  await page.evaluate(`
    const m = document.querySelector('[aria-label="Featured couples"]');
    if (m) m.scrollIntoView({ behavior: 'instant', block: 'center' });
  `);
  await page.waitForTimeout(800);

  // Freeze the marquee animation so the hover target stays put.
  await page.addStyleTag({
    content: ".mat-marquee-track { animation-play-state: paused !important; }",
  });
  await page.waitForTimeout(200);

  // Hover the first visible couple link inside the track.
  const link = await page.$('[aria-label="Featured couples"] a');
  if (!link) throw new Error("no marquee link found");
  await link.hover();
  await page.waitForTimeout(900); // wait for scatter stagger to finish

  await page.screenshot({
    path: OUT,
    type: "jpeg",
    quality: 88,
  });
  console.log(`✓ ${OUT}`);
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
