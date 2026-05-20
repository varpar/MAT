/**
 * Visual verification — drives the running dev server with Playwright and
 * captures full-page screenshots of every key route at desktop width.
 *
 * Usage: npx tsx scripts/screenshot.ts  (assumes dev server on :3000)
 */
import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const ORIGIN = process.env.MAT_ORIGIN ?? "http://localhost:3000";
const OUT_DIR = path.join(__dirname, "shots");

const ROUTES = [
  { url: "/", name: "home" },
  { url: "/featured", name: "featured-index" },
  { url: "/featured/anvesha-sang-omkar", name: "featured-anvesha" },
  { url: "/featured/harsh-sang-pooja", name: "featured-harsh" },
  { url: "/featured/riya-sang-mohit", name: "featured-slug" },
  { url: "/weddings", name: "weddings" },
  { url: "/about", name: "about" },
  { url: "/tales", name: "tales" },
];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  for (const r of ROUTES) {
    const page = await ctx.newPage();
    console.log(`→ ${r.url}`);
    await page.goto(`${ORIGIN}${r.url}`, { waitUntil: "networkidle", timeout: 30000 });
    // Let lazy-loaded below-the-fold images settle.
    await page.waitForTimeout(1500);
    // Scroll to bottom to trigger lazy loads, then back to top for the shot.
    const totalHeight = (await page.evaluate("document.body.scrollHeight")) as number;
    for (let y = 0; y < totalHeight; y += 600) {
      await page.evaluate(`window.scrollTo(0, ${y})`);
      await page.waitForTimeout(120);
    }
    await page.waitForTimeout(1500);
    await page.evaluate("window.scrollTo(0, 0)");
    await page.waitForTimeout(500);

    const shotPath = path.join(OUT_DIR, `${r.name}.jpg`);
    await page.screenshot({ path: shotPath, fullPage: true, type: "jpeg", quality: 78 });
    // Also capture viewport-only (above-fold) for hero detail review.
    const heroPath = path.join(OUT_DIR, `${r.name}-hero.jpg`);
    await page.screenshot({ path: heroPath, fullPage: false, type: "jpeg", quality: 85 });
    console.log(`  ✓ ${shotPath}  +  ${heroPath}`);
    await page.close();
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
