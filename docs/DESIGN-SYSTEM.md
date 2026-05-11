# Mi Amor Tales — Premium Design System

> **The mandate:** make this look like Gucci, Louis Vuitton, Bottega Veneta, Aesop, Cereal, House on the Clouds — premium luxury through **restraint**, not decoration. Every flourish must earn its place.

---

## 0. The 8 Rules of Restraint

These override anything below if there's a conflict.

1. **Whitespace is the brand.** When in doubt, take something away.
2. **One photograph at a time.** Hero images are full-bleed and hold the page on their own — no overlays, no captions stacked on top of them unless absolutely needed.
3. **Text is small.** Body 14–16px. Eyebrows 10–11px. Big sizes are reserved for one or two h1s per page.
4. **Color is monochrome plus one accent.** Black on paper. Sage as a single, sparing accent (one comma per sentence at most, not every comma).
5. **No ornaments by default.** Marigolds, dividers, halos, showers — these are *event* moments, not background noise. One ornament moment per page, maximum.
6. **Movement is slow and quiet.** Image zoom on hover: scale 1.03 over 1.2s. Fade-ups: 800ms. No pulses, no shimmers, no flickers as ambient effects.
7. **Buttons whisper.** Thin 1px border or text-link with underline. Never solid black bar. Never solid sage.
8. **Sentence case for everything.** Uppercase only on tracked-out 10–11px eyebrows.

---

## 1. Typography

### Families
- **Serif (display + body editorial):** Cormorant Garamond — 300, 400 (italic), 500
- **Sans (eyebrows, nav, captions, microcopy):** Inter — 400, 500
- **Script (one-off, e.g. polaroid handwriting):** Caveat — 400. Use sparingly.

### Type scale (desktop)

| Token | Size / Line | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| `display-1` | 96–112px / 0.96 | Cormorant 300 | -0.02em | Page-defining h1 (one per page only) |
| `display-2` | 64–72px / 1.0 | Cormorant 300 | -0.015em | Section h2 on hero pages |
| `headline` | 40–48px / 1.1 | Cormorant 300 | -0.01em | Standard section h2 |
| `subhead` | 28–32px / 1.25 | Cormorant 400 italic | 0 | Secondary headings, featured cards |
| `lede` | 20–22px / 1.45 | Cormorant 400 italic | 0 | Editorial intros only |
| `body-lg` | 16px / 1.7 | Inter 400 | 0 | Long-form |
| `body` | 14px / 1.7 | Inter 400 | 0 | Default body |
| `caption` | 12px / 1.5 | Inter 400 | 0.04em | Image captions, metadata |
| `eyebrow` | 10–11px / 1 | Inter 500 | 0.32em uppercase | Section labels, nav |
| `eyebrow-sm` | 9px / 1 | Inter 500 | 0.36em uppercase | Sub-labels, breadcrumbs |

### Mobile scaling
Headlines clamp: `display-1` → `clamp(56px, 12vw, 112px)`. Body never goes below 14px. Eyebrows hold at 10px.

### Italics
Italic Cormorant is a *highlight*, not a default. Reserve for: couple names, key noun in headline, lede paragraphs, single-word eyebrows ("featured"), pull-quotes.

### Numerals
Tabular figures (`font-variant-numeric: tabular-nums`) for any counter, stat, year, frame count.

---

## 2. Color

### Palette

```
Paper        #FAFAF7   page background
Paper-deep   #F1EFEA   subtle alternating section
Ink          #1A1A1A   primary text
Ink-mute     #1A1A1A @ 60-70% opacity
Sage         #436C67   the only accent. Use sparingly.
Sage-light   #E8EFEE   tint, divider lines
Sindoor      #C41E1E   FORBIDDEN as a UI color. Only inside selective-color photos.
```

