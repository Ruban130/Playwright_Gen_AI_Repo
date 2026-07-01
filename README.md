# Playwright Automation Framework

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![Playwright Version](https://img.shields.io/badge/playwright-%5E1.40.0-brightgreen)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-%5E5.3.2-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![Code Quality](https://img.shields.io/badge/code%20quality-production%20ready-brightgreen)]()

A **production-grade, enterprise-ready** automation testing framework built with Playwright and TypeScript. This framework demonstrates senior-level SDET (Software Development Engineer in Test) expertise with clean architecture, SOLID principles, and industry best practices.

## 🌟 Key Features

✅ **Clean Architecture** - Layered, modular, and maintainable codebase  
✅ **SOLID Principles** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion  
✅ **Page Object Model** - Encapsulated, reusable UI interactions  
✅ **API Testing** - Comprehensive REST API testing utilities  
✅ **Retry Logic** - Exponential backoff for transient failures  
✅ **Comprehensive Logging** - Structured logging with Winston  
✅ **Multi-Environment Support** - Dev, Staging, Production configurations  
✅ **Test Data Management** - Faker.js integration for dynamic data  
✅ **Screenshot & Video Capture** - Automatic capture on failures  
✅ **Multiple Reporters** - Allure, HTML, and JUnit reports  
✅ **Cross-Browser Testing** - Chrome, Firefox, Safari, and Mobile  
✅ **Docker Support** - Containerized test execution  
✅ **CI/CD Integration** - GitHub Actions pipelines  
✅ **Code Quality Tools** - ESLint, Prettier, TypeScript strict mode  

## 📁 Project Structure

```
playwright-automation-framework/
├── .github/
│   └── workflows/                    # GitHub Actions CI/CD pipelines
│       ├── tests.yml                # Main test execution pipeline
│       └── quality.yml              # Code quality checks
├── src/
│   ├── api/                         # API Client & utilities
│   │   └── api-client.ts           # REST API client with retry logic
│   ├── config/                      # Configuration management
│   │   └── environment.ts          # Environment configuration
│   ├── constants/                   # Constants & test data paths
│   │   ├── endpoints.ts            # API endpoints
│   │   └── test-data.ts            # Test data constants
│   ├── data/                        # Test fixtures & sample data
│   │   └── test-users.ts           # Pre-defined test users
│   ├── fixtures/                    # Playwright fixtures
│   │   └── test-fixture.ts         # Custom test fixtures
│   ├── pages/                       # Page Object Models
│   │   ├── base.page.ts            # Base page with common methods
│   │   ├── login.page.ts           # Login page object
│   │   └── dashboard.page.ts       # Dashboard page object
│   └── utils/                       # Utility functions
│       ├── logger.ts               # Winston logging configuration
│       ├── retry.ts                # Retry with exponential backoff
│       ├── wait.ts                 # Wait utilities
│       └── faker-data.ts           # Test data generation
├── tests/
│   ├── example.spec.ts             # Example tests
│   ├── login.spec.ts               # Login page tests
│   └── api.spec.ts                 # API tests
├── docs/
│   ├── ARCHITECTURE.md             # Architecture documentation
│   └── BEST_PRACTICES.md           # Best practices guide
├── logs/                            # Application logs (generated)
├── screenshots/                     # Failure screenshots (generated)
├── videos/                          # Failure videos (generated)
├── test-results/                    # Test reports (generated)
├── allure-results/                  # Allure report data (generated)
├── .env.example                     # Environment variables template
├── .eslintrc.json                  # ESLint configuration
├── .prettierrc.json                # Prettier configuration
├── .gitignore                       # Git ignore rules
├── Dockerfile                       # Docker configuration
├── docker-compose.yml               # Docker Compose configuration
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Project dependencies
├── CHANGELOG.md                     # Change history
├── CONTRIBUTING.md                  # Contribution guidelines
├── SECURITY.md                      # Security policy
└── README.md                        # This file
```

### Folder Structure Explanation

| Folder | Purpose | Why? |
|--------|---------|------|
| `.github/workflows/` | CI/CD automation pipelines | Automates testing, reporting, and deployment |
| `src/api/` | API client and utilities | Centralized HTTP communication with retry logic |
| `src/config/` | Environment configuration | Multi-environment support (dev, staging, prod) |
| `src/constants/` | API endpoints & test data | Single source of truth for constants |
| `src/data/` | Test fixtures and data | Separates test data from test logic |
| `src/fixtures/` | Playwright custom fixtures | Test setup/teardown automation |
| `src/pages/` | Page Object Models | Encapsulates UI interactions, reduces maintenance |
| `src/utils/` | Reusable utilities | Retry logic, logging, data generation |
| `tests/` | Test specifications | Clear test organization and structure |
| `docs/` | Documentation | Architecture and best practices reference |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ or **yarn**
- **Git**
- **Docker** (optional, for containerized execution)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ruban130/Playwright_Gen_AI_Repo.git
   cd Playwright_Gen_AI_Repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Create environment file**
   ```bash
   cp .env.example .env
   ```

5. **Configure environment variables** (edit `.env` as needed)
   ```env
   ENVIRONMENT=dev
   BASE_URL=https://example.com
   API_BASE_URL=https://api.example.com
   BROWSER=chromium
   HEADLESS=true
   LOG_LEVEL=info
   ```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in UI Mode
```bash
npm run test:ui
```

### Run Tests in Headed Mode (Browser Visible)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Specific Test File
```bash
npx playwright test tests/login.spec.ts
```

### Run Tests with Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests with Specific Tag
```bash
npx playwright test --grep @smoke
```

### Generate Test Report
```bash
npm run test:report
```

## 📊 Reporting

### Allure Report
```bash
npm run test:report
```
This generates an interactive Allure report with test history, timeline, and detailed logs.

### HTML Report
Automatically generated in `test-results/html-report/` after test execution.

### View HTML Report
```bash
npx playwright show-report
```

## 🐳 Docker Support

### Build Docker Image
```bash
npm run docker:build
# or
docker build -t playwright-automation:latest .
```

### Run Tests in Docker
```bash
npm run docker:run
# or
docker run --rm playwright-automation:latest
```

### Using Docker Compose
```bash
docker-compose up --build
```

## 💻 Code Quality

### Run ESLint
```bash
npm run lint
```

### Fix ESLint Issues
```bash
npm run lint:fix
```

### Check Code Formatting
```bash
npm run format:check
```

### Format Code
```bash
npm run format
```

### Verify Dependencies
```bash
npm audit
```

## 📝 Writing Tests

### Basic Test Template
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { TEST_USERS } from '@data/test-users';
import logger from '@utils/logger';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('should login successfully with valid credentials', async () => {
    logger.info('Test: Login with valid credentials');
    const user = TEST_USERS.REGULAR_USER;

    await loginPage.login(user.email, user.password);

    const isLoggedIn = await loginPage.isUserLoggedIn();
    expect(isLoggedIn).toBe(true);

    logger.info('Test passed');
  });
});
```

### Using Page Objects
```typescript
// Page Object (src/pages/products.page.ts)
export class ProductsPage extends BasePage {
  private readonly productList = '.products-list';
  private readonly addToCartBtn = '.add-to-cart';

