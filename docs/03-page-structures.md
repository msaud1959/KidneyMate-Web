# 03. Page-by-Page Structure

Section-level blueprint for every page. Each section names the CMS block type that powers it (defined in `06-statamic-cms-architecture.md`), so this document doubles as the content-entry plan. Full copy for every section lives in `docs/07-copy/`.

Reading key: **[block_type]** is the page-builder set the section uses.

---

## Home `/`

1. **Hero** [hero]: eyebrow, headline on the "days between appointments" idea, subline, primary CTA (waitlist), secondary CTA (how it works). Stylised app home screen floating in a device frame over a soft gradient field. Small honesty line: in development, built on peer-reviewed research.
2. **Trust strip** [logo_trust_strip]: four short proof points (peer-reviewed framework, shaped with ~50 patients and clinicians, clinicians stay in charge, privacy by design). No logos at this stage; text marks with small icons.
3. **Audience router** [audience_router]: three quiet cards: I live with kidney disease / I care for someone who does / I am a clinician or researcher. Each links to its page. This is how one site serves three audiences without shouting.
4. **The daily reality** [split_content + stat_band]: empathetic problem framing with three stats (2.7M Australian adults, 788M worldwide, adherence struggle range). Link to The Problem.
5. **What KidneyMate does** [pillar_trio]: Track / Understand / Connect, one paragraph each, small stylised UI vignette per pillar.
6. **How it works, briefly** [layered_framework]: the three layers as three steps in human words: you record your day, KidneyMate organises it, your care team reviews what matters. Link to How It Works.
7. **Feature snapshot** [feature_grid]: six tracker tiles (fluid, food, medications, symptoms, sleep and mood, appointments and dialysis). Link to Features.
8. **For clinicians teaser** [split_content]: the visibility gap from the clinician side, stylised trend-view visual. Link to For Clinicians.
9. **Grounded in research** [evidence_teaser]: the HIKM 2026 framework paper, one-line summary, validation roadmap note. Link to Research.
10. **Voices** [testimonial_carousel]: two or three anonymised sentiments from the FORGE validation (labelled as such: "heard during our validation interviews"). Optional at launch; hide if consent is not settled.
11. **Trust teaser** [icon_points]: four short promises (your data is yours, explainable by design, humans review, APP-aligned privacy). Link to Privacy & Trust.
12. **Waitlist banner** [cta_banner]: warm close, role mention, single button.

---

## The Problem `/the-problem`

1. **Interior hero** [hero]: headline naming the invisible daily work of CKD.
2. **A silent condition** [rich_prose]: gradual decline, few early symptoms, late recognition.
3. **The daily burden** [burden_list]: fluid limits, renal diet complexity, medication schedules, symptoms (with haemodialysis symptom prevalence figures), appointments, sleep and mood. Written with lived texture.
4. **The work nobody sees** [pull_quote + rich_prose]: self-management as time-consuming, invasive, exhausting (literature-grounded); scattered notebooks, apps and memory.
5. **The visibility gap** [split_content]: what clinicians actually see (consultations plus periodic labs) versus what happens in between; patterns missed.
6. **The cost of the gap** [stat_band + rich_prose]: rising global burden and mortality; missed early signals; pressure on services. Measured, not alarmist.
7. **Why now** [icon_points]: growing prevalence, evidence that supported self-management helps, maturing patient-generated health data practice, workforce pressure.
8. **Bridge** [cta_banner]: "The gap is the problem. Here is how we close it." → Our Solution.

---

## Our Solution `/our-solution`

1. **Interior hero** [hero]: the idea in one sentence: turn scattered self-management into one supported routine, and turn that routine into information care teams can act on.
2. **Three layers, plainly** [layered_framework]: data in, sense made, people decide. Diagram matching the paper's architecture, redrawn in brand style.
3. **Built on published research** [evidence_teaser]: framework paper reference, one paragraph.
4. **What it is / what it is not** [comparison_table]: decision support not diagnosis; a companion not a doctor; a window not surveillance; explainable rules not a black box.
5. **Not another generic tracker** [icon_points]: CKD-specific, longitudinal, clinician-connected, focused ecosystem.
6. **Where AI fits** [rich_prose]: rules first and why (transparency, safety, early-stage data reality); conversational guidance and richer AI on the roadmap, always bounded, always reviewed.
7. **Bridge** [cta_banner]: → How It Works.

---

## Features `/features`

