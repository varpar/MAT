/**
 * Reads scripts/manifest.json (produced by migrate-images.ts) and patches
 * `app/_components/data.ts` so the matching `MAT_IMAGES` entries flip from
 * `fallback("https://images.unsplash.com/...")` to inline Cloudinary records.
 *
 * Mapping rule: each MAT_IMAGES key is matched against a manifest key that
 * looks like `<slug>:<filename>`. We use a small slug→key allowlist below to
 * keep the mapping explicit — there's no point auto-deriving it for ~30
 * images. Edit `SLUG_KEY_MAP` to control which manifest entry replaces which
 * registry key when new weddings are migrated.
 *
 * Idempotent: re-runs cleanly. Entries already flipped to `cloudinary` are
 * left alone if their publicId matches; otherwise they get re-updated.
 */
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

import { Project, SyntaxKind } from "ts-morph";

const MANIFEST_PATH = path.join(__dirname, "manifest.json");
const DATA_TS_PATH = path.join(__dirname, "..", "app", "_components", "data.ts");

/**
 * The bridge between the manifest's `<slug>:<filename>` keys and the
 * `MAT_IMAGES` registry. Add an entry here when a new wedding migrates in
 * — pick the manifest filename you want to anchor each registry key to.
 *
 * Anything not in this map is left as a fallback in data.ts.
 */
const SLUG_KEY_MAP: Record<string, string> = {
  // "MAT_IMAGES key": "<slug>:<filename in archive>"
  // e.g. hero: "riya-sang-mohit:hero.jpg",
};

type ManifestEntry = {
  publicId: string;
  width: number;
  height: number;
  blurhash: string;
  blurDataURL: string;
  source: "cloudinary";
};

type Manifest = Record<string, ManifestEntry>;

async function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error(`✖ No manifest at ${MANIFEST_PATH}. Run npm run migrate:images first.`);
    process.exit(1);
  }

  const manifest: Manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));

  if (Object.keys(SLUG_KEY_MAP).length === 0) {
    console.warn(
      "⚠  SLUG_KEY_MAP is empty in scripts/apply-manifest.ts. Add entries " +
        "to flip MAT_IMAGES keys to Cloudinary records. Nothing to do.",
    );
    console.log("Manifest keys available:");
    for (const k of Object.keys(manifest)) console.log("  -", k);
    return;
  }

  const project = new Project({ tsConfigFilePath: path.join(__dirname, "..", "tsconfig.json") });
  const file = project.getSourceFileOrThrow(DATA_TS_PATH);

  // Find `MAT_IMAGES` const declaration → the object literal we patch.
  const matImagesDecl = file
    .getVariableDeclarationOrThrow("MAT_IMAGES")
    .getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);

  let patched = 0;
  for (const [registryKey, manifestKey] of Object.entries(SLUG_KEY_MAP)) {
    const entry = manifest[manifestKey];
    if (!entry) {
      console.warn(`  ⚠ no manifest entry for "${manifestKey}" (registry: ${registryKey})`);
      continue;
    }

    const prop = matImagesDecl.getProperty(registryKey);
    if (!prop) {
      console.warn(`  ⚠ MAT_IMAGES has no key "${registryKey}"`);
      continue;
    }

    // Replace right-hand side with an inline record literal.
    const literal = [
      "{",
      `  publicId: ${JSON.stringify(entry.publicId)},`,
      `  blurDataURL: ${JSON.stringify(entry.blurDataURL)},`,
      `  width: ${entry.width},`,
      `  height: ${entry.height},`,
      `  source: "cloudinary",`,
      "}",
    ].join("\n        ");

    prop.replaceWithText(`${registryKey}: ${literal}`);
    patched++;
  }

  await project.save();

  // Drop the `fallback` import if nothing fallback-shaped is left.
  // Quick re-read to inspect.
  const after = await readFile(DATA_TS_PATH, "utf8");
  if (!after.includes("fallback(")) {
    const stripped = after.replace(
      /import \{ fallback, type MatImageRecord \} from "\.\.\/_lib\/mat-image-types";/,
      'import type { MatImageRecord } from "../_lib/mat-image-types";',
    );
    if (stripped !== after) await writeFile(DATA_TS_PATH, stripped);
  }

  console.log(`✓ Patched ${patched} MAT_IMAGES entries from manifest.`);
  console.log("  Run `npx tsc --noEmit` to verify types.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
