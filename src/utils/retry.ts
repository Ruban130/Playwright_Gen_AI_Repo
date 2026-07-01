import logger from './logger';

export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoffMultiplier?: number;
  timeout?: number;
}

/**
 * Retry utility with exponential backoff
 * @param fn Function to retry
 * @param options Retry configuration
 * @returns Result of the function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxAttempts = 3,
    delay = 1000,
    backoffMultiplier = 2,
    timeout = 30000,
  } = options;

  let lastError: Error | null = null;
  let currentDelay = delay;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      logger.info(`Attempt ${attempt}/${maxAttempts}`);
      const result = await Promise.race([
        fn(),
        new Promise<T>((_, reject) =>
          setTimeout(
            () => reject(new Error(`Operation timeout after ${timeout}ms`)),
            timeout
          )
        ),
      ]);
      return result;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      logger.warn(`Attempt ${attempt} failed: ${lastError.message}`);

      if (attempt < maxAttempts) {
        logger.info(`Retrying in ${currentDelay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, currentDelay));
        currentDelay *= backoffMultiplier;
      }
    }
  }

  throw new Error(`Max attempts (${maxAttempts}) reached. Last error: ${lastError?.message}`);
}
