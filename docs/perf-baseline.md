# Performance baseline — goodgradients.com

Measured **2026-09-13**, before any Lighthouse-100 mission work.

## Method

Lighthouse 13.4.1, **mobile preset, default simulated throttling**. Run under
Node 26, after a one-off `chrome-launcher` failure under bun that did not
reproduce on retest. Either runtime works; the runtime does not change what
Lighthouse reports.

Two baselines are recorded, because the deployed site and the local branch
were not the same code. `origin/main` (what visitors see) was 16 commits
behind local `main`, which carries an in-progress redesign paused at a
human-verify checkpoint. The perf work was done on top of the redesign, so the
local figure is the one the after-numbers should be read against.

## Deployed (`origin/main`), 3 runs

| Category       | Score | Runs       |
| -------------- | ----- | ---------- |
| Performance    | 80    | 66 / 87 / 80 |
| Accessibility  | 95    | —          |
| Best practices | 100   | —          |
| SEO            | 100   | —          |

A 21-point spread across three runs. The mission brief records 73 for this
site; a fourth run here returned exactly 73. Every number in that brief is one
sample.

| Metric                   | Value    |
| ------------------------ | -------- |
| First Contentful Paint   | 2.9 s    |
| Largest Contentful Paint | 3.8 s    |
| Total Blocking Time      | 210 ms   |
| Speed Index              | 2.9 s    |
| Cumulative Layout Shift  | 0        |
| Transfer                 | 346.7 KB / 17 requests |
| Third-party              | 130.9 KB / 9 requests  |

Accessibility 95 was `color-contrast` (weight 7) — real failures on
`text-neutral-500` body copy.

## Local branch (redesign at `f3a951d`), 1 run

| Category       | Score |
| -------------- | ----- |
| Performance    | 81    |
| Accessibility  | **100** |
| Best practices | 100   |
| SEO            | 100   |

| Metric                   | Value    |
| ------------------------ | -------- |
| First Contentful Paint   | 3.4 s    |
| Largest Contentful Paint | 3.5 s    |
| Total Blocking Time      | 100 ms   |
| Speed Index              | 4.6 s    |
| Transfer                 | 282.3 KB / 13 requests |

**The redesign already fixes accessibility, 95 to 100.** That work is not the
mission's; it was done before this branch started.

The redesign also makes performance worse in one respect: it adds Inter
alongside Molle, so the page pulls 65 KB of fonts (Inter 47.3 KB, Molle
17.8 KB) from `fonts.gstatic.com` behind a render-blocking stylesheet on
`fonts.googleapis.com`.

## What was costing the score

| Item | Cost |
| ---- | ---- |
| Google Fonts stylesheet, render-blocking | 772 ms (deployed) |
| `registerSW.js`, render-blocking | ~300 ms |
| PostHog, eager, with session recorder | ~110 KB across 4 scripts |
| Splash screen, 2000 ms minimum hold | Speed Index 4.6 s |
| Entry chunk | 654 KB (gzip 189 KB) |
| Service-worker precache | 1468 KiB |

Nothing painted until the entry chunk executed (FCP 3.4 s), and then a 2 s
splash stood between that and the gallery (Speed Index 4.6 s).

## Harness

`tools/measure-perf.ts` and `tools/audit-a11y.ts` are copied from
`appleby-web-services-ltd` so the numbers stay comparable across mission
sites, with two fixes to audit-a11y.ts described in `perf-results.md`.
