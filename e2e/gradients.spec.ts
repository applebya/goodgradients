import { test, expect, Page } from '@playwright/test';

// Helper to skip the discovery wizard by setting localStorage before navigation
async function skipWizard(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('goodgradients_wizard_completed', 'true');
  });
}

test.describe('GoodGradients - Gallery', () => {
  test.beforeEach(async ({ page }) => {
    await skipWizard(page);
    await page.goto('/');
    // Wait for the app to fully load
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });
  });

  test('should display the header with branding', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'GoodGradients' })).toBeVisible();
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
    await skipWizard(page);
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

    // Should show use case labels
    await expect(page.getByRole('dialog').getByText('Background')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Button')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Text')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Badge')).toBeVisible();
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

  test('should show collapsible code export', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Click to expand code section
    await page.getByRole('dialog').getByText('Copy Code').click();

    // Should show CSS and Tailwind buttons
    await expect(page.getByRole('dialog').getByText('CSS')).toBeVisible();
    await expect(page.getByRole('dialog').getByText('Tailwind')).toBeVisible();
  });

  test('should copy CSS code', async ({ page }) => {
    await page.locator('[data-testid="gradient-card"]').first().click();
    await expect(page.getByRole('dialog')).toBeVisible();

    // Expand code section
    await page.getByRole('dialog').getByText('Copy Code').click();

    // Click CSS copy button
    await page.getByRole('dialog').locator('button').filter({ hasText: 'CSS' }).click();

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
    await skipWizard(page);
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
    await skipWizard(page);
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
    await skipWizard(page);
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
    await skipWizard(page);
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Favorites filter button should exist
    const favoritesButton = page.locator('button').filter({ hasText: /^Favorites$/ });
    await expect(favoritesButton).toBeVisible();
  });
});

test.describe('GoodGradients - Keyboard Shortcuts', () => {
  test('should show keyboard shortcuts in footer', async ({ page }) => {
    await skipWizard(page);
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Footer should show shortcuts
    await expect(page.getByText('Focus search')).toBeVisible();
  });

  test('should close modal with escape key', async ({ page }) => {
    await skipWizard(page);
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

// Discovery Wizard Tests - Single-page wizard with Mood + Colors sections
test.describe('GoodGradients - Discovery Wizard', () => {
  test('should auto-open wizard on first visit', async ({ page }) => {
    // Don't skip wizard for this test
    await page.goto('/');

    // Wait for wizard to auto-open (500ms delay + render time)
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });
    await expect(page.getByText('Find your gradient')).toBeVisible();
  });

  test('should close wizard by clicking outside (dialog dismiss)', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    // Press Escape to close (standard dialog dismiss)
    await page.keyboard.press('Escape');

    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible();

    // Gallery should be visible
    await expect(page.locator('[data-testid="gradient-card"]').first()).toBeVisible();
  });

  test('should show single-page wizard with mood and colors', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    // Both sections should be visible on same page (use exact match)
    await expect(page.getByText('Mood', { exact: true })).toBeVisible();
    await expect(page.getByText('Colors', { exact: true })).toBeVisible();

    // Mood options should be visible
    await expect(page.getByRole('dialog').locator('button', { hasText: 'Playful' })).toBeVisible();
    await expect(page.getByRole('dialog').locator('button', { hasText: 'Bold' })).toBeVisible();

    // Color options should be visible
    await expect(page.getByRole('dialog').locator('button', { hasText: 'Purple' })).toBeVisible();
    await expect(page.getByRole('dialog').locator('button', { hasText: 'Blue' })).toBeVisible();
  });

  test('should apply filters and close wizard', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    // Select a mood
    await page.getByRole('dialog').locator('button', { hasText: 'Playful' }).click();

    // Select colors
    await page.getByRole('dialog').locator('button', { hasText: 'Purple' }).click();
    await page.getByRole('dialog').locator('button', { hasText: 'Pink' }).click();

    // Click Show results
    await page.getByRole('button', { name: 'Show results' }).click();

    // Dialog should close and gallery should show filtered results
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.locator('[data-testid="gradient-card"]').first()).toBeVisible();
  });

  test('should allow multi-select for colors', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    // Select multiple colors (all on same page)
    await page.getByRole('dialog').locator('button', { hasText: 'Blue' }).click();
    await page.getByRole('dialog').locator('button', { hasText: 'Green' }).click();
    await page.getByRole('dialog').locator('button', { hasText: 'Teal' }).click();

    // All should be selected (have active styling with border-white)
    const blueButton = page.getByRole('dialog').locator('button', { hasText: 'Blue' });
    await expect(blueButton).toHaveClass(/border-white/);
  });

  test('should show wizard button in header', async ({ page }) => {
    await skipWizard(page);
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Wizard button (sparkles icon) should be visible
    await expect(page.getByRole('button', { name: /Find gradients/i })).toBeVisible();
  });

  test('should reopen wizard from header button', async ({ page }) => {
    await skipWizard(page);
    await page.goto('/');
    await page.waitForSelector('[data-testid="gradient-card"]', { timeout: 15000 });

    // Click wizard button
    await page.getByRole('button', { name: /Find gradients/i }).click();

    // Wizard should open
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText('Find your gradient')).toBeVisible();
  });

  test('should show match count', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    // Should show matches text
    await expect(page.getByText(/\d+ matches?$/)).toBeVisible();
  });

  test('should toggle mood selection', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    const playfulButton = page.getByRole('dialog').locator('button', { hasText: 'Playful' });

    // Select mood
    await playfulButton.click();
    await expect(playfulButton).toHaveClass(/border-white/);

    // Deselect mood (toggle)
    await playfulButton.click();
    await expect(playfulButton).not.toHaveClass(/border-white/);
  });

  test('should skip wizard without selections', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 5000 });

    // Close button should say "Close" when no selections (use first to avoid X button)
    await page.getByRole('button', { name: 'Close' }).first().click();

    // Dialog should close
    await expect(page.getByRole('dialog')).not.toBeVisible();
    await expect(page.locator('[data-testid="gradient-card"]').first()).toBeVisible();
  });
});
