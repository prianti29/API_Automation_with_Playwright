const { test, expect } = require('@playwright/test');
const API_ENDPOINTS = require('../../utils/apiConstants');


test.describe('Super Admin Login Tests', () => {
    test('Super Admin Login', async ({ page }) => {
    await superAdminLogin(page);
  });
});