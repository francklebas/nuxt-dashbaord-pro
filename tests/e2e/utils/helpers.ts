import { Page } from '@playwright/test';

/**
 * General helper utilities for E2E tests
 */

/**
 * Wait for all network requests to settle (no pending requests)
 */
export async function waitForNetworkIdle(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Wait for hydration to complete
 */
export async function waitForHydration(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('load');
  // Give Nuxt a moment to hydrate
  await page.waitForTimeout(500);
}

/**
 * Scroll element into view
 */
export async function scrollIntoView(
  page: Page,
  selector: string
): Promise<void> {
  await page.locator(selector).scrollIntoViewIfNeeded();
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(
  page: Page,
  selector: string
): Promise<boolean> {
  const element = page.locator(selector);
  const box = await element.boundingBox();
  
  if (!box) return false;
  
  const viewport = page.viewportSize();
  if (!viewport) return false;
  
  return (
    box.y >= 0 &&
    box.y + box.height <= viewport.height &&
    box.x >= 0 &&
    box.x + box.width <= viewport.width
  );
}

/**
 * Take a screenshot with a descriptive name
 */
export async function takeScreenshot(
  page: Page,
  name: string
): Promise<void> {
  await page.screenshot({
    path: `tests/e2e/screenshots/${name}.png`,
    fullPage: true,
  });
}

/**
 * Fill form field and wait for it to be filled
 */
export async function fillField(
  page: Page,
  label: string | RegExp,
  value: string
): Promise<void> {
  const field = page.getByLabel(label);
  await field.fill(value);
  await field.blur(); // Trigger validation
  await page.waitForTimeout(100);
}

/**
 * Click button and wait for action
 */
export async function clickButton(
  page: Page,
  name: string | RegExp
): Promise<void> {
  const button = page.getByRole('button', { name });
  await button.click();
  await page.waitForTimeout(100);
}

/**
 * Wait for success message to appear
 */
export async function waitForSuccessMessage(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForSelector('[class*="bg-green"]', { 
    state: 'visible',
    timeout 
  });
}

/**
 * Wait for error message to appear
 */
export async function waitForErrorMessage(
  page: Page,
  timeout: number = 5000
): Promise<void> {
  await page.waitForSelector('[class*="bg-red"]', { 
    state: 'visible',
    timeout 
  });
}
