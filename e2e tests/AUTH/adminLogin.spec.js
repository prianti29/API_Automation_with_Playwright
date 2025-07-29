import { test, expect } from "@playwright/test";
import { ADMIN_LOGIN } from "../../support/apiConstants.js";
import { fixtureData } from "../../fixtures/adminLoginData.json";
import { superAdminLogin } from "../../support/command.js";

const config = require("../../playwright.config.js");
const BASE_URL = config.use?.BASE_URL;

test.describe("Admin Login Tests", () => {
  test.beforeAll(async ({ request }) => {
    await superAdminLogin(request, BASE_URL, ADMIN_LOGIN);
  });

  test("Valid Email and invalid size of Password", async ({ request }) => {
    const Data = fixtureData.jsonData[1];
    const response = await request.post(`${BASE_URL}${ADMIN_LOGIN}`, {
      data: {
        email: Data.email,
        password: Data.password,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPER_ADMIN_ACCESS_TOKEN}`,
      },
    });
    const body = await response.json();
    expect(response.status()).toBe(400);
    expect(Array.isArray(body.message)).toBe(true);
    expect(body.message[0]).toBe(
      "password must be longer than or equal to 6 characters"
    );
    expect(body).toHaveProperty("error", "Bad Request");
    expect(body).toHaveProperty("statusCode", 400);
  });
});
