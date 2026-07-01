import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import logger from '@utils/logger';

export class DashboardPage extends BasePage {
  // Locators
  private readonly welcomeMessage = 'h1';
  private readonly logoutButton = 'button:has-text("Logout")';
  private readonly userProfile = '.user-profile';
  private readonly navigationMenu = 'nav';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Get welcome message
   */
  async getWelcomeMessage(): Promise<string> {
    logger.info('Getting welcome message');
    return this.getText(this.welcomeMessage);
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    logger.info('Logging out');
    await this.click(this.logoutButton);
    await this.waitForNavigation();
  }

  /**
   * Check if user is logged in
   */
  async isUserLoggedIn(): Promise<boolean> {
    logger.info('Checking if user is logged in');
    return this.isVisible(this.userProfile);
  }
}
