import { Page, expect } from '@playwright/test';

/**
 * Authentication helper utilities for E2E tests
 */

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export const TEST_USER: LoginCredentials = {
  email: 'demo@example.com',
  password: 'password123',
};

/**
 * Login helper - fills the login form and submits
 */
export async function login(
  page: Page,
  credentials: LoginCredentials = TEST_USER
): Promise<void> {
  await page.goto('/auth/login');
  
  // Wait for login page to load
  await expect(page.getByRole('heading', { name: /sign in/i })).toBeVisible();
  
  // Fill in credentials
  await page.getByLabel(/email/i).fill(credentials.email);
  await page.getByLabel(/password/i).fill(credentials.password);
  
  // Handle remember me if specified
  if (credentials.rememberMe !== undefined) {
    const checkbox = page.getByLabel(/remember me/i);
    const isChecked = await checkbox.isChecked();
    if (credentials.rememberMe !== isChecked) {
      await checkbox.click();
    }
  }
  
  // Submit form
  await page.getByRole('button', { name: /sign in/i }).click();
  
  // Wait for navigation to complete (redirect to dashboard)
  await page.waitForURL('/', { timeout: 10000 });
}

/**
 * Logout helper - clicks logout from avatar dropdown
 */
export async function logout(page: Page): Promise<void> {
  // Click avatar to open dropdown
  await page.locator('[class*="rounded-full"]').first().click();
  
  // Click logout button
  await page.getByText(/logout/i).click();
  
  // Wait for redirect to login page
  await page.waitForURL('/auth/login', { timeout: 10000 });
}

/**
 * Check if user is authenticated by looking for avatar dropdown
 */
export async function isAuthenticated(page: Page): Promise<boolean> {
  try {
    const avatar = page.locator('[class*="rounded-full"]').first();
    await avatar.waitFor({ state: 'visible', timeout: 3000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Navigate to settings page with optional tab
 */
export async function goToSettings(page: Page, tab?: string): Promise<void> {
  const url = tab ? `/settings?tab=${tab}` : '/settings';
  await page.goto(url);
  await expect(page.getByRole('heading', { name: /settings/i })).toBeVisible();
}
