# 04. UX/UI Design Direction

The design has one job: make a clinically serious product feel like a warm, well-made object. The reference points are the modern glass-and-gradient health app aesthetic (the Bright app site the founder referenced, Apple's translucent material language) tempered by healthcare-grade accessibility, because a large share of the audience is over 55, fatigued, or reading on a phone in a dialysis chair.

The result should feel like: a calm morning kitchen, not a hospital corridor, and not a startup landing page either.

## 1. Design principles

1. **Calm is the brand.** Generous space, soft light, slow confident motion. Nothing blinks, nothing counts down, nothing shouts.
2. **Glass with a spine.** Translucent surfaces float over quiet gradient fields, but text always sits on enough solid backing to pass WCAG contrast. Beauty never taxes readability.
3. **Storytelling over listing.** Long-scroll narrative pages with alternating rhythm: prose section, visual proof, breathing room. Feature grids appear only after the story has earned them.
4. **Show the product working.** Stylised app screens appear throughout, always doing something specific (a fluid ring at 70% of a personal target, an insight card explaining itself), never as decorative blur.
5. **Warmth through craft, not decoration.** Warmth comes from editorial type, human copy, hand-tuned spacing and honest photography of light and hands and kitchens, not from cartoon mascots or stock doctors with clipboards.

## 2. Colour system

Derived from the pitch deck (cobalt blue, amber, the red logo accent, cool paper backgrounds) and softened for long reading.

### Core palette

| Token | Hex | Use |
|-------|-----|-----|
| `cobalt-700` | `#1B2F7A` | Deep headings on light, footer background base |
| `cobalt-500` | `#2A4CC0` | Primary brand, links, primary buttons, key icons |
| `cobalt-300` | `#7B93E8` | Charts, secondary accents, focus glows |
| `ink-900` | `#161D33` | Display headlines |
| `ink-600` | `#454F6B` | Body text |
| `ink-400` | `#6E7891` | Captions, metadata |
| `cloud-50` | `#F6F8FC` | Page background |
| `white` | `#FFFFFF` | Cards, solid surfaces |

### Warm and supporting accents

| Token | Hex | Use |
|-------|-----|-----|
| `amber-400` | `#E9A13B` | The warmth accent: highlights, small marks, hover states, "in development" tags. Used sparingly; it is the seasoning, not the meal |
| `clay-500` | `#D4494C` | Reserved: the logo's kidney accent only. Never used for errors so the mark never reads as a warning |
| `sage-500` | `#3E9C84` | Positive states, wellbeing accents, "available" tags |
| `error-600` | `#B3403B` | Form errors only |

### Tracker tints (from the deck's category pills, muted to glass tints)

Fluid `#EAF3FD` / `#3D7DC8` · Food `#EDF6EA` / `#4E8A3C` · Medications `#FDEEF0` / `#C64F62` · Symptoms `#E8F4F4` / `#31808A` · Sleep and mood `#F0EDFB` / `#6A5AC2` · Appointments `#FDF4E7` / `#C07E28`

Each tracker keeps its tint everywhere it appears (site tiles, stylised app screens, timeline moments), which builds quiet coherence between the marketing site and the product.

### Gradient fields

Backgrounds behind heroes and feature moments: very soft, barely-there radial blends of `#E9EEFF` → `#F4F0FF` → `#FDF7EF` (cool blue into lavender into warm cream). The warm cream corner is what keeps the glass aesthetic from feeling cold and corporate. Grain texture at 1 to 2% opacity stops banding and adds a made-by-hand feel.

## 3. Typography

Two families, both free for commercial use.

- **Display: Fraunces** (variable serif). Headlines, big statistics, pull quotes. Set tight (line-height 1.05 to 1.15), optical size high, slight negative tracking. Fraunces gives editorial warmth and instantly separates the site from the Inter-on-white template look.
- **Text and UI: Satoshi** (Fontshare). Body, navigation, buttons, forms, feature cards, app-screen mockups. Clean, humanist, quietly modern.

Scale (fluid via clamp):

| Role | Size (desktop → mobile) | Family |
|------|------------------------|--------|
| Display XL (home hero) | 76px → 40px | Fraunces 560wght |
| Display L (page heroes) | 56px → 34px | Fraunces |
| Heading M (sections) | 34px → 26px | Fraunces |
| Heading S (cards) | 22px → 19px | Satoshi Bold |
| Body | 19px → 17px, line-height 1.65 | Satoshi |
| Small / captions | 15px | Satoshi Medium |
| Stat numerals | 64 to 96px | Fraunces, tabular feel |

Body text never below 17px. Measure capped at 68ch. This audience rewards big, comfortable type.

## 4. The glass system

Three surface levels, used consistently:

1. **Field**: the page background (`cloud-50` or a gradient field). Never carries text directly except display headlines.
2. **Glass**: `rgba(255,255,255,0.62)` with `backdrop-filter: blur(22px) saturate(1.4)`, 1px inner border `rgba(255,255,255,0.65)`, radius 24px, shadow `0 20px 50px -24px rgba(27,47,122,0.18)`. Used for: nav bar, dropdown sheets, feature tiles, timeline cards, form container.
3. **Solid**: pure white cards, radius 20px, for anything text-dense (long prose cards, FAQ accordions, the comparison table) so reading is never on blur.

Rules:
- Text on glass must still measure 4.5:1 against the worst-case backdrop; where the backdrop is busy, the glass gains an extra solid white underlay at 85%.
- `@supports not (backdrop-filter)` fallback: solid `rgba(255,255,255,0.92)`.
- `prefers-reduced-transparency`: swap all glass to solid.
- Glass is for chrome and moments, not for everything: if the whole page is glass, nothing is.

## 5. Signature visual moments

These five set-pieces are what make the site memorable and unmistakably designed:

1. **The floating home screen** (Home hero): stylised app dashboard in a device frame, tilted 2 to 3 degrees, drifting on a 6s ease loop, soft long shadow. Behind it, the gradient field with a very slow parallax. Small glass chips float beside it (a fluid ring, a medication tick, an insight snippet) that settle into place on load.
2. **The three layers** (Our Solution, How It Works): the paper's framework as a vertical stack of three glass panes. On scroll, each pane lifts, comes into focus and annotates itself: Your day → Sense made → People decide. This is the research paper made visible, and no template has it.
3. **A day with KidneyMate** (How It Works): a horizontal (desktop) or vertical (mobile) timeline of five moments, each a small glass card in its tracker tint with a time, a micro-screen and one warm sentence.
4. **The insight card that shows its working** (Features, Trust): a stylised insight card that flips or expands to reveal the rule behind it in plain language. Explainability as an interaction, not a claim.
5. **The stat band** (Home, The Problem): full-width quiet band, Fraunces numerals at 96px, one-line sources beneath in `ink-400`. Numbers as typography, no infographic clutter.

## 6. Stylised app screens

Built as HTML/SVG components with brand tokens (see implementation notes), so they stay crisp, theme-consistent and editable. Six screens to produce:

1. **Home dashboard**: greeting ("Good evening, Sam"), streak chip, to-do strip, four tracker tiles (medication, fluid, sleep, mood) echoing the prototype's layout from the deck.
2. **Fluid tracker**: circular progress against a personal daily target, quick-add buttons (glass, cup, mug), gentle note "Set with your care team".
3. **Medication view**: today's schedule, taken ticks, one gentle missed-dose nudge.
4. **Insight card**: plain-language insight in the product voice with the "why am I seeing this" affordance.
5. **Mood and sleep check-in**: the two-minute evening flow.
6. **Clinician trend view** (browser frame, not phone): 90-day multi-domain trend chart, review flag with context, patient summary panel. Deliberately calmer and denser than the patient screens.

All screens use fictional, realistic data and a fictional patient name. No real patient data, ever, and a note in the footer of the Features page saying screens are illustrative of the product in development.

## 7. Motion

- Scroll reveals: 250 to 400ms, ease-out, 16 to 24px translate plus fade, staggered 60ms. Once per element, no re-triggering.
- The five signature moments may use scroll-linked progress (layers stack, timeline draws) but must degrade to static composition.
- Hover: glass cards lift 2px, shadow deepens, 150ms.
- `prefers-reduced-motion: reduce` disables all translation and parallax; opacity-only fades remain.
- No autoplaying video, no scroll-jacking, no cursor effects. Calm is the brand.

## 8. Iconography and illustration

- Icons: 1.75px stroke, rounded caps, 24px grid (Lucide as base, customised where needed), tinted per context.
- The kidney mark from the logo (rounded square, kidney line, clay dot) becomes a repeatable brand motif: section markers, bullet accents, the 404 page.
- Photography, used sparingly (About, For Patients): warm, natural light, real domestic contexts (a kitchen bench, a hand holding a phone, morning tea), Australian and age-diverse. Never stock clinicians pointing at clipboards, never blue-gloved hands.
- No 3D cartoon people (the deck's placeholder style is retired for the website).

## 9. Accessibility (healthcare-grade, non-negotiable)

- WCAG 2.2 AA minimum across the site; AAA contrast for body text where feasible.
- Body 17px+, targets 44px+, visible focus rings (2px `cobalt-500` offset 2px).
- Full keyboard navigation including dropdown sheets and accordions; skip link; semantic landmarks; one h1 per page.
- Forms: labels always visible, errors in text not colour alone, autocomplete attributes, no time limits.
- Motion, transparency and contrast media queries honoured (`prefers-reduced-motion`, `prefers-reduced-transparency`, `prefers-contrast`).
- Alt text authored in the CMS for every content image; decorative visuals marked as such.
- Language: plain-English target of roughly year 8 reading level on patient-facing pages.

## 10. Responsive behaviour

- Breakpoints: 380 / 640 / 900 / 1200 / 1440. Content max-width 1200px; prose max 68ch.
- Mobile-first: the story reads perfectly with zero glass and zero motion, then enhancement layers on.
- Nav collapses to the glass sheet at 900px. Device mockups scale down before they crop. The day-timeline rotates vertical under 900px. Stat bands stack.
- Test target devices include older, mid-range Android phones: the audience is not all on new iPhones.
