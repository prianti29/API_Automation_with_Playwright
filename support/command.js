import { test as base, expect } from '@playwright/test';
import { ADMIN_LOGIN } from '../support/apiConstants.js';
const config = require('../playwright.config.js');
const BASE_URL = config.use?.BASE_URL;
import fixtureData from '../fixtures/adminLoginData.json';

export const test = base.extend({
  superAdminSignIn: async ({ request }, use) => {
    const signIn = async (userData = fixtureData.jsonData[0]) => {
      const response = await request.post(`${BASE_URL}${ADMIN_LOGIN}`, {
        data: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      expect(response.status()).toBe(200);
      expect(responseData).toHaveProperty('accessToken');
      expect(responseData).toHaveProperty('searchToken');

      const superAdminAccessToken = responseData.accessToken;
      return { response, superAdminAccessToken};
    };
    await use({ signIn });
  },
});

export { expect };