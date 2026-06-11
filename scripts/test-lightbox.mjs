import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on("pageerror", (e) => console.error("PAGEERROR:", e.message));
page.on("console", (m) => { if (m.type() === "error") console.error("CONSOLE:", m.text()); });

console.log("→ load story page");
await page.goto("http://localhost:3003/featured/harsh-sang-joyeeta", { waitUntil: "networkidle" });
await page.waitForTimeout(800);

// Scroll to the bride panel where there's a clear single image to target.
await page.evaluate(() => window.scrollTo(0, 11000));
await page.waitForTimeout(800);

// Find any img with data-mat-image and check the cursor.
const cursor = await page.evaluate(() => {
  const img = document.querySelector("img[data-mat-image]");
  if (!img) return "NO_IMG";
  return getComputedStyle(img).cursor;
});
console.log("img cursor:", cursor);

// Click the first visible mat-image and verify the lightbox dialog appears.
console.log("→ click first mat-image");
await page.evaluate(() => {
  const imgs = Array.from(document.querySelectorAll("img[data-mat-image]"));
  const r = imgs.find(i => {
    const rect = i.getBoundingClientRect();
    return rect.top > 0 && rect.top < window.innerHeight && rect.width > 100;
  });
  (r ?? imgs[0]).click();
});
await page.waitForTimeout(500);

const dialogPresent = await page.evaluate(() => {
  const d = document.querySelector('[role="dialog"][aria-modal="true"]');
  if (!d) return false;
  const img = d.querySelector("img");
  return { hasDialog: true, imgSrc: img?.src, imgNaturalW: img?.naturalWidth, imgNaturalH: img?.naturalHeight };
});
console.log("dialog state:", JSON.stringify(dialogPresent));

await page.screenshot({ path: "/tmp/lb-open.png", fullPage: false });
console.log("saved /tmp/lb-open.png");

// Press ESC and check it closes
console.log("→ press ESC");
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const closed = await page.evaluate(() => !document.querySelector('[role="dialog"][aria-modal="true"]'));
console.log("closed after ESC:", closed);

await browser.close();
