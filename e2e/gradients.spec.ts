import { test, expect } from '@playwright/test';

test.describe('OnlyGradients - Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to fully load
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('should display the header with branding', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'OnlyGradients' })).toBeVisible();
    await expect(page.getByText('CSS gradients for developers')).toBeVisible();
  });

  test('should display gradient cards in the gallery', async ({ page }) => {
    const cards = page.locator('[data-testid="gradient-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter gradients by category', async ({ page }) => {
    // Click on a category button (the pill buttons under the search)
    const purpleButton = page.locator('button').filter({ hasText: /^Purple$/ });
    await purpleButton.click();

    // Wait for state to update
    await page.waitForTimeout(500);

    // Check that the Purple button is now active (has different styling)
    await expect(purpleButton).toHaveClass(/bg-white/);
  });

  test('should search gradients', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search gradients, colors, or tags...');
    const cards = page.locator('[data-testid="gradient-card"]');

    // Search for a unique term that matches a few gradients
    await searchInput.fill('coral');

    // Wait for the filter to be applied and stabilize
    await page.waitForTimeout(500);

    // Expect cards matching "coral" (search by name, description, and tags)
    await expect(cards).toHaveCount(4, { timeout: 10000 });
  });

  test('should focus search with / key', async ({ page }) => {
    await page.keyboard.press('/');

    const searchInput = page.getByPlaceholder('Search gradients, colors, or tags...');
    await expect(searchInput).toBeFocused();
  });
});

test.describe('OnlyGradients - Gradient Detail', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('should open gradient detail modal when clicking a card', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();

    // Modal should be visible
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should have favorite button in modal', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Find heart button in the modal (look for button with heart SVG path)
    const heartButton = page.getByRole('dialog').locator('button').filter({ has: page.locator('svg path[d*="14c1.49"]') }).first();
    await expect(heartButton).toBeVisible();

    // Click it - should not throw error
    await heartButton.click();
  });

  test('should change gradient type between linear/radial/conic', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click radial button
    await page.getByRole('dialog').getByRole('button', { name: /Radial/i }).click();

    // Radial button should now be active
    const radialButton = page.getByRole('dialog').getByRole('button', { name: /Radial/i });
    await expect(radialButton).toHaveClass(/bg-white|bg-primary/);
  });

  test('should copy CSS code', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click copy button in CSS tab (look for button with copy SVG)
    const copyButton = page.getByRole('dialog').locator('button').filter({ has: page.locator('svg rect[width="14"]') }).first();
    await copyButton.click();

    // Toast should appear
    await expect(page.getByText('Copied to clipboard')).toBeVisible({ timeout: 3000 });
  });

  test('should close modal with Escape key', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});

test.describe('OnlyGradients - Animation Studio', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('should open animation studio', async ({ page }) => {
    // Click the Animation Studio button in header
    await page.getByRole('button', { name: /Animation Studio/i }).click();

    // Dialog should be visible
    await expect(page.getByRole('dialog')).toBeVisible();

    // Should have the Animation Studio heading
    await expect(page.getByRole('heading', { name: 'Animation Studio' })).toBeVisible();
  });

  test('should show animation category filters', async ({ page }) => {
    await page.getByRole('button', { name: /Animation Studio/i }).click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Should show "All" category button (use exact match)
    await expect(page.getByRole('dialog').getByRole('button', { name: 'All', exact: true })).toBeVisible();

    // Should show animation cards
    const animationText = page.getByRole('dialog').locator('text=Shift');
    await expect(animationText.first()).toBeVisible();
  });
});

test.describe('OnlyGradients - URL State', () => {
  test('should open modal when gradient ID is in URL', async ({ page }) => {
    // Navigate with URL parameters for a known gradient
    await page.goto('/?g=purple-1');

    // Wait for page to load
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Modal should open with the gradient (give it more time)
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  });

  test('should update gradient type when clicking buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Open a gradient
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Change to conic type
    const conicButton = page.getByRole('dialog').getByRole('button', { name: /Conic/i });
    await conicButton.click();

    // Conic button should be active
    await expect(conicButton).toHaveClass(/bg-white|bg-primary/);
  });
});

test.describe('OnlyGradients - Export Formats', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should show CSS export tab', async ({ page }) => {
    // Click CSS tab (Use Cases is now default)
    await page.getByRole('tab', { name: 'CSS' }).click();

    // Should show CSS code with .gradient class
    await expect(page.getByRole('dialog').locator('code')).toContainText('.gradient');
  });

  test('should show Tailwind export tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'Tailwind' }).click();

    // Should show Tailwind classes
    await expect(page.getByRole('dialog').locator('code')).toContainText('bg-');
  });

  test('should show AI Description export tab', async ({ page }) => {
    await page.getByRole('tab', { name: 'AI Desc' }).click();

    // Should show natural language description
    const preElement = page.getByRole('dialog').locator('pre');
    await expect(preElement).toBeVisible();
  });

  test('should show WCAG contrast info', async ({ page }) => {
    await page.getByRole('tab', { name: 'WCAG' }).click();

    // Should show contrast information
    await expect(page.getByRole('dialog').getByText('Average Color')).toBeVisible();
  });
});

test.describe('OnlyGradients - Favorites', () => {
  test('should have heart button on cards', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Hover on first card to reveal action buttons
    const firstCard = page.locator('[data-testid="gradient-card"]').first();
    await firstCard.hover();

    const heartButton = firstCard.locator('button').filter({ has: page.locator('svg path[d*="14c1.49"]') });
    await expect(heartButton).toBeVisible();

    // Click should not throw
    await heartButton.click();
  });

  test('should show favorites filter button', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Favorites filter button should exist
    const favoritesButton = page.locator('button').filter({ hasText: /^Favorites$/ });
    await expect(favoritesButton).toBeVisible();
  });
});

test.describe('OnlyGradients - Keyboard Shortcuts', () => {
  test('should show keyboard shortcuts in footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Footer should show shortcuts
    await expect(page.getByText('Focus search')).toBeVisible();
  });

  test('should toggle animation with space key in detail modal', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Select an animation first
    const animationButton = page.getByRole('dialog').locator('button').filter({ hasText: /Shift|Pulse/i }).first();
    if (await animationButton.count() > 0) {
      await animationButton.click();
    }

    // Press space to toggle animation - should not throw error
    await page.keyboard.press(' ');

    // The test passes if no error is thrown
    await expect(page.getByRole('dialog')).toBeVisible();
  });

  test('should close modal with escape key', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Press escape to close
    await page.keyboard.press('Escape');

    // Modal should be closed
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });
});