1. **Interior hero** [hero]: everything KidneyMate does, honestly labelled.
2. **Status legend** [status_legend]: In prototype / In development / Planned. One sentence on why we label honestly.
3. **Track** [feature_grid, category=track]: fluid intake, food and diet, medications, symptoms, sleep, mood and emotions, physical activity, appointments, dialysis sessions, personalised reminders.
4. **Understand** [feature_grid, category=understand]: trends dashboard, personal baseline, plain-language insights, gentle non-alarming feedback, every alert explains itself.
5. **Connect** [feature_grid, category=connect]: appointment-ready summaries, clinician review flags, clinician-set targets, clinician dashboard (in development), health app integration (planned), conversational guidance (planned).
6. **Feature detail spotlights** [split_content x3]: fluid tracking against a personal target; the insight card that shows its working; the appointment summary export. One stylised screen each.
7. **Audience fork** [audience_router]: For Patients / For Clinicians.
8. **Waitlist banner** [cta_banner].

---

## How It Works `/how-it-works`

1. **Interior hero** [hero]: no black boxes; how your records become supported care.
2. **Layer one: your day, recorded** [split_content]: what patients log, how little time it takes, guideline-informed personal context (CKD stage, targets set with your care team).
3. **Layer two: sense made** [split_content]: rule-based reasoning, trends against your own baseline, anomaly flags; worked example (missed medication rule) shown as a visual rule card.
4. **Layer three: people review** [split_content]: clinician dashboard, review, contextualise, decide; feedback loop updates your personal targets and rules.
5. **A day with KidneyMate** [day_timeline]: 7:15 am medications, 9:40 am fluid log, 1:00 pm lunch photo and potassium note, 4:30 pm insight card, 8:50 pm mood and sleep. Humanises the system.
6. **Explainability promise** [pull_quote + rich_prose]: every insight can show its working; sample patient-facing insight in the product's plain, non-alarming voice.
7. **Safety boundaries** [disclaimer_note]: not for emergencies (000), not medical advice, clinicians make clinical decisions.
8. **Bridge** [cta_banner]: → Features, plus waitlist.

---

## For Patients `/for-patients`

1. **Interior hero** [hero]: written straight to the reader; warm, second person.
2. **Is KidneyMate for you** [icon_points]: early-stage CKD, later stages, dialysis, carers and family.
3. **What your day could feel like** [before_after or split_content x2]: two short vignettes: the scattered day and the supported day.
4. **Designed for real life** [icon_points]: minimal typing, large text, gentle reminders, no guilt when you miss a day, works for one tracker or all of them.
5. **You are in control** [icon_points]: choose what to share, export your records, delete your data, free core app.
6. **For carers** [rich_prose]: caring for the carer; how KidneyMate helps family stay usefully involved without hovering.
7. **FAQ selection** [faq_accordion, audience=patients].
8. **Waitlist banner** [cta_banner]: beta interest framing.

---

## For Clinicians `/for-clinicians`

1. **Interior hero** [hero]: professional register; the between-appointments blind spot.
2. **The problem in your clinic** [rich_prose + stat_band]: recall-based histories, episodic labs, adherence uncertainty.
3. **What KidneyMate gives you** [feature_grid, clinician set]: structured longitudinal summaries, trends against patient baseline, review flags with context, appointment-ready reports, patient-specific targets and rules you define.
4. **Designed around your workflow** [icon_points]: you set the rules, review queue not alert spam, no autonomous advice to patients, audit trail, minutes not hours.
5. **Evidence and governance** [evidence_teaser + icon_points]: framework paper, validation plan, privacy and security posture, human accountability.
6. **Roadmap honesty** [status_legend + rich_prose]: dashboard in development, EHR and My Health Record integration planned, all clinical claims subject to validation research.
7. **What a pilot looks like** [numbered_steps]: expression of interest, scoping conversation, governance and ethics, small cohort pilot, co-designed evaluation.
8. **FAQ selection** [faq_accordion, audience=clinicians].
9. **Pilot CTA banner** [cta_banner]: register pilot interest.

---

## Impact `/impact`

1. **Interior hero** [hero]: what changes when the gap closes; explicitly framed as potential, staged, and honest.
2. **For patients** [split_content]: confidence, routine, self-efficacy; literature signal (supported self-management studies) attributed to the literature.
3. **For clinicians** [split_content]: earlier signals, richer consultations, less guesswork between visits.
4. **For the health system** [split_content]: the scale of CKD in Australia, the cost logic of earlier attention versus late deterioration, stated carefully without invented figures.
5. **For research** [split_content]: structured, consented, longitudinal patient-generated data as a future research asset.
6. **The staged pathway** [timeline]: capstone 2025, framework paper and prototype 2026, MVP and pilot readiness 2026, clinical validation research 2027, dashboard integration 2027 to 2028.
7. **Bridge** [cta_banner]: → Research & Evidence.

