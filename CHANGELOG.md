# Changelog

What changed on ignitedrivelabs.com, when, and why. Newest first. One entry
per meaningful change that reaches production — not every commit.

---

## 2026-08-20 — Added Vercel Web Analytics

Vanilla-HTML integration (no npm package, no build step) — the tracking
script route Vercel provisions automatically once Web Analytics is
enabled on the project. Added to all 6 pages. Confirmed live end-to-end:
script loads and the pageview beacon (`POST /_vercel/insights/view`)
fires successfully on the production site. Free up to 50,000 events/month
on the current plan.
`74046a2`

## 2026-08-20 — Repointed old lab-page redirects for the v5 rebuild

The v5 rebuild removed `#labs` from the homepage. `Car Wash Behavior
Lab.html` now redirects to `/#growth`, `Car Wash Technology Lab.html` to
`/#programs` — the closer conceptual match for each, instead of both
landing on a section that no longer exists.
`c918094`

## 2026-08-20 — Rebuilt homepage for v5 technology-focused positioning

Full content and structure rebuild per the new design handoff. Positioning
shifts from "two labs" to independent technology strategy for enterprise
car wash, with behavior/growth work explicitly repositioned as secondary.
New sections: the technology-decision stakes, an independence strip ("not
a reseller/vendor broker/MSP/dev agency/AI consultancy"), four 90-day
programs (POS Decision & Migration Readiness, Enterprise Tech Stack
Review, AI Readiness, Build-vs-Buy Sprint) replacing the old two-labs
framing, "Inside our labs" introducing Sentinel (in development, not
linked), a technology-focused 6-quote problem grid, and a quieter 3-card
Growth & Operating Performance band. Founder bio expanded with real
career detail. Same visual design system throughout — colors, type,
spacing, and components unchanged, content and structure only. Supersedes
the standalone market-intelligence banner from the previous patch —
Sentinel now covers that ground. `insights.html` nav/footer/contact-form
options updated to match; article pages were confirmed unchanged and left
untouched.
`4b88c76` · [PR #3](https://github.com/kjdoyle1/ignitedrive_branded_site/pull/3)

## 2026-08-20 — Fixed hover states silently not applying sitewide

`.link-hover` and `.link-hover-underline` (nav links, article back-links)
paired a stylesheet `:hover` color/border with the same properties set
inline on the resting element — an inline style beats a non-`!important`
stylesheet rule regardless of specificity, so the hover color never
actually rendered, since the very first launch. Fixed with `!important`
on the two affected rules; confirmed via live hover test before and
after. Buttons and card-shadow hovers were unaffected.
`f123eeb`

## 2026-08-17 — Fixed broken redirects from the rebuild

Three of the four old-URL redirects (`Car Wash Behavior Lab.html`, `Car
Wash Technology Lab.html`, `IgniteDrive Labs v2.html`) were 404ing instead
of redirecting — the `vercel.json` rules were written with literal spaces,
but Vercel matches redirect sources against the raw `%20`-encoded request
path. Fixed by percent-encoding the source patterns.
`bf3cc8c`

## 2026-08-17 — Updated hero headline and copy

Headline changed to "Find the friction. Find the leverage. Build what
works." with new supporting paragraph, replacing the launch copy from the
rebuild below.
`aea2338`

## 2026-08-17 — Rebuilt the site from the Claude Design v4.1 handoff

Replaced the previous bundled Claude Design exports (self-contained
React/Babel/base64 files, ~14MB per page) with clean static HTML: one
shared stylesheet (`styles/site.css`), minimal vanilla JS
(`scripts/site.js`), optimized WebP images (11MB → ~850KB), and no
runtime/build dependency. Added SEO metadata, `robots.txt`, `sitemap.xml`,
a real accessible mobile nav, visible focus states, and a skip link — all
things the design handoff flagged as unresolved. Retired the standalone
lab pages (content now lives as anchors on the home page) and a duplicate
homepage file, with permanent redirects so no previously published URL
broke. Added a fourth Insights article (membership health & LTV) that
hadn't been published before.
`ad9bbf5` · [PR #1](https://github.com/kjdoyle1/ignitedrive_branded_site/pull/1)

## 2026-06-25 — Site content updates

Pre-dates this changelog's process; see `git log` for detail.
`2b73b87`, `99e0b4a`

## 2026-06-24 — Initial branded site launch

Pre-dates this changelog's process; see `git log` for detail.
`bc69062`, `57f4246`, `f978a1a`, `cd79cb3`
