/** One-off: replace the Monika & Aniket featured couple with Shubham & Aishwarya
 * (Chokhi Dhani). Story prose is VERBATIM from MAT_MAG.pdf (pages 59-63). */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DATA_TS = path.join(__dirname, "..", "app", "_components", "data.ts");

const NEW_STORY = `const SHUBHAM_AISHWARYA_STORY: FeaturedStory = {
  coverIntro:
    "SHUBHAM AND AISHWARYA'S JOURNEY REFLECTS A BOND BUILT ON COMFORT AND QUIET UNDERSTANDING — WHERE LOVE FEELS NATURAL, UNFORCED, AND DEEPLY ROOTED. EFFORTLESS IN ITS PRESENCE AND STEADY IN ITS GROWTH, THEIR CONNECTION CARRIES WARMTH AND SINCERITY, MAKING THEIR STORY FEEL BOTH GENUINE AND TIMELESS.",
  date: "Chokhi Dhani, Jaipur — from colleagues to companions",
  detailLine: "Rustic folk textures · Petal-shower haldi · Four years in the making",
  photos: {
    hero: MAT_IMAGES.saHero,
    bride: MAT_IMAGES.saBride,
    groom: MAT_IMAGES.saGroom,
    storyImage1: MAT_IMAGES.saStory1,
    storyImage2: MAT_IMAGES.saStory2,
    haldi: MAT_IMAGES.saHaldi,
    mehendi: MAT_IMAGES.saMehendi,
    sangeet: MAT_IMAGES.saSangeet,
    pheras: MAT_IMAGES.saPheras,
    vidaai: MAT_IMAGES.saVidaai,
    intimateBW: MAT_IMAGES.saIntimateBW,
    closing: MAT_IMAGES.saClosing,
  },
  sections: [
    {
      heading: "From colleagues, to companions",
      style: "script",
      paragraphs: [
        "Shubham and Aishwarya's story began in the most familiar of spaces — their workplace. What started as casual conversations slowly turned into something more meaningful, where comfort came easily and connection felt natural. With time, those small moments grew into something deeper. Their bond wasn't built overnight — it was shaped through everyday interactions, shared laughter, quiet understanding, and the kind of presence that becomes constant without even realizing it. Over four to five years, their relationship evolved into a space of trust, patience, and unwavering support.",
        "There's a rare ease in the way they are with each other — a sense of belonging that doesn't need explanation. Their chemistry isn't loud or performative; it's felt in the little things — in the way they listen, the way they smile, and the way they simply exist together. Through every phase, they chose each other — not just in big moments, but in the quiet ones that truly define a relationship. And in that choice, their love found its depth. From colleagues to companions, and now to partners for life — their journey feels steady, sincere, and beautifully real. A love that grew with time, and stayed just as true.",
      ],
    },
    {
      heading: "What's felt underneath",
      style: "serif",
      paragraphs: [
        "Shubham's story was shaped through the voices of his family, where emotions were expressed not loudly, but with depth and sincerity. The focus stayed on a beautiful sentiment—his family welcoming the bride with warmth and reminding him to take care of her, not as a formality but as a responsibility filled with love. One of the most powerful layers came from his elder brother, someone who isn't expressive and rarely speaks much. Convincing him for an interview wasn't easy—it took time, patience, and trust. But when he finally opened up, even in few words, it carried a weight that couldn't be staged. His silence, his pauses, and the effort it took to speak made those moments even more real. We didn't push for more—we let it be exactly as it was. This story became less about conversations and more about what's felt underneath them—quiet emotions, strong bonds, and a family expressing love in their own way.",
      ],
    },
    {
      heading: "At Chokhi Dhani",
      style: "serif",
      paragraphs: [
        "Set against the vibrant charm of Chokhi Dhani, Shubham and Aishwarya's wedding unfolded with warmth, culture, and a sense of joyful authenticity. Surrounded by rustic textures, folk elements, and a lively atmosphere, the setting brought a distinct character to their celebration. The earthy tones, traditional details, and cultural richness created a space that felt both festive and intimate — where every moment carried a sense of familiarity and belonging. From the energy of the surroundings to the rhythm of the celebrations, everything felt alive, immersive, and deeply rooted in tradition. It was a celebration that didn't rely on grandeur, but on feeling — where simplicity met vibrance, and every moment felt real, unfiltered, and full of life.",
      ],
    },
  ],
  pullQuote: { word: "TRUE" },
  vendors: [],
  extras: [
    MAT_IMAGES.saExtra1,
    MAT_IMAGES.saExtra2,
    MAT_IMAGES.saExtra3,
    MAT_IMAGES.saExtra4,
    MAT_IMAGES.saExtra5,
    MAT_IMAGES.saExtra6,
    MAT_IMAGES.saExtra7,
    MAT_IMAGES.saExtra8,
  ],
};`;

const OLD_CARD = `    bride: "Monika",
    groom: "Aniket",
    place: "A palace wedding",
    img: MONIKA_ANIKET_STORY.photos.hero,
    slug: "aniket-sang-monika",
    story: MONIKA_ANIKET_STORY,`;

const NEW_CARD = `    bride: "Shubham",
    groom: "Aishwarya",
    place: "Chokhi Dhani, Jaipur",
    img: SHUBHAM_AISHWARYA_STORY.photos.hero,
    slug: "shubham-sang-aishwarya",
    story: SHUBHAM_AISHWARYA_STORY,`;

async function main() {
  let data = await readFile(DATA_TS, "utf8");

  // 1) Replace the MONIKA_ANIKET_STORY const block.
  const startMarker = "const MONIKA_ANIKET_STORY: FeaturedStory = {";
  const start = data.indexOf(startMarker);
  if (start === -1) throw new Error("MONIKA_ANIKET_STORY not found");
  const end = data.indexOf("\n};", start);
  if (end === -1) throw new Error("end of MONIKA_ANIKET_STORY not found");
  data = data.slice(0, start) + NEW_STORY + data.slice(end + 3);

  // 2) Replace the FEATURED card.
  if (!data.includes(OLD_CARD)) throw new Error("Monika FEATURED card not found (exact match)");
  data = data.replace(OLD_CARD, NEW_CARD);

  await writeFile(DATA_TS, data);
  console.log("✓ Swapped Monika & Aniket -> Shubham & Aishwarya (story + card)");
}
main().catch((e) => { console.error(e); process.exit(1); });
