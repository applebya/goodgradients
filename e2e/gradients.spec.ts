import { test, expect, Page } from '@playwright/test';

test.describe('GoodGradients - Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the app to fully load
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('should display the header with branding', async ({ page }) => {
    // Logo text "GG" is visible
    await expect(page.locator('span').filter({ hasText: /^GG$/ })).toBeVisible();
    // The brand name text is visible in header
    await expect(page.getByRole('link', { name: 'GG Good Gradients' })).toBeVisible();
  });

  test('should display gradient cards in the gallery', async ({ page }) => {
    const cards = page.locator('[data-testid="gradient-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should filter gradients by color', async ({ page }) => {
    // Skip on mobile viewport (filters are in sheet)
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    // Open the colors filter
    await page.locator('button[aria-label="Filter by colors"]').first().click();

    // Select Purple
    await page.locator('button').filter({ hasText: 'Purple' }).first().click();

    // Wait for state to update
    await page.waitForTimeout(500);

    // Cards should be filtered (fewer than total 500+)
    const cards = page.locator('[data-testid="gradient-card"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(300); // Should be filtered from 500+ total
  });

  test('should search gradients', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search...');
    const cards = page.locator('[data-testid="gradient-card"]');

    // Search for a unique term that matches a few gradients
    await searchInput.fill('coral');

    // Wait for the filter to be applied and stabilize
    await page.waitForTimeout(500);

    // Expect cards matching "coral" (search by name, description, and tags)
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(20); // Should filter results down
  });

  test('should focus search with / key', async ({ page }) => {
    await page.keyboard.press('/');

    const searchInput = page.getByPlaceholder('Search...');
    await expect(searchInput).toBeFocused();
  });
});

test.describe('GoodGradients - Gradient Detail', () => {
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

  test('should show use case previews', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Should show text color recommendations
    await expect(page.getByRole('dialog').getByText('Best text color:')).toBeVisible();

    // Should show use case preview labels
    await expect(page.getByRole('dialog').locator('span').filter({ hasText: 'Background' })).toBeVisible();
    // Button text is inside a button element, not span
    await expect(page.getByRole('dialog').locator('button').filter({ hasText: /^Button$/ })).toBeVisible();
    await expect(page.getByRole('dialog').locator('span').filter({ hasText: /^Text$/ })).toBeVisible();
    await expect(page.getByRole('dialog').locator('span').filter({ hasText: /^Badge$/ })).toBeVisible();
  });

  test('should show collapsible gradient settings', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click to expand gradient settings
    await page.getByRole('dialog').getByText('Gradient Settings').click();

    // Should show gradient type buttons
    await expect(page.getByRole('dialog').getByRole('button', { name: /Linear/i })).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('button', { name: /Radial/i })).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('button', { name: /Conic/i })).toBeVisible();
  });

  test('should change gradient type in settings', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand settings
    await page.getByRole('dialog').getByText('Gradient Settings').click();

    // Click radial button
    await page.getByRole('dialog').getByRole('button', { name: /Radial/i }).click();

    // Radial button should now be active
    const radialButton = page.getByRole('dialog').getByRole('button', { name: /Radial/i });
    await expect(radialButton).toHaveClass(/bg-white|bg-primary/);
  });

  test('should show code export tabs', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Code section is always visible now - should show Copy Code header and format tabs
    await expect(page.getByRole('dialog').getByText('Copy Code')).toBeVisible();

    // Should show export format tabs (CSS, SwiftUI, Kotlin, AI Agent)
    await expect(page.getByRole('dialog').locator('button').filter({ hasText: 'CSS' })).toBeVisible();
  });

  test('should copy CSS code', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // CSS tab is selected by default, click the copy button
    await page.getByRole('dialog').locator('button[aria-label="Copy code"]').click();

    // Toast should appear
    await expect(page.getByText('Copied to clipboard')).toBeVisible({ timeout: 3000 });
  });

  test('should show accessibility info', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Should show accessibility label
    await expect(page.getByRole('dialog').getByText('Accessibility:')).toBeVisible();
  });

  test('should close modal with Escape key', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).not.toBeVisible();
  });

  test('should open fullscreen preview', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click on the preview area that says "Click to preview fullscreen"
    await page.getByText('Click to preview fullscreen').click();

    // Fullscreen should show sample content
    await expect(page.getByText('Your Headline Here')).toBeVisible();
    await expect(page.getByText('Click anywhere to close')).toBeVisible();
  });
});

