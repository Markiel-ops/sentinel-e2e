<<<<<<< HEAD
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  // SPEED & STABILITY
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,

  // AUTH SETUP
  globalSetup: require.resolve('./tests/.auth/setup.auth.js'),

  // REPORTING
  reporter: [['html', { open: 'never' }]],

  // SHARED CONTEXT
  use: {
    baseURL: process.env.BASE_URL,
    storageState: 'storage/auth.json',
=======
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Where your tests live
  testDir: './tests',

  // Global test timeout
  timeout: 30 * 1000,

  // Expect assertions timeout
  expect: {
    timeout: 5 * 1000,
  },

  // Run tests in parallel
  fullyParallel: true,

  // Fail CI if test.only is left in code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Workers: limit on CI, max locally
  workers: process.env.CI ? 1 : undefined,

  // Test report
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    baseURL: process.env.BASE_URL,
>>>>>>> d8791c8 (Sentinel e2e: replace placeholder files with project originals)
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

<<<<<<< HEAD
  // PROJECTS
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
=======
  // Browsers
  projects: [
  {
    name: 'setup',
    testMatch: /auth\.setup\.ts/,
  },
  {
    name: 'chromium',
    dependencies: ['setup'],
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json',
    },
  },
  {
    name: 'logout',
    testMatch: /logout\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },
],

>>>>>>> d8791c8 (Sentinel e2e: replace placeholder files with project originals)
});
