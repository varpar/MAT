import { chromium } from "playwright";

const URLS = [
  ["home", "http://localhost:3003/"],
  ["featured", "http://localhost:3003/featured"],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.error("PAGEERROR:", e.message));
page.on("console", (m) => { if (m.type() === "error") console.error("CONSOLE:", m.text()); });

for (const [name, url] of URLS) {
  console.log("→", url);
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1500);
  // Slow scroll so lazy <img> all trigger; then wait for ALL of them to finish loading.
  await page.evaluate(async () => {
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += 400) { window.scrollTo(0, y); await new Promise(r=>setTimeout(r,250)); }
    window.scrollTo(0, total); await new Promise(r=>setTimeout(r, 500));
    window.scrollTo(0, 0); await new Promise(r=>setTimeout(r, 500));
  });
  // Wait for every <img> on the page to actually finish loading.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img => img.complete && img.naturalWidth > 0 ? Promise.resolve() : new Promise(res => {
      img.addEventListener("load", res, { once: true });
      img.addEventListener("error", res, { once: true });
      setTimeout(res, 8000);
    })));
  });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/tmp/jh-${name}.png`, fullPage: true });
  console.log("  saved /tmp/jh-" + name + ".png");
}
await browser.close();