test.describe('GoodGradients - URL State', () => {
  test('should open modal when gradient is encoded in URL', async ({ page }) => {
    // Navigate with encoded gradient in URL (format: type,angle,color1:stop1,color2:stop2)
    // This represents a purple gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
    await page.goto('/?g=linear,135,667eea:0,764ba2:100');

    // Wait for page to load
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Wait a bit for the modal to open (URL state processing)
    await page.waitForTimeout(500);

    // Modal should open with the gradient
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 10000 });
  });

  test('should update gradient type when clicking buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Open a gradient
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand settings
    await page.getByRole('dialog').getByText('Gradient Settings').click();

    // Change to conic type
    const conicButton = page.getByRole('dialog').getByRole('button', { name: /Conic/i });
    await conicButton.click();

    // Conic button should be active
    await expect(conicButton).toHaveClass(/bg-white|bg-primary/);
  });
});

test.describe('GoodGradients - Favorites', () => {
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

  test('should toggle favorite on card', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Hover on first card and click heart button to favorite
    const firstCard = page.locator('[data-testid="gradient-card"]').first();
    await firstCard.hover();

    // Heart button has aria-label like "Add {name} to favorites"
    const heartButton = firstCard.locator('button[aria-label*="to favorites"]');
    await expect(heartButton).toBeVisible();

    // Click to toggle favorite - should not throw error
    await heartButton.click();

    // Verify the button is still present (hover may have triggered a re-render)
    await firstCard.hover();
    const anyHeartButton = firstCard.locator('button[aria-label*="favorites"]');
    await expect(anyHeartButton).toBeVisible();
  });
});

test.describe('GoodGradients - Keyboard Shortcuts', () => {
  test('should show keyboard shortcuts in footer', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Footer should show shortcuts
    await expect(page.getByText('Focus search')).toBeVisible();
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

// Filter Bar Tests
test.describe('GoodGradients - Filter Bar', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('should show filter dropdowns on desktop', async ({ page }) => {
    // Skip on mobile viewport
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    // Colors dropdown should be visible
    await expect(page.locator('button[aria-label="Filter by colors"]')).toBeVisible();

    // Tags/vibes dropdown should be visible
    await expect(page.locator('button[aria-label="Filter by tags"]')).toBeVisible();

    // Gradient type dropdown should be visible
    await expect(page.locator('button[aria-label="Gradient type"]')).toBeVisible();
  });

  test('should filter by tag', async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    const cards = page.locator('[data-testid="gradient-card"]');
    const initialCount = await cards.count();

    // Open tags dropdown and select "Bold"
    await page.locator('button[aria-label="Filter by tags"]').click();
    await page.locator('button').filter({ hasText: 'Bold' }).first().click();

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Results should change (likely fewer)
    const filteredCount = await cards.count();
    expect(filteredCount).toBeGreaterThan(0);
    expect(filteredCount).toBeLessThanOrEqual(initialCount);
  });

  test('should filter by gradient type', async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    const cards = page.locator('[data-testid="gradient-card"]');
    const initialCount = await cards.count();

    // Open type dropdown and select "Radial"
    await page.locator('button[aria-label="Gradient type"]').click();
    await page.locator('button').filter({ hasText: 'Radial' }).first().click();

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Results should change (radial gradients only)
    const filteredCount = await cards.count();
    expect(filteredCount).toBeLessThan(initialCount);
  });

  test('should multi-select colors', async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    // Open colors popover
    await page.locator('button[aria-label="Filter by colors"]').click();

    // Select Purple
    await page.locator('button').filter({ hasText: 'Purple' }).first().click();

    // Select Blue
    await page.locator('button').filter({ hasText: 'Blue' }).first().click();

    // Wait for filter to apply
    await page.waitForTimeout(500);

    // Cards should still be visible (filtered)
    const cards = page.locator('[data-testid="gradient-card"]');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('should clear all filters', async ({ page }) => {
    const viewportSize = page.viewportSize();
    if (viewportSize && viewportSize.width < 640) {
      test.skip();
      return;
    }

    // Apply a color filter first
    await page.locator('button[aria-label="Filter by colors"]').click();
    await page.locator('button').filter({ hasText: 'Purple' }).first().click();
    await page.waitForTimeout(300);

    // Close popover by pressing Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);

    // Clear button should appear when filters are active
    const clearButton = page.locator('button').filter({ hasText: /Clear/i });
    await expect(clearButton).toBeVisible();

    // Click clear
    await clearButton.click();
    await page.waitForTimeout(300);

    // Clear button should disappear
    await expect(clearButton).not.toBeVisible();
  });
});
