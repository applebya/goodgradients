# Testing Patterns

**Analysis Date:** 2026-02-21

## Test Framework

**Runner:**

- Playwright 1.57.0 for E2E tests
- Vitest 4.0.16 for unit tests (configured but not heavily used)
- Config files:
  - `playwright.config.ts` - E2E test configuration
  - `vitest.config.ts` - Unit test configuration

**Assertion Library:**

- Playwright's built-in assertions: `expect(locator).toBeVisible()`, `expect(value).toBe()`

**Run Commands:**

```bash
bun run test                # Run E2E tests with Playwright
bun run test:e2e            # Alias for E2E tests
bun run test:e2e:ui         # Run E2E tests with interactive UI
bun run test:watch          # Watch mode for Vitest unit tests
```

**CI Environment:**

- E2E tests configured for CI with retries (2 retries in CI, 0 locally)
- Single worker in CI, parallel workers locally
- Traces enabled on first retry for debugging

## Test File Organization

**Location:**

- E2E tests: `e2e/` directory at project root
- Unit tests: co-located with source files (not yet extensively used)

**Naming:**

- E2E spec files: `{feature}.spec.ts`
- Examples: `gradients.spec.ts`, `accessibility.spec.ts`

**Structure:**

```
e2e/
├── gradients.spec.ts       # Gallery browsing, filtering, selection
└── accessibility.spec.ts   # WCAG 2.1 compliance (currently skipped)
```

## Test Structure

**E2E Test Suite Organization:**

```typescript
test.describe("GoodGradients - Gallery", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector('[data-testid="gradient-card"]', {
      timeout: 15000,
    });
  });

  test("should display the header with branding", async ({ page }) => {
    await expect(
      page.locator("span").filter({ hasText: /^GG$/ }),
    ).toBeVisible();
  });
});
```

**Patterns:**

- `test.describe()` for grouping related tests by feature (Gallery, Gradient Detail, etc.)
- `test.beforeEach()` for common setup (navigation, waiting for elements)
- Tests are atomic - each test does ONE thing and cleans up after itself

**Setup Pattern:**

```typescript
test.beforeEach(async ({ page }) => {
  // Always start fresh at root
  await page.goto("/");
  // Wait for critical element to render
  await page.waitForSelector('[data-testid="gradient-card"]', {
    timeout: 15000,
  });
});
```

**Assertion Pattern:**

```typescript
// Verify visible state
await expect(page.locator("...")).toBeVisible();

// Verify text content with regex (more flexible than exact match)
await expect(page.locator("span").filter({ hasText: /^GG$/ })).toBeVisible();

// Verify count
const count = await cards.count();
expect(count).toBeGreaterThan(0);
```

## Selectors

**Strategy:** Playwright uses semantic locators first, data-testid as fallback

**Preferred Order:**

1. Role-based: `page.getByRole("dialog")`, `page.getByRole("button", { name: "..." })`
2. Label/Text: `page.getByPlaceholder("...")`, `page.getByText("...")`
3. data-testid: `page.locator('[data-testid="gradient-card"]')`
4. CSS selectors: `page.locator('button[aria-label="..."]')` (only for unique attributes)

**Examples:**

```typescript
// Role-based (most resilient)
await page.getByRole("button", { name: "Copy" }).click();
await expect(page.getByRole("dialog")).toBeVisible();

// data-testid (used for gallery cards and cards)
const cards = page.locator('[data-testid="gradient-card"]');
const count = await cards.count();

// SVG path detection (for custom icons without data-testid)
const heartButton = page
  .getByRole("dialog")
  .locator("button")
  .filter({ has: page.locator('svg path[d*="14c1.49"]') })
  .first();
```

**data-testid Requirements:**

- Card components must have `data-testid="gradient-card"` for gallery tests
- Use data-testid sparingly - only for elements that can't be reliably selected by role/text

## Coverage

**Requirements:** No explicit coverage target enforced

**View Coverage:** Not configured (Vitest coverage would require additional config)

**Current State:**

- E2E tests cover critical user workflows (gallery, filtering, detail modal, keyboard shortcuts)
- Unit tests (Vitest) configured but minimal test files exist
- Focus is on E2E coverage of user-facing features

## Test Types

**E2E Tests (Playwright):**