  async getProductCount(): Promise<number> {
    return this.page.locator(this.productList).count();
  }

  async addToCart(productId: string): Promise<void> {
    const productBtn = this.page.locator(`[data-product-id=\"${productId}\"]`);
    await this.click(productBtn);
  }
}

// Test
test('should add product to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.addToCart('123');
  expect(await productsPage.getProductCount()).toBeGreaterThan(0);
});
```

### Using API Client
```typescript
import { APIClient } from '@api/api-client';
import { ENDPOINTS } from '@constants/endpoints';
import { TEST_USERS } from '@data/test-users';

const apiClient = new APIClient(process.env.API_BASE_URL!);

test('should create user via API', async () => {
  const user = TEST_USERS.ADMIN_USER;
  const response = await apiClient.post(ENDPOINTS.USERS.CREATE, user);

  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('id');
});
```

### Using Test Data Generation
```typescript
import { generateUserData, generateEmail } from '@utils/faker-data';

test('should register with random user data', async ({ page }) => {
  const userData = generateUserData();
  const signupPage = new SignupPage(page);

  await signupPage.fillForm(userData);
  await signupPage.submit();

  expect(await signupPage.isSuccessMessageVisible()).toBe(true);
});
```

## 🔧 Configuration

### Environment Variables (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `ENVIRONMENT` | Environment name | `dev` |
| `BASE_URL` | Application base URL | `https://example.com` |
| `API_BASE_URL` | API base URL | `https://api.example.com` |
| `BROWSER` | Browser type | `chromium` |
| `HEADLESS` | Run in headless mode | `true` |
| `TIMEOUT` | Test timeout (ms) | `30000` |
| `RETRY_ATTEMPTS` | Retry attempts | `2` |
| `LOG_LEVEL` | Logging level | `info` |
| `DEBUG` | Debug mode | `false` |

### Playwright Configuration (playwright.config.ts)

- **Timeout**: 30 seconds per test
- **Retries**: 2 retries in CI, 0 locally
- **Screenshots**: Only on failure
- **Videos**: Retained on failure
- **Trace**: On first retry
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome

## 📚 Architecture Overview

```
Test Specs (tests/*.ts)
        ↓
    Uses ↓ Depends on
        ↓
Page Objects (src/pages/) ←→ API Client (src/api/)
        ↓                         ↓
    Uses ↓                    Uses ↓
        ↓                         ↓
Utilities (src/utils/)
- Retry Logic
- Logger
- Faker Data
- Wait Helpers
        ↓
    Uses ↓
        ↓
Configuration (src/config/)
```

### Design Patterns

1. **Page Object Model (POM)** - Encapsulates UI interactions
2. **Retry with Exponential Backoff** - Handles transient failures
3. **Factory Pattern** - Test fixtures for setup/teardown
4. **Singleton** - Logger instance
5. **Dependency Injection** - Configuration management

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

