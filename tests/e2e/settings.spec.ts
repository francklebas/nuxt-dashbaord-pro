import { test, expect } from '@playwright/test';
import { login, TEST_USER, goToSettings } from './utils/auth';
import { waitForHydration, fillField, waitForSuccessMessage } from './utils/helpers';

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page, TEST_USER);
    await goToSettings(page);
  });

  test('should display settings page with all tabs', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /profile/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /account/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /preferences/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /billing/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /team/i })).toBeVisible();
  });

  test('should switch between tabs', async ({ page }) => {
    await page.getByRole('button', { name: /account/i }).click();
    await expect(page.getByText(/change password/i)).toBeVisible();
    await page.getByRole('button', { name: /preferences/i }).click();
    await expect(page.getByText(/language/i)).toBeVisible();
  });

  test('should update profile information', async ({ page }) => {
    await fillField(page, /full name/i, 'New Test Name');
    await fillField(page, /bio/i, 'This is my test bio');
    await page.getByRole('button', { name: /save changes/i }).click();
    await waitForSuccessMessage(page);
  });

  test('should display current user email as read-only', async ({ page }) => {
    const emailField = page.getByLabel(/email address/i);
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeDisabled();
  });

  test('should validate password change', async ({ page }) => {
    await page.getByRole('button', { name: /account/i }).click();
    await fillField(page, /current password/i, 'oldpass123');
    await fillField(page, /new password/i, 'newpass123');
    await fillField(page, /confirm password/i, 'differentpass');
    await page.getByRole('button', { name: /update password/i }).click();
    await expect(page.locator('[class*="bg-red"]')).toBeVisible();
  });
});
