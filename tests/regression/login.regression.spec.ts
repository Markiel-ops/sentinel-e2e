import { test, expect } from '@playwright/test';

test.describe('@regression Post-auth dashboard checks', () => {

  test('Authenticated user can access dashboard', async ({ page }) => {
    await page.goto('/dashboard', { waitUntil: 'domcontentloaded' });

    // ✅ Strong, reliable assertion
    await expect(page).toHaveURL(/dashboard/);

    // ✅ Check for something REAL on dashboard
    await expect(
      page.locator('nav') // or sidebar / header / menu
    ).toBeVisible();
  });

});
