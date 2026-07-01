# Architecture Documentation

## Project Structure Overview

```
playwright-automation-framework/
├── .github/workflows/              # GitHub Actions CI/CD pipelines
├── src/
│   ├── api/                        # API Client & utilities
│   ├── config/                     # Environment configuration
│   ├── constants/                  # Constants & test data
│   ├── data/                       # Test fixtures
│   ├── fixtures/                   # Playwright fixtures
│   ├── pages/                      # Page Object Models
│   └── utils/                      # Utility functions
├── tests/                          # Test specifications
├── docs/                           # Documentation
└── ...
```

## Architecture Principles

### 1. Clean Architecture

- **Separation of Concerns**: Each layer has a single responsibility
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **Abstraction**: Implementation details are hidden

### 2. SOLID Principles

#### Single Responsibility Principle (SRP)

Each class has one reason to change:

```typescript
// ✅ Good: Single responsibility
export class LoginPage extends BasePage {
  async login(email: string, password: string): Promise<void> {
    // Login logic only
  }
}
```

#### Open/Closed Principle (OCP)

Open for extension, closed for modification:

```typescript
// ✅ Good: BasePage can be extended
export class BasePage {
  async click(locator: string): Promise<void> { /* */ }
}

export class LoginPage extends BasePage {
  async login(email: string, password: string): Promise<void> { /* */ }
}
```

#### Liskov Substitution Principle (LSP)

Derived classes can substitute base classes:

```typescript
// ✅ Good: LoginPage can replace BasePage
const page: BasePage = new LoginPage(playwrightPage);
await page.click('.button');
```

#### Interface Segregation Principle (ISP)

Clients depend on specific interfaces:

```typescript
// ✅ Good: Specific interfaces
export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffMultiplier?: number;
}
```

#### Dependency Inversion Principle (DIP)

Depend on abstractions:

```typescript
// ✅ Good: Depend on abstraction
export class APIClient {
  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }
}
```

## Layer Descriptions

### Config Layer

Manages environment configuration:

```typescript
export interface EnvironmentConfig {
  environment: string;
  baseUrl: string;
  apiBaseUrl: string;
  // ... other config
}
```

**Why**: Centralized configuration for multiple environments.

### Data Layer

Manages test data and constants:

```typescript
export const TEST_USERS = {
  ADMIN_USER: { /* admin data */ },
  REGULAR_USER: { /* user data */ }
};
```

**Why**: Separates test data from tests.

### API Layer

Handles HTTP communication:

```typescript
export class APIClient {
  async get<T>(endpoint: string): Promise<AxiosResponse<T>>
  async post<T>(endpoint: string, data: unknown): Promise<AxiosResponse<T>>
}
```

**Why**: Centralized API handling with retry logic.

### Page Object Layer

Encapsulates UI interactions:

```typescript
export class BasePage {
  async click(locator: string): Promise<void>
  async fill(locator: string, text: string): Promise<void>
}

export class LoginPage extends BasePage {
  async login(email: string, password: string): Promise<void>
}
```

**Why**: Page Object Model reduces maintenance.

### Utils Layer

Provides reusable utilities:

```typescript
export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T>

export const generateUserData = (): UserData
```

**Why**: Promotes code reuse (DRY principle).

### Test Layer

Contains test specifications:

```typescript
test.describe('Login Tests', () => {
  test('should login with valid credentials', async ({ page }) => { /* */ })
})
```

**Why**: Clear separation of test logic.

## Data Flow

```
┌──────────────────┐
│   Test Spec      │
│   (tests/*.ts)   │
└─────────┬────────┘
          │
          ↓
┌─────────────────────────────────┐
│   Page Objects                  │ ← Uses data from Data Layer
│   (src/pages/*)                 │ ← Uses utilities from Utils Layer
└─────────────────────────────────┘
          │
          ├─────────────────────────┬──────────────────────┐
          │                         │                      │
          ↓                         ↓                      ↓
┌──────────────────┐    ┌─────────────────┐    ┌──────────────────┐
│ UI Interactions  │    │   API Calls     │    │  Configuration   │
│  (BasePage)      │    │  (APIClient)    │    │  (environment)   │
└────────┬─────────┘    └────────┬────────┘    └──────────────────┘
         │                       │
         └───────────┬───────────┘
                     ↓
┌──────────────────────────────────┐
│  Retry Logic + Error Handling    │
│  (retry.ts, logger.ts)           │
└────────┬─────────────────────────┘
         ↓
┌──────────────────────────────────┐
│  Playwright / Axios              │
│  (Browser / HTTP Client)         │
└──────────────────────────────────┘
```

## Design Patterns Used

### 1. Page Object Model (POM)

```typescript
export class LoginPage extends BasePage {
  private readonly emailInput = 'input[type="email"]';
  private readonly loginButton = 'button[type="submit"]';

  async login(email: string, password: string): Promise<void> {
    await this.fill(this.emailInput, email);
    await this.click(this.loginButton);
  }
}
```

**Benefits**:
- Tests are more readable
- Changes require updates only in page objects
- Reusable interactions

### 2. Retry with Exponential Backoff

```typescript
export async function retry<T>(
  fn: () => Promise<T>,
  options?: RetryOptions
): Promise<T> {
  // Implements exponential backoff
}
```

**Benefits**:
- Handles transient failures
- Reduces flaky tests
- Configurable behavior

### 3. Factory Pattern (Fixture Pattern)

```typescript
export const test = base.extend<TestFixtures>({
  apiContext: async ({ }, use) => {
    logger.info('Setting up');
    await use({});
    logger.info('Tearing down');
  },
});
```

**Benefits**:
- Consistent setup/teardown
- Resource management
- Test isolation

### 4. Singleton Pattern

```typescript
const logger = winston.createLogger({ /* ... */ });
export default logger;
```

**Benefits**:
- Single logging point
- Consistent format
- Performance

## Extension Points

### Adding a New Page

```typescript
// src/pages/products.page.ts
export class ProductsPage extends BasePage {
  private readonly productList = '.products-list';

  async getProductCount(): Promise<number> {
    return this.page.locator(this.productList).count();
  }
}
```

### Adding API Endpoints

```typescript
// src/constants/endpoints.ts
export const ENDPOINTS = {
  CART: {
    GET: '/cart',
    ADD_ITEM: '/cart/items',
  },
};
```

### Adding Tests

```typescript
// tests/products.spec.ts
test('should display products', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  const count = await productsPage.getProductCount();
  expect(count).toBeGreaterThan(0);
});
```

## Performance Considerations

### 1. Parallel Execution

```typescript
// playwright.config.ts
workers: process.env.CI ? 1 : undefined,
```

### 2. Retry Configuration

```typescript
retries: process.env.CI ? 2 : 0,
```

### 3. Resource Management

```typescript
test.beforeEach(async ({ page }) => {
  // Setup
});

test.afterEach(async ({ page }) => {
  // Cleanup
});
```

## Error Handling Strategy

### 1. Retry on Transient Errors

```typescript
await retry(() => element.click(), { maxAttempts: 3 });
```

### 2. Meaningful Error Messages

```typescript
throw new Error(`Max attempts reached. Last error: ${lastError?.message}`);
```

### 3. Logging at Each Step

```typescript
logger.info('Attempting operation');
logger.warn('Attempt failed');
logger.error('Operation failed');
```

## Future Enhancements

1. Visual regression testing
2. API mocking
3. Performance monitoring
4. Test data management system
5. Test analytics
