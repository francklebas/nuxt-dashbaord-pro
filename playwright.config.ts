import { defineConfig, devices } from "@playwright/test";

import { fileURLToPath } from "node:url";

import type { ConfigOptions } from "@nuxt/test-utils/playwright";

/**
 * Playwright Configuration for Nuxt Dashboard Pro
 *
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig<ConfigOptions>({
  testDir: "tests/e2e",

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI
  workers: process.env.CI ? 1 : undefined,

  // Reporter to use
  reporter: process.env.CI
    ? [["html"], ["github"]]
    : [["html"], ["list"]],

  // Shared settings for all the projects below
  use: {
    nuxt: {
      rootDir: fileURLToPath(new URL(".", import.meta.url)),
    },
    baseURL: "http://localhost:3000",

    // Collect trace when retrying the failed test
    trace: "on-first-retry",

    // Screenshot on failure
    screenshot: "only-on-failure",

    // Video on first retry
    video: "retain-on-failure",

    // Maximum time each action such as `click()` can take
    actionTimeout: 10000,

    // Maximum time each navigation (e.g. `goto()`) can take
    navigationTimeout: 30000,
  },

  // Maximum time one test can run
  timeout: 60000,

  // Maximum time to wait for test.expect()
  expect: {
    timeout: 10000,
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
