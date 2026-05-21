@AGENTS.md

## Working style for this repo

- **Default to subagents.** Anything that touches multiple files, requires reading large assets (PDFs, magazine pages, contact sheets, many screenshots), inspecting batches of images, or running broad code searches → launch one or more Explore / general-purpose agents instead of doing it in the main thread. Fan them out in parallel whenever the tasks are independent (single message, multiple Agent tool calls).
- Synthesis stays in the main thread — never delegate the *decision* of how to wire results together. Agents gather and report; the main thread plans and edits the code.
- Use the Plan agent for multi-step implementations that span >3 files or introduce a new pattern.

# Mi Amor Tales — Website Redesign

## Who is MAT?

Mi Amor Tales is a premium wedding photography & cinematography studio based in Jaipur, Rajasthan. They capture weddings, pre-weddings, and real couple stories with cinematic artistry across India and worldwide. Their tagline: "Where love meets legacy — your story, crafted with passion and elegance."

**The purpose of this website is singular: maximum attraction to potential clients.** Every design decision, every animation, every micro-interaction must serve this goal. A visitor should leave thinking: *"I want these people to photograph my wedding."*

This is NOT a portfolio template. This is a cinematic, editorial, animation-heavy web experience that turns every wedding MAT has photographed into a marketing asset.

---

## Brand & Design Direction

### Aesthetic

Luxury editorial meets Indian wedding warmth. Think Adovasio.it's Italian elegance but with Indian cultural depth — mehendi, sindoor, sangeet, pheras. The vibe is cinematic, intimate, high-end. Never generic, never template-y.

### Colors

```
--color-white: #FFFFFF
--color-black: #1a1a1a
--color-sage: #436c67
--color-sage-light: #e8efee
--color-sage-lighter: #f4f7f7

/* Accent — used sparingly for sindoor effect */
--color-sindoor: #C41E1E
```

The palette is deliberately restrained: white, black, sage green. The sindoor red appears ONLY in selective-color B&W photographs — never as a UI color. This restraint makes the red hit harder when it appears in photos.

### Typography

Serif-forward. Large, elegant serif for headlines (Playfair Display, Cormorant Garamond, or similar editorial serif). Clean sans-serif for body (Poppins Light or similar). The serif should feel like a wedding invitation — timeless, not trendy.

* **Headlines / Hero text:** Serif, large (clamp-based fluid sizing), generous letter-spacing
* **Body text:** Sans-serif light, 16-18px, comfortable line-height (1.6-1.7)
* **Accents / Labels:** Sans-serif medium, uppercase, wide letter-spacing (2-4px), small (11-13px)
* **Couple names:** Always serif, always in the format "A sang B" (not "A & B")

### Naming Convention

Use "sang" (Hindi for "with/together") instead of "&" or "and" across the entire site. Page titles, marquee, URL slugs (`/featured/riya-sang-mohit`), OG meta. This is a brand signature, not just copy.

---

## Tech Stack

* **Framework:** Next.js 14+ with App Router
* **Animation:** GSAP (GreenSock) with ScrollTrigger, MotionPath, DrawSVG plugins. Lenis for smooth scrolling. Barba.js or custom page transitions via Next.js.
* **Styling:** Tailwind CSS with custom design tokens matching the brand palette above.
* **Backend / CMS:** Supabase (database, auth, file storage). The CMS admin panel is a protected route within the same Next.js app.
* **Hosting:** Vercel (frontend) + Supabase Cloud (backend). Zero recurring platform costs.
* **Images:** Next/Image with Cloudinary or Supabase Storage. WebP/AVIF. Lazy loading everywhere.
* **SEO:** Server-rendered meta tags, JSON-LD (LocalBusiness + Event), auto-generated OG images, XML sitemap, robots.txt. Target: Lighthouse 90+ all metrics.

---

## Site Architecture

Six pages, each with a clear role in the conversion funnel:

