class LoginPage {
<<<<<<< HEAD
  constructor(page) {
    this.page = page;

    // SSO indicators (NOT input fields)
    this.ssoButton = page.locator(
      'button:has-text("SSO"), button:has-text("Login"), button:has-text("Sign in")'
    );

    this.ssoIframe = page.frameLocator('iframe');
  }

  async goto() {
    await this.page.goto(process.env.VOYA_LOGIN_URL, {
      waitUntil: 'domcontentloaded',
    });
  }

  async isSSOTriggered() {
    // Either redirected OR iframe/button exists
    return (
      this.page.url().includes('login') ||
      (await this.ssoButton.first().isVisible().catch(() => false))
    );
  }
=======
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Locators
    this.loginEntryButton = page.getByRole('button', {
      name: /log in|login|sign in/i,
    });

    this.usernameInput = page.getByRole('textbox', {
      name: /username/i,
    });

    this.passwordInput = page.locator('input[type="password"]');

    this.submitButton = page.getByRole('button', {
      name: /log in/i,
    });
  }

  async goTo() {
    await this.page.goto('/login');
  }

  async openLogin() {
    await this.loginEntryButton.click();
  }

  async fillCredentials(email, password) {
    await this.usernameInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submit() {
    await this.submitButton.click();
  }

  async logout() {
  // Open user menu / avatar
  await this.page.getByRole('button', {
    name: /profile|account|user|avatar/i,
  }).click();

  // Click logout inside the menu
  await this.page.getByRole('menuitem', {
    name: /logout|sign out/i,
  }).click();
}


>>>>>>> d8791c8 (Sentinel e2e: replace placeholder files with project originals)
}

module.exports = { LoginPage };
