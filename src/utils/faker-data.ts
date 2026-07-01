import { faker } from '@faker-js/faker';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  quantity: number;
  sku: string;
}

/**
 * Generate random user data
 */
export const generateUserData = (): UserData => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password({ length: 12, memorable: false }),
  phone: faker.phone.number(),
  address: faker.location.streetAddress(),
  city: faker.location.city(),
  country: faker.location.country(),
  zipCode: faker.location.zipCode(),
});

/**
 * Generate random product data
 */
export const generateProductData = (): ProductData => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: parseFloat(faker.commerce.price()),
  quantity: faker.number.int({ min: 1, max: 1000 }),
  sku: faker.string.alphaNumeric(10).toUpperCase(),
});

/**
 * Generate random email
 */
export const generateEmail = (): string => faker.internet.email();

/**
 * Generate random password
 */
export const generatePassword = (): string => faker.internet.password({ length: 12, memorable: false });
