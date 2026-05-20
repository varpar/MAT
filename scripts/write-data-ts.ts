/**
 * Single source of truth for app/_components/data.ts.
 *
 * Reads scripts/manifest.json and emits:
 *   1. MAT_IMAGES — the canonical 35 named slots (hero, ritual, atmos, etc.).
 *   2. ARCHIVE_PHOTOS — every processed photo, keyed by manifest slug.
 *   3. FEATURED — six couples with `story` payloads for the two real ones
 *      (Anvesha & Omkar, Harsh & Pooja) lifted from the magazine PDF.
 *
 * Re-run any time to reshuffle slot assignments. Story text is verbatim from
 * the PDF — do not paraphrase here.
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const MANIFEST_PATH = path.join(__dirname, "manifest.json");
const DATA_TS_PATH = path.join(__dirname, "..", "app", "_components", "data.ts");

type ManifestEntry = {
  src: string;
  source: string;
  width: number;
  height: number;
  orient: "portrait" | "landscape" | "square";
  blurhash: string;
  blurDataURL: string;
};

// ─── MAT_IMAGES slot map ─────────────────────────────────────────────────
const SLOT_MAP: Record<string, string> = {
  hero: "073-dsc00466",
  heroAlt: "045-aks07419",
  cinemaQuote: "082-dsc05358",
  couple1: "091-dsc09939",
  couple2: "084-dsc07273",
  couple3: "029-aks05757ananta-10",
  bride1: "079-dsc02192-copy",
  bride2: "067-aks09758-enhanced-nr-copy",
  bride3: "069-aks09876-copy",
  portrait1: "092-ysp02242-copy",
  portrait2: "043-aks07326-copy-2",
  portrait3: "044-aks07351-edit-copy",
  portrait4: "087-dsc07525",
  haldi: "001-aks00615",
  mehendi: "003-aks00880",
  sangeet: "016-aks04401ananta-10",
  pheras: "011-aks02216",
  vidaai: "038-aks06577-copy",
  reel1: "064-aks09456-edit-copy",
  reel2: "004-aks00890",
  reel3: "075-dsc00540-edit-copy",
  reel4: "089-dsc09759",
  reel5: "047-aks07627",
  reel6: "022-aks05467ananta-10",
  atmos1: "074-dsc00516-edit-copy",
  atmos2: "080-dsc02517-copy",
  atmos3: "036-aks06098ananta-10",
  detail1: "040-aks07007",
  detail2: "034-aks05996-copy",
  detail3: "005-aks01190",
  detail4: "041-aks07081",
  detail5: "021-aks05083ananta-10",
  detail6: "028-aks05610ananta-10",
  detail7: "057-aks08640-edit-copy-1",
  detail8: "020-aks05037ananta-10",
};

// ─── Story photo maps ───────────────────────────────────────────────────
// Slot → manifest key. Keys come from scripts/manifest.json.
const ANVESHA_OMKAR_PHOTOS: Record<string, string> = {
  hero: "030-aks05781-recovered-copy",
  storyImage1: "023-aks05540ananta-10",
  storyImage2: "036-aks06098ananta-10",
  bride: "033-aks05973-recovered-copy",
  groom: "021-aks05083ananta-10",
  haldi: "022-aks05467ananta-10",
  mehendi: "034-aks05996-copy",
  sangeet: "018-aks04776ananta-10",
  pheras: "031-aks05784ananta-10",
  vidaai: "035-aks06044ananta-10",
  intimateBW: "032-aks05861ananta-10",
  closing: "026-aks05564ananta-10",
};

const HARSH_POOJA_PHOTOS: Record<string, string> = {
  hero: "065-aks09538-copy",
  storyImage1: "060-aks08745",
  storyImage2: "072-dsc00448-edit-copy",
  bride: "052-aks07707",
  groom: "066-aks09691-copyjpg",
  haldi: "001-aks00615",
  mehendi: "012-aks02249",
  sangeet: "051-aks07700",
  pheras: "011-aks02216",
  vidaai: "062-aks08780",
  intimateBW: "005-aks01190",
  closing: "091-dsc09939",
};

// ─── Story text (verbatim from the magazine PDF) ────────────────────────
const ANVESHA_OMKAR_STORY = {
  coverIntro:
    "ANVESHA AND OMKAR'S JOURNEY REFLECTS A LOVE THAT GREW WITH TIME — FROM FRIENDSHIP TO SOMETHING DEEPLY CERTAIN, EFFORTLESS IN ITS PRESENCE AND STRONG IN ITS FOUNDATION. THEIR BOND CARRIES WARMTH, UNDERSTANDING, AND A QUIET SENSE OF BELONGING, MAKING THEIR STORY FEEL BOTH BEAUTIFULLY PERSONAL AND TIMELESS.",
  date: "Fairmont Jaipur — Three Days",
  detailLine: "Two celebrations · One love · 2,140 frames",
  sections: [
    {
      heading: "Celebration of Love",
      style: "script" as const,
      paragraphs: [
        "Anvesha and Omkar, it started with conversations that felt easy, moments that felt familiar, and a bond that quietly grew stronger with time. What began as friendship slowly unfolded into something deeper—something steadier. Not rushed, not forced—just naturally becoming love. They stood by each other through phases, changes, and everything in between, building a connection rooted in understanding and trust. It wasn't just about falling in love—it was about choosing each other, every single day.",
        "Before the traditions, before the rituals, they chose to celebrate their love in a way that felt true to them—an intimate American-style wedding, simple, personal, and filled with meaning. And then, surrounded by the warmth of family and culture, they stepped into their Indian wedding—rich in rituals, emotions, and legacy. Two celebrations. Two worlds. One love. For us, capturing Anvesha & Omkar wasn't about documenting events—it was about witnessing a journey that evolved beautifully over time. From friendship to forever, their story is a reminder that the strongest love is the one that grows with you. And in their story, love wasn't just found. It was built.",
      ],
    },
    {
      heading: "Stillness, in their language",
      style: "serif" as const,
      paragraphs: [
        "Some stories don't need movement to be felt; they exist in stillness, and that's exactly how we chose to capture this couple. Instead of chasing loud moments or building heavy setups, we slowed everything down and focused on what truly matters—their presence with each other. Our approach was simple: clean frames, no distractions, no unnecessary elements—just them.",
        "We treated every shot like a still photograph, where composition, light, and silence carry the emotion. There were no exaggerated poses or performative expressions; instead, we observed the in-between moments—the way they naturally stood close, how their eyes met and lingered, the quiet comfort in their body language. Each frame was intentional, minimal, and deeply aesthetic, allowing their connection to breathe without interruption.",
        "The idea was not to create a story through action, but to reveal it through calm, controlled stillness. In a world where everything moves fast, we chose to pause time for them, to document their love in its most undisturbed form. What we created wasn't just a pre-wedding shoot, but a collection of frames that feel timeless—images you don't just see, but sit with, where nothing demands attention, yet everything is felt quietly and completely.",
      ],
    },
    {
      heading: "At Fairmont Jaipur",
      style: "serif" as const,
      paragraphs: [
        "At Fairmont Jaipur, Anvesha & Omkar's wedding came alive through a perfect balance of elegance and emotion. The space carried a quiet grandeur — allowing every moment to feel both intimate and larger than life. Anvesha & Omkar carry a presence that feels natural and unforced. There's ease in the way they exist together — playful, grounded, and deeply connected. Every moment with them felt real, not performed — just two people being completely themselves, and that's what made everything truly stand out.",
      ],
    },
  ],
  pullQuote: { word: "THEM", color: "#C41E1E" },
  vendors: [] as [string, string][],
};

const HARSH_POOJA_STORY = {
  coverIntro:
    "HARSH AND POOJA'S JOURNEY REFLECTS A BOND THAT UNFOLDED WITH TIME — FROM A SIMPLE BEGINNING TO SOMETHING DEEPLY CERTAIN, ROOTED IN UNDERSTANDING AND SHAPED BY PATIENCE. THEIR CONNECTION CARRIES A QUIET STRENGTH, WHERE COMFORT MEETS COMMITMENT, MAKING THEIR STORY FEEL BOTH SINCERE AND TIMELESS.",
  date: "ITC Mughal, Agra — Three Days",
  detailLine: "Near the Taj Mahal · Sandstone & sindoor · 1,920 frames",
  sections: [
    {
      heading: "Chosen, Then Felt",
      style: "serif" as const,
      paragraphs: [
        "Some stories begin with a meeting — and slowly turn into something meant to be. Harsh and Pooja's journey started as an arranged match, with simple conversations that gradually grew into comfort, understanding, and a connection neither of them expected so naturally. In each other, they didn't just find a partner, but a sense of familiarity that felt right.",
        "What began as two individuals getting to know one another soon unfolded into love — quiet, steady, and certain. With every passing day, their bond deepened, built on trust, laughter, and a growing sense of belonging. A story not rushed, but beautifully realised.",
        "Harsh and Pooja come from a small town, but their taste carries a quiet elegance that stands out effortlessly. With their wedding unfolding near the Taj Mahal, we knew the visuals had to reflect the same grace the location holds. Instead of overpowering the frames, we chose a restrained approach — clean compositions, soft light, and intentional framing that allowed both them and the surroundings to exist in harmony.",
        "Their connection is simple, genuine, and deeply rooted, which made it important for us to keep everything real and undisturbed. We avoided unnecessary elements, focusing only on what mattered — the way they stand together, the subtle expressions, the ease they share. Every frame was designed to feel timeless, where the beauty of the Taj enhances their story rather than taking over it. It wasn't about creating something grand, but about matching their elegance with a setting that naturally reflects it — capturing a love that feels steady, graceful, and effortlessly beautiful.",
      ],
    },
    {
      heading: "Set against the regal charm",
      style: "serif" as const,
      paragraphs: [
        "Set against the regal charm of ITC Mughal, Agra, Harsh and Pooja's wedding unfolded with timeless elegance and quiet grandeur. With a distant glimpse of the Taj Mahal, the setting carried a rare kind of romance — where heritage, beauty, and emotion came together effortlessly, creating a celebration that felt both intimate and iconic.",
      ],
    },
    {
      heading: "The Elegant Bride",
      style: "serif" as const,
      paragraphs: [
        "POOJA HOLDS A PRESENCE THAT DOESN'T SEEK ATTENTION, YET NATURALLY DRAWS IT. THERE'S A QUIET CONFIDENCE IN THE WAY SHE CARRIES HERSELF — COMPOSED, GROUNDED, AND BEAUTIFULLY REAL. IN EVERY MOMENT, SHE FEELS EFFORTLESS, LEAVING BEHIND A SOFTNESS THAT STAYS, LONG AFTER EVERYTHING ELSE FADES.",
      ],
    },
  ],
  pullQuote: { word: "QUIETUDE" },
  vendors: [] as [string, string][],
};

function renderRecord(slug: string, m: ManifestEntry, indent = "  "): string {
  return [
    `${indent}{`,
    `${indent}  publicId: ${JSON.stringify(m.src)},`,
    `${indent}  blurDataURL: ${JSON.stringify(m.blurDataURL)},`,
    `${indent}  width: ${m.width},`,
    `${indent}  height: ${m.height},`,
    `${indent}  source: "cloudinary",`,
    `${indent}}`,
  ].join("\n");
}

function ensureKey(manifest: Record<string, ManifestEntry>, key: string, ctx: string) {
  if (!manifest[key]) {
    throw new Error(`${ctx}: manifest has no key "${key}"`);
  }
}

async function main() {
  const manifest: Record<string, ManifestEntry> = JSON.parse(
    await readFile(MANIFEST_PATH, "utf8"),
  );

  // Validate every referenced key resolves.
  for (const [slot, k] of Object.entries(SLOT_MAP)) ensureKey(manifest, k, `SLOT_MAP.${slot}`);
  for (const [slot, k] of Object.entries(ANVESHA_OMKAR_PHOTOS))
    ensureKey(manifest, k, `ANVESHA_OMKAR_PHOTOS.${slot}`);
  for (const [slot, k] of Object.entries(HARSH_POOJA_PHOTOS))
    ensureKey(manifest, k, `HARSH_POOJA_PHOTOS.${slot}`);

  const matImagesBlock = Object.entries(SLOT_MAP)
    .map(([slot, key]) => `  ${slot}: ${renderRecord(key, manifest[key]).trimStart()},`)
    .join("\n");

  const renderStoryPhotos = (photos: Record<string, string>, indent: string) =>
    Object.entries(photos)
      .map(([slot, key]) => `${indent}${slot}: ${renderRecord(key, manifest[key], indent).trimStart()},`)
      .join("\n");

  const renderSections = (sections: { heading: string; style?: string; paragraphs: string[] }[]) =>
    sections
      .map((s) => {
        const paras = s.paragraphs.map((p) => `        ${JSON.stringify(p)},`).join("\n");
        const styleLine = s.style ? `      style: ${JSON.stringify(s.style)},\n` : "";
        return `    {\n      heading: ${JSON.stringify(s.heading)},\n${styleLine}      paragraphs: [\n${paras}\n      ],\n    },`;
      })
      .join("\n");

  type StoryShape = {
    coverIntro: string;
    date: string;
    detailLine: string;
    sections: { heading: string; style?: "script" | "serif"; paragraphs: string[] }[];
    pullQuote?: { word: string; color?: string };
    vendors: [string, string][];
  };

  const renderStory = (story: StoryShape, photos: Record<string, string>) => {
    const pullQuote = story.pullQuote
      ? `\n  pullQuote: ${JSON.stringify(story.pullQuote)},`
      : "";
    return `{
  coverIntro: ${JSON.stringify(story.coverIntro)},
  date: ${JSON.stringify(story.date)},
  detailLine: ${JSON.stringify(story.detailLine)},
  photos: {
${renderStoryPhotos(photos, "    ")}
  },
  sections: [
${renderSections(story.sections)}
  ],${pullQuote}
  vendors: ${JSON.stringify(story.vendors)},
}`;
  };

  const anveshaStoryLiteral = renderStory(ANVESHA_OMKAR_STORY, ANVESHA_OMKAR_PHOTOS);
  const harshStoryLiteral = renderStory(HARSH_POOJA_STORY, HARSH_POOJA_PHOTOS);

  const body = `import type { MatImageRecord } from "../_lib/mat-image-types";
import type { FeaturedStory } from "../_lib/featured-story";

/**
 * Generated by scripts/write-data-ts.ts — do not hand-edit photo records
 * here. Update SLOT_MAP / per-couple photo maps in that script and re-run
 * \`npx tsx scripts/write-data-ts.ts\`. Story prose IS allowed to be edited
 * here directly when minor copy tweaks are needed.
 */
