import { test, expect } from '@playwright/test';

test.use({
  storageState: undefined, // force unauthenticated
});

test.describe('@regression Login negative', () => {

  test('Invalid password blocks login', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    const usernameInput = page.locator('#inp-login-username');
    const passwordInput = page.locator('#inp-login-password');
    const loginButton   = page.getByRole('button', { name: 'Log in' });

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();

    await usernameInput.fill(process.env.VOYA_EMAIL);
    await passwordInput.fill('wrongpassword');

    await loginButton.click();

    // ✅ Assert login did NOT succeed
    await expect(page).not.toHaveURL(/dashboard/);
    await expect(page).toHaveURL(/login/);
  });

  test('Empty fields block form submission', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' });

    const loginButton = page.getByRole('button', { name: 'Log in' });

    // Click is allowed, submit is blocked by browser validation
    await loginButton.click();

    // ✅ Correct assertion: still on login page
    await expect(page).toHaveURL(/login/);

    // Optional: ensure fields are still empty
    await expect(page.locator('#inp-login-username')).toHaveValue('');
    await expect(page.locator('#inp-login-password')).toHaveValue('');
  });

});
