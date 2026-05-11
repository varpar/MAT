# Mi Amor Tales — Ideas Backlog

> Long list of components, treatments, and moments to try. We pick from this iteratively. Anything checked off has been tried. Anything struck through was tried and rejected.

Format: each idea has a **why it could work** and a **risk** so we can decide fast.

---

## A. Hero treatments (we try one at a time)

- [ ] **A1. Single full-bleed image hero, 100svh.** Wordmark top-left, scroll cue bottom-center, no copy on image. Subhead lives in the next section. — *Why:* the most luxury approach. Lets the photograph do the work. *Risk:* feels empty if the photo isn't perfect.
- [ ] **A2. Two-image hero diptych** — left 60% portrait of bride, right 40% groom or detail, hairline gap. — *Why:* editorial, magazine-cover feel. *Risk:* can look cropped on mobile.
- [ ] **A3. Slow vertical hero scroll cinemagraph.** Photo subtly drifts up over 8s as the page enters; freezes when scroll begins. — *Why:* cinematic without being a video. *Risk:* easy to over-do.
- [ ] **A4. Hero with single italic Cormorant line over image, bottom-aligned.** "Where love meets legacy." — *Why:* the original brand promise. *Risk:* already tried in v1.
- [ ] **A5. Wordmark-only hero on paper, no image** — image starts in section 2. Pure typographic opener like Hermès sometimes does. — *Why:* most restrained possible. *Risk:* may feel underweight for a photo studio.
- [ ] **A6. Looping wedding film clip hero** (5s, muted, fades in/out). — *Why:* MAT shoots cinematography, prove it on the cover. *Risk:* asset cost, mobile data.
- [ ] **A7. Image stack hero — 3 photos overlap with a tiny offset, like a flat-lay stack on a desk.** — *Why:* nods to the album/tale concept. *Risk:* gimmicky if the offset is wrong.
- [ ] **A8. Hero crossfade between 4 photos** every 5s, no carousel dots. — *Why:* keeps the homepage alive without animation noise. *Risk:* timing must be slow enough to read.

---

## B. Navigation patterns

- [ ] **B1. Minimal top bar.** Wordmark left, 3–5 nav items right (NOT all 6 — collapse Tales into a dropdown). Small uppercase tracked. *Replaces the bottom pill.*
- [ ] **B2. Top bar that disappears on scroll-down, returns on scroll-up.** Standard luxury pattern.
- [ ] **B3. Side rail nav** — vertical text-as-nav on the left edge, only on desktop. Like Vogue runway sites. — *Risk:* mobile parity is hard.
- [ ] **B4. Drawer nav from right** — single hamburger on every page; large italic Cormorant link list, image preview on hover. House on the Clouds-style.
- [ ] **B5. Nav hides entirely on hero, reveals on first section.** — *Risk:* confuses some users.
- [ ] **B6. "Index" page** — `/index` lists every page with thumbnails, like Bottega's index. Navigation is a destination, not a header.

---

## C. Image presentation

