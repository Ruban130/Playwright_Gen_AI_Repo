# Best Practices Guide

## Test Writing Best Practices

### 1. Use Descriptive Test Names

```typescript
// ✅ Good
test('should display error message when logging in with invalid email', async () => {});

// ❌ Bad
test('login test', async () => {});
```

### 2. One Assertion Per Test

```typescript
// ✅ Good - Single responsibility
test('should navigate to dashboard after login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login('user@example.com', 'password');
  await expect(page).toHaveURL('/dashboard');
});

// ❌ Bad - Testing multiple things
test('login flow', async ({ page }) => {
  // Testing login, navigation, profile, etc.
});
```

### 3. Use Page Objects

```typescript
// ✅ Good
const loginPage = new LoginPage(page);
await loginPage.login(email, password);

// ❌ Bad - Direct element access
await page.fill('input[type="email"]', email);
await page.click('button[type="submit"]');
```

### 4. Use Test Data Generators

```typescript
// ✅ Good
import { generateUserData } from '@utils/faker-data';
const user = generateUserData();
await apiClient.post(ENDPOINTS.USERS.CREATE, user);

// ❌ Bad - Hard-coded data
const user = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
};
```

### 5. Use Fixtures for Setup/Teardown

```typescript
// ✅ Good
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
});

// ❌ Bad - Duplicate setup
test('should display error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
});
```

### 6. Add Logging for Debugging

```typescript
// ✅ Good
logger.info('Test: Login with invalid credentials');
await loginPage.login(invalidEmail, password);
logger.info('Verifying error message');
const isErrorVisible = await loginPage.isErrorMessageVisible();
expect(isErrorVisible).toBe(true);

// ❌ Bad - No logging
await loginPage.login(invalidEmail, password);
const isErrorVisible = await loginPage.isErrorMessageVisible();
expect(isErrorVisible).toBe(true);
```

## Page Object Best Practices

### 1. Encapsulate Locators

```typescript
// ✅ Good - Private locators
export class LoginPage extends BasePage {
  private readonly emailInput = 'input[type="email"]';
  private readonly loginButton = 'button[type="submit"]';

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.click(this.loginButton);
  }
}

// ❌ Bad - Direct element access in tests
await page.fill('input[type="email"]', email);
await page.click('button[type="submit"]');
```

### 2. Use Semantic Method Names

```typescript
// ✅ Good - Clear intent
await loginPage.login(email, password);
await dashboardPage.logout();
await productPage.addToCart(productId);

// ❌ Bad - Unclear naming
await loginPage.doThing1(email, password);
await dashboardPage.click2();
await productPage.action();
```

### 3. Use Inheritance for Common Behavior

```typescript
// ✅ Good - BasePage has common methods
export class BasePage {
  async click(locator: string): Promise<void> { /* */ }
  async fill(locator: string, text: string): Promise<void> { /* */ }
}

export class LoginPage extends BasePage {
  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.click(this.loginButton);
  }
}
```

## API Testing Best Practices

### 1. Use Endpoint Constants

```typescript
// ✅ Good
import { ENDPOINTS } from '@constants/endpoints';
const response = await apiClient.get(ENDPOINTS.USERS.GET_ALL);

// ❌ Bad - Hard-coded endpoints
const response = await apiClient.get('/users');
```

### 2. Use Test Data

```typescript
// ✅ Good
import { TEST_USERS } from '@data/test-users';
const user = TEST_USERS.ADMIN_USER;
const response = await apiClient.post(ENDPOINTS.USERS.CREATE, user);

// ❌ Bad - Hard-coded data
const response = await apiClient.post(ENDPOINTS.USERS.CREATE, {
  email: 'admin@example.com',
  password: 'AdminPassword123!',
});
```

### 3. Validate Response Structure

```typescript
// ✅ Good - Comprehensive validation
const response = await apiClient.get(ENDPOINTS.USERS.GET_ALL);
expect(response.status).toBe(200);
expect(Array.isArray(response.data)).toBe(true);
expect(response.data[0]).toHaveProperty('id');
expect(response.data[0]).toHaveProperty('email');

// ❌ Bad - Minimal validation
const response = await apiClient.get(ENDPOINTS.USERS.GET_ALL);
expect(response.status).toBe(200);
```

## Code Style Best Practices

### 1. Use TypeScript Strictly

```typescript
// ✅ Good - Type safety
interface LoginCredentials {
  email: string;
  password: string;
}

async function login(credentials: LoginCredentials): Promise<void> {
  // Implementation
}

// ❌ Bad - Using any
async function login(credentials: any): Promise<void> {
  // Implementation
}
```

### 2. Use Error Handling

```typescript
// ✅ Good
try {
  await element.click();
} catch (error) {
  logger.error(`Failed to click element: ${error}`);
  throw error;
}

// ❌ Bad - Silent failures
await element.click();
```

### 3. Use Meaningful Variable Names

```typescript
// ✅ Good - Clear naming
const isLoginButtonVisible = await loginPage.isVisible(loginButton);
const errorMessageText = await loginPage.getText(errorMessage);

// ❌ Bad - Unclear naming
const v = await loginPage.isVisible(loginButton);
const msg = await loginPage.getText(errorMessage);
```

### 4. Use Constants for Magic Numbers

```typescript
// ✅ Good
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;
await retry(fn, { maxAttempts: MAX_RETRY_ATTEMPTS, delay: RETRY_DELAY_MS });

// ❌ Bad - Magic numbers
await retry(fn, { maxAttempts: 3, delay: 1000 });
```

## Configuration Best Practices

### 1. Use Environment Variables

```typescript
// ✅ Good
const baseUrl = process.env.BASE_URL || 'https://example.com';

// ❌ Bad - Hard-coded values
const baseUrl = 'https://example.com';
```

### 2. Validate Configuration

```typescript
// ✅ Good
const requiredEnvVars = ['BASE_URL', 'API_BASE_URL'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required: ${envVar}`);
  }
}
```

## Logging Best Practices

### 1. Log at Appropriate Levels

```typescript
// ✅ Good - Appropriate levels
logger.info('Starting test: Login with valid credentials');
logger.debug('Entering email: user@example.com');
logger.warn('Element not found, retrying...');
logger.error('Test failed: Expected element not visible');

// ❌ Bad - Over-logging
logger.info('Entering email: user@example.com');
logger.info('Clicking button');
logger.info('Test passed or failed');
```

### 2. Include Context

```typescript
// ✅ Good - Contextual information
logger.info(`Navigating to ${url}`);
logger.error(`Failed to click: ${locator}. Error: ${error.message}`);

// ❌ Bad - No context
logger.info('Navigating');
logger.error('Click failed');
```

## Summary

✅ Write clear, descriptive tests
✅ Use Page Objects for UI interactions
✅ Use Test Data for consistency
✅ Use TypeScript for type safety
✅ Log appropriately
✅ Use environment variables
✅ Handle errors gracefully
✅ Keep code DRY and maintainable
