import { defineConfig, devices } from '@playwright/test';
 
export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  workers: 1,
 
  // ✅ Reporters mis à jour
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],
 
  use: {
    baseURL: 'https://www.saucedemo.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
  },
 
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
 