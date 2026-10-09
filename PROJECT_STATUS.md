# FLORAL VOID 2.0 — PROJECT STATUS

> Handoff file. Update after every approved stage. Another developer/AI should be able to continue from here.

## 1. Overview
Premium creative-commission website for **FLORAL VOID** (artist: Kehinde; fursuits, fursona design, VRChat and VTuber avatars). Redesign of an existing static site. Hosting: Vercel. Repo: github.com/abdakeemk-web/FLORAL_VOID.

## 2. Workflow rules (locked)
- Work in stages; **stop after each stage and wait for explicit user approval.**
- Never invent prices, links, locations, reviews, awards, legal clauses or business claims. Use visible placeholders.
- Never silently delete business policies, pricing, assets or contact info.
- Never put credentials/API keys in frontend code. The commission form posts directly
  to Web3Forms from the browser (their intended architecture; the access key is public
  by design). No other secrets exist. No server code remains.
- SEO is a major requirement from the start. No ranking guarantees.

## 3. Stage tracker
| Stage | Scope | Status |
|---|---|---|
| 1 | Audit + architecture | Approved (user said continue) |
| 2 | Design system | **Approved** (user, Oct 7 2026). Form service selector corrected (see §12) |
| 3 | Global structure (nav, footer, shell, Discord/social component) | **Approved** (user: "that is great") |
| 4 | Homepage | **Approved** (user: "i agreed") |
| 5 | Gallery | **Approved** (user, with decisions in section 12) |
| 6 | Services | **Delivered** (user asked to continue; treat as approved unless changes requested) |
| 7 | Pricing | **Approved** (user, Oct 8 2026) |
| 8 | Contact / commission form + Web3Forms email | **Updated — awaiting user approval + access key** (Resend removed; form posts directly to Web3Forms; recipient abdakeemkehinde@gmail.com; Full Suit $7,000+ provisional; Furry gallery filter added) |
| 9 | Terms | **Approved** (user, Oct 9 2026 — "well and good"; client to read it over) |
| 10 | Performance / SEO / accessibility audit | **Delivered — awaiting user approval** (og share image added, fonts self-hosted, all contrast/label/heading checks pass) |
| 11 | Final QA | Pending |

Reality check (user, Oct 7 2026): nothing had ever been delivered or pushed to GitHub before Stage 3. Stage 3 is the first real code.

## 4. Confirmed business information (from user, Stage 1)
| Item | Value |
|---|---|
| Discord username (always show visibly) | `eloradebby` |
| Discord profile link (keep as currently used) | https://discord.com/users/1251198237864362167 |
| Form recipient | abdakeemkehinde@gmail.com (server-side only) |
| TikTok (show username) | @nadafunk — https://www.tiktok.com/@nadafunk |
| Telegram (show username) | Eloradebby1234 — http://t.me/Eloradebby1234 |
| Pricing (fursuit) | Head Only $1,500+ · Mini Partial $2,700+ · Partial $5,000+ · Full Suit $7,000+ (provisional — change in data/site.config.json when confirmed). Fursona / VRChat / VTuber stay "Request a Quote" |

## 5. Placeholders still open
- Full Suit price is provisional ($7,000+ in data/site.config.json, pricing.html, services.html and the form selector). Change it in one place when the client confirms.
- Partial Suit no longer mentions a full bodysuit (client clarification applied Oct 8 2026); the "Full zippered body suit" line moved to Full Suit.
- `[CANONICAL_DOMAIN]` (current live URL: floral-void.vercel.app)
- `[BUSINESS_LOCATION]` (bio says "Northeast Ohio"; no address given — do not add LocalBusiness schema without one)
- `[PRIMARY_SEO_KEYWORDS]`, `[SITE_DESCRIPTION]`, `[SOCIAL_PROFILE_URLS]`
- Per-service Discord/TikTok links: default to the shared links above unless the client supplies different ones
- Pricing for Fursona / VRChat / VTuber (undecided whether to display)
- Gallery categories + titles (suggested only, not approved)
- WIP images: 12 photos added Oct 9 2026 (foam bases, feet paws, clay sculpt, fit tests; originals in source-images/work-in-progress/). 2 exact duplicates deleted. 1 MP4 video parked (gallery is photo-only; needs a small player upgrade).

