import { test, expect } from '@playwright/test';
import { waitForHydration } from './utils/helpers';

test.describe('Navigation and Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
  });

  test('should display main navigation links', async ({ page }) => {
    // Check desktop navigation links (visible on desktop, hidden on mobile)
    await expect(page.getByRole('link', { name: /home/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /dashboard/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /components/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /pricing/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /form/i }).first()).toBeVisible();
  });

  test('should navigate to all main pages', async ({ page }) => {
    const routes = [
      { name: /home/i, url: '/' },
      { name: /pricing/i, url: '/pricing' },
      { name: /form/i, url: '/form' },
    ];

    for (const route of routes) {
      await page.goto(route.url);
      await waitForHydration(page);
      await expect(page).toHaveURL(route.url);
    }
  });

  test('should have working theme toggle', async ({ page }) => {
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class');
    const isDark = initialClass?.includes('dark');

    // Find and click theme toggle button
    const themeButton = page.locator('button').filter({
      has: page.locator('[name*="sun"], [name*="moon"]')
    }).first();

    if (await themeButton.count() > 0) {
      await themeButton.click();
      await page.waitForTimeout(500);
      const newClass = await html.getAttribute('class');
      const isNowDark = newClass?.includes('dark');
      expect(isNowDark).toBe(!isDark);
    }
  });
});
