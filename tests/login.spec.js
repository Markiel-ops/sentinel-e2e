// Load environment variables first
require('dotenv').config();

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./pages/login.page');

test.describe('Login Page – Voyadores DEV', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    // Login tests do not apply when user is already authenticated
    if (testInfo.project.name === 'logged-in') {
      test.skip(true, 'Login flow is skipped for authenticated users');
    }

    const loginPage = new LoginPage(page);
    await loginPage.goTo();
  });

  test('loads login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLogin();

    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('allows typing into login inputs', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLogin();
    await expect(page).toHaveURL(/login/);

    await loginPage.fillCredentials('testuser@example.com', 'P@ssw0rd123');

    await expect(loginPage.usernameInput).toHaveValue('testuser@example.com');
    await expect(loginPage.passwordInput).toHaveValue('P@ssw0rd123');
  });

  test('shows validation errors for empty login form', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLogin();
    await loginPage.submit();

    await expect(page.getByText(/username is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('shows error for invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLogin();
    await loginPage.fillCredentials('wrong@email.com', 'wrongpassword');
    await loginPage.submit();

    await expect(
      page.getByText(/invalid|incorrect|wrong/i)
    ).toBeVisible();

    await expect(page).toHaveURL(/login/);
  });

  test('logs in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLogin();
    await loginPage.fillCredentials(
      process.env.VOYA_EMAIL,
      process.env.VOYA_PASSWORD
    );
    await loginPage.submit();

    await expect(page).toHaveURL(process.env.BASE_URL);
  });
});