## 6. Brand / design (carry-over; formal system comes in Stage 2)
- Primary navy `#0A1A3A`, accent gold `#D4AF37`, plus neutral white/off-white/gray/black.
- **Remove** off-brand orange `#e67e22` and green `#27ae60` (pricing.html) and any other stray colors.
- Fonts currently: Poppins (body), Playfair Display (headings). Keep unless Stage 2 proposes a change.
- Tone: premium, artistic, modern, professional. No generic SaaS look, no excessive motion.

## 7. Audit findings (existing site)
**Files:** index, gallary, services, pricing, contact, term (.html), style.css (440 lines), script.js (89 lines), images/ (50 portfolio JPGs, logo, 4 social icons + WhatsApp icon unused). 6.3 MB images total. Single Git commit.

**Structure/code**
- Header, footer, hero + slider duplicated on every page.
- pricing.html has its own `<style>` with global `ul/li/p/h1` overrides and orange/green colors.
- `fab fa-*` icon classes used but no Font Awesome loaded; the `<i>` tags render nothing (some contain link text).
- Inline `style="background-image"` on slides.
- script.js: slider code throws if a page has no `.slide`; preloader hides on window `load`, which on the gallery waits for all 50 images.
- Contact "form" does not exist on contact.html; script.js shows a fake "sent successfully" popup for any `<form>`.

