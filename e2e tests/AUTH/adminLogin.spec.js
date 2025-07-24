import { test, expect } from '@playwright/test';
import { ADMIN_LOGIN } from '../../support/apiConstants.js';
import fixtureData from '../../fixtures/adminLoginData.json';

const config = require('../../playwright.config.js');
const BASE_URL = config.use?.BASE_URL;

test('Super Admin sign-in', async ({ request }) => {
  const response = await request.post(`${BASE_URL}${ADMIN_LOGIN}`, {
    data: fixtureData.jsonData[0],
  });
  expect(response.status()).toBe(200);
}); 