---

## Research & Evidence `/research`

1. **Interior hero** [hero]: research first is the point, not a delay.
2. **Our framework paper** [paper_feature]: title, venue (HIKM 2026), plain-language abstract, what the three layers are, link or download.
3. **What the wider evidence says** [evidence_list]: curated entries from the paper's own references: global burden (GBD), KDIGO guidance, symptom burden studies, self-management burden studies, digital intervention trials, electronic symptom monitoring feasibility, decision-support requirements. Each with a "what this means for KidneyMate" line.
4. **Our validation plan** [numbered_steps]: expert review, prototype refinement, pilot implementation, evaluation criteria (usability, interpretability, clinical relevance, transparency, workflow integration, stakeholder acceptance).
5. **What we heard in early validation** [testimonial_carousel or icon_points]: themes from ~50 stakeholder conversations: patients want simpler daily management, clinicians want clearer regular data, clinics care about trust, privacy and workflow fit.
6. **Work with us** [cta_banner]: researchers and clinicians invitation → /join with research interest.

---

## Privacy & Trust `/privacy-and-trust`

1. **Interior hero** [hero]: your health story belongs to you.
2. **Our promises** [icon_points]: you choose what is shared and with whom; export and deletion rights; no selling data, no advertising use; collection limited to what the product needs.
3. **Privacy by design** [rich_prose]: Australian Privacy Principles alignment, encryption in transit and at rest, Australian hosting intent, de-identification for research uses with explicit consent.
4. **Humans stay accountable** [split_content]: the clinician review layer as a trust feature; no autonomous clinical decisions.
5. **Explainable by design** [split_content]: rules you can inspect; insights that show their reasons; example insight card.
6. **Careful AI** [rich_prose]: why rules first; how AI features will be introduced (bounded scope, tested, never diagnosing, human review preserved); acknowledges the risk the paper itself names about careless AI integration in health data.
7. **Governance** [icon_points]: consent management, audit trails, security testing, incident response, data governance roadmap for pilots.
8. **FAQ selection** [faq_accordion, audience=privacy].
9. **Disclaimer note** [disclaimer_note] and link to the formal Privacy Policy.
10. **Bridge** [cta_banner]: questions welcome → /join contact.

---

## About KidneyMate `/about`

1. **Interior hero** [hero]: why we are building this.
2. **The origin** [rich_prose]: started as university research into patient-generated health data in regional Victoria; became a peer-reviewed framework; refined through a pre-accelerator program; now a working prototype. Told as a story, no individual names.
3. **Who we are** [rich_prose]: a small multidisciplinary team: health informatics research, software engineering, clinical and analytics advice. Team profile grid exists in CMS, switched off until consents are in place.
4. **Why "Mate"** [pull_quote + rich_prose]: the name is a promise: the friend who shows up every day, not the expert who visits twice a year.
5. **What we believe** [icon_points]: steady beats flashy; honesty about stage; the patient owns the story; clinicians stay in charge; evidence before claims.
6. **Where we are and where we are going** [timeline]: same roadmap component as Impact.
7. **Waitlist banner** [cta_banner].

---

## FAQ `/faq`

1. **Interior hero** [hero]: short.
2. **Grouped accordions** [faq_accordion x5]: About KidneyMate, For Patients and Carers, For Clinicians, Privacy and Data, Research and Pilots.
3. **Still curious** [cta_banner]: → /join contact.

---

## Join the Waitlist / Contact `/join`

1. **Conversion hero** [hero]: be part of it from the start; sets expectations (early access order, occasional honest updates, no spam).
2. **Role cards** [audience_router]: patient or carer / clinician or health service / researcher or partner; each sets the form's role field.
3. **Waitlist form** [form_section, form=waitlist]: first name, email, role, state or territory (plus outside Australia), interests (beta testing, clinician pilot, research collaboration, updates only), optional message, privacy consent checkbox.
4. **What happens next** [numbered_steps]: confirmation email, updates as milestones land, early invitations in signup order, pilot conversations for clinicians.
5. **Direct contact** [rich_prose]: general, media and partnership email address; response-time expectation.
6. **FAQ micro-selection** [faq_accordion, 3 entries]: is it available yet, what does it cost, who sees my details.

---

## Legal pages `/privacy-policy`, `/terms`

Single-column prose pages [rich_prose] with a "last updated" field. Draft copy is not included in this pack: both require legal drafting and review before launch. The CMS treats them as simple pages so counsel-approved text can be pasted in without touching templates.

## 404

Warm one-liner, search-free simplicity: a short apology, links to Home, Features, FAQ and Join. Copy in `07-copy/00-global-microcopy.md`.
