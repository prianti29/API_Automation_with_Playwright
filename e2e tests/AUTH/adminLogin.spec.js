import {ADMIN_LOGIN} from '../../support/apiConstants.js';
const { test, expect } = require('@playwright/test');
const config = require('../../playwright.config.js');
const fixturData = require('../../fixtures/adminLoginData.json');

const BASE_URL = config.use?.BASE_URL;

test('Admin sign-in', async ({ request }) => {

    console.log(`Request URL: ${BASE_URL}${ADMIN_LOGIN}`);
    const response = await request.post(`${BASE_URL}${ADMIN_LOGIN}`, {
      data: {
        email: 'rezwankabirrobin@gmail.com',
        password: '12345678',
      }
    });

    expect(response.status()).toBe(200);
});