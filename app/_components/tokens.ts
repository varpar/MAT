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

/* ── Layout baseline — single source of truth for site-wide spacing (Jun 2026)
   Goal: photos use ~the ENTIRE viewport width (full-bleed), with one consistent
   margin for text and one consistent vertical rhythm between sections. Every
   page imports LAYOUT so margins/gaps/section spacing match everywhere.

   - gutter        → horizontal page margin for TEXT / headers / copy / captions.
   - gutterTight   → narrower gutter for dense text rows / nav / footer.
   - section       → vertical padding for a MAJOR section (top & bottom).
   - sectionTight  → vertical padding for a minor / secondary section.
   - gap           → gutter BETWEEN image-grid tiles (small, so photos dominate).
   - maxText       → max line length for long-form reading copy (px), centered.

   IMAGE SECTIONS RUN FULL-BLEED: horizontal padding 0 so a photo / photo-grid
   spans the full width; only their headers/captions use `gutter`. */
export const LAYOUT = {
  gutter: "clamp(20px, 5vw, 56px)",
  gutterTight: "clamp(16px, 3vw, 32px)",
  section: "clamp(56px, 8vw, 112px)",
  sectionTight: "clamp(40px, 6vw, 80px)",
  gap: "clamp(6px, 0.7vw, 12px)",
  maxText: 720,
} as const;
