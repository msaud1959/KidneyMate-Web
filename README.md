# KidneyMate Website

Strategy, structure, copy and CMS architecture for the KidneyMate marketing website.

KidneyMate is a digital health platform in development that supports people living with chronic kidney disease (CKD) through daily self-management: fluid and food tracking, medication reminders, symptom logging, sleep and mood tracking, and clinician-supported insights. It is grounded in a peer-reviewed conceptual framework (HIKM 2026) built on three layers: patient-generated health data, transparent rule-based analysis, and clinician review.

This repository currently contains the complete website plan. The Statamic build follows in a second phase once the plan is approved.

## Documents

| # | Document | Purpose |
|---|----------|---------|
| 01 | [Positioning strategy](docs/01-positioning-strategy.md) | Who the site speaks to, what it must prove, and the narrative spine |
| 02 | [Sitemap](docs/02-sitemap.md) | Pages, URLs, navigation and footer structure |
| 03 | [Page-by-page structure](docs/03-page-structures.md) | Section-level wireframe of every page |
| 04 | [UX/UI design direction](docs/04-ux-ui-design-direction.md) | Visual language: colour, type, glass system, motion, accessibility |
| 05 | [Brand voice and messaging](docs/05-brand-voice-and-messaging.md) | Tone rules, vocabulary, messaging pillars, claim guardrails |
| 06 | [Statamic CMS architecture](docs/06-statamic-cms-architecture.md) | Collections, blueprints, fieldsets, globals, taxonomies, forms |
| 07 | [Website copy](docs/07-copy/) | Full draft copy for every page, mapped to CMS blocks |
| 08 | [CTA library](docs/08-cta-library.md) | Primary and secondary calls to action, per page and per audience |
| 09 | [SEO titles and metadata](docs/09-seo-metadata.md) | Page titles, meta descriptions, keywords, schema notes |
| 10 | [Implementation notes](docs/10-implementation-notes.md) | Developer-ready build notes for the Statamic phase |

## Source material

- `CKD_HIKM2026.pdf` on the `Research` branch: the conceptual framework paper. The three-layer model in that paper is the intellectual spine of the whole site.
- `FORGE-KidneyMate-PitchDeck.pdf` on the `Research` branch: brand starting points, problem framing, validation summary, roadmap.

## Ground rules baked into every document

- Honest about stage: KidneyMate is a prototype in development. The site invites people to a waitlist and clinicians to pilot conversations. It never claims the product is live or clinically proven.
- Decision support, not decisions: clinicians review and decide. The copy never positions KidneyMate as a diagnostic or autonomous tool.
- Australian first, globally relevant: Australian statistics, Australian Privacy Principles, Australian English, with worldwide context where it strengthens the story.
- No pricing on the site at this stage.
- No individual names on the site. Profile blocks exist in the CMS for later, switched off by default.