- [ ] **C1. Justified gallery** (Flickr-style) — photo widths flex to fill exact rows. Replaces polaroid scatter. *Recommended for Weddings.*
- [ ] **C2. Vertical scroll-snap full-bleed gallery** — each image takes the whole viewport, scrolling snaps between them. — *Risk:* slow, but cinematic.
- [ ] **C3. Two-up alternating layout** — image left, tiny caption right; next image right, caption left. Magazine feel.
- [ ] **C4. Random grid with `column-count: 3`** — masonry without a library.
- [ ] **C5. Photographer's contact-sheet view** — tiny thumbnails 12 across, click to expand. — *Risk:* not very luxury, more documentary.
- [ ] **C6. Hover zoom inside the original frame** (image scales 1.04, doesn't grow outside its tile).
- [ ] **C7. Reveal-on-scroll image clip-path** — image enters with `clip-path: inset(0 100% 0 0)` and unwipes left-to-right as it scrolls in.
- [ ] **C8. Group images by ceremony** with a small italic eyebrow above each group ("Haldi", "Mehendi") on the gallery page.
- [ ] **C9. Image with rule below + italic caption** as standard pattern, like museum wall labels.
- [ ] **C10. Black-and-white default for archive images,** color only on hover or on the featured page.

---

## D. Typography moments

- [ ] **D1. Drop-cap on Tales articles** — large italic Cormorant first letter, 5-line drop.
- [ ] **D2. Pull-quote treatment** — left-rule, italic 32px, sage punctuation only here.
- [ ] **D3. Title with mixed serif + italic** — "Stories *we* hold" where one word is italic. Already use this. Extend to subheads.
- [ ] **D4. Numerals in tabular figures** for dates, counts, frame numbers.
- [ ] **D5. Hairline typographic dividers** — thin sage rule between sections, no marigold.
- [ ] **D6. Long-form wedding "letter" page** — single column 580px wide, justified text, classic book typography.
- [ ] **D7. Subscript year notation** — "Riya & Mohit ²⁰²⁶" with the year as a tiny superscript. Magazine treatment.
- [ ] **D8. Devanagari typography callout box** — one section per featured story explains what "sang" means in Hindi. Educational + brand-defining.

---

## E. Page-level patterns

- [ ] **E1. Editorial cover treatment for Featured slug** — looks like Vogue/Cereal magazine cover: title at top, single huge photo, issue number bottom-right.
- [ ] **E2. Index of weddings as a typography list** — chronological, no images at all, just couple names and venues. One scroll. Clicking expands to thumbnail.
- [ ] **E3. About page split into 4 chapters** — origin / philosophy / team / press. Each chapter takes a full screen height, scroll-snaps.
- [ ] **E4. Tales magazine grid** — front page mimics print mag layout: featured story 6-col, sidebar of 3 short stories 3-col, then full-width quote.
- [ ] **E5. Per-couple "vinyl" page** — playlist embedded, photos behind, click play and watch story. — *Risk:* heavy.
- [ ] **E6. "Index 06"** — make the page count an actual feature: every page has a tiny "Page 03/06" indicator.
- [ ] **E7. Color-coded ceremony sections** — Haldi yellow tint, Mehendi green tint, Pheras paper tone. Subtle background shifts. — *Risk:* breaks the monochrome rule.

---

## F. Wedding-specific premium touches

- [ ] **F1. "Save the Date" download** — every featured wedding offers a beautifully-typeset PDF as a freebie.
- [ ] **F2. Vendor list as table** — `Venue · Décor · Couture · Mehendi · Catering` two-column hairline-ruled list.
- [ ] **F3. Floor-plan of the venue** as a sketched SVG above the slug — shows where ceremonies happened.
- [ ] **F4. Three-day timeline as horizontal scroll** — drag left/right through the events.
- [ ] **F5. Couple's "first dance" embed** — Spotify track centered with a vinyl icon, no autoplay.
- [ ] **F6. Letter from the photographer** — a hand-typed note at the bottom of each featured story.
- [ ] **F7. "Where they're from" map** — small city pins, sage dots, no clutter.
- [ ] **F8. Sangeet GIF / loop** — one motion clip per slug, 4s loop, autoplays muted.
- [ ] **F9. Custom typography for couple's names** — every featured slug typesets the names in their own way, like wedding stationery.
- [ ] **F10. "Years married" counter** — for couples who shared their date, show how long it's been since the wedding (live counter). — *Risk:* sentimental, on the edge.

---

## G. Interactive moments

- [ ] **G1. Drag-to-reveal selective color** — let the user drag a slider over a B&W photo to bring back the sindoor.
- [ ] **G2. Mehendi "find the name"** — click around the mehendi to discover the hidden groom name. Reward = it lights up.
- [ ] **G3. Cursor-following caption** — image captions appear next to the cursor when hovering over a gallery image.
- [ ] **G4. Hover-to-play playlist** — vinyl spins on hover, no click needed for sample.
- [ ] **G5. Three.js photo album** — pages flip in 3D. — *Risk:* heavy, easy to over-engineer.
- [ ] **G6. Live booking calendar** — actual visual calendar, taken/open dates highlighted.
- [ ] **G7. Frame counter on hero** — like a film camera, increments slowly as you scroll. "Frame 0142 of 1840."

---

## H. Loading & transitions

- [ ] **H1. Page transitions** — outgoing page wipes up, incoming wipes in. Like turning an album page.
- [ ] **H2. Loader: just a number 0–100** in the corner, no images, no logo. *Recommended* — tighter and more confident than the cascade.
- [ ] **H3. Loader: a single photo dissolving in** like a developing polaroid. — *Risk:* slow.
- [ ] **H4. No loader at all.** Skeleton + lazy-load. Most luxury sites do this. — *Recommended* if we're confident the assets load fast.
- [ ] **H5. First-visit-only "preface" screen** — italic single line: "Mi Amor Tales · weddings, photographed in Jaipur, since 2018" — auto-fades after 1.5s.

---

## I. Editorial / written content

- [ ] **I1. "Studio diary"** — a side blog of small, dated thoughts (300 words, one image).
- [ ] **I2. "Books we love"** — what photo books inspire MAT. Builds taste-credibility.
- [ ] **I3. Open letter to brides** — a single editorial page that's not a blog post, almost like a manifesto.
- [ ] **I4. FAQ as long-form essay** — instead of accordion, write the FAQ as paragraphs.
- [ ] **I5. "How we work" section** — 5 numbered chapters, like Aesop's product process pages.
- [ ] **I6. Ethical sourcing / decline statement** — "We turn down 80% of weddings we're asked to photograph. Here's why." — *Why:* counter-intuitive, signals luxury.

---

## J. Microinteractions (the small stuff)

- [ ] **J1. Cursor becomes a small sage ring** when over an interactive element. — *Risk:* polarizing.
- [ ] **J2. Image hover: image stays still, *caption* fades in below.** No movement on the image itself.
- [ ] **J3. Button hover: text slides up, replacement text slides in from below** (like Awwwards sites). — *Risk:* over-clever.
- [ ] **J4. Marquee speeds up** when cursor enters it.
- [ ] **J5. Scroll progress as a thin sage line** at the very top of the viewport.
- [ ] **J6. Selected nav link: italic + 1px sage dot to the right** instead of underline.
- [ ] **J7. Form input focus: hairline expands left-to-right** instead of the whole border lighting up.

---

## K. Decorative restraint experiments

- [ ] **K1. Marigold appears once only** — at the philosophy slab on Home. No spin, no halo, just a single still bloom at 30% opacity. *Recommended.*
- [ ] **K2. Marigold becomes the favicon** and one OG image accent. Out of the body design entirely.
- [ ] **K3. Replace marigold with a thin Devanagari character** — "स" in 200px Cormorant Devanagari, very low opacity, as a watermark. — *Risk:* legibility.
- [ ] **K4. No decorative elements at all** — pure typography + photography. Most Gucci/LV-like.

---

## L. Color experiments

- [ ] **L1. Pure black-and-white site** with sage as the only accent (current direction).
- [ ] **L2. Cream + ink site** — paper #FAFAF7 stays, but ink shifts to #2B1F18 (warm dark brown). More wedding-photo-appropriate. — *Risk:* loses the cool restraint.
- [ ] **L3. Single sindoor moment per page** — one tiny 1px sindoor dot in the eyebrow row. — *Risk:* easy to misuse.
- [ ] **L4. Sage gradient backgrounds** — ban (already in restraint rules).

---

## M. Performance / craft

- [ ] **M1. Self-hosted fonts** (per CLAUDE.md). Currently using next/font/google which auto-self-hosts but verify.
- [ ] **M2. AVIF + WebP everywhere** with `next/image`. Currently using Unsplash URLs — replace with local assets when client provides.
- [ ] **M3. Above-fold critical CSS only** for the hero — defer everything else.
- [ ] **M4. Lighthouse 95+ across the board.** Bake into CI.
- [ ] **M5. ARIA labels and keyboard focus rings** on every interactive element.
- [ ] **M6. Reduced-motion media query** drops every animation to a static fade.

---

## N. Booking-conversion moments

- [ ] **N1. Sticky "Check availability" button** appears after 50% scroll on every page except contact.
- [ ] **N2. Inline calendar in the contact page** showing taken vs. open Saturdays for the next 18 months.
- [ ] **N3. WhatsApp floating button** — single sage circle bottom-right, only on mobile.
- [ ] **N4. "We accept 6 weddings per season"** — display a real-time counter of remaining 26/27 slots.
- [ ] **N5. Soft urgency copy** — "Two slots taken since last Tuesday."
- [ ] **N6. Two-step contact** — first ask for date and city, then if open, expand to full enquiry. Less friction.

---

## O. SEO + share

- [ ] **O1. Per-couple OG image** — auto-generated card with their names, place, date.
- [ ] **O2. Schema.org Event + LocalBusiness** on every page.
- [ ] **O3. Share-as-postcard** — featured story has a "Send this to a friend" that opens a pre-formatted email or WhatsApp link.
- [ ] **O4. Print stylesheet** — featured stories print as a clean editorial PDF without the chrome.

---

## P. Things we tried and rejected (parking lot)

> Move ideas here when they don't make the cut, with one-line reasoning.

- ~~Pulsing marigold halos in the philosophy slab~~ — too busy, broke restraint rule.
- ~~Sage punctuation on every comma in body copy~~ — visual noise.
- ~~Bottom pill morphing nav~~ — clever but conflicts with luxury restraint.
- ~~Solid black-bar buttons~~ — replaced by bordered/text-link pattern.
- ~~Caveat handwriting on Polaroid frames~~ — too casual for the rest of the site.

---

## Q. Quick wins to ship in the next round

1. Replace bottom pill nav with restrained top-bar nav. → **B1**
2. Scope `Punc` to h1/h2 headlines only. → rule 10 in DESIGN-SYSTEM.
3. Strip marigolds to one location (philosophy slab). → **K1**
4. Replace Weddings polaroid scatter with justified gallery. → **C1**
5. Replace solid black buttons with bordered/text-link pattern. → rule 5 in DESIGN-SYSTEM.
6. Shorten loader to 1.6s OR remove entirely. → **H2** or **H4**
7. Reduce headline sizes per type scale. → §1 DESIGN-SYSTEM.
8. Drop the contact availability month-pill grid. → page rules in §7.

---

## R. Decision queue (in order)

1. Ship Phase A (Quick wins above).
2. Browse the live site, pick which **A**, **C**, or **F** experiment to try next.
3. If still feels too busy after Phase A, escalate to **K4** (no decorative elements at all).
4. Then move to **F2** vendor table + **F6** photographer's letter — these add depth without ornament.