### Usage rules
- **No gradients** anywhere except the sindoor radial inside the SelectiveColorImage component.
- **Sage is precious.** One sage punctuation mark per sentence, max. One sage element per section. Never two sage elements stacked.
- **Backgrounds alternate** Paper → Paper-deep → Paper → Sage (philosophy slab) → Paper. No more variation.
- **Text on photos** is `#FFFFFF` with no shadow, only a subtle top/bottom gradient on the image when needed (rgba(0,0,0,0.0) → rgba(0,0,0,0.35)).

---

## 3. Spacing & Layout

### Base unit
`8px`. All spacing is a multiple of 8 (or 4 in tight cases).

### Section vertical padding

| Tier | Value | Use |
| --- | --- | --- |
| Compact | 80px top / 80px bottom | Strip sections (availability, "as seen in") |
| Standard | 120px / 120px | Default section rhythm |
| Hero | 160px / 160px | Page openers, featured headers |
| Statement | 200px / 200px | Philosophy slab, big closing CTA |

### Horizontal padding
- Desktop: `40px` left/right (matches mockups). Big content can flush full-bleed (`0`).
- Tablet (≤1024): `32px`
- Mobile (≤640): `24px`

### Grid
12-column. Gutter `24px` desktop, `16px` mobile. Use sparingly — most layouts are 1 column or 2-column 60/40.

### Container max-width
- Editorial body text: `680px` reading column.
- Section-level content: `1440px` max (full-bleed allowed).
- Headline blocks (centered): `1100px` max so the line doesn't get too long.

---

## 4. Imagery

### Treatment
- **No filters by default.** Original color, no grayscale.
- Selective B&W with sindoor highlight is its own moment, used only on the featured slug.
- Images are full-bleed inside their containers; no rounded corners, no shadows by default.

### Aspect ratios
- Hero portrait: `4:5`
- Hero landscape: `16:9` or `21:9` for cinematic wide
- Card: `3:4`
- Polaroid: `4:5` inside white frame
- Blog thumbnail: `3:2`

### Sizing
- Hero image fills viewport: `min-height: 100svh` on desktop, `80svh` on mobile.
- Card image min-height: `420px` desktop, `320px` mobile.

### Caption placement
Captions go *below* the image, not on top of it. Italic Cormorant 14px. One line. No middots.

```
Riya sang Mohit, Udaipur — January 2026
```

---

## 5. Buttons & Links

There are exactly **three** button styles. Anything else is a regression.

### Primary (rare — one per page)
```
Padding:   18px 36px
Border:    1px solid #1A1A1A
Background: transparent (NOT solid black)
Color:     #1A1A1A
Font:      Inter 500, 11px, 0.32em tracking, uppercase
Hover:     background #1A1A1A, color #FFFFFF, 350ms ease
```

### Secondary (text link with rule)
```
Padding:   8px 0
Border-bottom: 1px solid #1A1A1A
Background: none
Font:      Inter 500, 11px, 0.28em tracking, uppercase
Hover:     border color sage, 250ms
```

### Tertiary (ghost arrow)
```
No border, no background.
Font:      Inter 500, 11px, 0.28em tracking, uppercase
Trailing arrow → renders as a sage span.
Hover:     translateX(4px) on the arrow only.
```

### What's banned
- Solid black bars with white text by default.
- Solid sage buttons.
- Pill-shaped solid-color CTAs.
- Two CTAs side-by-side at the same prominence.
- Italic Cormorant inside buttons. Buttons are *always* sans uppercase tracked.

---

## 6. Navigation

### Top bar
- Position: sticky, `top: 0`, `z-50`
- Height: `72px` (desktop), `64px` (mobile)
- Padding: `0 40px`
- Background: transparent over hero, `rgba(250,250,247,0.85)` + `backdrop-filter: blur(14px)` after `40px` scroll
- Border: hairline `rgba(26,26,26,0.08)` only after scroll
- Wordmark: Cormorant italic 22px, 500 weight
- Nav links (right side): Inter 500, 11px, 0.32em tracking, uppercase, 32px horizontal gap
- Active link: underline 1px sage, offset 4px
- Hover link: underline animates left-to-right over 240ms

