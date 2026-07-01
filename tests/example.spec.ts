import { test, expect } from '@playwright/test';
import logger from '@utils/logger';

test.describe('Playwright Automation Framework', () => {
  test('should have title', async ({ page }) => {
    logger.info('Starting: should have title');
    await page.goto('https://example.com');
    await expect(page).toHaveTitle(/Example/);
    logger.info('Completed: should have title');
  });

  test('should interact with page', async ({ page }) => {
    logger.info('Starting: should interact with page');
    await page.goto('https://example.com');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    logger.info('Completed: should interact with page');
  });
});
