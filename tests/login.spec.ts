import { test, expect } from '@fixtures/test-fixture';
import { LoginPage } from '@pages/login.page';
import { DashboardPage } from '@pages/dashboard.page';
import { TEST_USERS } from '@data/test-users';
import logger from '@utils/logger';

test.describe('Login Page Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    logger.info('Test: Login with valid credentials');
    const user = TEST_USERS.REGULAR_USER;

    await loginPage.login(user.email, user.password);

    const dashboardPage = new DashboardPage(page);
    const isLoggedIn = await dashboardPage.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);

    logger.info('Test passed: Successfully logged in');
  });

  test('should display error with invalid email', async () => {
    logger.info('Test: Login with invalid email');
    const invalidEmail = 'invalid-email';
    const password = TEST_USERS.REGULAR_USER.password;

    await loginPage.login(invalidEmail, password);

    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    logger.info('Test passed: Error message displayed for invalid email');
  });

  test('should display error with invalid password', async () => {
    logger.info('Test: Login with invalid password');
    const email = TEST_USERS.REGULAR_USER.email;
    const invalidPassword = 'wrongpassword';

    await loginPage.login(email, invalidPassword);

    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBe(true);

    logger.info('Test passed: Error message displayed for invalid password');
  });

  test('should login with remember me checkbox', async ({ page }) => {
    logger.info('Test: Login with remember me');
    const user = TEST_USERS.REGULAR_USER;

    await loginPage.loginWithRememberMe(user.email, user.password);

    const dashboardPage = new DashboardPage(page);
    const isLoggedIn = await dashboardPage.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);

    logger.info('Test passed: Successfully logged in with remember me');
  });
});
