# 06. Statamic CMS Architecture

Target: Statamic 5 (Laravel 12, PHP 8.3+), flat-file content committed to Git, Antlers templates, Tailwind CSS. The architecture below gives editors full control of every section shown in `03-page-structures.md` without ever touching a template, and leaves clean room to grow (updates blog, team page, evidence detail pages, translations).

## 1. Collections

### `pages`
The core collection. Structured (tree) so the sitemap is drag-and-drop, routed at `/{parent_uri}/{slug}`.

- Blueprint: `page`
  - `title` (text)
  - `page_builder` (Replicator with the sets in section 4; this is the whole body of every page)
  - `hide_default_cta` (toggle: suppress the global waitlist banner if the page builds its own close)
  - `seo` (imported fieldset, section 6)

All thirteen content pages plus the two legal pages are entries here. Legal pages simply use a single `rich_prose` set.

### `features`
One entry per product capability, so Features, Home and the clinician page all render from the same source of truth.

- Blueprint: `feature`
  - `title` (text)
  - `one_liner` (text, max 120 chars)
  - `description` (bard, light)
  - `icon` (select from icon set)
  - `tracker_tint` (select: fluid, food, medications, symptoms, sleep_mood, appointments, neutral)
  - `status` (select: `prototype` In prototype / `development` In development / `planned` Planned)
  - `audience` (select multiple: patients, clinicians)
  - `categories` (taxonomy: `feature_categories`)
  - `screen` (entry link to `screens`, optional)
  - `order` (handled by collection ordering)

### `faqs`
- Blueprint: `faq`
  - `title` (the question)
  - `answer` (bard)
  - `audiences` (taxonomy: `faq_audiences`: general, patients, clinicians, privacy, research)
  - `featured` (toggle: eligible for contextual selections on other pages)

### `evidence`
The research and evidence library.

- Blueprint: `evidence_entry`
  - `title` (text)
  - `entry_type` (taxonomy: `evidence_types`: peer_reviewed, guideline, report, dataset, our_research)
  - `authors_label` (text, e.g. "Flythe et al.")
  - `year` (integer)
  - `source_name` (text, journal or body)
  - `link` (url, optional) and `doi` (text, optional)
  - `plain_summary` (textarea: one to two sentences, plain language)
  - `relevance` (textarea: "what this means for KidneyMate")
  - `is_own_paper` (toggle: renders the featured paper block)
  - `paper_file` (asset, optional PDF)
  - `featured` (toggle)

### `testimonials`
Anonymised voices from validation work. Consent is modelled explicitly because this is health-adjacent content.

- Blueprint: `testimonial`
  - `quote` (textarea)
  - `attribution_role` (text, e.g. "Person living with CKD, regional Victoria" or "Practice nurse")
  - `context_label` (select: validation_interviews, pilot, other; rendered as "heard during our validation interviews")
  - `consent_confirmed` (toggle, must be on to publish; validation rule)
  - `audiences` (select multiple)

### `team`
Built now, published never (until consents exist). The About page checks a global toggle before rendering the grid.

- Blueprint: `profile`
  - `name`, `role_title`, `credentials` (texts)
  - `bio` (bard, light), `photo` (asset)
  - `profile_type` (select: team, advisor)
  - `consent_confirmed` (toggle)
  - Entries default to draft.

### `milestones`
The roadmap, rendered by the `timeline` set on Impact and About.

- Blueprint: `milestone`
  - `title` (text), `period_label` (text, e.g. "2026"), `description` (textarea)
  - `status` (select: complete, current, planned)

### `updates` (scaffolded, unpublished)
Dated collection for future progress notes: `title`, `hero_image`, `content` (bard), `seo`. Route `/updates/{slug}`. Nav link added only when the first entry publishes.

### `screens`
Internal library of the stylised app-screen components, so editors can pick which screen a section shows.

- Blueprint: `screen`
  - `title` (text)
  - `partial_handle` (select mapped to front-end components: dashboard, fluid, medication, insight, mood_sleep, clinician_trends)
  - `frame` (select: phone, browser)
  - `caption` (text, used for accessible description)

## 2. Taxonomies

- `feature_categories`: Track, Understand, Connect
- `faq_audiences`: General, Patients, Clinicians, Privacy, Research
- `evidence_types`: Peer-reviewed study, Clinical guideline, Report, Dataset, Our research

## 3. Globals

- `site_identity`: site name, tagline, logo (SVG), favicon, contact email, social links (repeater), ABN
- `waitlist_cta`: the default site-wide CTA banner: heading, text, button label, button target. Pages inherit it unless `hide_default_cta` is on or a page places its own `cta_banner` set
- `trust_disclaimers`: medical disclaimer text, emergency line, screens-are-illustrative note, Acknowledgement of Country
- `announcement`: toggle, message, link (for milestones: "Our framework paper is out", "Pilot registrations open")
- `feature_flags`: show_team_grid (toggle), show_testimonials (toggle), show_updates_nav (toggle)

## 4. Page builder sets (the reusable blocks)

One Replicator field, `page_builder`, with these sets. Names match `03-page-structures.md`. Every set includes an optional `section_id` (text, for anchor links) and `background` (select: field, gradient, solid, deep) so editors control rhythm.

