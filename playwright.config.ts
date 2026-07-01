import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL || 'https://example.com';
const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'test-results/html-report' }],
    ['allure-playwright'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run serve',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
  },
});
