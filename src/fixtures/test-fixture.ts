import { test as base, Page } from '@playwright/test';
import logger from '@utils/logger';

type TestFixtures = {
  apiContext: any;
};

export const test = base.extend<TestFixtures>({
  apiContext: async ({ }, use) => {
    logger.info('Setting up API context');
    // Setup API context here
    await use({});
    logger.info('Tearing down API context');
  },
});

export { expect } from '@playwright/test';
