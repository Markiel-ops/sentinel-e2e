import { test, expect } from '@playwright/test';

const LOGIN_URL = 'https://dev2-login.voyadores.com/?redirect=%2F';

test.describe('Login Page - Voyadores DEV', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(LOGIN_URL);
  });

  test('login page loads', async ({ page }) => {
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.locator('#btn-login-user')).toBeVisible();
  });

  test('keep me logged in checkbox is toggleable', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', { name: /keep me logged in/i });

    await expect(checkbox).toBeVisible();

    // Force known state
    if (await checkbox.isChecked()) {
      await checkbox.uncheck();
    }

    await checkbox.check();
    await expect(checkbox).toBeChecked();

    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  test('password visibility toggle works', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Password');
    const toggle = page.locator('#spn-login-password-toggle');

    await passwordInput.fill('dummyPassword');
    await expect(passwordInput).toHaveAttribute('type', 'password');

    await toggle.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    await toggle.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('validation errors appear when logging in with empty fields', async ({ page }) => {
    await page.locator('#btn-login-user').click();

    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Password is required')).toBeVisible();
  });

  test('forgot password flow opens reset page and returns to login', async ({ page }) => {
    // Open forgot password
    await page.locator('#btn-login-forgot-password').click();

    // Assert reset password UI
    await expect(page.getByText(/reset password/i)).toBeVisible();

    // Click "Go back to login"
    await page.locator('#btn-login-forgot').click();

    // ✅ SPA FIX — assert UI, NOT URL
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.locator('#btn-login-user')).toBeVisible();
  });

  test('user can log in with valid credentials', async ({ page }) => {
    await page.getByPlaceholder('Username').fill(process.env.VOYA_EMAIL);
    await page.getByPlaceholder('Password').fill(process.env.VOYA_PASSWORD);

    await page.locator('#btn-login-user').click();

    // Assert logged-in state
    await expect(page.locator('#btn-open-account')).toBeVisible();
  });

  test('user is redirected to login page after logout', async ({ page }) => {
    // Login first
    await page.getByPlaceholder('Username').fill(process.env.VOYA_EMAIL);
    await page.getByPlaceholder('Password').fill(process.env.VOYA_PASSWORD);
    await page.locator('#btn-login-user').click();

    await expect(page.locator('#btn-open-account')).toBeVisible();

    // Open account menu
    await page.locator('#btn-open-account').click();

    // Click logout link
    await page.locator('a[href="/logout"]').click();

    // Assert login UI is back (SPA-safe)
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
  });

});
