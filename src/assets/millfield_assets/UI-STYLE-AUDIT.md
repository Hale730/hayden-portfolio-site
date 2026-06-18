# Palimpsest WEB — UI & Style Audit

_Date: 2026-06-16_

Reviewed: `millfield.css`, `tonys.css`, `admin.css`, `restricted-records.css`, the `tv/` sketch, and a representative spread of the ~40 HTML pages.

## Overview

The project is a static, multi-page "period" website (a fictional 2002 county portal) built as hand-authored HTML with four CSS files. It splits into three visual "skins": the **county site** (`millfield.css`), **Tony's Pizza** (`tonys.css`), and the **admin/intranet** (`admin.css`), with `restricted-records.css` layering on top of the county skin.

The skeuomorphic early-2000s aesthetic — beveled buttons, gradient title bars, inset borders, custom bitmap cursor — is executed consistently and intentionally. That craft is real and worth preserving. The problems are mostly structural: duplicated markup/CSS, a broken heading model, and a fragile scaling strategy.

---

## High-severity findings

### 1. Every page's `<h1>` is the banner, not the page
All ~40 county pages use `<h1>Welcome to Millfield County!</h1>` (`index.html:17`, `profiles/daniel-harper.html:16`, and 38 others). The page's actual subject ("News Archive", "Daniel Harper", a record title) is demoted to `<h2>` inside `.panel`.

Consequences:
- Screen-reader users get the same H1 on every page and no unique landmark for "where am I."
- Document outline is broken — the real title sits a level too deep.
- SEO/title relevance is poor; every page looks identical to crawlers.

Tellingly, `tonys-pizza.html:20` does it correctly (`<h1>Tony's Pizza</h1>`), which makes the county pages the outlier.

**Fix:** make the brand banner a non-heading element (or `role`-less styled div), and promote each page's `.panel h2` to the page `<h1>`.

### 2. Repeated landmarks with no skip link
Header + nav + footer are duplicated verbatim on every page, but there's no "Skip to content" link. Keyboard/AT users must tab through the seal, brand link, and 5 nav items on every single page before reaching content.

### 3. Nav marks active state visually but not semantically
Pages set `class="active"` on the current nav link (`contact.html:28`, `departments.html:24`) and style it bold/white — but there's no `aria-current="page"`. The active state is invisible to assistive tech.

### 4. The "Accessibility" link is a dead `#` anchor
Both footer links — Privacy Policy and **Accessibility** — are `href="#"` on all 40+ pages (`index.html:129-130`). A non-functional Accessibility link is the kind of thing that draws complaints; either point it somewhere or remove it.

---

## Medium-severity findings

### 5. Massive markup duplication (maintainability)
Header/nav/footer, the office hours, and the phone number `(555) 014-1891` are copy-pasted into ~40 files. There's no templating or includes, so any change (e.g., a new nav item, the drift already visible where some pages omit "Calendar" from the nav) must be made dozens of times by hand. This is the single biggest long-term risk. Options: a tiny build step (11ty/include partials), or a small JS injector for the shared chrome.

### 6. CSS base block copy-pasted across three files
The `:root` cursor variables, `* { box-sizing }`, `html/body` reset, the verbose `input:not([type="button"])…` selector, and the `a, button, summary…` cursor list are duplicated nearly identically in `millfield.css`, `tonys.css`, and `admin.css`. Extract a shared `base.css` and load it first; keep only skin-specific rules per file. (`restricted-records.css` already follows the better "supplement" pattern — no base, just additions.)

### 7. Design tokens defined but under-used
`millfield.css:1-17` defines `--line`, `--line-dark`, `--text`, `--title-blue`, etc., but most of the file still hardcodes raw hex (`#8d97a3`, `#a3adba`, `#7a8694`, `#6d7683` repeated many times for the bevel borders). The beveled-border pattern in particular (`border-top-color:#fff; border-right/bottom:#6d7683`) is repeated in `.quick-links`, `.back-link`, `.carousel-control`, `.calendar-nav-btn`, `.restricted-btn` — a candidate for a single `.bevel` utility or token set.

