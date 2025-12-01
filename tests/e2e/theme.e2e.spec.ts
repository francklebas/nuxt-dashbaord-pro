import { test, expect } from "@playwright/test";

test.describe("Theme switching", () => {
  test("should toggle between light and dark mode", async ({ page }) => {
    await page.goto("/");

    // Wait for the page to load
    await expect(page.getByRole("navigation")).toBeVisible();

    // Find the theme toggle button
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await expect(themeToggle).toBeVisible();

    // Get initial background color of the body to detect theme change
    const initialBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Click to toggle theme
    await themeToggle.click();

    // Wait a bit for the theme to apply
    await page.waitForTimeout(500);

    // Get new background color
    const newBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });

    // Background color should change (light mode has white/light bg, dark mode has dark bg)
    expect(newBg).not.toBe(initialBg);

    // Click again to toggle back
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Should return to initial background
    const finalBg = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    expect(finalBg).toBe(initialBg);
  });

  test("should persist theme preference", async ({ page, context }) => {
    await page.goto("/");

    // Toggle to dark mode
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await themeToggle.click();
    await page.waitForTimeout(100);

    const html = page.locator("html");
    const darkModeClass = await html.getAttribute("class");

    // Navigate to a new page (reload)
    await page.reload();
    await expect(page.getByRole("navigation")).toBeVisible();

    // Verify the theme persisted
    const persistedClass = await html.getAttribute("class");
    expect(persistedClass).toBe(darkModeClass);
  });

  test("buttons should be visible in both themes", async ({ page }) => {
    await page.goto("/");

    // Check buttons in light mode (use exact match and first() to avoid ambiguity)
    const primaryButton = page.getByRole("button", { name: "Primary", exact: true }).first();
    await expect(primaryButton).toBeVisible();

    const secondaryButton = page.getByRole("button", { name: "Secondary", exact: true }).first();
    await expect(secondaryButton).toBeVisible();

    // Toggle to dark mode
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await themeToggle.click();
    await page.waitForTimeout(300);

    // Buttons should still be visible
    await expect(primaryButton).toBeVisible();
    await expect(secondaryButton).toBeVisible();
  });
});
