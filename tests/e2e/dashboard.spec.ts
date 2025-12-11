import { test, expect } from '@playwright/test';
import { login, TEST_USER } from './utils/auth';
import { waitForHydration } from './utils/helpers';

test.describe('Dashboard Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
    await page.goto('/dashboard');
    await waitForHydration(page);
  });

  test('should display dashboard', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
  });

  test('should display welcome message with user name', async ({ page }) => {
    await expect(page.getByText(/welcome back/i)).toBeVisible();
  });

  test('should display statistics cards', async ({ page }) => {
    await expect(page.getByText(/total users/i)).toBeVisible();
    await expect(page.getByText(/revenue/i)).toBeVisible();
    await expect(page.getByText(/orders/i)).toBeVisible();
    await expect(page.getByText(/conversion/i)).toBeVisible();
  });

  test('should display charts section', async ({ page }) => {
    await expect(page.getByText(/performance trends/i)).toBeVisible();
  });

  test('should display recent activity', async ({ page }) => {
    await expect(page.getByText(/recent activity/i)).toBeVisible();
  });

  test('should display quick actions', async ({ page }) => {
    await expect(page.getByText(/quick actions/i)).toBeVisible();
  });
});
