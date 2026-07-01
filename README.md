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
├── .github/workflows/              # GitHub Actions CI/CD pipelines
├── src/
│   ├── api/                        # API Client & utilities
│   ├── config/                     # Configuration management
│   ├── constants/                  # Constants & test data
│   ├── data/                       # Test fixtures
│   ├── fixtures/                   # Playwright fixtures
│   ├── pages/                      # Page Object Models
│   └── utils/                      # Utility functions
├── tests/                          # Test specifications
├── docs/                           # Documentation
├── Dockerfile                      # Docker configuration
├── docker-compose.yml              # Docker Compose
├── playwright.config.ts            # Playwright config
├── package.json                    # Dependencies
└── README.md                       # This file
```

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/Ruban130/Playwright_Gen_AI_Repo.git
cd Playwright_Gen_AI_Repo

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Setup environment
cp .env.example .env
```

### Run Tests

```bash
# Run all tests
npm test

# Run in UI mode
npm run test:ui

# Run in headed mode
npm run test:headed

# Generate Allure report
npm run test:report
```

## 📊 Reporting

```bash
# Generate Allure report
npm run test:report

# View HTML report
npx playwright show-report
```

## 🐳 Docker

```bash
# Build image
npm run docker:build

# Run tests
npm run docker:run

# Using Docker Compose
docker-compose up --build
```

## 💻 Code Quality

```bash
npm run lint              # Run ESLint
npm run lint:fix         # Fix issues
npm run format:check     # Check formatting
npm run format           # Format code
```

## 📝 Configuration

Environment variables (`.env`):

```env
ENVIRONMENT=dev
BASE_URL=https://example.com
API_BASE_URL=https://api.example.com
BROWSER=chromium
HEADLESS=true
LOG_LEVEL=info
TIMEOUT=30000
RETRY_ATTEMPTS=2
```

## 🏗️ Architecture

### Folder Purpose

| Folder | Purpose | Why? |
|--------|---------|------|
| `src/api/` | API client | Centralized HTTP communication |
| `src/config/` | Configuration | Multi-environment support |
| `src/constants/` | Constants | Single source of truth |
| `src/data/` | Test fixtures | Separates data from tests |
| `src/pages/` | Page Objects | Encapsulates UI interactions |
| `src/utils/` | Utilities | Retry logic, logging, data gen |
| `tests/` | Test specs | Clear organization |
| `docs/` | Documentation | Reference guides |

### Design Patterns

1. **Page Object Model** - Encapsulates UI interactions
2. **Retry with Exponential Backoff** - Handles transient failures
3. **Factory Pattern** - Test fixtures
4. **Singleton** - Logger instance
5. **Dependency Injection** - Configuration

## 📚 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - Detailed architecture explanation
- **[Best Practices](docs/BEST_PRACTICES.md)** - Coding standards and patterns
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines
- **[Security](SECURITY.md)** - Security guidelines
- **[Changelog](CHANGELOG.md)** - Version history

## 🎯 Best Practices

✅ SOLID Principles compliance
✅ Clean code and architecture
✅ Comprehensive logging
✅ Error handling
✅ Test isolation
✅ Meaningful naming
✅ DRY principle
✅ Type safety with TypeScript

## 🔐 Security

- Never commit `.env` file
- Use environment variables for secrets
- Keep dependencies updated: `npm audit`
- Review security advisories regularly
- Use strong test passwords

## 🚦 Performance Tips

1. Run tests in parallel locally
2. Use retry logic for flaky tests
3. Optimize selectors (use data-testid)
4. Mock external APIs
5. Group related tests
6. Use beforeEach/afterEach

## 🐛 Troubleshooting

```bash
# Tests timing out
# Increase timeout in playwright.config.ts: timeout: 60000

# Flaky tests
# Enable retry: retries: process.env.CI ? 2 : 1

# Logs not appearing
# Check .env: LOG_LEVEL=debug

# Docker build fails
# docker build --no-cache -t playwright-automation:latest .
```

## 📞 Support

- **Issues**: [Open an issue](https://github.com/Ruban130/Playwright_Gen_AI_Repo/issues)
- **Contributing**: See [CONTRIBUTING.md](CONTRIBUTING.md)

## 🎓 Resources

- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Allure Report](https://docs.qameta.io/allure/)

## 📊 Project Stats

- **Lines of Code**: 1000+
- **Test Examples**: Comprehensive UI and API
- **Documentation**: Extensive with comments
- **Browsers**: Chrome, Firefox, Safari, Mobile
- **Environments**: Dev, Staging, Production
- **CI/CD**: Full GitHub Actions integration

## 🏆 Interview Ready

Showcases:
✅ Senior-level SDET expertise
✅ Clean code principles
✅ Production-ready practices
✅ Scalable solutions
✅ Comprehensive documentation
✅ Industry standard tools

Perfect for:
- 🎯 Technical interviews
- 🎯 Portfolio projects
- 🎯 Learning resource
- 🎯 Production implementation

## 📈 Future Enhancements

- [ ] Visual regression testing
- [ ] API mocking
- [ ] Performance testing
- [ ] Test analytics dashboard
- [ ] Accessibility testing
- [ ] Load testing

## 📄 License

MIT License - See [LICENSE](LICENSE)

## 👤 Author

**Ruban** - Principal SDET @ Concentrix
- GitHub: [@Ruban130](https://github.com/Ruban130)

---

**Last Updated**: 2024-01-01
**Version**: 1.0.0
**Status**: ✅ Production Ready
