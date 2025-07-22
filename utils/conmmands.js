export const ADMIN_LOGIN = "/v1/auth/admins/signin";


const { expect } = require('@playwright/test');

const superAdminLogin = async ({ request, baseURL }) => {
  const data = JSON.parse(process.env.ADMIN_LOGIN_DATA);

  const apiUrl = `${baseURL}${ADMIN_LOGIN}`; // Adjust the endpoint as needed

  const response = await request.post(apiUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      email: data.email,
      password: data.password,
    },
    failOnStatusCode: false,
  });

  // Assertions
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  expect(responseBody).toHaveProperty('accessToken');
  expect(responseBody).toHaveProperty('searchToken');

  const superAdminAccessToken = responseBody.accessToken;

  // Store the token in an environment variable for later use
  process.env.SUPER_ADMIN_ACCESS_TOKEN = superAdminAccessToken;

  return superAdminAccessToken;
};

module.exports = { superAdminLogin };