**SEO:** only short `<title>`s. No meta descriptions, canonicals, OG/Twitter, JSON-LD, favicon, robots.txt, sitemap.xml. Alt text generic ("Gallery Image 1", many duplicates). Files named 1–50.jpg. Misspelled URLs `gallary.html`, `term.html`. Missing/weak `<h1>` on some pages (pricing's h1 is outside the hero). Services hero claims "Professional photography and creative design solutions" (inaccurate).

**Accessibility/mobile:** hamburger is a `<div>` (not keyboard accessible); icon links have empty alt (no accessible name); pricing cards fixed 300px with hover scale (overflow risk on 320px); gallery loads all 50 images eagerly, no width/height (layout shift); no focus styles audited.

**Content issues:** "Fursuts", "Forsona", "VRchats", "yur", "commision", "Vtuber", "Term of services"; contact link label `@infoabdakeeemkehinde` for mailto abdakeemkehinde@gmail.com; Terms contain literal asterisks (`*estimates only*`, `*non-refundable deposit*`) from unrendered markdown; "pricing" lowercase in nav on some pages; nav label "Term of Services".

## 8. Existing content to preserve
- **Bio:** Northeast Ohio furry creator with a hearing impairment; business began 2019; Animation degree 2021, full-time since; animation, illustration, tailoring; CTA "Come join the FLORAL VOID Family!".
- **Services:** Fursuit making, Fursona (spelled "Forsona" currently), VRChat avatar creation, VTuber avatar.
- **Terms (7 sections, preserve meaning):** 1 General Policy & Agreement (18+; under-18 needs parent/guardian to sign; right to refuse; no liability for allergic reactions; terms may change but not for already-secured commissions) · 2 Quoting & Pricing (prices are estimates; quotes valid 60 days; major changes after deposit may cost extra) · 3 Payment & Deposits (non-refundable deposit applied to cost; payment plans; full payment before physical creation begins; failure-to-pay forfeiture) · 4 Commission Process (order of payment; dates may change; WIP updates; minor changes only after creation starts; refund incl. deposit if Artist cancels) · 5 Shipping & Completion (client pays shipping; not responsible for loss/damage; customs/duties on client) · 6 Warranty & Repairs (30 days structural seams/components; exclusions; client pays after) · 7 Copyright & Usage (artist keeps copyright and may use photos; client owns physical item, may resell but must pass on terms).
- All pricing feature lists in pricing.html, all 50 images, all social handles above.

## 9. Proposed architecture (pending approval)
HTML5 + Tailwind CSS (built, not CDN) + vanilla JS modules; GSAP only if justified; no framework. Small Node build step (runs on Vercel) to: compile Tailwind, inject shared header/footer/Discord block into static HTML so content is crawlable without JS, and render gallery HTML from a data file.

```
/ index.html gallery.html services.html pricing.html contact.html terms.html 404.html
/ robots.txt sitemap.xml PROJECT_STATUS.md
/src      Tailwind input, JS modules, page templates + partials
/data     site.config (all links/placeholders in ONE place), gallery data
/api      Vercel serverless function for commission form email
/images   descriptive filenames, WebP/AVIF + thumbnails (originals kept in images/source)
```
- `gallary.html` → `gallery.html`, `term.html` → `terms.html` with permanent (301) redirects in vercel.json.
- Form: server-side send, honeypot + server validation, real success/error states; secrets in Vercel environment variables only.
- Discord/social component: shows username visibly, Copy Username + Open Discord (Home, Services, Contact, Footer); same pattern for TikTok `@nadafunk` and Telegram `Eloradebby1234`.
- SEO: unique title/description/canonical per page, OG + Twitter, JSON-LD (Organization/Brand, Service), one h1/page, sitemap + robots, descriptive alt/filenames, Search Console-ready.

## 10. Decisions
**Answered by user:**
- Remove the WhatsApp icon (do not show WhatsApp anywhere).
- Show **fursuit pricing only** (no Fursona/VRChat/VTuber prices; those services use a "request a quote" CTA).
- Work in Progress category shows fursuits still being built **and** completed ones, with an In progress / Completed status tag. No WIP photos identified yet; the user must supply which images are in progress.
- User said "let continue" → Stage 1 approved, Stage 2 started.

**Not answered — working defaults (change anytime):**
- Public email: form-only, plus obfuscated address in footer (not a plain mailto on every page).
- Canonical domain: floral-void.vercel.app until a custom domain exists (`[CANONICAL_DOMAIN]`).
- Preloader: removed.
- Email provider: decide at Stage 8 (Resend or Gmail SMTP via Vercel env vars).
- Node build step (Tailwind + templates + image processing): accepted.
- "Northeast Ohio" may be used as region served in copy/schema; no street address, no LocalBusiness schema.

**Stage 2 review (approved with the design system):** functional error-red `#B3261E` for form errors only (extra colour); gold-ink `#8A6F12` for small gold-toned text on light.

## 11. Gallery categorization (SUGGESTION ONLY — not approved)
Head: 3,7,8,13,17,19,21,22,23,28,34,35,37,38,42,44,47,49 · Partial: 1,11,24,25,26,27,29,31,32,39,50 · Full suit: 2,4,5,6,9,10,12,14,15,16,18,20,30,33,36,40,41,43,45,46,48 · WIP: none identified.
Likely same-character groups (merge into one project): 3+49, 4+46, 5+15+42, 7+47, 8+24+43, 11+13, 17+50, 19+30+41, 20+31, 22+27+32, 16+36+40, 21+28, 38+44+48, 14+45, 6+9, 25+29.
Flags: 1.jpg is 299x252 (too small); 2, 12, 22 are wide strips; 6,10,25,29,33,39 show people (confirm permission). Do not apply until user approves.

## 12. Last changes
- Stage 2 approval: user approved design system and direction ("do not redesign or restart"). Required correction: commission form Service selector must list ALL services, grouped, with a clear note that Fursona Design, VRChat Avatar and VTuber Avatar are available (priced "Request a Quote"). Options: Fursuit Head Only ($1,500+), Mini Partial ($2,700+), Partial ($5,000+), Full Suit ([FULL_SUIT_PRICE_TO_BE_PROVIDED]), Fursona Design, VRChat Avatar, VTuber Avatar, Other / Custom Request. Applied in design-system.html. Stage 8 form must use the same list (values: fursuit-head, fursuit-mini-partial, fursuit-partial, fursuit-full, fursona-design, vrchat-avatar, vtuber-avatar, other) and the serverless function must validate against it.
- Stage 3 (built from scratch, Oct 7 2026): Node build (scripts/build.mjs -> dist/), shared head/header/footer/social partials, accessible hamburger button (Esc closes, focus moves in), skip link, Discord/TikTok/Telegram block with Copy + Open, footer email reveal button (no plain mailto), 6 page shells + 404 with unique title/description/canonical/OG/Twitter, Organization JSON-LD on home, sitemap.xml, robots.txt, vercel.json 301 redirects (gallary/term). data/site.config.json holds the 8 form services. Tested 320-1920px: no horizontal overflow; menu works. Page bodies are visible placeholders until Stages 4-9.
- DEVIATIONS (need approval): (a) plain CSS from the approved design system instead of Tailwind, because Tailwind could not be installed offline; can switch later. (b) Google Fonts link instead of self-hosted fonts (no network to download); self-host in Stage 10. (c) build outputs to dist/ rather than repo-root HTML. (d) No images, favicon or og:image yet: none supplied.
- Note (superseded): the repo itself was not accessible in this session (no network), so Stage 3 code is not verified here; inspect git status before continuing.
- Stage 1: audit completed; PROJECT_STATUS.md created.
- Stage 2: added `design-system/index.html` (standalone preview: colours, type, buttons, cards, pricing, nav, Discord/TikTok/Telegram block, form, motion, responsive rules). Live site files untouched. Noted content question for Stage 7: Partial tier text says "Full zippered body suit" — confirm wording with client now that a separate Full Suit tier exists; existing pricing note says prices are starting estimates and "Negotiable" — preserve.

- Stage 4 (Oct 7 2026): homepage built. Hero (H1 "Custom fursuits and character design", original tagline, CTA to /contact and /gallery), About (original bio kept; "the Kenny behind" reworded to "the creator behind", typos fixed), 4-service preview (fursuit links to /pricing; other three "Request a quote" to /contact), 4-image gallery strip, contact band with Discord/TikTok/Telegram. Images: 6 portfolio photos converted to WebP (480/960) via scripts/optimize-images.py; alt text describes only what is visible. Favicon + apple-touch icon generated from "Floral void.png". Tested 320-1920px, no overflow, lazy images load. Original 50 JPGs and the zip's old pages are NOT in this project yet (Stage 5 will import images).
- User style note: all code must read as clean, human-written (see preferences). Service-card copy and the hero tagline wording are draft: confirm with client.
- Original site facts confirmed from the uploaded repo: single commit "Initial website"; images/A is a 2-byte stray file (ignore); logo "Floral void.png" is 2000x2000 RGBA.

- Stage 5 (Oct 7 2026): gallery built from data/gallery.json (one place to edit categories, alt text, hidden flags). 43 photos shown: Heads 18, Partials 7, Full Suits 18, Work in Progress 0 (visible placeholder `[WIP_PHOTOS_TO_BE_PROVIDED]` until supplied). Same-character photos sit next to each other in "All". Filter buttons (aria-pressed, live count), masonry layout, lazy thumbnails with width/height (no layout shift), native <dialog> viewer (arrows, Esc, focus returns to tile). Tested 320-1920px: no overflow, no JS errors.
- Image quality: every photo is served as WebP quality 92 at its full original size (capped at 1000px, which is what the originals are) with a 480px thumbnail at quality 90. Untouched originals are kept in source-images/. Homepage images regenerated at the same quality (file suffix -960 became -1000).
- HELD BACK from the gallery (hidden:true in data/gallery.json) until permission is confirmed because they show people: 6, 10, 25, 29, 33, 39. Also left out: 1.jpg (299x252, too small). Set hidden to false to publish any of them.
- Titles/captions: none invented; the photo's alt text is shown as its caption.

- Stage 5 decisions (user): gallery approved as built. Keep 6, 10, 25, 29, 33, 39 and 1.jpg excluded until client confirms permission. Work in Progress stays at 0 with its placeholder until the client names the photos. Original JPGs stay in source-images/. Viewer behaviour stays thumbnail first, full-size only when a photo is opened.
- WIP follow-up (Oct 9 2026): user supplied 14 photos + 1 video in public/work-in-progress/. 2 were exact byte-duplicates (deleted: 12.11.20 PM (3) and (4)); the other 12 published as gallery items wip-01…wip-12 (category wip, all tagged "In progress" with a tile badge + viewer caption prefix). Originals moved to source-images/work-in-progress/ (not deployed); WebP 480/1000 outputs in public/images/portfolio/. The `[WIP_PHOTOS_TO_BE_PROVIDED]` empty message is now generic ("No photos in this category yet") since Furry is still at 0. Two WIP photos show a person (wip-06 fit test with eyes visible through the base; wip-07 lower-body try-on, no face) — user supplied them, so published; remove on request. Video parked: gallery renderer/viewer is photo-only.
- WIP video player (Oct 9 2026): MP4 published as gallery item wip-video-01
  (400x720 portrait, 2.6 MB in public/videos/). Tile shows first frame
  (preload metadata only) with play overlay + "In progress" badge;   viewer dialog
  now swaps between photo and video, pauses on close/navigation. Status line says
  "items" instead of "photos". Checked Oct 9 2026: the MP4 contains a real audio
  track (655 samples), and the viewer plays it unmuted with controls — sound starts
  when the visitor presses play (browsers block autoplay with sound). The tile
  preview itself is silent by design. Video alt text confirmed.
- Video sound (Oct 9 2026, user picked #3): mixed Kevin MacLeod “As I Figure”
  (mellow guitar, CC BY 3.0) into public/videos/wip-video-01.mp4 — first 15.2s,
  0.5s fade-in, 2s fade-out, AAC 128k; picture stream copied untouched (+237 KB).
  Silent original kept in source-images/work-in-progress/. Credit line renders in
  the viewer caption via the item's credit field. Other previews were
  Meditation Impromptu 01/02 (rejected). User approved Oct 9 2026 ("perfect").
- Stage 6 (Oct 7 2026): Services page built. H1 "Services" (old "photography" claim removed), jump links, four sections with anchors (#fursuit-making, #fursona-design, #vrchat-avatar-creation, #vtuber-avatar-creation). Copy is the original service text with typos fixed. Fursuit section lists Head Only from $1,500, Mini Partial from $2,700, Partial from $5,000, Full Suit [FULL_SUIT_PRICE_TO_BE_PROVIDED], plus the original estimate/deposit note, and links to /pricing. Other three show "Request a Quote". Each CTA links to /contact?service=<value> (values match data/site.config.json; the Stage 8 form must read this parameter and preselect the service; "other" is used by the custom-request link). Service JSON-LD for all four services (build supports meta.jsonLd). Closing band with Discord/TikTok/Telegram and a link to Terms.
- Bug fixes this stage: outline buttons on navy sections (homepage hero and contact band) were navy on navy and invisible; now white with gold border. Build script now accepts multi-line page meta.
- Tested: no horizontal overflow at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920px; one 320px overflow (long price placeholder) found and fixed. Only inline text links in paragraphs are under 44px tall.
- Open copy questions: service descriptions are the client's original short lines (no extra claims added); confirm whether the client wants more detail (what is delivered, turnaround) and supply it, since none is confirmed.

- Packaging (user request): each stage zip unzips to one `floral-void/` folder (src, data, public, source-images, scripts, dist, vercel.json, README, PROJECT_STATUS.md). `dist/` is the built site for previewing with VS Code Live Server; Vercel builds it itself.
- Stage 7 (Oct 8 2026): Pricing page built. H1 "Fursuit Commission Pricing". Cards: Head Only $1,500+, Mini Partial Suit $2,700+, Partial Suit $5,000+, each with the ORIGINAL feature list preserved (typos fixed, meaning unchanged, incl. "Full zippered body suit fitted to your duct tape dummy"; still to confirm wording with client). Full Suit card shows [FULL_SUIT_PRICE_TO_BE_PROVIDED] and [FULL_SUIT_FEATURES_TO_BE_PROVIDED]; no price or features invented. "Before you commission" notes: starting estimates vary with complexity, colors, extras (removable tongues, LED eyes, extra padding), negotiable; non-refundable deposit secures the slot; quotes valid 60 days (from Terms section 2) with link to /terms. "Priced by quote" cards for Fursona Design, VRChat Avatar, VTuber Avatar and Other / Custom Request. All buttons link to /contact?service=<value>.
- Fixes this stage: hero sections were padded twice (design-system .hero plus page padding), making heroes too tall on every page; fixed. Footer "Open Discord/TikTok/Telegram" outline buttons were dark on navy; now white/gold. Long placeholders no longer cause overflow on phones.
- Tested: no horizontal overflow at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920px on Pricing; 320/414/1280 re-checked on Home, Gallery and Services after the hero fix.

- Stage 7 decisions (user): Pricing approved. Partial Suit wording "Full zippered body suit" stays unchanged. CLIENT CLARIFICATION NEEDED: confirm whether the Partial Suit should still be described as a "Full zippered body suit" now that a separate Full Suit tier exists. Full Suit price and features stay as placeholders on the Pricing page; do not invent either.
- Stage 8 (Oct 8 2026): commission form built on /contact, sending through Resend via a Vercel serverless function.
  - Files: api/commission.js, api/_lib/validate.js, api/_lib/email.js, src/pages/contact.html, src/js/contact.js, scripts/contact-form.mjs, scripts/dev-server.mjs, scripts/test-commission.mjs, .env.example, README.md (setup), vercel.json (function config), package.json (scripts), .gitignore (.env), CSS in src/site.css, data/site.config.json.
  - Form: Name, Email (required); Discord username, Budget (optional); Service, Project description (required, min 20 chars); Character info, Reference links, Additional notes (optional); Terms checkbox (required, links to /terms); hidden honeypot. All 8 services in the selector, grouped, with the same prices as the Pricing page. ?service= from Pricing/Services buttons preselects (unknown values are ignored).
  - Full Suit in the form shows "Request a Quote" (a professional placeholder, no price invented). The Pricing page still shows [FULL_SUIT_PRICE_TO_BE_PROVIDED]. To publish the real price: set price (and priceConfirmed true) for fursuit-full in data/site.config.json and update pricing.html and services.html.
  - Server: validates and sanitizes independently, ignores unknown fields, escapes HTML, rejects header injection, honeypot (quiet success, nothing sent), same-site check, JSON only, size limit, per-address rate limit (best effort), idempotency keys so a retry cannot send twice, generic errors to the browser. If the owner email fails, the user sees an error (never a false success). If only the confirmation email fails, the user is told the application was received but the confirmation could not be sent.
  - Emails: owner notification lists every field plus date/time (UTC) with Reply-To = applicant email. Applicant confirmation names the service, makes no response-time promise, lists Discord/TikTok/Telegram, and has Reply-To = owner email. Threading in Gmail is not guaranteed.
  - Env vars (Vercel only): RESEND_API_KEY (required), COMMISSION_FROM_EMAIL (required, must be on a verified Resend domain), COMMISSION_TO_EMAIL (optional, defaults to abdakeemkehinde@gmail.com).
  - Tests run: 17 API tests with a fake Resend (npm test) all pass. Browser tests (mock email dev server): no overflow, clipped inputs or small touch targets at 320, 360, 375, 390, 414, 768, 1024, 1280, 1440, 1920px; all 8 options present; all 8 Pricing buttons preselect correctly; client validation and focus; server 400, 500, network failure and slow response (single request, button disabled, "Sending…"); success state and focus; Reply-To verified; secret scan of src, dist, public, data found no keys. Only console errors were Google Fonts blocked by the sandbox and the deliberately simulated failures.
  - NOT tested: real delivery through Resend (no key available here) and the live Vercel deployment. First real test must be done after the env vars are set.
- Fixes this stage: "Open Discord/TikTok/Telegram" buttons on the contact aside were invisible (dark on navy); fixed.

- Stage 8 provider swap (Oct 8 2026, no custom domain): Resend removed because the client
  will not purchase a custom domain (Resend needs a verified sending domain). The form UI,
  validation, responsive behavior, accessibility and all 8 service options are unchanged;
  only the delivery layer changed to Web3Forms (browser posts to
  https://api.web3forms.com/submit; static-only Vercel deploy, no server code, no DNS).
  - Removed: api/commission.js, api/_lib/validate.js, api/_lib/email.js, .env.example,
    RESEND_API_KEY / COMMISSION_FROM_EMAIL variables and docs, the vercel.json functions
    block, the dev-server Resend mock, and the Resend API tests. No Resend npm package
    was ever installed (it used fetch), so nothing to uninstall.
  - Added: access_key hidden input (value from data/site.config.json forms.accessKey,
    currently the WEB3FORMS_ACCESS_KEY placeholder), botcheck honeypot (was
    companyWebsite), subject/from_name fields, Reply-To via the applicant `email` field
    (free Web3Forms behavior). Success is only shown on a real {success:true} response and
    never promises a confirmation email (autoresponder is a paid Web3Forms feature).
  - Client-confirmed content applied at the same time: Full Suit $7,000+ provisional
    starting price (one place: data/site.config.json) with the 5 confirmed features
    (head, handpaws, feetpaws, full zippered bodysuit, tail); Partial Suit no longer
    claims a full bodysuit; Fursona / VRChat / VTuber stay "Request a Quote"; VRChat
    section links https://www.tiktok.com/@kehindestudio__1; gallery gains a Furry filter
    (0 items until the client supplies media; WIP now has 12 photos, video still parked).
  - Recipient: abdakeemkehinde@gmail.com (the Web3Forms account/key must belong to this
    address; abdakeemk@gmail.com is NOT used). No file-upload input added: attachments
    are a paid Web3Forms feature, so reference links stay the primary method on free.

- Stage 10 (Oct 9 2026): audit completed, 2 fixes shipped.
  - Measured: dist 11.7 MB total, but initial page loads stay light — the heavy
    files (2.6 MB video, 100–235 KB full-size viewer images) only download on
    demand; gallery thumbs lazy-load; HTML pages 8–32 KB.
  - Contrast: all 12 text/background pairs pass WCAG AA (lowest: gold-ink on
    ivory 4.53). Labels/names: every field, button and link has an accessible
    name (gallery tile buttons named by their photo alt). One h1 per page,
    no missing alt, empty alts only where legitimate (lightbox JS placeholder,
    aria-hidden hero slides).
  - Fix 1 (SEO): share image added — public/og-image.jpg (1200x630, 77 KB:
    portfolio photo + gold FLORAL VOID + tagline on navy). og:image on all
    pages, twitter card upgraded to summary_large_image.
  - Fix 2 (performance): Google Fonts removed — 5 latin woff2 files (~98 KB)
    self-hosted in public/fonts/ with display=swap. Zero third-party requests
    site-wide now.
  - Left for owner after deploy: Search Console submission. No ranking
    guarantees, per workflow rules.

## 13. Next recommended action
Owner reviews the Terms page, then approves Stage 9. Next: gallery WIP/Furry details
when the client supplies media (Stage 5 follow-up), then Stage 10 (Performance / SEO /
accessibility audit).

- Stage 9 (Oct 9 2026): Terms page built from the ORIGINAL term.html recovered from the
  repo's first commit (68b6f2c) — all 7 sections preserved in meaning and wording
  (typos fixed; literal `*asterisks*` from unrendered markdown now render as
  emphasis/strong; no clause added, removed or softened). Native `<details>`
  accordions (no JS, keyboard accessible, section 1 open by default), numbered badges,
  closing "Ask before you commission" band linking to /contact. Tested via build +
  npm test 11/11; visual check at all widths still needed on user approval.
- Terms age-clause change (Oct 9 2026, user-requested): first removed the under-18
  parental-consent sentence, then removed the 18+ requirement entirely from
  section 1. The page now has NO age condition — anyone of any age may commission.
  This differs from the original site; confirm with the client. User confirmed
  Oct 9 2026 ("yes") — no age limit stands.
