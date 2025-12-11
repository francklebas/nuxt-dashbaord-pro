import { test, expect } from '@playwright/test';
import { login, TEST_USER } from './utils/auth';
import { waitForHydration } from './utils/helpers';

test.describe('Navigation and Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
  });

  test('should display main navigation links', async ({ page }) => {
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /components/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /form/i })).toBeVisible();
  });

  test('should navigate to all main pages', async ({ page }) => {
    const routes = [
      { name: /home/i, url: '/' },
      { name: /dashboard/i, url: '/dashboard' },
      { name: /components/i, url: '/composants' },
      { name: /pricing/i, url: '/pricing' },
      { name: /form/i, url: '/form' },
    ];

    for (const route of routes) {
      await page.getByRole('link', { name: route.name }).click();
      await waitForHydration(page);
      await expect(page).toHaveURL(route.url);
    }
  });

  test('should show avatar dropdown when logged in', async ({ page }) => {
    await login(page, TEST_USER);
    const avatar = page.locator('[class*="rounded-full"]').first();
    await expect(avatar).toBeVisible();
  });

  test('should open avatar dropdown menu', async ({ page }) => {
    await login(page, TEST_USER);
    await page.locator('[class*="rounded-full"]').first().click();
    await expect(page.getByText(/profile/i)).toBeVisible();
    await expect(page.getByText(/settings/i)).toBeVisible();
    await expect(page.getByText(/billing/i)).toBeVisible();
    await expect(page.getByText(/logout/i)).toBeVisible();
  });
});
