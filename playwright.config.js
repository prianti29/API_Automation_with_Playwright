
import { defineConfig, devices } from '@playwright/test';
const fs = require('fs');
const path = require('path');

const updateJsonFiles = () => {
  const updates = {};

  // AdminLoginJson
  const adminLoginPath = path.join(__dirname, 'e2e_tests', 'fixtures', 'adminLoginData.json');
  if (fs.existsSync(adminLoginPath)) {
    const data = JSON.parse(fs.readFileSync(adminLoginPath, 'utf8'));
    // No updates needed per original task, but file is touched
    fs.writeFileSync(adminLoginPath, JSON.stringify(data, null, 2));
    updates.adminLoginData = data;
  }
  return updates;
};
updateJsonFiles();
module.exports = defineConfig({
  testDir: './e2e_tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://api.pengine.dev',
    actionTimeout: 10000, 
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});