### 1. Home (`/`)

The cinematic first impression. Sections in order:

1. **Hero** — Full-viewport cinematic video or animated photo collage. Serif headline ("Weddings that never fade" or similar). Soft "Check Availability" CTA. Loading counter animation (Adovasio-style percentage counter that builds anticipation).
2. **Featured Couples Marquee** — Horizontally scrolling strip of couple names in large serif type. Each name links to the featured wedding. Hover reveals a preview image. Inspired by Adovasio's name marquee.
3. **Showcase Grid** — 3-4 featured wedding thumbnails. GSAP clip-path reveals on hover. Inspired by Fred Again's project grid layout. Each links to the full wedding story.
4. **Social Proof Ticker** — Scrolling marquee: "Just booked: Priya sang Arjun — Udaipur, April 2026." Creates urgency + FOMO.
5. **World Map** — Interactive SVG map of India (and world) with pins at every venue MAT has covered. Pins animate in on scroll. Hover shows couple name + thumbnail. Great for destination wedding social proof.
6. **Testimonials** — Elegant quote cards with couple names in serif. Slide-in animations.
7. **Instagram Feed** — Live Instagram grid. Keeps the site alive without manual updates.
8. **Contact Teaser** — "Your story deserves to be told." with prominent CTA.

### 2. Featured Weddings (`/featured` and `/featured/[slug]`)

The crown jewels. The listing page shows featured weddings in an editorial grid.

Each featured wedding sub-page (`/featured/riya-sang-mohit`) is an immersive, full-page story:

* **Mehendi SVG Animation** — The bride's actual mehendi design as SVG. Draws itself stroke-by-stroke using GSAP drawSVG. The groom's name hidden in the mehendi reveals first. The SVGs are uploaded through the CMS. Conversion from photo to SVG is handled by a separate custom tool.
* **Selective Color Photography** — B&W photos where only the sindoor (vermillion red) remains in color. The color grading is done on actual photos before upload (not CSS). The site just displays them.
* **"A sang B" Title** — Page title in the wedding-announcement tradition.
* **Couple's Playlist** — Optional Spotify/Apple Music link. Small vinyl icon, NEVER autoplay. Visitors who press play browse photos with the couple's music.
* **Ritual Timeline** — Visual scroll-triggered timeline of ceremonies: Haldi → Mehendi → Sangeet → Pheras → Vidaai. Photos from each ceremony.
* **Vendor Tags** — Each page tags venue, decorator, MUA, etc. These vendors share the page on their socials = free distribution.
* **Couple Quote** — Pull-quote in large serif italic.

### 3. Weddings (`/weddings`)

The full visual archive — designed for browsing.

* **Polaroid Gallery** — Photos styled as Polaroid frames (white border, slight random rotation, handwritten-font couple name). On scroll, polaroids animate into position via GSAP ScrollTrigger — floating in from random angles, settling into a grid. Full scatter physics on desktop, gentle float-in on mobile.
* **Filter System** — Filter by: Bride, Groom, Couple, Black & White, Party, Venue. Inspired by the Adovasio filter panel (see attached screenshot).
* **Infinite Scroll** — Lazy-loaded, smooth, no pagination clicks.
* **Hover Previews** — Hovering a wedding card shows a quick 3-4 photo slideshow.

### 4. About (`/about`)

The human side. Inspired by Aventura Dental Arts' about page (parallax, large imagery, narrative scroll) + Tatiana Braoun's philosophy slice.

* **Origin Story** — How MAT started. Parallax text-over-image.
* **Team Section** — Photographer profiles with hover-reveal behind-the-scenes shots.
* **Philosophy Slice** — Full-width statement: "We don't capture moments. We compose legacies." Large serif, centered, dramatic.
* **Animated Counters** — Weddings shot, cities covered, years of experience. Animate on scroll.
* **"As Seen In" Press Bar** — Logos of publications MAT has been featured in.

