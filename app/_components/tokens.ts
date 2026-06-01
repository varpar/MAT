export const T = {
  ink: "#1a1a1a",
  paper: "#fafaf7",
  paperDeep: "#f3f1ec",
  sage: "#436c67",
  sageLight: "#e8efee",
  sageLighter: "#f4f7f7",
  sindoor: "#C41E1E",
  cream: "#cde0dd",
  creamDeep: "#a8c4c0",
} as const;

export const SERIF = "var(--font-cormorant), 'Cormorant Garamond', serif";
export const SANS = "var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif";
export const SCRIPT = "var(--font-caveat), Caveat, cursive";

// Body / content copy — Times New Roman per the brand direction. Use the
// italic style (fontStyle: "italic") selectively on pull-quotes and intros
// for the premium editorial feel.
export const BODY = "'Times New Roman', Times, Georgia, serif";

// Display face for feature headings (e.g. "Best Six Couples"). Resolves to
// MADE Saonara once the team drops the file into /public/fonts — the
// @font-face in globals.css registers it. Until then it falls back to
// Cormorant Garamond, so the layout is correct now and upgrades silently.
export const DISPLAY = "'Made Saonara', var(--font-cormorant), 'Cormorant Garamond', serif";
