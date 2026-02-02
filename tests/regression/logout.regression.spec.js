import { test, expect } from '@playwright/test';

test.describe('@regression Logout flow (login → logout)', () => {

  test('User can login via auth domain and logout successfully', async ({ page }) => {
    // 1️⃣ Go to LOGIN DOMAIN ROOT (IMPORTANT)
    await page.goto(process.env.LOGIN_URL, {
      waitUntil: 'domcontentloaded',
    });

    // 2️⃣ Fill credentials (no /login path involved)
    await page.locator('#inp-login-username').fill(process.env.VOYA_EMAIL);
    await page.locator('#inp-login-password').fill(process.env.VOYA_PASSWORD);

    await page.getByRole('button', { name: 'Log in' }).click();

    // 3️⃣ Wait for redirect to APP DOMAIN
    await page.waitForURL(/dev2-go\.voyadores\.com/);
    await expect(page).toHaveURL(/dashboard/);

    // 4️⃣ Open Account / Avatar menu (Option B)
    const accountMenuButton = page.locator(
      'img[alt*="Account"], img[alt*="avatar"], button:has(svg)'
    );

    await expect(accountMenuButton.first()).toBeVisible();
    await accountMenuButton.first().click();

    // 5️⃣ Click Logout
    await page.getByRole('menuitem', { name: /logout/i }).click();

    // 6️⃣ Assert redirect BACK to LOGIN DOMAIN ROOT
    await page.waitForURL(/dev2-login\.voyadores\.com/);
  });

});
