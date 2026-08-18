# IgniteDrive Labs website

Branded marketing site for IgniteDrive Labs (car wash technology &
behavior studio, founder Kyle Doyle). Plain static HTML — **no framework,
no build step, no npm/package.json.** One shared `styles/site.css` and one
shared `scripts/site.js`. Don't introduce a framework or build tool as a
side effect of an unrelated change.

## Before making a visual or content change

Read [`STYLE_GUIDE.md`](STYLE_GUIDE.md) first. Colors, type, spacing,
reusable CSS classes, voice/content conventions, and image conventions are
all defined there — use it instead of guessing or re-deriving from the
CSS each time.

## After a change reaches production (main)

Add one entry to [`CHANGELOG.md`](CHANGELOG.md), newest first: date, one-
or-two sentence summary of what changed and why, commit hash. Skip it for
work that never reaches `main`.

## Workflow

- **Small, low-risk changes** (copy edits, a color/spacing tweak, a
  redirect fix) — verify locally, commit straight to `main`. Vercel
  auto-deploys `main` to production.
- **Anything structural** (new page, layout change, multiple files,
  restructured navigation) — work on a branch, open a PR, let Vercel
  generate a preview deployment, and get Kyle's sign-off on the preview
  before merging. Don't merge a structural change without that review.
- Never touch DNS, the Vercel project's domain settings, or deployment
  protection settings without being asked.

## Deployment

- Host: Vercel, auto-deploys from GitHub. Production branch: `main`.
- Domain: `ignitedrivelabs.com` (apex 308-redirects to `www.ignitedrivelabs.com`, the canonical host).
- No `.vercel/` project link in this repo — deploys happen via the GitHub integration, not the Vercel CLI.
- Old/renamed URLs get a permanent redirect in `vercel.json`, not silently dropped. Redirect `source` patterns must be `%20`-encoded for paths with spaces (Vercel matches the raw request path, not the decoded one — see `CHANGELOG.md` 2026-08-17 for how this bit us once already).

## QA checklist before shipping

No dev server needed — this is static files. `python3 -m http.server 8123`
from the repo root and open `http://localhost:8123/index.html` is enough
for local checks. Run through whichever of these actually apply to the
change — don't skip a step just because it's not written down elsewhere:

- **Links touched or added** — extract every `href`/`src` and hit each
  one with `curl -o /dev/null -w "%{http_code}"`; confirm 200s (or the
  expected redirect code) across the board. Don't eyeball it in a browser.
- **Redirects touched** — test the actual HTTP response and `location`
  header, not just whether a browser lands in the right place. Vercel
  matches redirect sources against the raw, `%20`-encoded request path —
  see the 2026-08-17 changelog entry for how this bit us once already.
- **Contact form touched** — verify the JS logic (loading/success/error
  states, field validation) by reading the code and driving it via the
  DOM. Don't trigger a real submission — that hits the live Formspree
  endpoint and generates a fake lead notification.
- **Any page touched** — check the browser console for errors, confirm
  heading order/alt text/focus states still hold (see the accessibility
  baseline in `STYLE_GUIDE.md`), and check the layout at mobile width
  (~375px) as well as desktop.
- Click through any changed links manually as a final sanity check, even
  after the automated pass above.
