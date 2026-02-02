import { test, expect } from '@playwright/test';

test.describe('Sentinel | Post-Auth Smoke', () => {
  test('@smoke Unauthenticated user is redirected to login', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await expect(page).toHaveURL(/dev2-login\.voyadores\.com/);
  });
});
