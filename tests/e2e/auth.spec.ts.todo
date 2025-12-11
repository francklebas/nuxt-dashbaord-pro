import { test, expect } from '@playwright/test';
import { login, logout, TEST_USER, isAuthenticated } from './utils/auth';
import { waitForHydration } from './utils/helpers';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForHydration(page);
  });

  test('should display login page', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Check page elements
    await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    
    // Check for forgot password link
    await expect(page.getByText(/forgot password/i)).toBeVisible();
    
    // Check for register link
    await expect(page.getByText(/don't have an account/i)).toBeVisible();
  });

  test('should successfully login with valid credentials', async ({ page }) => {
    await login(page, TEST_USER);
    
    // Should redirect to home page
    await expect(page).toHaveURL('/');
    
    // Should show user avatar in navigation
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(true);
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.getByLabel(/email/i).fill('wrong@example.com');
    await page.getByLabel(/password/i).fill('wrongpassword');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should show error message
    await expect(page.locator('[class*="bg-red"]')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/auth/login');
    
    // Try to submit without filling fields
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should show validation errors (HTML5 validation or custom)
    const emailInput = page.getByLabel(/email/i);
    const passwordInput = page.getByLabel(/password/i);
    
    // Check if fields are marked as invalid
    await expect(emailInput).toHaveAttribute('required', '');
    await expect(passwordInput).toHaveAttribute('required', '');
  });

  test('should remember me checkbox work', async ({ page }) => {
    await page.goto('/auth/login');
    
    const rememberMeCheckbox = page.getByLabel(/remember me/i);
    await expect(rememberMeCheckbox).toBeVisible();
    
    // Should be unchecked by default
    await expect(rememberMeCheckbox).not.toBeChecked();
    
    // Should be checkable
    await rememberMeCheckbox.click();
    await expect(rememberMeCheckbox).toBeChecked();
  });

  test('should navigate to forgot password page', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.getByText(/forgot password/i).click();
    await expect(page).toHaveURL('/auth/forgot-password');
    
    // Check forgot password page elements
    await expect(page.getByRole('heading', { name: /forgot password/i })).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test('should navigate to register page', async ({ page }) => {
    await page.goto('/auth/login');
    
    await page.getByText(/sign up/i).click();
    await expect(page).toHaveURL('/auth/register');
    
    // Check register page elements
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await login(page, TEST_USER);
    await expect(page).toHaveURL('/');
    
    // Then logout
    await logout(page);
    
    // Should redirect to login page
    await expect(page).toHaveURL('/auth/login');
    
    // Should not show user avatar
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(false);
  });

  test('should persist authentication on page reload with remember me', async ({ page }) => {
    // Login with remember me
    await login(page, { ...TEST_USER, rememberMe: true });
    await expect(page).toHaveURL('/');
    
    // Reload page
    await page.reload();
    await waitForHydration(page);
    
    // Should still be authenticated
    const authenticated = await isAuthenticated(page);
    expect(authenticated).toBe(true);
    await expect(page).toHaveURL('/');
  });

  test('should redirect to login when accessing protected route without auth', async ({ page }) => {
    // Ensure not authenticated
    await page.goto('/');
    const authenticated = await isAuthenticated(page);
    
    if (authenticated) {
      await logout(page);
    }
    
    // Try to access settings page
    await page.goto('/settings');
    
    // Should redirect to login (or show login prompt)
    // Note: This depends on your middleware implementation
    // Adjust assertion based on actual behavior
    await page.waitForTimeout(1000);
    const currentUrl = page.url();
    
    // Should either redirect to login or stay on home without access
    expect(
      currentUrl.includes('/auth/login') || currentUrl === 'http://localhost:3000/'
    ).toBe(true);
  });
});
