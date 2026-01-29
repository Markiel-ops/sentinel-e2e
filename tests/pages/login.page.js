class LoginPage {
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
    await this.page.goto('/');
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
}

module.exports = { LoginPage };
