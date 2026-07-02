# 09. SEO Titles and Meta Descriptions

Titles at or under 60 characters, descriptions at or under 155. Australian English. Every page's fields are editable in the CMS (`seo` fieldset); these are the launch values.

## Keyword landscape

**Primary cluster:** chronic kidney disease app, CKD self-management, kidney disease tracking app, CKD app Australia, kidney health app
**Patient long-tail:** fluid intake tracker kidney disease, CKD symptom tracker, renal diet tracking app, dialysis diary app, kidney medication reminder app
**Clinician cluster:** patient-generated health data CKD, remote CKD monitoring, CKD decision support, patient-reported outcomes kidney disease
**Strategy notes:** the durable organic opportunity is the patient long-tail plus the research page's academic gravity (the paper attracts citation-driven links, the strongest domain signal a small site can earn). Do not chase "kidney disease" head terms: they belong to Kidney Health Australia and government health pages, correctly.

## Page metadata

### Home /
- **Title:** KidneyMate | Daily support for life with kidney disease
- **Description:** KidneyMate brings the daily work of chronic kidney disease into one calm place: fluids, food, medications, symptoms and mood, with insights your care team can use.
- **Schema:** WebSite + Organization (MedicalOrganization deliberately avoided at this stage)

### The Problem /the-problem
- **Title:** Living with CKD is daily work | KidneyMate
- **Description:** 2.7 million Australians have biomedical signs of kidney disease. The hardest part happens between appointments, where no one can see. The problem we're solving.
- **Schema:** WebPage

### Our Solution /our-solution
- **Title:** One supported routine for CKD | KidneyMate
- **Description:** KidneyMate turns scattered CKD self-management into one routine, and turns your records into insights and summaries clinicians review. Grounded in research.
- **Schema:** WebPage

### Features /features
- **Title:** KidneyMate features | Track, understand, connect
- **Description:** Fluid, food, medications, symptoms, sleep and mood tracking for CKD, plain-language insights, and clinician-ready summaries. Every feature honestly labelled by status.
- **Schema:** WebPage

### How It Works /how-it-works
- **Title:** How KidneyMate works | Three layers, no black boxes
- **Description:** You record your day. Transparent rules find what's changing. Your care team reviews what matters. How KidneyMate supports CKD self-management, step by step.
- **Schema:** WebPage

### For Patients /for-patients
- **Title:** KidneyMate for patients and carers
- **Description:** Built for real life with kidney disease: quick entries, gentle reminders, no guilt, and your records organised for every appointment you walk into.
- **Schema:** WebPage

### For Clinicians /for-clinicians
- **Title:** KidneyMate for clinicians | See between appointments
- **Description:** Structured, longitudinal patient-reported data for CKD care: trends against each patient's baseline, review flags with reasoning, and pilot programs now open.
- **Schema:** MedicalWebPage (audience: clinicians)

### Impact /impact
- **Title:** The impact of closing CKD's visibility gap | KidneyMate
- **Description:** What changes for patients, clinicians, the health system and research when daily CKD self-management becomes visible. The case, stated carefully.
- **Schema:** WebPage

### Research & Evidence /research
- **Title:** Research and evidence behind KidneyMate
- **Description:** Our CKD self-management framework, now under peer review, the wider evidence it stands on, and the clinical validation plan we're accountable to.
- **Schema:** WebPage (add ScholarlyArticle markup only once the paper is published)

### Privacy & Trust /privacy-and-trust
- **Title:** Privacy and trust at KidneyMate
- **Description:** Your data is yours: opt-in sharing, export and deletion rights, no selling, no ads. Privacy by design under the Australian Privacy Principles, explained plainly.
- **Schema:** WebPage

### About /about
- **Title:** About KidneyMate | Built slowly, on purpose
- **Description:** KidneyMate grew from university research in regional Victoria into a research framework and working prototype. Our story, principles and roadmap.
- **Schema:** AboutPage

### FAQ /faq
- **Title:** KidneyMate FAQ | Honest answers
- **Description:** Is KidneyMate available? What does it cost? Who sees my data? Does it give medical advice? Straight answers for patients, carers, clinicians and partners.
- **Schema:** FAQPage (with Question/Answer markup from the faqs collection)

### Join / Contact /join
- **Title:** Join the KidneyMate waitlist
- **Description:** Get early access to KidneyMate and honest updates as milestones land. Patients, carers, clinicians and researchers welcome. Takes a minute, leave anytime.
- **Schema:** ContactPage

### Legal pages
- /privacy-policy: **Title:** Privacy Policy | KidneyMate. Noindex until legally finalised.
- /terms: **Title:** Terms of Use | KidneyMate. Noindex until legally finalised.

## Technical SEO checklist (build phase)

- One h1 per page, matching the hero headline's meaning (not necessarily its exact words).
- Canonical URLs on every page; trailing-slash policy consistent.
- OG and Twitter card defaults from the brand asset container; per-page overrides via the seo fieldset. OG image template: calm gradient field, logo, one line of Fraunces.
- XML sitemap (Statamic addon or custom route) and robots.txt; noindex on legal drafts, thank-you states and any staging domain.
- Structured data emitted from a single `_seo.antlers.html` partial: Organization sitewide, FAQPage on /faq, ScholarlyArticle on /research.
- Performance is an SEO feature: budgets in `10-implementation-notes.md` (LCP under 2.0s on 4G) directly serve rankings.
- Descriptions above are within limits; keep the CMS character counters on so future edits stay within them.
