import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.locator('#email').fill(process.env.VOYA_EMAIL!);
  await page.locator('#password').fill(process.env.VOYA_PASSWORD!);
  await page.locator('button[type="submit"]').click();

  await page.waitForURL(/dashboard/);

  await page.context().storageState({ path: 'storage/auth.json' });
});
