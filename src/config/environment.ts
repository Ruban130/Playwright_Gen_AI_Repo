import dotenv from 'dotenv';

dotenv.config();

export interface EnvironmentConfig {
  environment: string;
  baseUrl: string;
  apiBaseUrl: string;
  browser: string;
  headless: boolean;
  slowMo: number;
  timeout: number;
  retryAttempts: number;
  reportType: string;
  logLevel: string;
  debug: boolean;
}

const getEnvironmentConfig = (): EnvironmentConfig => {
  return {
    environment: process.env.ENVIRONMENT || 'dev',
    baseUrl: process.env.BASE_URL || 'https://example.com',
    apiBaseUrl: process.env.API_BASE_URL || 'https://api.example.com',
    browser: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS !== 'false',
    slowMo: parseInt(process.env.SLOW_MO || '0', 10),
    timeout: parseInt(process.env.TIMEOUT || '30000', 10),
    retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '2', 10),
    reportType: process.env.REPORT_TYPE || 'allure',
    logLevel: process.env.LOG_LEVEL || 'info',
    debug: process.env.DEBUG === 'true',
  };
};

export const config = getEnvironmentConfig();