### Bottom pill (current implementation)
**Verdict: kill it.** It's clever but not luxury. Replace with a minimal top nav. The pill conflicts with the brand's editorial restraint.

### Mobile
Single hamburger top-right. Drawer slides in from right, full viewport, white background, link list 32px Cormorant italic.

---

## 7. Page-by-page rules

### Home
- Hero: full-bleed image, top-aligned wordmark + thin "where love meets legacy" tag at *bottom-left* in 11px tracked sans, scroll cue at bottom-center.
- One headline, set in centered Cormorant 80–96px.
- Marquee: keep, but shrink names to 56–64px, remove sage period after each name, gap 80px.
- Recent grid: 4 tiles instead of 5, equal heights `560px`, hover = subtle scale 1.03 over 1.2s.
- Philosophy slab: keep sage section but remove the marigold halo and shower. Just type.
- Testimonial: italic, 28px, max-width 720px, centered. Remove marigold divider.
- CTA: single section, "Tell us about your day" headline, secondary text link below. No solid button.

### Featured index
- Eyebrow + h1 centered, then 2-col grid with one tall + one short rhythm.
- Cards: image only, copy *below* the image (caption-style), not over.
- Hover: image scale 1.03, copy shifts up 4px.

### Featured slug
- Title section: clean, no marigold corners. Keep "A sang B" with Sang Devanagari ligature here only — this is the brand's editorial centerpiece moment.
- Cinematic full-bleed hero: 90vh height.
- Mehendi section: keep the scroll-driven SVG; this is a signature moment.
- Selective-color section: keep, this is signature.
- Ritual timeline: simplify — remove the pulse-ring, just a still sage dot when filled. Smaller text.
- Vendor tags: switch from card-grid to a single editorial table list (key → value rows separated by hairlines).
- Closing: single italic line + tertiary arrow link.

### Weddings
- Drop the polaroid scatter. Replace with a simple masonry/justified grid of full-color images, 3-col desktop, 2-col tablet, 1-col mobile. Caveat handwriting goes too.
- Filter pills: replace with a single horizontal text list — "All / Bride / Couple / B&W / Party / Venue" — Inter uppercase 11px, active = underline.

### About
- Origin section: keep parallax-feel but simplify type to one column, image left, text right max-width 480px.
- Stats: keep. Reduce numbers to 56px (was 84). Remove sage period after stat.
- Team: 4-up portrait grid, names below image in Cormorant italic 22px.
- "As seen in": single line, 14px italic, no middots.

### Tales
- Featured tale: 7/5 split is fine, but kill the floating "Featured Tale" overlay on the image; use a small eyebrow above the title in the right column instead.
- Grid: keep 3-up. Smaller titles (22px → 20px).

