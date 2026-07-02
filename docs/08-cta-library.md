# 08. CTA Library

One primary conversion sitewide (the waitlist, role-segmented at the form), one secondary conversion for clinicians (pilot interest, routed through the same form), and reading paths that keep the story moving. This document is the canonical set; anything not here shouldn't ship.

## Primary CTAs

| Context | Label | Target | Notes |
|---------|-------|--------|-------|
| Header button (all pages) | Join the waitlist | /join | Persistent, glass pill, cobalt fill |
| Home hero | Join the waitlist | /join | Paired with secondary "See how it works" |
| Global banner (default close on most pages) | Join the waitlist | /join | Copy in global microcopy |
| For Patients close | Join the waitlist | /join?role=patient | Role pre-selected |
| For Clinicians hero + close | Register pilot interest | /join?role=clinician&interest=pilot | Same form, pilot interest pre-ticked |
| Research close | Get in touch | /join?role=researcher | Research collaboration framing |
| About close | Join the waitlist | /join | "Help us build it right" framing |

## Secondary CTAs (reading paths)

| From | Label | To |
|------|-------|----|
| Home hero | See how it works | /how-it-works |
| Home problem section | Read about the problem | /the-problem |
| Home framework section | See the full picture | /how-it-works |
| Home features section | Explore all features | /features |
| Home clinician teaser | Explore the clinician view | /for-clinicians |
| Home research teaser | Read the evidence | /research |
| Home trust teaser | How we earn trust | /privacy-and-trust |
| The Problem close | See our solution | /our-solution |
| Our Solution close | See how it works | /how-it-works |
| How It Works close | Explore the features | /features |
| Features fork | For patients / For clinicians | /for-patients, /for-clinicians |
| Impact close | Read the evidence | /research |
| For Clinicians secondary | Read about the framework | /research#paper |
| Privacy & Trust close | Get in touch | /join#contact |
| FAQ close | Get in touch | /join#contact |

## Button copy rules

- Sentence case, one verb, two to four words. "Join the waitlist", never "Sign Up Now!" or "Get Started".
- The label says what actually happens next. No "Learn more" anywhere: name the destination instead ("Read the evidence", "See how it works").
- One primary button per screen region. Primary and secondary never compete visually: filled cobalt versus quiet text link with arrow.
- Patient-facing CTAs stay invitational, never urgent: no countdowns, no "limited spots", no loss framing. Calm is the brand, especially at the moment of conversion.
- Arrows (→) mark in-page reading links only, never buttons.

## Microcopy near CTAs (reassurance lines)

Used as small text under primary buttons, one per context, rotate sparingly:

- "Free to join. Leave anytime."
- "No spam. Updates only when something real happens."
- "In development now: early voices shape it most."
- Clinician contexts: "A conversation, not a commitment."

## CTA experiments worth running post-launch

- Home hero secondary: "See how it works" versus "Watch a day with KidneyMate" (once the timeline section can be deep-linked).
- Waitlist banner heading: identity framing ("Be part of KidneyMate from the start") versus benefit framing ("Be first in line when early access opens").
- For Clinicians hero: "Register pilot interest" versus "Start a pilot conversation".
Measure through the form's role and interest mix, not raw clicks.
