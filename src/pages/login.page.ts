import { Page } from '@playwright/test';
import { BasePage } from './base.page';
import logger from '@utils/logger';

export class LoginPage extends BasePage {
  // Locators
  private readonly emailInput = 'input[type="email"]';
  private readonly passwordInput = 'input[type="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly errorMessage = '.error-message';
  private readonly rememberMeCheckbox = 'input[type="checkbox"]';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to login page
   */
  async navigateToLogin(): Promise<void> {
    logger.info('Navigating to login page');
    await this.navigateTo('/login');
  }

  /**
   * Perform login
   */
  async login(email: string, password: string): Promise<void> {
    logger.info(`Logging in with email: ${email}`);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Login with remember me
   */
  async loginWithRememberMe(email: string, password: string): Promise<void> {
    logger.info(`Logging in with remember me: ${email}`);
    await this.fill(this.emailInput, email);
    await this.fill(this.passwordInput, password);
    await this.click(this.rememberMeCheckbox);
    await this.click(this.loginButton);
    await this.waitForNavigation();
  }

  /**
   * Get error message
   */
  async getErrorMessage(): Promise<string> {
    logger.info('Getting error message');
    return this.getText(this.errorMessage);
  }

  /**
   * Check if error message is visible
   */
  async isErrorMessageVisible(): Promise<boolean> {
    logger.info('Checking if error message is visible');
    return this.isVisible(this.errorMessage);
  }
}
