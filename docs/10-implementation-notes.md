# 10. Developer-Ready Implementation Notes

Everything the build phase needs to start without a kickoff meeting. Read alongside `04-ux-ui-design-direction.md` (visual system) and `06-statamic-cms-architecture.md` (content model).

## 1. Stack

- **Statamic 5** on Laravel 12, PHP 8.3+, flat-file content (no database needed beyond forms if using file submissions; use the database driver for forms if volume warrants).
- **Tailwind CSS 4** with design tokens as CSS custom properties (colours, tracker tints, radii, shadows from doc 04) so the stylised app screens and the site share one source of truth.
- **Alpine.js 3** for interactivity: nav sheets, accordions, the insight-card reveal, form UX. No SPA framework; this is a content site and should behave like one.
- **Vite** for assets. **Antlers** for templates.
- Fonts self-hosted: **Fraunces** (variable, Google Fonts licence) and **Satoshi** (Fontshare licence: confirm the free tier covers this use, it does for web embedding via their licence, keep a copy of the licence in the repo).

## 2. Repository layout (build phase)

```
app/                    Laravel/Statamic app code (form listeners, view models)
content/                collections/, globals/, navs/, taxonomies/, assets/ metadata
resources/
  blueprints/           page, feature, faq, evidence_entry, testimonial, profile, milestone, screen
  fieldsets/            seo, page_builder sets
  views/
    layout.antlers.html
    partials/
      _header.antlers.html, _footer.antlers.html, _seo.antlers.html
      sets/              one partial per page-builder set (26)
      screens/           the stylised app screens (see section 4)
  css/ js/
public/
users/
```

Branch strategy: `main` production, feature branches per build stage. Content edits are commits; treat copy like code in review.

## 3. Template architecture

- One layout; every page renders `page_builder` through a single loop that includes `partials/sets/_{type}`.
- Each set partial is self-contained: its own spacing, background variant handling (`field / gradient / solid / deep`) and container. Section rhythm comes from the alternating `background` values editors choose.
- Global CTA banner: layout appends the `waitlist_cta` global after page content unless `hide_default_cta` is true or the page's last set is already `cta_banner` (check in the view model to avoid doubles).
- The `→` arrows in copy are rendered as styled pseudo-elements or inline SVG, not raw characters, so they can animate 2px on hover.

## 4. The stylised app screens

Build as Antlers partials with inline SVG + Tailwind (no images), parameterised by the `screens` collection entry:

- `screens/_dashboard`: greeting, streak chip, to-do strip, four tracker tiles (medication, fluid, sleep, mood) using tracker tint tokens.
- `screens/_fluid`: progress ring (SVG stroke-dasharray) at 70%, quick-add buttons, "set with your care team" note.
- `screens/_medication`: today's schedule, two taken ticks, one gentle missed-dose row.
- `screens/_insight`: the canonical insight card; Alpine-powered "why am I seeing this?" expansion revealing the rule text.
- `screens/_mood_sleep`: evening check-in, two sliders, done state.
- `screens/_clinician_trends`: browser frame, 90-day multi-line trend (static SVG paths, no chart library), review flag card, patient summary panel.

Rules: fictional data only, fictional name ("Sam"), realistic values (fluid target 1500 mL, eight medications), all text real and legible (no lorem, no blur-to-hide), respects `prefers-reduced-motion`. Device frame: one reusable `_phone_frame` partial (CSS border-radius + notch, no image asset). Add the illustrative-screens note from `trust_disclaimers` wherever screens render on Features.

## 5. Glass system implementation

```css
.glass {
  background: rgb(255 255 255 / 0.62);
  backdrop-filter: blur(22px) saturate(1.4);
  border: 1px solid rgb(255 255 255 / 0.65);
  border-radius: 24px;
  box-shadow: 0 20px 50px -24px rgb(27 47 122 / 0.18);
}
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgb(255 255 255 / 0.92); }
}
@media (prefers-reduced-transparency: reduce) {
  .glass { background: #fff; backdrop-filter: none; }
}
```

Gradient fields as fixed-position or section-scoped radial gradients with a 1 to 2% noise overlay (tiny tiled PNG or SVG turbulence). Never animate `backdrop-filter` (paint cost); animate transform/opacity only.

## 6. Motion

- IntersectionObserver + a `[data-reveal]` utility: adds a class triggering `transform: translateY(16px)` → 0 with opacity, 300ms ease-out, stagger via `--reveal-index`. Fires once.
- The layered-framework and day-timeline set-pieces: CSS scroll-driven animations where supported, static fallback otherwise. No GSAP unless the set-pieces genuinely need it; decide during build, default no.
- Global kill-switch: `@media (prefers-reduced-motion: reduce)` zeroes all transforms/transitions except opacity.

## 7. Forms

