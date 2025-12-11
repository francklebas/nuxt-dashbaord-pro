import { test, expect } from '@playwright/test';
import { switchLocale, getCurrentLocale, LOCALES } from './utils/i18n';
import { waitForHydration } from './utils/helpers';

test.describe('Internationalization', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
  });

  test('should default to English', async ({ page }) => {
    const locale = await getCurrentLocale(page);
    expect(locale).toBe('en');
  });

  test('should switch to French', async ({ page }) => {
    await switchLocale(page, 'fr');
    const locale = await getCurrentLocale(page);
    expect(locale).toBe('fr');
    await expect(page.getByRole('link', { name: /accueil/i })).toBeVisible();
  });

  test('should switch back to English', async ({ page }) => {
    await switchLocale(page, 'fr');
    await switchLocale(page, 'en');
    const locale = await getCurrentLocale(page);
    expect(locale).toBe('en');
    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
  });

  test('should persist language across navigation', async ({ page }) => {
    await switchLocale(page, 'fr');
    await page.goto('/pricing');
    await waitForHydration(page);
    const locale = await getCurrentLocale(page);
    expect(locale).toBe('fr');
  });

  test('should translate all navigation links', async ({ page }) => {
    await switchLocale(page, 'fr');
    await expect(page.getByRole('link', { name: /accueil/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /tableau de bord/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /composants/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /tarifs/i })).toBeVisible();
  });
});
