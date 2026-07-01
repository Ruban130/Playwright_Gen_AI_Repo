import { test, expect } from '@playwright/test';
import { APIClient } from '@api/api-client';
import { ENDPOINTS } from '@constants/endpoints';
import { TEST_USERS } from '@data/test-users';
import logger from '@utils/logger';

const apiClient = new APIClient(process.env.API_BASE_URL || 'https://api.example.com');

test.describe('API Tests', () => {
  test('should fetch all users', async () => {
    logger.info('Test: Fetch all users');

    const response = await apiClient.get(ENDPOINTS.USERS.GET_ALL);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);

    logger.info('Test passed: Successfully fetched all users');
  });

  test('should fetch user by ID', async () => {
    logger.info('Test: Fetch user by ID');
    const userId = '1';

    const response = await apiClient.get(ENDPOINTS.USERS.GET_BY_ID(userId));

    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('id');
    expect(response.data.id).toBe(userId);

    logger.info('Test passed: Successfully fetched user by ID');
  });

  test('should create new user', async () => {
    logger.info('Test: Create new user');
    const newUser = TEST_USERS.GUEST_USER;

    const response = await apiClient.post(ENDPOINTS.USERS.CREATE, newUser);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('id');

    logger.info('Test passed: Successfully created new user');
  });

  test('should update user', async () => {
    logger.info('Test: Update user');
    const userId = '1';
    const updatedData = { firstName: 'Updated' };

    const response = await apiClient.put(ENDPOINTS.USERS.UPDATE(userId), updatedData);

    expect(response.status).toBe(200);
    expect(response.data.firstName).toBe('Updated');

    logger.info('Test passed: Successfully updated user');
  });

  test('should delete user', async () => {
    logger.info('Test: Delete user');
    const userId = '1';

    const response = await apiClient.delete(ENDPOINTS.USERS.DELETE(userId));

    expect(response.status).toBe(200);

    logger.info('Test passed: Successfully deleted user');
  });
});