#### Main Test Pipeline (`.github/workflows/tests.yml`)
- Runs on: `push` to main/develop, `pull_request`, and scheduled daily
- Matrix: Node 18.x & 20.x × Chromium, Firefox, WebKit
- Steps:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Run linter
  5. Format check
  6. Run tests
  7. Generate reports
  8. Upload artifacts
  9. Publish Allure report
  10. Security scan

#### Code Quality Pipeline (`.github/workflows/quality.yml`)
- Runs on: `push` and `pull_request`
- Steps:
  1. ESLint check
  2. TypeScript type check
  3. Dependency audit

### Viewing CI Results
1. Go to **Actions** tab in your repository
2. Select the workflow run
3. Check job logs and artifacts
4. View Allure reports

## 🎯 Best Practices Included

✅ **Single Responsibility Principle** - Each class/module has one reason to change  
✅ **Open/Closed Principle** - Open for extension, closed for modification  
✅ **Liskov Substitution** - Derived classes can replace base classes  
✅ **Interface Segregation** - Clients depend on specific interfaces  
✅ **Dependency Inversion** - Depend on abstractions, not concretions  
✅ **DRY (Don't Repeat Yourself)** - Reusable utilities and fixtures  
✅ **Clear Naming** - Descriptive function and variable names  
✅ **Error Handling** - Try-catch with meaningful error messages  
✅ **Logging** - Structured logging at appropriate levels  
✅ **Test Isolation** - Independent tests with proper setup/teardown  

## 📖 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - Detailed architecture explanation
- **[Best Practices](docs/BEST_PRACTICES.md)** - Coding standards and patterns
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Security Policy](SECURITY.md)** - Security guidelines
- **[Changelog](CHANGELOG.md)** - Version history

## 🔐 Security

- ✅ Never commit `.env` file
- ✅ Use environment variables for sensitive data
- ✅ Keep dependencies updated: `npm audit`
- ✅ Review security advisories regularly
- ✅ Use strong, unique test passwords
- ✅ Use `.env.example` as template

See [SECURITY.md](SECURITY.md) for details.

## 🚦 Performance Tips

1. **Run tests in parallel** (local mode, serial in CI)
2. **Use retry logic** to handle flaky tests
3. **Optimize selectors** - Use data-testid when possible
4. **Mock external APIs** when testing UI only
5. **Group related tests** in describe blocks
6. **Use beforeEach/afterEach** for setup/teardown

## 🐛 Troubleshooting

### Tests timing out
```bash
# Increase timeout in playwright.config.ts
timeout: 60000  // 60 seconds
```

### Flaky tests
```bash
# Enable retry
retries: process.env.CI ? 2 : 1
```

### Logs not appearing
```bash
# Check log level in .env
LOG_LEVEL=debug
```

### Docker build fails
```bash
# Clear cache and rebuild
docker build --no-cache -t playwright-automation:latest .
```

## 📞 Support & Contribution

- **Issues**: Open an [issue](https://github.com/Ruban130/Playwright_Gen_AI_Repo/issues)
- **Discussions**: Join [discussions](https://github.com/Ruban130/Playwright_Gen_AI_Repo/discussions)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🎓 Learning Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Allure Report](https://docs.qameta.io/allure/)

## 📊 Project Statistics

- **Lines of Code**: 1000+
- **Test Coverage**: Comprehensive UI and API testing examples
- **Documentation**: Extensive with inline comments
- **Browsers Supported**: 4+ (Chrome, Firefox, Safari, Mobile)
- **Environments**: 3+ (Dev, Staging, Production)
- **CI/CD**: Full GitHub Actions integration

## 🏆 Interview Ready

This framework is designed to showcase:

✅ **Senior-level SDET expertise**  
✅ **Clean code and architecture principles**  
✅ **Production-ready best practices**  
✅ **Scalable and maintainable solutions**  
✅ **Comprehensive documentation**  
✅ **Industry standard tools and patterns**  

Perfect for:
- 🎯 Technical interviews
- 🎯 Portfolio projects
- 🎯 Learning resource
- 🎯 Production implementation

## 📈 Future Enhancements

- [ ] Visual regression testing
- [ ] API mocking with MSW
- [ ] Performance testing integration
- [ ] Advanced test data management
- [ ] Cross-browser visual comparisons
- [ ] Test analytics dashboard
- [ ] Slack/Teams notifications
- [ ] Performance metrics tracking
- [ ] Accessibility testing
- [ ] Load testing integration

## 📄 License

MIT License - See [LICENSE](LICENSE) for details

## 👤 Author

**Ruban** - Principal SDET @ Microsoft  
- GitHub: [@Ruban130](https://github.com/Ruban130)

---

## ⭐ Show Your Support

If you find this framework helpful, please give it a ⭐ star! It helps others discover this resource.

---

**Last Updated**: 2024-01-01  
**Version**: 1.0.0  
**Status**: ✅ Production Ready
