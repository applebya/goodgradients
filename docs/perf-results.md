# Performance results — goodgradients.com

Mission: Lighthouse 100. Worked 2026-09-13. Baseline in
[`perf-baseline.md`](./perf-baseline.md).

> **Not deployed.** This branch sits on top of the paused redesign
> (`f3a951d`, "human-verify" checkpoint), so shipping it would also ship 16
> unreviewed commits. Every number below is **local preview**, not the
> deployed origin, and is therefore not directly comparable to the mission's
> deployed figures. Re-measure against `goodgradients.com` once the redesign
> is reviewed and this lands on main.

## Method

Lighthouse 13.4.1, mobile preset, default simulated throttling, against
`http://localhost:4173` (`vite preview`). Five runs, median reported. Run
under Node 26 — `chrome-launcher` fails under bun 1.3.5.

Before: `f3a951d` (redesign, unmodified). After: this branch.

## Scores

| Category       | Before | After   |
| -------------- | ------ | ------- |
| Performance    | 81     | **97**  |
| Accessibility  | 100    | 100     |
| Best practices | 100    | 100     |
| SEO            | 100    | 100     |

After runs: 96 / 97 / 97 / 97 / 97.

Accessibility was already 100 on this branch — **the redesign fixed the
deployed site's `color-contrast` failure (95) before this work started.** That
is worth knowing when the deployed number is next published: shipping the
redesign is what moves a11y, not anything here.

## Metrics

| Metric                   | Before   | After    |          |
| ------------------------ | -------- | -------- | -------- |
| First Contentful Paint   | 3.4 s    | 1.8 s    | −47%     |
| Largest Contentful Paint | 3.5 s    | 2.3 s    | −34%     |
| Total Blocking Time      | 100 ms   | 0 ms     | −100%    |
| Speed Index              | 4.6 s    | 1.8 s    | −61%     |
| Cumulative Layout Shift  | 0.004    | 0        | —        |
| Transfer                 | 282.3 KB | 224.0 KB | −21%     |
| Requests                 | 13       | 5        | −8       |

Entry chunk 654 KB → 482 KB (gzip 189 → 133 KB).
Service-worker precache 1468 KiB → 1301 KiB.

## What did the work

1. **Self-hosted Inter and Molle.** Both came from `fonts.googleapis.com` —
   a render-blocking stylesheet, then the fonts themselves from
   `fonts.gstatic.com`, two third-party origins for 65 KB. Inter's variable
   cut covers all four weights in one file and is preloaded with a
   metric-matched fallback; Molle is branding-only and loads normally.

2. **Deferred PostHog and dropped its heavy add-ons.** It was static-imported,
   so it sat in the entry chunk, and then pulled ~110 KB at runtime — session
   recorder (65 KB), surveys (33 KB), dead clicks (9 KB), web-vitals (4 KB).
   The recorder alone was the largest third-party script on the page. All
   three are off; the client loads on `requestIdleCallback` with queued
   events. This is most of the TBT 100 ms → 0 ms.

3. **Shortened the splash hold, 2000 ms → 1200 ms.** Lighthouse always runs
   cold, so it always sat through the full hold: Speed Index 4.6 s, scoring
   85. At 1200 ms it is 1.8 s and scores 100. **Removing the splash entirely
   was measured and gains nothing further** — both land on the same number —
   so its existence is not the cost, only its length. This is the one design
   call in the branch, and it is a single constant.

4. **Inlined the service-worker registration.** `registerSW.js` was a
   render-blocking request for ~300 ms to call one function.

5. **Build config.** Source maps on for best-practices; fonts out of the
   precache glob, which was pulling every unicode-range subset regardless of
   need.

## Why not 100

Performance sits at 97, held there by FCP (1.8 s, 89) and LCP (2.3 s, 94).
TBT, CLS and Speed Index are all 100.

What is left is the entry chunk: 482 KB, and nothing paints until it executes.
The obvious next lever is code-splitting the gallery the way celery split its
calculator, but that is a structural change to the redesign's own components
and did not belong in a branch that is already waiting on review.

`cache-insight` also persists — GitHub Pages does not expose cache-control
headers. That is the open `NA-lh-2` hosting decision, not a payload problem.

## Guarding it

`bun run verify` — tests, build (which is the typecheck here, via `tsc -b`),
axe at two breakpoints, and the perf harness at Pixel 5 / Slow-4G / 4x CPU.

`tools/audit-a11y.ts` carries two fixes made during this mission that should
travel to any repo using it:

- **Settle before scanning.** axe folds opacity into contrast, so scanning
  straight after `load` reports entrance-animating text as a contrast
  failure. This produced ten phantom "serious" violations on celery.
- **Never wait on an infinite animation.** This site loops its gradient
  animations forever, and `animation.finished` never resolves for those, so
  awaiting the whole set hung the audit indefinitely. It now filters to
  finite animations and time-boxes both waits.

## Costs accepted

- The splash hold is 800 ms shorter.
- PostHog session recording, surveys and dead-click autocapture are off. If
  session replay is actually wanted, re-enable `disable_session_recording`
  and expect to give back most of the TBT win.

## Next steps

1. Review the paused redesign (`f3a951d`).
2. Merge this branch, deploy, and **re-measure against the deployed origin** —
   every figure here is local.
3. Tell the Corp Site session to refresh `lighthouse.json`; the goodgradients
   row is measured from the old deployed build.