### Contact
- Drop the availability-month pill grid (it's gimmicky). Replace with one line: "Four of six dates remain for winter 2026/27."
- Stepped form: keep but shrink the prompt type from 32px to 24px, less drama.
- FAQ: keep the simple plus/x toggle.

---

## 8. Animation & Motion

### Defaults
- Duration: `400ms` for hovers, `800ms` for reveals, `1200ms` for image scales.
- Easing: `cubic-bezier(.2,.7,.2,1)` for organic; `cubic-bezier(.4,0,.2,1)` for snappy.
- All animation respects `prefers-reduced-motion`.

### Allowed
- Fade-up on scroll (translateY 16px → 0, opacity 0 → 1).
- Image scale on hover (1 → 1.03).
- Underline expand on link hover (0 → 100% width).
- Slow drift on the marquee (36s linear).
- Color bar transitions on filter chips.
- Mehendi SVG draw-on (signature feature, keep).
- Selective-color sindoor reveal (signature, keep).
- Loader photo-cascade (keep but make it shorter — 1.6s instead of 2.6s).

### Banned
- Pulses (`mat-pulse-ring`, `mat-shimmer`, `ma-bindu-pulse`, `mg-breathe`, `mg-flicker`).
- Background shower particles falling forever.
- Halos that spin perpetually.
- Tilt parallax on cards.
- Blink/flash anywhere.

### One-time signature animations (keep, sparingly)
- Loader cascade on first visit only.
- Mehendi draw-on on featured slug.
- Marquee scroll on home.

---

## 9. Decorative elements (the marigold question)

### Verdict
The marigold SVG is beautiful but currently *everywhere*. Strip it back to:

- **One** marigold appearance on Home: a single, static, low-opacity bloom in the philosophy slab background. No spin, no breathe, no shower.
- **One** marigold appearance on the Featured slug closing section: the divider with a still bloom at its center.
- **Zero** marigolds on Weddings, About, Tales, Contact, Featured index.

### What replaces them
Whitespace. Real estate. Confidence.

---

## 10. Punctuation tinting (the sage question)

### Current
Every comma and period in body copy is sage. It's distinctive but reads as visual noise at scale.

### New rule
Sage punctuation appears only in:
1. Page-defining h1s (display-1 and display-2 headlines).
2. The wordmark "Mi Amor**.** Tales" — the period.
3. Pull-quotes (italic 28px+).

It does **not** appear in body, eyebrows, captions, button text, or testimonials. This makes the sage moments hit harder when they appear.

---

## 11. The "sang" treatment

### Where Devanagari स·ग appears
- Featured slug page hero only ("Riya स·ग Mohit"). One time per page.

### Where italic Cormorant "sang" appears
- Marquee on Home (small).
- Cards in Featured index (medium).
- Footer ("Mi Amor Tales sang their first wedding in 2018").
- Polaroid captions (Caveat handwriting alongside).

### Where it does NOT appear
- Anywhere it competes with a Devanagari ligature.
- Body copy.

---

## 12. Components inventory (post-restraint)

### Keep
- `Punc` (but only triggers on h1/h2 headlines — see rule 10)
- `Sang` Devanagari (slug page only)
- `MehendiSVG` (slug page only)
- `SelectiveColorImage` (slug page only)
- `PhotoCascadeLoader` (first visit only, shorter)

### Modify heavily
- `Nav` — remove bottom pill, move to top bar with link list
- `Marigold` — keep static, ban breathe/spin/flicker by default; explicit prop required
- `MarigoldShower` — delete or use only inside the philosophy slab at very low opacity
- `Footer` — simpler, more whitespace, less data

### New components needed
- `Section` — handles vertical rhythm (compact / standard / hero / statement)
- `EyebrowSans` — uppercase tracked sans (replaces italic Cormorant eyebrows in many places)
- `LinkArrow` — tertiary CTA pattern with sage arrow
- `ImageBlock` — unified image + caption block
- `CaptionBelow` — italic Cormorant 14px caption

---

## 13. Implementation phases

1. **Phase A — Subtraction (this round):** delete bottom pill nav, neuter marigold defaults, scope `Punc` to headlines, drop polaroid handwriting on Weddings, swap big buttons to bordered/text-link pattern, set spacing tokens, scale headlines down.
2. **Phase B — Replacement:** new Weddings grid, new vendor list table, new Tales overlay → eyebrow, contact availability simplification.
3. **Phase C — Polish:** loader timing, hover micro-interactions, mobile scaling, page transitions, OG metadata, image lazy-loading thresholds.

---

## 14. Reference moodboard

- Gucci.com — typography hierarchy, headline restraint
- Louisvuitton.com — full-bleed hero discipline, microscopic nav text
- Bottegaveneta.com — nothing-on-screen-but-the-product
- Aesop.com — paragraph rhythm, paper texture, line lengths
- Cereal.com — editorial column widths, image captions
- Kinfolk.com — subdued grids, masthead restraint
- House on the Clouds — wedding-specific, full-bleed video, minimal nav, restrained CTAs
- Joonas Saarinen / Two Mann — wedding photographer norms: huge photos, small type
