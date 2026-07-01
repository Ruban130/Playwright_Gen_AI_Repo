import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import logger from '@utils/logger';
import { retry } from '@utils/retry';

/**
 * API Client for making HTTP requests
 */
export class APIClient {
  private client: AxiosInstance;
  private readonly baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Set Authorization header
   */
  setAuthHeader(token: string): void {
    logger.info('Setting authorization header');
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  /**
   * Remove Authorization header
   */
  removeAuthHeader(): void {
    logger.info('Removing authorization header');
    delete this.client.defaults.headers.common['Authorization'];
  }

  /**
   * GET request with retry
   */
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    logger.info(`GET request to: ${endpoint}`);
    return retry(() => this.client.get<T>(endpoint, config), {
      maxAttempts: 3,
      delay: 1000,
    });
  }

  /**
   * POST request with retry
   */
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    logger.info(`POST request to: ${endpoint}`);
    return retry(() => this.client.post<T>(endpoint, data, config), {
      maxAttempts: 3,
      delay: 1000,
    });
  }

  /**
   * PUT request with retry
   */
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    logger.info(`PUT request to: ${endpoint}`);
    return retry(() => this.client.put<T>(endpoint, data, config), {
      maxAttempts: 3,
      delay: 1000,
    });
  }

  /**
   * DELETE request with retry
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    logger.info(`DELETE request to: ${endpoint}`);
    return retry(() => this.client.delete<T>(endpoint, config), {
      maxAttempts: 3,
      delay: 1000,
    });
  }

  /**
   * PATCH request with retry
   */
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    logger.info(`PATCH request to: ${endpoint}`);
    return retry(() => this.client.patch<T>(endpoint, data, config), {
      maxAttempts: 3,
      delay: 1000,
    });
  }
}
