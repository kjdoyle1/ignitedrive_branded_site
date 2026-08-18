# Changelog

What changed on ignitedrivelabs.com, when, and why. Newest first. One entry
per meaningful change that reaches production — not every commit.

---

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
