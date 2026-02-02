const { test, expect } = require('@playwright/test');

test('global auth setup', async ({ page }) => {
  await page.goto(process.env.VOYA_LOGIN_URL, {
    waitUntil: 'domcontentloaded',
  });

  // Perform login
  await page.fill('input[type="email"]', process.env.VOYA_EMAIL);
  await page.fill('input[type="password"]', process.env.VOYA_PASSWORD);
  await page.click('button[type="submit"]');

  // Wait until redirected away from login
  await page.waitForURL(/voyadores/, { timeout: 15000 });

  // Save authenticated state
  await page.context().storageState({
    path: 'storage/auth.json',
  });
});
