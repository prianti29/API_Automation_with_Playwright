
import { test, expect } from '../../support/command.js';
import { ADMIN_LOGIN } from '../support/apiConstants.js';
const config = require('../playwright.config.js');
const BASE_URL = config.use?.BASE_URL;
import fixtureData from '../fixtures/adminLoginData.json';

test.describe('Admin Login Tests', () => {
  test.beforeEach(async ({ superAdminSignIN }) => {
    // This will run before each test in this describe block
    const { response, superAdminAccessToken } = await superAdminSignIN.signIn();
    // You can use superAdminAccessToken for further API calls or assertions
  });

  test('Valid Email and invalid size of Password', async ({ request }) => {
    const Data = fixtureData.jsonData[1];
    const response = await request.post(`${BASE_URL}${ADMIN_LOGIN}`, {
      data: {
        email: Data.email,
        password: Data.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(Array.isArray(body.message)).toBe(true);
    expect(body.message[0]).toBe("password must be longer than or equal to 6 characters");
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("statusCode", 400);
  });

});