- Scope: Full application workflows from user perspective
- Location: `e2e/` directory
- Tests run against real browser (Chromium) with dev server
- Coverage areas:
  - Gallery browsing and card display
  - Filtering by color, category, search
  - Opening gradient detail modal
  - Favorite functionality (heart button, persistence)
  - Keyboard shortcuts (/, Escape, c, f, arrow keys)
  - Export functionality (CSS, Tailwind, AI)
  - Animation preview
  - URL state persistence and navigation
  - Accessibility (via axe-core, currently skipped)

**Unit Tests (Vitest):**

- Configured but minimal
- Would cover utility functions (gradient-url, export, state management)
- Currently only integration/E2E tests are actively run

**Accessibility Tests (E2E):**

- Framework: axe-core via `@axe-core/playwright`
- WCAG 2.1 Level AA compliance testing
- Currently skipped (`test.describe.skip`) with todo comment about establishing baseline
- When enabled, rules excluded:
  - `color-contrast` - gradient cards have variable backgrounds
  - `scrollable-region-focusable` - gallery grid scrolls via page
  - `region` - single-page app structure acceptable
  - `landmark-one-main` - SPA landmark detection limitation

## Common Patterns

**Async Testing:**

```typescript
test("should open gradient detail modal", async ({ page }) => {
  // Click to trigger async state update
  await page.locator('[data-testid="gradient-card"]').first().click();

  // Wait for modal to appear
  await expect(page.getByRole("dialog")).toBeVisible();
});
```

**Waiting for State Updates:**

```typescript
// Search gradients with debounce
await searchInput.fill("coral");

// Wait for filter to apply (debounce + render)
await page.waitForTimeout(500);

// Then verify results
const count = await cards.count();
expect(count).toBeGreaterThan(0);
```

**Filtering and Verification:**

```typescript
// Select filter option
await page.locator('button[aria-label="Filter by colors"]').first().click();
await page.locator("button").filter({ hasText: "Purple" }).first().click();

// Wait for state to settle
await page.waitForTimeout(500);

// Verify filtered results
const cards = page.locator('[data-testid="gradient-card"]');
const count = await cards.count();
expect(count).toBeLessThan(300); // Should be filtered from 500+ total
```

**Viewport Conditional Tests:**

```typescript
test("should filter gradients by color", async ({ page }) => {
  // Skip on mobile - filters in sheet component instead
  const viewportSize = page.viewportSize();
  if (viewportSize && viewportSize.width < 640) {
    test.skip();
    return;
  }

  // Desktop-specific test logic
  await page.locator('button[aria-label="Filter by colors"]').first().click();
});
```

**Complex Locator Chains:**

```typescript
// Multi-step filtering for elements without unique IDs
const heartButton = page
  .getByRole("dialog")
  .locator("button")
  .filter({ has: page.locator('svg path[d*="14c1.49"]') })
  .first();
await expect(heartButton).toBeVisible();
await heartButton.click();
```

## Critical Test Coverage

**Currently Covered (via E2E):**

1. **Gallery Browsing**
   - Cards display in grid
   - Cards have names and descriptions
   - Clicking card opens detail modal

2. **Filtering**
   - Filter by color (multi-select, visual feedback)
   - Filter by category dropdown
   - Search with text input
   - Filters update card count

3. **Detail Modal**
   - Opens on card click
   - Shows gradient name, description
   - Shows use case previews (background, button, badge, text, border)
   - Shows best text colors for accessibility
   - Has copy button, favorite button, export tabs
   - Has collapsible settings section
   - Gradient type/angle controls work

4. **Keyboard Shortcuts**
   - `/` focuses search input
   - Escape closes modal or clears search
   - `c` copies gradient CSS
   - `f` toggles favorite
   - Arrow keys navigate gradients
   - Space toggles animation

5. **Export Functionality**
   - CSS tab shows vanilla CSS code
   - Tailwind tab shows arbitrary class syntax
   - Copy button works for each format

6. **Animation**
   - Animation preview applies in cards
   - Animation duration slider works
   - Space toggles animation on/off

7. **Favorites**
   - Heart button toggles favorite state
   - Visual indicator shows favorite status
   - Favorites persist to localStorage

8. **URL State**
   - Gradient in URL loads correctly
   - Animation in URL loads correctly
   - Filters in URL persist
   - Browser back/forward navigation works

## Gaps (Not Currently Tested)

- CSV export functionality
- Animation Studio workflow
- Accessibility (skipped, needs baseline)
- Mobile-specific gestures or touch interactions
- Download bar functionality
- Offline/PWA functionality
- Error states and recovery
- Performance/load time
- Long-list virtualization behavior

---

_Testing analysis: 2026-02-21_