| Set | Fields | Notes |
|-----|--------|-------|
| `hero` | eyebrow, heading, subheading (bard light), primary_cta (label + link), secondary_cta, media_type (none / screen / image), screen (entry link), image, honesty_line (text), variant (home / interior / conversion) | Every page's opening |
| `rich_prose` | content (bard, full) | Long-form storytelling prose |
| `split_content` | heading, content (bard), media_type (screen / image / diagram), screen, image, reverse (toggle), tint (tracker tint select) | The workhorse two-column block |
| `stat_band` | intro (text, optional), stats (repeater: value, label, source_label, source_url), style (quiet / deep) | Fraunces numerals moment |
| `pillar_trio` | heading, pillars (repeater x3: title, text, icon, screen optional, link) | Track / Understand / Connect |
| `layered_framework` | heading, intro, layers (repeater x3: label, title, text), footnote | The three-layer signature diagram; front end supplies the visual |
| `feature_grid` | heading, intro, mode (by_category / manual), category (taxonomy term), features (entries, when manual), show_status (toggle), columns (2/3) | Renders from `features` collection |
| `day_timeline` | heading, intro, moments (repeater: time_label, title, text, tracker_tint, screen optional) | A day with KidneyMate |
| `audience_router` | heading (optional), cards (repeater: title, text, link, icon) | The three-door pattern |
| `icon_points` | heading, intro, points (repeater: icon, title, text), columns (2/3/4) | Promise lists, principle lists |
| `numbered_steps` | heading, intro, steps (repeater: title, text) | Pilot process, validation plan, what happens next |
| `comparison_table` | heading, rows (repeater: left_label, right_label), left_heading, right_heading | What it is / is not |
| `pull_quote` | quote (textarea), attribution (text, optional) | Editorial pauses |
| `testimonial_carousel` | heading, mode (auto by audience / manual), testimonials (entries) | Respects consent + feature flag |
| `evidence_teaser` | heading, entries (entries from `evidence`, max 3), link_label | Research promos on other pages |
| `evidence_list` | heading, intro, filter (evidence_types terms, optional) | The full library on /research |
| `paper_feature` | entry (the `is_own_paper` evidence entry), status_line (text, e.g. "Currently under peer review"), plain_abstract (bard), download_label (shown only when `paper_file` exists) | The framework block; the download and any venue name appear only once publication is confirmed |
| `faq_accordion` | heading, mode (by audience / manual), audience (term), faqs (entries), limit | Contextual FAQ selections |
| `timeline` | heading, mode (all milestones / manual), milestones (entries) | Roadmap |
| `cta_banner` | use_global (toggle, default on), heading, text, button_label, button_link, secondary_link | Waitlist closes |
| `form_section` | heading, intro, form (form select), success_heading, success_text | Waitlist and contact |
| `media_showcase` | heading, items (repeater: screen or image, caption), layout (row / stagger) | Screen galleries |
| `logo_trust_strip` | items (repeater: icon or logo, text) | Proof points strip |
| `status_legend` | intro (text) | Renders the three status tags with definitions |
| `disclaimer_note` | style (info / safety), content (bard light) | Safety boundaries, illustrative-screens notes |
| `before_after` | heading, before (title + text), after (title + text) | The two vignettes on For Patients |
| `burden_list` | heading, intro, items (repeater: title, text, tracker_tint) | The Problem's daily burden section |

Twenty-six sets. Each renders as one Antlers partial (`resources/views/partials/sets/_{set}.antlers.html`), so the mapping from CMS to code is one-to-one and future sets are additive.

## 5. Forms

### `waitlist`
- `first_name` (text, required)
- `email` (email, required, validated)
- `role` (select, required: Person living with kidney disease / Carer or family member / Clinician or health service / Researcher / Other)
- `state` (select: ACT, NSW, NT, QLD, SA, TAS, VIC, WA, Outside Australia)
- `interests` (checkboxes: Early access to the patient app, Clinician dashboard pilot, Research collaboration, Just keep me updated)
- `message` (textarea, optional)
- `privacy_consent` (checkbox, required: "I agree to KidneyMate storing these details to contact me about KidneyMate, as described in the Privacy Policy.")
- Honeypot field enabled; store submissions plus email notification to `site_identity.contact_email`; CSV export available in the control panel.

### `contact`
- `name`, `email` (required), `organisation` (optional), `topic` (select: General, Media, Partnership, Investment, Something else), `message` (required), `privacy_consent` (required checkbox), honeypot.

## 6. SEO fieldset (`seo`, imported into every blueprint)

- `seo_title` (text, 60-char counter; falls back to `{title} | KidneyMate`)
- `seo_description` (textarea, 155-char counter)
- `og_image` (asset; falls back to global default card)
- `canonical_url` (url, optional)
- `noindex` (toggle)
- `schema_type` (select: WebPage, AboutPage, FAQPage, ContactPage, MedicalWebPage)

Rendered by a single `_seo.antlers.html` partial (or the SEO Pro addon if preferred later; the fieldset keeps content portable either way).

## 7. Navigation structures

- `main_nav`: two group nodes (Why KidneyMate, Product) with page branches, plus Research, Trust, About. Each node gets an optional `description` field for the dropdown sheets.
- `footer_product`, `footer_why`, `footer_company`, `footer_legal`: flat nav structures matching the sitemap.
- CTA button is hard-placed in the header template, target editable via `waitlist_cta` global.

## 8. Assets

- Container `content`: editor-uploaded images and the paper PDF. Glide presets: `hero` (1600w), `card` (800w), `og` (1200x630), WebP/AVIF variants, quality 80.
- Container `brand`: logo variants, favicons, OG default card. Locked folder structure.

## 9. Users and roles

- `admin`: everything.
- `editor`: create and edit entries in all content collections, edit globals except `feature_flags`, view form submissions, no blueprint or user management. This is the founder's day-to-day role once the site is live.

## 10. Content workflow

- Flat-file entries committed to Git (Statamic's native storage): every copy change is versioned, reviewable and revertible.
- Working pattern: edit in the control panel locally or on staging, commit, deploy. If editing must happen in production later, enable the Git automation in `config/statamic/git.php` to auto-commit control-panel changes.
- The two PDFs stay on the `Research` branch as source material; the public paper PDF, if published, is uploaded to the `content` asset container deliberately.
