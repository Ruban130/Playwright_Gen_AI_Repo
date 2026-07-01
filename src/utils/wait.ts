import logger from './logger';

/**
 * Wait for a specific duration in milliseconds
 * @param ms Milliseconds to wait
 */
export async function wait(ms: number): Promise<void> {
  logger.debug(`Waiting for ${ms}ms`);
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wait with exponential backoff
 * @param attempt Current attempt number
 * @param baseDelay Base delay in milliseconds
 * @param multiplier Exponential backoff multiplier
 */
export function getBackoffDelay(
  attempt: number,
  baseDelay: number = 1000,
  multiplier: number = 2
): number {
  return baseDelay * Math.pow(multiplier, attempt - 1);
}