export const MAT_IMAGES: Record<string, MatImageRecord> = {
${matImagesBlock}
};

export type Couple = {
  bride: string;
  groom: string;
  place: string;
  img: MatImageRecord;
  slug?: string;
  story?: FeaturedStory;
};

const ANVESHA_OMKAR_STORY: FeaturedStory = ${anveshaStoryLiteral};

const HARSH_POOJA_STORY: FeaturedStory = ${harshStoryLiteral};

export const FEATURED: Couple[] = [
  {
    bride: "Anvesha",
    groom: "Omkar",
    place: "Fairmont Jaipur",
    img: ANVESHA_OMKAR_STORY.photos.hero,
    slug: "anvesha-sang-omkar",
    story: ANVESHA_OMKAR_STORY,
  },
  {
    bride: "Pooja",
    groom: "Harsh",
    place: "ITC Mughal, Agra",
    img: HARSH_POOJA_STORY.photos.hero,
    slug: "harsh-sang-pooja",
    story: HARSH_POOJA_STORY,
  },
  { bride: "Riya",   groom: "Mohit",   place: "Udaipur",         img: MAT_IMAGES.couple1, slug: "riya-sang-mohit" },
  { bride: "Saanvi", groom: "Aditya",  place: "Goa",             img: MAT_IMAGES.couple3, slug: "saanvi-sang-aditya" },
  { bride: "Ishita", groom: "Rohan",   place: "Jodhpur",         img: MAT_IMAGES.bride1,  slug: "ishita-sang-rohan" },
  { bride: "Meher",  groom: "Devansh", place: "Florence, Italy", img: MAT_IMAGES.bride3,  slug: "meher-sang-devansh" },
];

export const RITUALS: { num: string; name: string; desc: string; img: MatImageRecord }[] = [
  { num: "01", name: "Haldi",   desc: "A morning of turmeric, laughter, and family hands.", img: MAT_IMAGES.haldi },
  { num: "02", name: "Mehendi", desc: "Hours of henna while the women sing the old songs.", img: MAT_IMAGES.mehendi },
  { num: "03", name: "Sangeet", desc: "The night before. Dholki, dance, and dupatta blur.", img: MAT_IMAGES.sangeet },
  { num: "04", name: "Pheras",  desc: "Seven steps around the fire. The vow itself.",       img: MAT_IMAGES.pheras },
  { num: "05", name: "Vidaai",  desc: "The threshold. The handful of rice. The car door.",  img: MAT_IMAGES.vidaai },
];
`;

  await writeFile(DATA_TS_PATH, body);
  console.log(`✓ Wrote ${DATA_TS_PATH}`);
  console.log(`  - MAT_IMAGES: ${Object.keys(SLOT_MAP).length} slots`);
  console.log(`  - FEATURED:    2 real stories + 4 placeholders`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