### 8. `zoom: 1.5` is a fragile scaling strategy
`styles/millfield.css:85` scales the entire 860px shell with `zoom: 1.5` (and `1.15` for the calendar). Issues:
- `zoom` is non-standard and was unsupported in Firefox until very recently; rendering/rounding differs across browsers.
- The responsive breakpoints (`@media (max-width: 920px / 700px)`) test the **unzoomed** viewport, but the rendered content is ~1290px wide. The breakpoints and the actual layout width are decoupled, so the "responsive" behavior won't trigger when you'd expect.
- `position: fixed` elements inside a zoomed ancestor (e.g. `.calendar-hover-popup`, `styles/millfield.css:891`) can be mispositioned, since the JS computes coordinates against the zoomed frame.

Prefer scaling type/spacing with `rem` or a root `font-size`, or `transform: scale()` with a compensating wrapper, so breakpoints and fixed positioning stay coherent.

### 9. Two different responsive strategies for the two "sites"
The county shell is fixed `860px` + `zoom`. Tony's uses a modern fluid `width: min(1020px, calc(100% - 26px))` (`styles/tonys.css:73`). They're inconsistent approaches to the same problem; the Tony's approach is the healthier one and could be the model.

---

## Lower-severity / polish

- **Tiny fonts:** the calendar uses `9px` (`.calendar-week-day-count`, `.calendar-time-label`) and the footer era-meta uses `10px` light gray on dark (`#c5d3e4`). 9px is below comfortable reading size; verify contrast on the muted grays (`#566474`, `#5a697c`, `#738095` at 11px) against WCAG AA — several are borderline.
- **No `prefers-reduced-motion`:** the homepage carousel auto-advances with `380ms` transitions and there's no reduced-motion opt-out. One `@media (prefers-reduced-motion: reduce)` block disabling the auto-rotate and transitions would cover it.
- **Custom cursor is global and forced:** `body * { cursor: var(--site-cursor-default) }` overrides the system cursor everywhere (text inputs are handled, good). This is deliberate for the aesthetic, but it ignores user cursor-size/contrast accessibility settings. Consider gating it behind reduced-motion/forced-colors or a toggle.
- **Focus indicator ≈ hover:** most `:focus-visible` rules only change `background` to the same value as `:hover` (e.g. nav links, `styles/millfield.css:163-167`). You're relying on the browser's default outline (not removed, which is fine) but the custom focus state isn't visually distinct from hover. A dedicated outline/ring would read better.
- **Alt text leakage:** `alt="Millfield County seal placeholder"` (`index.html:15`) ships the word "placeholder" to screen readers. Describe the image instead.
- **Forced-colors / dark mode:** no `prefers-color-scheme` or `forced-colors` handling. Given the gradient-heavy skeuomorphic look this is acceptable, but Windows High Contrast mode will likely break the bevels.

---

## What's done well

- Clean separation of concerns — **zero inline styles** across all 40+ pages.
- Good semantic landmarks: `header`/`nav`/`main`/`article`/`section`/`footer` used appropriately, `nav aria-label="Main navigation"`.
- Icon-only controls have `aria-label`s (carousel arrows/dots, `index.html:108-113`).
- The admin login form is genuinely well-built: `<label for>` pairing, `autocomplete`, `required`, and an `aria-live="polite"` error region (`admin-login.html:18-31`).
- Broad `:focus-visible` coverage and a sensible custom-cursor exception for text fields.
- `restricted-records.css` demonstrates the right "layer on top" pattern the other files should adopt.

---

## Suggested priority order

1. Fix the `<h1>` model (one descriptive H1 per page) — biggest accessibility/SEO win, mechanical to apply.
2. Add a skip link + `aria-current="page"` to nav.
3. De-duplicate shared chrome (header/nav/footer) via includes or a JS injector — kills the drift problem.
4. Extract a shared `base.css`; route hardcoded hex through the existing tokens.
5. Reconsider `zoom: 1.5` in favor of rem/`transform` scaling so responsiveness and fixed popups behave.
6. Wire up or remove the dead footer links; add `prefers-reduced-motion`.