- Statamic native forms (`waitlist`, `contact`) with honeypot enabled; add a minimum-fill-time check (reject under 3s) in a form listener for bot resistance without CAPTCHAs (CAPTCHAs conflict with the accessibility posture).
- Role/interest pre-fill from query params (`/join?role=clinician&interest=pilot`) via a small Alpine init reading `URLSearchParams`.
- Success state replaces the form in place (no redirect) and is announced via `role="status"` for screen readers; thank-you copy from the form's CMS fields.
- Email notifications through a transactional provider (Postmark or SES) configured in Laravel mail; confirmation email copy in `07-copy/00-global-microcopy.md`.
- Submissions are personal information: include them in the deletion/export process, restrict CP access to admin+editor, and note retention in the Privacy Policy.

## 8. Performance budget

- LCP under 2.0s on simulated 4G mid-range Android; CLS under 0.05; INP under 200ms.
- Statamic **static caching (full measure)** for all pages; forms still work via the standard half/full-measure CSRF handling (use Statamic's dynamic token replacement).
- Hero is text + CSS gradient + SVG screen: no hero raster image, so LCP is the headline. Fonts preloaded (two files max: Fraunces variable, Satoshi variable), `font-display: swap` with metric-compatible fallbacks to kill CLS.
- Images (About/For Patients photography) through Glide: AVIF/WebP, `srcset`, lazy-loaded, explicit dimensions.
- JS budget: under 50KB gzipped total (Alpine ~15KB). No analytics heavier than Plausible/Fathom (~1KB, aligns with the privacy story; self-host or AU region if available).

## 9. Accessibility build checklist

- Semantic landmarks (`header/nav/main/footer`), skip link, one h1 per page, heading levels never skip.
- Nav dropdown sheets and mobile sheet: focus-trapped, Esc closes, `aria-expanded` on triggers.
- Accordions: `button` + `aria-expanded` + region pattern; arrow-key support optional, Enter/Space required.
- Focus visible everywhere: 2px cobalt ring, 2px offset; never `outline: none` without replacement.
- Forms: visible labels, `autocomplete` attributes (`given-name`, `email`), errors linked via `aria-describedby`, error summary focus on submit failure.
- Contrast: `ink-600` on `cloud-50` and on glass-with-underlay both pass 4.5:1 (verify final tokens with tooling in CI: pa11y or axe in the deploy pipeline).
- Test pass before launch: keyboard-only, VoiceOver + Safari (iOS), TalkBack + Chrome (Android), 200% zoom, `prefers-reduced-motion`.

## 10. Hosting and operations

- Small VPS (Sydney region) via Laravel Forge or Ploi: PHP 8.3, nginx, HTTPS (Let's Encrypt), HTTP/2. Static caching makes a $10 to $20/month box comfortably sufficient.
- Cloudflare in front (AU edge, WAF, caching of assets), respecting the static cache.
- Deploys: push-to-deploy from `main` (build assets in CI, `php please cache:clear` + static cache warm post-deploy).
- Backups: content is in Git (that's the backup for copy); nightly server snapshot for forms/assets; forms also exportable CSV.
- Uptime and error monitoring: any lightweight service plus Laravel log notifications. The waitlist form failing silently is the single worst failure mode this site has: add a weekly submission-count sanity email.
- Environment flags to launch with: `show_team_grid: false`, `show_testimonials: false` (until consent audit done), `show_updates_nav: false`.

## 11. Build order (suggested)

1. Statamic install, blueprints/fieldsets from doc 06, tokens and layout shell.
2. Set partials in order of reuse: hero, rich_prose, split_content, cta_banner, icon_points, feature_grid, stat_band (that's 80% of every page), then the rest.
3. Stylised screens (section 4), then the two signature set-pieces (layered framework, day timeline).
4. Content entry from `07-copy/` (copy is final draft; enter as written, including microcopy).
5. Forms, SEO partial, sitemap, analytics.
6. Accessibility and performance pass against sections 8 and 9.
7. Content review against `05-brand-voice-and-messaging.md` claim guardrails, then launch checklist below.

## 12. Pre-launch checklist

- [ ] Legal: Privacy Policy and Terms drafted and reviewed by counsel; noindex removed.
- [ ] Verify claims: paper peer-review status (site says "currently under peer review" and names no venue until publication is confirmed), stakeholder-conversation wording, ABS statistic wording (2.7 million / 14.2% / 7.4% self-reported), adherence range citation, GBD/Lancet citation for the 788 million figure.
- [ ] Testimonials: publish only entries with `consent_confirmed`; otherwise keep flag off.
- [ ] Contact email live and monitored; waitlist confirmation email sending.
- [ ] 404 page, favicon set, OG default card, robots.txt, XML sitemap submitted to Search Console.
- [ ] Accessibility and performance budgets green.
- [ ] Announcement bar copy chosen (or off).
- [ ] Domain: confirm final (kidneymate.com.au assumed as placeholder throughout; update `site_identity` and canonical base).
