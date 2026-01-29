// Load environment variables FIRST
require('dotenv').config();

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // ✅ GLOBAL AUTH SETUP (HERE)
  globalSetup: require.resolve('./global-setup.js'),

  timeout: 30 * 1000,

  use: {
    baseURL: 'https://dev2-login.voyadores.com',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'logged-out',
      use: {
        storageState: undefined,
      },
    },
    {
      name: 'logged-in',
      use: {
        storageState: 'storageState.json',
      },
    },
  ],
});
