import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

export default defineConfig({
  testDir: './tests',

  /* Global timeout per test */
  timeout: 30 * 1000,

  /* Expect assertion timeout */
  expect: {
    timeout: 5000,
  },

  /* Fail the build on CI if test.only is left */
  forbidOnly: !!process.env.CI,

  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,

  /* Run tests in parallel */
  workers: process.env.CI ? 2 : undefined,

  /* Reporter configuration */
  reporter: [
    ['html', { open: 'never' }]
  ],

  /* Shared settings for all projects */
  use: {
    baseURL: process.env.BASE_URL,

    headless: true,

    actionTimeout: 10 * 1000,

    navigationTimeout: 15 * 1000,

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    trace: 'on-first-retry',
  },

  /* Browser projects */
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
