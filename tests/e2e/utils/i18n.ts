import { Page, expect } from '@playwright/test';

/**
 * i18n helper utilities for E2E tests
 */

export type Locale = 'en' | 'fr';

export const LOCALES: Locale[] = ['en', 'fr'];

/**
 * Switch language using the language selector in navigation
 */
export async function switchLocale(page: Page, locale: Locale): Promise<void> {
  const languageButton = page.getByRole('button', { 
    name: locale === 'en' ? 'EN' : 'FR' 
  });
  
  await expect(languageButton).toBeVisible();
  await languageButton.click();
  
  // Wait a moment for the locale to change
  await page.waitForTimeout(500);
}

/**
 * Get current locale from the active language button
 */
export async function getCurrentLocale(page: Page): Promise<Locale> {
  // Check which button has active styling
  const enButton = page.getByRole('button', { name: 'EN' });
  const frButton = page.getByRole('button', { name: 'FR' });
  
  const enClasses = await enButton.getAttribute('class');
  const frClasses = await frButton.getAttribute('class');
  
  // Active button has primary colors
  if (enClasses?.includes('bg-primary')) {
    return 'en';
  } else if (frClasses?.includes('bg-primary')) {
    return 'fr';
  }
  
  return 'en'; // default
}

/**
 * Verify text is translated correctly by checking for key patterns
 */
export async function expectTranslation(
  page: Page,
  selector: string,
  enText: string | RegExp,
  frText: string | RegExp
): Promise<void> {
  const locale = await getCurrentLocale(page);
  const expectedText = locale === 'en' ? enText : frText;
  
  await expect(page.locator(selector)).toContainText(expectedText);
}
