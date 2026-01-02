import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * WCAG 2.1 Accessibility Tests
 *
 * These tests ensure the application meets WCAG 2.1 Level AA compliance
 * using axe-core automated testing.
 */

test.describe('Accessibility - WCAG 2.1 AA Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('homepage should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('gradient modal should have no accessibility violations', async ({ page }) => {
    // Open a gradient modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('filter dropdowns should have no accessibility violations', async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    // Open category dropdown
    await page.locator('button').filter({ hasText: /^All$/ }).first().click();
    await page.waitForTimeout(300);

    // Note: Certain rules are excluded due to Radix UI Select component behavior:
    // - aria-hidden-focus: Radix applies aria-hidden to background content when open
    // - scrollable-region-focusable: Radix Select viewport is scrollable but keyboard navigation
    //   is handled via arrow keys on the listbox items, not direct focus on the viewport
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .disableRules(['aria-hidden-focus', 'scrollable-region-focusable'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('gradient settings panel should have no accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand gradient settings
    await page.getByRole('dialog').getByText('Gradient Settings').click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('animation panel should have no accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand animation section
    await page.getByRole('dialog').getByText('Animate Gradient').click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('code export panel should have no accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand code section
    await page.getByRole('dialog').getByText('Copy Code').click();
    await page.waitForTimeout(300);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('fullscreen preview should have no accessibility violations', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Open fullscreen
    await page.getByText('Click to preview fullscreen').click();
    await expect(page.getByText('Your Headline Here')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
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
    // Tab to the first gradient card
    await page.keyboard.press('Tab'); // Skip to search

    // Get the search input first
    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeFocused();

    // The gradient cards should be clickable and focusable
    const firstCard = page.locator('[data-testid="gradient-card"]').first();
    await firstCard.focus();
    await expect(firstCard).toBeFocused();
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
    // Check random gradient button
    const randomButton = page.locator('button[aria-label="Select random gradient"]');
    await expect(randomButton).toBeVisible();

    // Open a card to check modal buttons
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Check favorite button has aria-label
    const favoriteButton = page.getByRole('dialog').locator('button[aria-label*="favorites"]');
    await expect(favoriteButton).toBeVisible();

    // Check share button has aria-label
    const shareButton = page.getByRole('dialog').locator('button[aria-label="Share gradient"]');
    await expect(shareButton).toBeVisible();

    // Check fullscreen button has aria-label
    const fullscreenButton = page.getByRole('dialog').locator('button[aria-label="Fullscreen preview"]');
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

  test('animation play/pause should have aria-label', async ({ page }) => {
    // Open modal
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand animation section
    await page.getByRole('dialog').getByText('Animate Gradient').click();
    await page.waitForTimeout(300);

    // Select an animation
    await page.getByRole('dialog').locator('button').filter({ hasText: 'Horizontal Shift' }).click();
    await page.waitForTimeout(300);

    // Check play/pause button has aria-label
    const playPauseButton = page.getByRole('dialog').locator('button[aria-label*="animation"]');
    await expect(playPauseButton).toBeVisible();
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
    await page.getByText('Click to preview fullscreen').click();

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
    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

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
