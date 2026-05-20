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
};
