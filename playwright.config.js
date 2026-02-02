require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  globalSetup: require.resolve('./tests/.auth/setup.auth.js'),

  reporter: [['html', { open: 'never' }]],

  use: {
    baseURL: process.env.BASE_URL,
    storageState: 'storage/auth.json',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
