import { Page, Locator } from '@playwright/test';
import logger from '@utils/logger';
import { retry } from '@utils/retry';
import { wait } from '@utils/wait';

/**
 * Base Page Object for all pages
 * Implements common functionality and best practices
 */
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   */
  async navigateTo(url: string): Promise<void> {
    logger.info(`Navigating to ${url}`);
    await this.page.goto(url, { waitUntil: 'networkidle' });
  }

  /**
   * Click element with retry logic
   */
  async click(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    logger.info(`Clicking element: ${locator}`);
    await retry(() => element.click(), { maxAttempts: 3, delay: 500 });
  }

  /**
   * Fill input field with retry logic
   */
  async fill(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    logger.info(`Filling element: ${locator} with text: ${text}`);
    await retry(() => element.fill(text), { maxAttempts: 3, delay: 500 });
  }

  /**
   * Get element text
   */
  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    logger.info(`Getting text from element: ${locator}`);
    return retry(() => element.textContent(), { maxAttempts: 3, delay: 500 }).then(
      (text) => text || ''
    );
  }

  /**
   * Check if element is visible
   */
  async isVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    logger.info(`Checking visibility of element: ${locator}`);
    return element.isVisible();
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator | string, timeout: number = 5000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    logger.info(`Waiting for element: ${locator}`);
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }

  /**
   * Get page title
   */
  async getTitle(): Promise<string> {
    logger.info('Getting page title');
    return this.page.title();
  }

  /**
   * Accept alert/dialog
   */
  async acceptAlert(): Promise<void> {
    logger.info('Accepting alert');
    this.page.on('dialog', (dialog) => dialog.accept());
  }

  /**
   * Dismiss alert/dialog
   */
  async dismissAlert(): Promise<void> {
    logger.info('Dismissing alert');
    this.page.on('dialog', (dialog) => dialog.dismiss());
  }

  /**
   * Scroll to element
   */
  async scrollToElement(locator: Locator | string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    logger.info(`Scrolling to element: ${locator}`);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Wait for navigation
   */
  async waitForNavigation(): Promise<void> {
    logger.info('Waiting for navigation');
    await this.page.waitForLoadState('networkidle');
  }
}
