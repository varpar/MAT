# Mi Amor Tales SEO Audit

Audit date: 26 October 2026  
Primary site: https://www.miamortales.com  
Business type: Jaipur-based wedding photography and cinematography studio

## Executive summary

The site had strong original visual content and crawlable server-rendered pages, but its SEO foundation was incomplete. The audit found missing canonical URLs, no sitemap or robots file, no structured data, no usable branded app icon set, missing H1 headings on two important pages, and one material trust inconsistency (“eight years” versus the verified 2+ years).

The foundational issues have now been corrected. The current implementation score is approximately **78/100**, pending production deployment and a post-deploy Core Web Vitals run.

## Scorecard

| Category | Before | Current | Notes |
| --- | ---: | ---: | --- |
| Technical SEO | 62 | 86 | Canonicals, robots, sitemap, headers, and discovery routes added |
| Content quality | 58 | 66 | Metadata and trust claim improved; deeper proof content remains |
| On-page SEO | 64 | 86 | Unique titles/descriptions and H1 coverage added |
| Structured data | 20 | 82 | Organization, WebSite, and BreadcrumbList JSON-LD added |
| Performance | 65 | 74 | Hero LCP delay and excess image preloads fixed; large videos remain |
| Images | 64 | 68 | Responsive delivery is strong; descriptive alt coverage remains uneven |
| AI search readiness | 42 | 58 | Entity markup and clearer metadata added; more verifiable facts are needed |

## Implemented in this pass

- Added `metadataBase`, title templates, canonical URLs, robots directives, Open Graph, Twitter cards, keywords, authorship, and publisher metadata.
- Rewrote route metadata around real search intent: Jaipur wedding photography, wedding films, real wedding stories, and venue-led couple pages.
- Added unique descriptions for every featured couple page.
- Added `/robots.txt`, `/sitemap.xml`, and all six couple-story URLs.
- Added Organization and WebSite JSON-LD site-wide.
- Added BreadcrumbList JSON-LD to key routes and all couple pages.
- Added branded browser, Apple touch, and manifest icons plus `/manifest.webmanifest`.
- Added a visible homepage H1 and an accessible Featured-page H1.
- Corrected the false “218 frames across eight years” claim to the verified journey: 50+ weddings, 10+ cities, 2+ years.
- Made email, telephone, and WhatsApp footer details into real links.
- Converted Tales story cards into crawlable links.
- Removed the artificial 2.2-second homepage hero opacity delay.
- Stopped below-fold full-width images from all loading at high priority.
- Added basic security headers: nosniff, same-origin framing, referrer policy, and restrictive camera/microphone/location permissions.

## What already worked well

- HTTPS and HSTS are active in production.
- Main pages return 200; invalid pages return a correct 404 with noindex.
- Important content is server-rendered and does not depend on client JavaScript for discovery.
- URLs are short and descriptive.
- Open Graph images exist globally and for every featured couple page.
- Next Image provides responsive sources, modern formats, dimensions, and blur placeholders.
- The site has genuine first-party photography, films, stories, team information, and contact details.

## Remaining priorities

### High

1. Compress and create mobile encodes for the 44–46 MB featured films. Start playback only when the video is near the viewport.
2. Add real award names, years, and proof links, or replace the “4–5 Awards” range with a single verified number.
3. Add a privacy page because the enquiry form transfers personal details to WhatsApp. Add terms and fuller business identity details.
4. Add verified Instagram/Vimeo/other profile URLs before exposing them as links or `sameAs` schema.
5. Strengthen the Featured and Weddings pages with concise, direct explanatory copy about services, locations, and documentary/editorial approach.

### Medium

1. Improve meaningful image alt text; keep empty alt only for repeated or decorative imagery.
2. Add wedding date/year, venue, city, photographer/filmmaker, and verified vendor credits to story pages.
3. Add genuine client testimonials and review-source links.
4. Add related-story links within every couple page.
5. Add a tested Content Security Policy after inventorying all inline scripts/styles and media sources.
6. Consolidate the root-domain redirect to the preferred HTTPS/www host into one hop if the DNS/platform setup allows it.

### Deferred intentionally

- `VideoObject` schema was not added because genuine upload dates are not available and should never be fabricated.
- `LocalBusiness` schema was not added because a complete public street/postal address and opening hours are not verified. Organization schema is truthful and sufficient for now.
- Social `sameAs` fields were not added because the current footer does not contain verified profile URLs.
- FAQ rich-result schema was not added because commercial FAQ pages generally do not qualify for Google FAQ rich results.

## Verification completed

- Production build passes with all 19 generated routes.
- `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/icon`, and `/apple-icon` return 200 locally.
- Sitemap contains 12 canonical URLs.
- Homepage, Featured, and couple pages expose unique titles, canonical URLs, H1 headings, and JSON-LD.
- The generated icon was visually inspected.

