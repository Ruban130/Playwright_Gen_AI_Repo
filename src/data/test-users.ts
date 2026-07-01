export interface TestUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user' | 'guest';
}

export const TEST_USERS: Record<string, TestUser> = {
  ADMIN_USER: {
    id: '1',
    email: 'admin@example.com',
    password: 'AdminPassword123!',
    firstName: 'Admin',
    lastName: 'User',
    role: 'admin',
  },
  REGULAR_USER: {
    id: '2',
    email: 'user@example.com',
    password: 'UserPassword123!',
    firstName: 'Regular',
    lastName: 'User',
    role: 'user',
  },
  GUEST_USER: {
    id: '3',
    email: 'guest@example.com',
    password: 'GuestPassword123!',
    firstName: 'Guest',
    lastName: 'User',
    role: 'guest',
  },
};
