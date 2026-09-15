import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.1 Accessibility Tests
 *
 * These tests ensure the application meets WCAG 2.1 Level AA compliance
 * using axe-core automated testing.
 */

/*
  Re-enabled. The suite was skipped pending "a baseline of acceptable
  violations"; the actual blocker was one defect repeated four times, a
  fullscreen button nested inside the preview-tile button, which axe reported
  as nested-interactive and no-focusable-content. With that unnested the suite
  passes with the rule exclusions it always had, so there is no baseline of
  accepted violations to keep.
*/
test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('homepage should have no critical accessibility violations', async ({ page }) => {
    // Wait for animations to settle
    await page.waitForTimeout(500);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Exclude rules that are acceptable for this design tool:
      // - color-contrast: Gradient cards have variable backgrounds; we provide contrast tools
      // - scrollable-region-focusable: Gallery grid scrolls via page, not region
      // - region: Single-page app with semantic header/main/footer is acceptable
      // - landmark-one-main: We have a main element but axe may not detect it in SPA
      .disableRules(['color-contrast', 'scrollable-region-focusable', 'region', 'landmark-one-main'])
      .analyze();

    // Filter to only critical and serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    // Log violations for debugging
    if (criticalViolations.length > 0) {
      console.log('Critical violations found:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });

  test('gradient modal should have no critical accessibility violations', async ({ page }) => {
    // Open a gradient modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast', 'scrollable-region-focusable', 'region', 'landmark-one-main'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      console.log('Modal violations:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });

  test('filter dropdowns should have no critical accessibility violations', async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    // Open colors filter dropdown
    await page.locator('button[aria-label="Filter by colors"]').first().click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['aria-hidden-focus', 'scrollable-region-focusable', 'color-contrast', 'region', 'landmark-one-main'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      console.log('Filter dropdown violations:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });

  test('gradient settings panel should have no critical accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand gradient settings
    await page.getByRole('dialog').getByText('Gradient Settings').click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast', 'scrollable-region-focusable', 'region', 'landmark-one-main'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      console.log('Settings panel violations:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });

  test('animation panel should have no critical accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // The disclosure is labelled "Animate" now, not "Animate Gradient".
    await page.getByRole('dialog').getByRole('button', { name: /Animate/ }).click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast', 'scrollable-region-focusable', 'region', 'landmark-one-main'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      console.log('Animation panel violations:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });

  test('code export panel should have no critical accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Code section is always visible now, just verify it's there
    await expect(page.getByRole('dialog').getByText('Copy Code')).toBeVisible();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast', 'scrollable-region-focusable', 'region', 'landmark-one-main'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      console.log('Code export violations:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });

  test('fullscreen preview should have no critical accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Open fullscreen
    await page.getByRole('button', { name: 'View background in fullscreen' }).click();
    await expect(page.getByText('Your Headline Here')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['color-contrast', 'scrollable-region-focusable', 'region', 'landmark-one-main'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    if (criticalViolations.length > 0) {
      console.log('Fullscreen violations:', JSON.stringify(criticalViolations, null, 2));
    }

    expect(criticalViolations).toEqual([]);
  });
});

test.describe('Accessibility - Keyboard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('search input should be focusable with / key', async ({ page }) => {
    await page.keyboard.press('/');
    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeFocused();
  });

  test('modal should close with Escape key', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('gradient cards should be keyboard accessible', async ({ page }) => {
    // The gradient cards should be clickable and focusable
    const firstCard = page.locator('[data-testid="gradient-card"]').first();
    await firstCard.focus();
    await expect(firstCard).toBeFocused();

    // Pressing Enter should open the modal
    await page.keyboard.press('Enter');
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('buttons should have visible focus indicators', async ({ page }) => {
    // Open modal to test button focus
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Tab through buttons and check focus is visible
    const favoriteButton = page.getByRole('dialog').locator('button').first();
    await favoriteButton.focus();

    // Focus should be visible (the element should have focus styles)
    await expect(favoriteButton).toBeFocused();
  });
});

test.describe('Accessibility - ARIA Labels', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('icon buttons should have aria-labels', async ({ page }) => {
    // Open a card to check modal buttons
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Check favorite button has aria-label
    const favoriteButton = page.getByRole('dialog').locator('button[aria-label*="favorites"]');
    await expect(favoriteButton).toBeVisible();

    // Check share button has aria-label
    const shareButton = page.getByRole('dialog').locator('button[aria-label="Share gradient"]');
    await expect(shareButton).toBeVisible();

    // Fullscreen is entered per preview tile now, each with its own label.
    const fullscreenButton = page
      .getByRole('dialog')
      .locator('button[aria-label="View background in fullscreen"]');
    await expect(fullscreenButton).toBeVisible();
  });

  test('gradient cards should have heart buttons with aria-labels', async ({ page }) => {
    // Hover on first card to reveal action buttons
    const firstCard = page.locator('[data-testid="gradient-card"]').first();
    await firstCard.hover();

    // Check heart button has aria-label
    const heartButton = firstCard.locator('button[aria-label*="favorites"]');
    await expect(heartButton).toBeVisible();
  });

  test('animation picker should have aria-label', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    /*
      The play/pause toggle became a picker of named animations, so the
      labelled control to assert on is the picker itself. It lives behind the
      "Animate" disclosure, which has to be opened before it has a size.
    */
    await page.getByRole('dialog').getByRole('button', { name: /Animate/ }).click();
    await expect(
      page.getByRole('dialog').getByRole('group', { name: 'Select animation' }),
    ).toBeVisible();
  });
});

test.describe('Accessibility - Color Contrast', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('modal shows accessibility information for text colors', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Should show accessibility label
    await expect(page.getByRole('dialog').getByText('Accessibility:')).toBeVisible();

    // Should show AA/AAA compliance badges
    const accessibilityInfo = page.getByRole('dialog').locator('text=/AA|AAA|Fail/');
    await expect(accessibilityInfo.first()).toBeVisible();
  });

  test('fullscreen preview shows recommended text colors with contrast info', async ({ page }) => {
    // Open modal and fullscreen
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByRole('button', { name: 'View background in fullscreen' }).click();

    // Should show recommended text colors
    await expect(page.getByText('Recommended text:')).toBeVisible();
  });
});

test.describe('Accessibility - Screen Reader Support', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('page should have proper heading hierarchy', async ({ page }) => {
    // One h1 wordmark, and card titles at h2 so the order never skips a level.
    await expect(
      page.getByRole('heading', { level: 1, name: 'GoodGradients' }),
    ).toBeVisible();
    const levels = await page.evaluate(() =>
      [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) =>
        Number(h.tagName[1]),
      ),
    );
    for (let i = 1; i < levels.length; i++) {
      expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
    }

    // Open modal and check dialog has title
    await page.locator('[data-testid="gradient-card"]').first().click();
    const dialogTitle = page.getByRole('dialog').getByRole('heading');
    await expect(dialogTitle).toBeVisible();
  });

  test('dialog should have proper role and be announced', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();

    // Dialog should have role="dialog"
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
  });

  test('interactive elements should have accessible names', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // All buttons should have accessible names
    const buttons = page.getByRole('dialog').getByRole('button');
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      const accessibleName = await button.getAttribute('aria-label') || await button.textContent();
      expect(accessibleName).toBeTruthy();
    }
  });
});
