# 02. Sitemap

## Pages and URLs

| Page | URL | Primary audience | Role in the story |
|------|-----|------------------|-------------------|
| Home | `/` | Everyone | The whole story in miniature; routes each audience onward |
| The Problem | `/the-problem` | Everyone | Why CKD self-management matters; the visibility gap |
| Our Solution | `/our-solution` | Everyone | The framework in plain language; what KidneyMate is and is not |
| Features | `/features` | Patients, clinicians | Every capability, honestly labelled by status |
| How It Works | `/how-it-works` | Everyone | The three layers, a day with KidneyMate, explainability |
| For Patients | `/for-patients` | Patients, carers | Life with KidneyMate; accessibility; free tier; beta invite |
| For Clinicians | `/for-clinicians` | Clinicians, services | Visibility, workflow fit, governance, pilot interest |
| Impact | `/impact` | Stakeholders, clinicians | What changes for patients, clinicians, the system, research |
| Research & Evidence | `/research` | Clinicians, researchers, stakeholders | Our framework, the evidence base, the validation plan |
| Privacy & Trust | `/privacy-and-trust` | Everyone | Data ownership, oversight, explainability, careful AI |
| About KidneyMate | `/about` | Everyone | Origin story, values, roadmap, the team as a team |
| FAQ | `/faq` | Everyone | Grouped questions; also surfaced contextually on other pages |
| Join the Waitlist / Contact | `/join` | Everyone | The single conversion page: waitlist form plus contact |
| Privacy Policy | `/privacy-policy` | Legal | Formal policy (legal review required before launch) |
| Terms of Use | `/terms` | Legal | Formal terms (legal review required before launch) |
| 404 | `*` | Everyone | Warm, useful error page |

Thirteen content pages plus two legal pages. All URLs flat, lowercase, hyphenated, stable.

## Primary navigation

Desktop, left to right. Maximum six items plus the CTA button so the header stays calm.

```
[KidneyMate logo]   Why KidneyMate ˅   Product ˅   Research   Trust   About   [Join the waitlist]
```

- **Why KidneyMate** (dropdown): The Problem, Our Solution, Impact
- **Product** (dropdown): Features, How It Works, For Patients, For Clinicians
- **Research** → `/research`
- **Trust** → `/privacy-and-trust`
- **About** → `/about`
- **Join the waitlist** (button) → `/join`

Dropdown panels are glass sheets with a one-line description under each link, which quietly signals craft and helps first-time visitors choose.

Mobile: hamburger opens a full-screen glass sheet with the same grouping, CTA pinned at the bottom.

## Footer navigation

Four columns plus a trust band.

- **Product**: Features, How It Works, For Patients, For Clinicians
- **Why**: The Problem, Our Solution, Impact, Research & Evidence
- **Company**: About, FAQ, Privacy & Trust, Join the Waitlist, Contact
- **Legal**: Privacy Policy, Terms of Use

Trust band beneath the columns:
- Medical disclaimer (one sentence, editable global): KidneyMate supports self-management and does not provide medical advice, diagnosis or treatment. In an emergency call 000.
- Acknowledgement of Country (editable global).
- Copyright line and ABN placeholder.

## Cross-linking rules (the story keeps moving)

Every page ends with a "next step in the story" band, not a dead end:

- Home → all paths (audience router near the top, waitlist at the end)
- The Problem → Our Solution
- Our Solution → How It Works
- How It Works → Features
- Features → For Patients / For Clinicians (audience fork)
- For Patients → Join the Waitlist
- For Clinicians → Join the Waitlist (pilot interest)
- Impact → Research & Evidence
- Research & Evidence → Join the Waitlist (research collaboration)
- Privacy & Trust → FAQ → Join the Waitlist
- About → Join the Waitlist

## Future expansion (structure ready, pages not built)

- `/updates` : news and progress notes collection (scaffolded in CMS, unpublished)
- `/updates/{slug}` : individual update entries
- `/research/{slug}` : individual evidence entries could gain detail pages later; at launch the evidence library renders as a single page
- `/team` : optional standalone team page once profiles are approved for publication
