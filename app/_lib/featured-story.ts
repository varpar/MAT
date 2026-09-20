import type { MatImageRecord } from "./mat-image-types";

export type StorySection = {
  /** Section heading as it appears in the magazine spread. */
  heading: string;
  /** "script" = handwritten flourish (e.g. "Celebration of Love"); "serif"
   *  = capitalised serif heading (e.g. "Chosen, Then Felt"). */
  style?: "script" | "serif";
  /** Verbatim body paragraphs, in order. */
  paragraphs: string[];
};

/** Per-couple story payload — rendered by `<FeaturedSlugClient>` when set. */
export type FeaturedStory = {
  /** Cover-page intro text (typically all-caps body copy under the names). */
  coverIntro: string;
  /** Editorial timestamp shown near the title, e.g. "Three days — January 2026". */
  date: string;
  /** Comma-joined detail line under the title (frame count, venue shorthand). */
  detailLine: string;
  /** Hand-picked photos for the rich spread. */
  photos: {
    hero: MatImageRecord;
    bride: MatImageRecord;
    groom: MatImageRecord;
    storyImage1: MatImageRecord;
    storyImage2: MatImageRecord;
    haldi: MatImageRecord;
    mehendi: MatImageRecord;
    sangeet: MatImageRecord;
    pheras: MatImageRecord;
    vidaai: MatImageRecord;
    intimateBW: MatImageRecord;
    closing: MatImageRecord;
  };
  /** Editorial body sections in spread order. */
  sections: StorySection[];
  /** Optional chapter-divider overlay word (e.g. "QUIETUDE"). */
  pullQuote?: { word: string; color?: string };
  /** Optional vendor credits — rendered as a hairline table. */
  vendors?: [string, string][];
  /** Ceremony-specific supporting frames. These take precedence over the
   *  positional `extras` fallback so Haldi, Sangeet, and the other rituals
   *  cannot accidentally borrow photographs from a different function. */
  ritualExtras?: Partial<
    Record<"haldi" | "mehendi" | "sangeet" | "pheras" | "vidaai", MatImageRecord[]>
  >;
  /** Ceremonies that are not represented by a verified photograph for this
   *  couple. Omitting them is preferable to showing another function under
   *  the wrong label. */
  hiddenRituals?: ("haldi" | "mehendi" | "sangeet" | "pheras" | "vidaai")[];
  /** Extra photos of THIS couple, used for:
   *    • the secondary tiles in each ritual section (so a couple's
   *      Haldi/Mehendi/… grids stay entirely their own photos), and
   *    • the photo wall.
   *  When present, the generic MAT_IMAGES backfill pool is NOT used for
   *  this couple — only their own photos appear on their page. */
  extras?: MatImageRecord[];
};
