import { test as base, expect } from '@playwright/test';
// import { ADMIN_LOGIN } from '../support/apiConstants.js';
// import { fixtureData } from '../fixtures/adminLoginData.json';

const config = require('../playwright.config.js');
const BASE_URL = config.use?.BASE_URL;

// export const test = base.extend({
//   superAdminSignIn: async ({ request }, use) => {
//     const signIn = async (userData = fixtureData.jsonData[0]) => {
//       const response = await request.post(`${BASE_URL}${ADMIN_LOGIN}`, {
//         data: userData,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const responseData = await response.json();
//       expect(response.status()).toBe(200);
//       expect(responseData).toHaveProperty('accessToken');
//       expect(responseData).toHaveProperty('searchToken');

//       const superAdminAccessToken = responseData.accessToken;
//       return { response, superAdminAccessToken};
//     };
//     await use({ signIn });
//   },
// });

// export { expect };


async function superAdminLogin(request, baseUrl, adminLoginEndpoint) {

  const adminLoginData = require('../fixtures/adminLoginData.json');
  const data = adminLoginData.jsonData[0];
  console.log('Admin Login Data:', data);
  const apiUrl = `${baseUrl}${adminLoginEndpoint}`;
  const headers = {
    'Content-Type': 'application/json',
  };

  const response = await request.post(apiUrl, {
    headers,
    data: {
      email: data.email,
      password: data.password,
    },
    failOnStatusCode: false,
  });

  // Assertions
  // expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log('Response body:', responseBody);
  expect(responseBody).toHaveProperty('accessToken');
  expect(responseBody).toHaveProperty('searchToken');

  // Store the access token
  const superAdminAccessToken = responseBody.accessToken;
  process.env.SUPER_ADMIN_ACCESS_TOKEN = superAdminAccessToken;
  return superAdminAccessToken; 
}

module.exports = { superAdminLogin };