### 5. Blog / Tales (`/tales` and `/tales/[slug]`)

SEO engine + trust builder.

* **Magazine Layout** — Featured post hero + 2-column grid. Categories: Behind the Lens, Venue Guides, Wedding Tips, Real Stories.
* **Reading Experience** — Full-width hero images, pull quotes, inline photo galleries. Estimated reading time. Social sharing.
* **SEO** — Structured data, meta tags, auto OG images. Target keywords: "wedding photographer Jaipur", "destination wedding India", etc.

### 6. Contact (`/contact`)

The conversion endpoint. Inspired by Adovasio's contact page.

* **Availability Checker** — Date picker to check if MAT is available before filling the full form.
* **Enquiry Form** — Stepped: Name → Date → Venue → Package Interest → Message. Submissions go to email + WhatsApp notification.
* **FAQ Accordion** — Addresses pricing, travel, deliverables, turnaround. Reduces objection friction.
* **WhatsApp CTA** — Floating WhatsApp button throughout the entire site.

---

## Animation & Interaction Guidelines

This site is animation-heavy. Every animation must be intentional and serve the "premium storytelling" brand.

### Global

* **Smooth scrolling** via Lenis. Always.
* **Page transitions** — Smooth fade/slide between pages. No hard reloads. The site should feel like flipping through a wedding album.
* **prefers-reduced-motion** — ALL animations must respect this media query. Graceful degradation, not broken pages.
* **Loading sequence** — On first visit, photos stack and scatter, then settle into place (inspired by Thibault Guignand's photo-cascade).

### Scroll-triggered

* Use GSAP ScrollTrigger for all reveal animations.
* Default entrance: fade-up with slight y-translate (20-30px), staggered by 0.1s per element.
* Polaroids: scatter-to-grid physics on desktop.
* World map pins: animate in sequentially.
* Counters: count up on scroll into view.

### Hover

* Featured couples marquee: hover reveals preview image with clip-path expand.
* Wedding cards: subtle scale (1.02-1.03) + shadow lift.
* Showcase grid: GSAP clip-path reveal of larger image.
* Navigation links: serif underline animation.

### Mehendi SVG

* Uses GSAP DrawSVG plugin.
* Stroke draws in over 3-5 seconds.
* The groom's hidden name path has a lower delay so it appears first.
* Triggered on scroll into viewport.

---

## Custom CMS (Admin Panel)

Protected route at `/admin`. Supabase auth (email/password for the MAT team).

### Data Models

**Weddings**

* couple_name (text) — "Riya sang Mohit"
* slug (text, auto-generated)
* date (date)
* venue (text)
* city (text)
* category (enum: Bride, Groom, Couple, Black & White, Party)
* is_featured (boolean)
* photos (file[] — drag-and-drop ordering)
* cover_photo (file)
* featured_data (jsonb, nullable):
  * mehendi_svg (file — SVG upload)
  * ritual_timeline (json — array of {ceremony, photos})
  * playlist_url (text)
  * couple_quote (text)
  * vendor_tags (json — array of {role, name, instagram})
  * selective_bw (boolean)

**Blog Posts**

* title, slug, content (rich text), cover_image, category, published_at, reading_time

**Testimonials**

* couple_name, quote, wedding_ref (FK)

**Venue Pins**

* city, lat, lng, couple_name, thumbnail, wedding_ref (FK)

**FAQ**

* question, answer, sort_order

### CMS Features

* Drag-and-drop photo ordering
* Rich text editor for blog posts
* Mark wedding as "Featured" → unlocks the immersive story template fields
* SVG upload for mehendi
* Testimonial management
* Venue map pin management

---

## Inspiration Reference

These sites inform specific sections (DO NOT copy — extract the vibe):

| Inspiration                                       | What to extract                                                                                                                                                         |
| ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **adovasio.it**                             | Overall structure, editorial serif typography, couple name marquee, filter panel UI, loading counter, contact form layout, clean footer. This is the primary reference. |
| **shed.design/work**                        | The index/journal layout — a "MAT Journal" page showing all weddings done. Grid with clean typography.                                                                 |
| **aventuradentalarts.com**                  | About page parallax scroll, large imagery narrative, team section layout.                                                                                               |
| **fredagain.com**                           | Homepage showcase grid — thumbnail hover expand. Project grid with clip-path reveals.                                                                                  |
| **ancestry.com/stories-of-us**              | Hero section animation — photo-based animated hero with layered reveals.                                                                                               |
| **thibaultguignand.com/en/project/atypica** | Loading animation — photos cascade/stack then settle. First-visit loading sequence.                                                                                    |
| **tatianabraoun.com/about**                 | Philosophy statement slice — full-width, large serif text, dramatic.                                                                                                   |
| **voku.studio**                             | Explore page layout — potential inspiration for the Weddings archive page.                                                                                             |

---

## File & Folder Conventions

```
src/
├── app/
│   ├── page.tsx                    # Home
│   ├── featured/
│   │   ├── page.tsx                # Featured weddings listing
│   │   └── [slug]/page.tsx         # Individual featured wedding
│   ├── weddings/page.tsx           # Weddings archive
│   ├── about/page.tsx
│   ├── tales/
│   │   ├── page.tsx                # Blog listing
│   │   └── [slug]/page.tsx         # Blog post
│   ├── contact/page.tsx
│   ├── admin/                      # CMS (protected)
│   │   ├── layout.tsx
│   │   ├── weddings/
│   │   ├── blog/
│   │   ├── testimonials/
│   │   └── settings/
│   └── layout.tsx                  # Root layout with nav + footer
├── components/
│   ├── ui/                         # Reusable primitives
│   ├── sections/                   # Page sections (Hero, Marquee, etc.)
│   ├── animations/                 # GSAP wrappers
│   └── cms/                        # Admin panel components
├── lib/
│   ├── supabase.ts                 # Client + server clients
│   ├── gsap.ts                     # GSAP registration + plugins
│   └── utils.ts
├── styles/
│   └── globals.css                 # Tailwind + CSS custom properties
└── public/
    ├── fonts/                      # Self-hosted serif + sans
    └── images/
```

---

## Key Development Notes

* [ ] **No Figma.** Design direction is established via rough wireframes, then straight into code. Iterate in the browser where animations and responsiveness can be tested with real content.
* [ ] **Self-host fonts.** Do not use Google Fonts CDN. Download and serve from `/public/fonts/` via `@font-face` in globals.css for performance.
* [ ] **Image optimization is critical.** Wedding photos are large. Use Next/Image with proper `sizes` attribute, `priority` for above-fold, blur placeholders. Serve WebP/AVIF.
* [ ] **GSAP plugins** — DrawSVG and MotionPath are Club GreenSock plugins. Make sure they're properly registered.
* [ ] **Mobile-first responsive.** Polaroid scatter physics → gentle float-in on mobile. Marquee text size scales down. Hero video → static image on slow connections.
* [ ] **SEO matters.** Server-render everything. No client-only content. Structured data on every page. OG images auto-generated per wedding.
* [ ] **WordPress cost comparison.** The client is migrating from WordPress + Elementor (recurring fees). This custom build on Vercel free tier + Supabase free tier has zero recurring platform costs. Mention this advantage if relevant.

---

## Voice & Copy Direction

Warm, intimate, never corporate. The website speaks like a friend who happens to be an incredible photographer. Copy should feel like a love letter, not a brochure.

* "Weddings that never fade"
* "Your story deserves to be told like no other"
* "We don't capture moments. We compose legacies."
* Use "sang" everywhere: "Riya sang Mohit", "Shrenik sang Ishika"
* Blog section is called "Tales" (not "Blog")
* Contact CTA: "Check Availability" (not "Contact Us" — creates urgency)
