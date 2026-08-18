# IgniteDrive Labs — Style Guide

Reference for any visual or content change to the site. Keep changes
consistent with this instead of improvising — it's the shared source of
truth for colors, type, spacing, and copy conventions.

## Colors

All defined as CSS custom properties in [`styles/site.css`](styles/site.css) — use the variable, not a hex literal, in any new shared CSS. Inline `style="..."` attributes on individual elements (the norm on this site — see "How the site is built" below) still use the literal hex values below, since they're copied straight from these tokens.

| Token | Hex | Use |
|---|---|---|
| `--cream` | `#F4F1E9` | Default page background, text-on-ink |
| `--cream-alt` | `#ECE7DB` | Alternating section background |
| `--card-white` | `#FCFBF7` | Bordered light cards, form card |
| `--ink` | `#1B1916` | Body text, ink section backgrounds, card borders |
| `--ink-body` | `#43403a` | Body copy on light backgrounds |
| `--ink-muted` | `#3a352d` | Larger body copy |
| `--warm-gray` / `-2` / `-3` | `#5a544a` / `#6b6559` / `#8d8578` | Mono captions, meta text |
| `--teal` | `#1F6B6B` | Primary accent — links, hover, CTAs, diamonds |
| `--teal-deep-label` | `#3A7A74` | Eyebrows/labels on light backgrounds |
| `--teal-light` | `#5AA39D` | Accents on ink (dark) backgrounds |
| `--teal-pale` / `-2` | `#CFE6E3` / `#E4F1EF` | Copy on the teal contact section |
| `--on-ink-1/2/3` | `#e3ded4` / `#cbc6bc` / `#9a9388` | Descending-emphasis text on ink |
| `--error-text` / `--error-bg` | `#9a3a2a` / `#f6e7e2` | Form error state |

Hairlines (borders/dividers): `rgba(27,25,22,0.16)` is the default; `0.12` for list rows, `0.2` for list tops, `rgba(244,241,233,0.16)` on ink backgrounds.

## Typography

Google Fonts, loaded via `<link>` in each page's `<head>` (see any existing page for the exact URL) — do not self-host or swap providers without discussing it first.

- **Display / headings** — `'Newsreader', serif`, weight 500. H1 `clamp(2.7rem,5.6vw,5.1rem)` / line-height 1.02 / letter-spacing -0.022em. H2 `clamp(1.9rem,3.6vw,3rem)`–`clamp(2rem,4vw,3.3rem)`. Card H3 `1.22rem`–`1.5rem`.
- **Pull quotes / kickers** — Newsreader italic, teal, `clamp(1.16rem,2.1vw,1.7rem)`.
- **Body** — `'IBM Plex Sans', system-ui, sans-serif`, `0.94rem`–`1.2rem`, line-height 1.55–1.64, max measure 42–64ch.
- **Labels / eyebrows / meta / chips** — `'IBM Plex Mono', monospace`, `0.58rem`–`0.82rem`, letter-spacing `0.06em`–`0.2em`, uppercase for eyebrows.

## Spacing & layout

- Content container: `max-width: 1240px; margin: 0 auto; padding: clamp(64px,8vw,116px) clamp(20px,5vw,64px)` (vertical padding varies by section).
- Section separators: `border-top: 1px solid rgba(27,25,22,0.16)` on every section except the hero.
- Grid gaps: `1px` for hairline grids (see `.diamond`/chip patterns), `8px` chips, `24px` cards, `clamp(28px,4.5vw,72px)` major columns.
- **No rounded corners anywhere.** No blurred shadows — only hard offsets (`5px 6px 0` / `6px 7px 0` in teal at 15–40% alpha), and only on hover.
- Motif: a 7–14px square rotated 45° (`.diamond` class) as a bullet/marker — teal on light backgrounds, `--teal-light` on ink.

## Responsive breakpoints

Two breakpoints, both defined in `styles/site.css`:
- **760px** — hero scrim/photo repositioning, Loop-diagram ring padding and node label size.
- **640px** — desktop nav links hide, hamburger mobile-nav menu takes over (see `.nav-mobile-panel` / `data-nav-open` / `data-nav-panel` in `styles/site.css` and `scripts/site.js`).

## Reusable CSS classes (use these — don't reinvent hover/focus states)

Defined once in `styles/site.css`, shared across every page:

| Class | Use |
|---|---|
| `.diamond` | Rotated-square bullet marker |
| `.link-hover-underline` | Nav-style link: teal + underline on hover |
| `.link-hover-ink` | Footer-style link on ink background |
| `.btn-ink` | Solid ink button, teal on hover (primary CTA) |
| `.btn-teal` | Solid teal button, light-teal on hover |
| `.card-hover-light` / `.card-hover-ink` | Hard-offset teal shadow on hover, light/dark cards |
| `.article-card-hover` | Same treatment, sized for the Insights article cards |
| `.chip` | Small bordered mono label |
| `.body` (wrapping `<p>`/`<h2>`) | Long-form article typography |
| `.skip-link` | Accessibility skip-to-content link |

If a new page needs a hover/focus pattern that doesn't fit one of these, add it to `styles/site.css` — don't add a new `<style>` block or a second stylesheet.

## Voice & content conventions

- Tone: direct, field-grounded, no fluff or hype language. Short declarative sentences over corporate phrasing.
- Curly quotes/apostrophes (`'` `'` `"` `"`) throughout — not straight quotes.
- Em dashes for asides, not parenthetical overuse.
- Section eyebrows are ALL CAPS mono text, e.g. "WHAT WE DO · TWO LABS, ONE STUDIO".

## Images

- Format: WebP for photos/diagrams (logos stay PNG for transparency). Optimize with `cwebp -q 82` for photos, `cwebp -lossless` for line-art/diagrams with text.
- Always set `width`/`height` attributes matching the image's natural pixel dimensions (prevents layout shift).
- Always carry over descriptive `alt` text — never empty unless the image is purely decorative (then `aria-hidden="true"`, no `alt`).

## Accessibility baseline (non-negotiable on every page)

- Exactly one `<h1>` per page; no skipped heading levels.
- Every page wraps its content in `<main id="main">` with a `.skip-link` before it.
- Real `<a>`/`<button>` elements for anything interactive — never a `<div onclick>`.
- Never add `outline: none` — the shared focus ring in `site.css` must stay visible.
- Form fields need a real `<label for>`/`id` pair.

## How the site is built (context for any change)

Plain static HTML — **no framework, no build step, no npm**. One shared
[`styles/site.css`](styles/site.css) and one shared [`scripts/site.js`](scripts/site.js)
(mobile nav, contact form, footer year). Per-element layout stays inline
(`style="..."`) on purpose, matching the approved Claude Design reference —
don't refactor that into a class-based system as part of an unrelated change.

Full URL map, redirects, and section anchors: see [`vercel.json`](vercel.json)
and the section `id`s in [`index.html`](index.html) (`#labs`, `#field`,
`#loop`, `#problems`, `#about`, `#insights`, `#contact`, etc).
