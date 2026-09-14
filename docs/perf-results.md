# Performance results — goodgradients.com

Mission: Lighthouse 100. Worked 2026-09-13. Baseline in
[`perf-baseline.md`](./perf-baseline.md).

**Deployed 2026-09-13** at `81c83d7`, together with the 16 redesign commits
it was built on. Deployed figures are in "Deployed result" below; the local
before/after that follows is kept because it isolates what the perf work
itself did, separately from the redesign.

## Method

Lighthouse 13.4.1, mobile preset, default simulated throttling, against
`http://localhost:4173` (`vite preview`). Five runs, median reported. Run
under Node 26, after a one-off `chrome-launcher` failure under bun that did
not reproduce on retest — either runtime works.

Before: `f3a951d` (redesign, unmodified). After: this branch.

## Deployed result

Measured against `https://goodgradients.com`, Lighthouse mobile preset,
**fresh Chrome profile per run**, five runs.

| Category       | Before (deployed) | After (deployed) |
| -------------- | ----------------- | ---------------- |
| Performance    | 74–92, unstable   | **98**           |
| Accessibility  | 95                | **100**          |
| Best practices | 100               | **100**          |
| SEO            | 100               | **100**          |

After samples: 88 / 99 / 98 / 98 / 99. The 88 is the cold first run; every
subsequent run sits at 98–99.

**The instability is gone, and that matters as much as the median.** Before
this shipped, repeated measurement of the unchanged live site returned 74 or
92 with nothing between — two sessions measuring it got 87 and 74 as
"the" figure. The page is now tight. The likely causes were the two things
this work removed: a PostHog session recorder loading eagerly, and a
render-blocking font chain across two third-party origins, both of which can
cliff-edge on timing.

Accessibility 95 → 100 is the **redesign's** doing, not this work's.

## Local before/after (isolates the perf work)

Measured against `vite preview`, so not comparable to the deployed numbers
above — but before and after were measured identically, so the delta is the
perf work alone, with the redesign held constant.

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

Note that the second bug was introduced by the first fix, not inherited: the
upstream copy in `appleby-web-services-ltd` has no settle step, so it has
neither the phantom-contrast problem's cure nor this hang. A repo adopting
the settle step needs the infinite-animation guard with it.

## Costs accepted

- The splash hold is 800 ms shorter.
- PostHog session recording, surveys and dead-click autocapture are off. If
  session replay is actually wanted, re-enable `disable_session_recording`
  and expect to give back most of the TBT win.

## Outstanding

- **The E2E suite is red, and was before this work.** 11 of 50 tests fail
  identically on the previously deployed commit, on the redesign, and on this
  branch — so nothing here caused them. They assert UI that no longer exists:
  a `"GG"` monogram (now the Molle wordmark), a `"Click to preview
  fullscreen"` affordance, and a search input. `e2e/` was last touched
  2026-01-31 and `src/` has moved on for seven months. Deploy does not gate
  on them (`deploy` needs only `build`), which is how main has been shipping
  red. Rewriting them needs a decision about intended UI, so it was left
  alone rather than guessed at.
- `bun run lint` was not added to `verify` and has not been audited here.
- Performance stops at 98 on FCP (1.8 s, scoring 89). The entry chunk is
  482 KB and nothing paints until it executes; code-splitting the gallery is
  the next real lever.
