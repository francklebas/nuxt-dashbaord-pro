import { test, expect } from "@playwright/test";

test.describe("Components Page", () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport to xl size to show sidebar (lg breakpoint is 1024px)
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/composants");
    // Wait for hydration
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);
  });

  test("should display page with main sections", async ({ page }) => {
    // Check that main sections exist (use locators, translations may not be loaded in SSR)
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page.locator("main")).toBeVisible();
    await expect(page.locator("#buttons")).toBeVisible();
    await expect(page.locator("#modals")).toBeVisible();
    await expect(page.locator("#tabs")).toBeVisible();
    await expect(page.locator("#tooltips")).toBeVisible();
  });

  test("should have sidebar navigation in DOM", async ({ page }) => {
    // Check that sidebar exists in DOM (may be hidden on smaller screens)
    const sidebar = page.locator("aside");
    await expect(sidebar).toBeAttached();

    // Check navigation items exist (at least 4 buttons for buttons, modals, tabs, tooltips)
    const navButtons = sidebar.locator("button");
    expect(await navButtons.count()).toBeGreaterThanOrEqual(4);
  });

  test("should display button variants and sizes", async ({ page }) => {
    const buttonsSection = page.locator("#buttons");

    // Click on Examples tab to see button variants
    await buttonsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Check button variants (scope to buttons section to avoid modal buttons)
    await expect(buttonsSection.getByRole("button", { name: "Primary" })).toBeVisible();
    await expect(buttonsSection.getByRole("button", { name: "Secondary" })).toBeVisible();
    await expect(buttonsSection.getByRole("button", { name: "Outline" })).toBeVisible();
    await expect(buttonsSection.getByRole("button", { name: "Ghost" })).toBeVisible();
    await expect(buttonsSection.getByRole("button", { name: "Destructive" })).toBeVisible();

    // Check button sizes (use .first() to avoid modal buttons)
    await expect(buttonsSection.getByRole("button", { name: "Small" })).toBeVisible();
    await expect(buttonsSection.getByRole("button", { name: "Medium" })).toBeVisible();
    await expect(buttonsSection.getByRole("button", { name: "Large" })).toBeVisible();

    // Check disabled state
    await expect(buttonsSection.getByRole("button", { name: "Disabled" })).toBeDisabled();
  });

  test("should display modals section", async ({ page }) => {
    // Check that modals section exists
    const modalsSection = page.locator("#modals");
    await expect(modalsSection).toBeVisible();

    // Click on Examples tab to see modal examples
    await modalsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Check modal trigger button
    await expect(page.getByRole("button", { name: /open modal/i })).toBeVisible();
  });

  test("should open modal when clicking trigger button", async ({ page }) => {
    const modalsSection = page.locator("#modals");

    // Click on Examples tab to see modal examples
    await modalsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Click modal trigger
    await page.getByRole("button", { name: /open modal/i }).click();
    await page.waitForTimeout(300);

    // Check that modal is visible
    await expect(page.getByRole("dialog")).toBeVisible();
    await expect(page.getByRole("heading", { name: /example modal/i })).toBeVisible();
    await expect(page.getByText(/this is a demonstration modal component/i)).toBeVisible();

    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // Check that modal is closed
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("should have scroll-linked sections", async ({ page }) => {
    // Check that sections are scroll-linkable via smooth scroll
    const buttonsSection = page.locator("#buttons");
    const modalsSection = page.locator("#modals");

    // Initially buttons should be in viewport
    await expect(buttonsSection).toBeInViewport();

    // Scroll to modals section
    await modalsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Modals section should now be in viewport
    await expect(modalsSection).toBeInViewport();
  });

  test("should work with different button variants", async ({ page }) => {
    const buttonsSection = page.locator("#buttons");

    // Click on Examples tab to see button variants
    await buttonsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Test that different variants are clickable
    await page.getByRole("button", { name: /^primary$/i }).click();
    await page.getByRole("button", { name: /^secondary$/i }).click();
    await page.getByRole("button", { name: /^outline$/i }).click();
    await page.getByRole("button", { name: /^ghost$/i }).click();
    await page.getByRole("button", { name: /^destructive$/i }).click();

    // All should be clickable without errors
  });

  test("should display modal size variants", async ({ page }) => {
    const modalsSection = page.locator("#modals");

    // Click on Examples tab to see modal size variants
    await modalsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Check that different size modal triggers exist in modals section
    await expect(modalsSection.getByRole("button", { name: "Small" })).toBeVisible();
    await expect(modalsSection.getByRole("button", { name: "Medium" })).toBeVisible();
    await expect(modalsSection.getByRole("button", { name: "Large" })).toBeVisible();
  });

  test("should work in dark mode", async ({ page }) => {
    // Toggle to dark mode
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Verify page is still functional
    await expect(page.locator("h1").first()).toBeVisible();

    // Click on Examples tab to see modal examples
    const modalsSection = page.locator("#modals");
    await modalsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    await expect(page.getByRole("button", { name: /open modal/i })).toBeVisible();

    // Open modal in dark mode
    await page.getByRole("button", { name: /open modal/i }).click();
    await page.waitForTimeout(500);

    // Check modal is visible in dark mode
    await expect(page.getByRole("dialog")).toBeVisible();
  });

  test("should switch language", async ({ page }) => {
    // Get initial h1 text
    const h1 = page.locator("h1").first();
    const initialText = await h1.textContent();

    // Switch to French
    await page.getByRole("button", { name: "Français" }).click();
    await page.waitForTimeout(500);

    // Text should change (translations should load client-side)
    const frenchText = await h1.textContent();
    expect(frenchText).not.toBe(initialText);

    // Switch back to English
    await page.getByRole("button", { name: "English" }).click();
    await page.waitForTimeout(500);

    // Text should revert
    const englishText = await h1.textContent();
    expect(englishText).toBe(initialText);
  });

  test("should navigate to other pages from nav", async ({ page }) => {
    // Navigate to home
    await page.getByRole("link", { name: /^home$/i }).click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL("/");

    // Navigate back to components
    await page.getByRole("link", { name: /components/i }).click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL("/composants");

    // Navigate to form
    await page.getByRole("link", { name: /contact form/i }).click();
    await page.waitForTimeout(500);
    await expect(page).toHaveURL("/form");
  });

  test("should switch between tabs", async ({ page }) => {
    const buttonsSection = page.locator("#buttons");

    // Default tab should be playground
    const playgroundTab = buttonsSection.getByRole("tab", { name: /playground/i });
    const examplesTab = buttonsSection.getByRole("tab", { name: /examples/i });

    await expect(playgroundTab).toHaveAttribute("aria-selected", "true");
    await expect(examplesTab).toHaveAttribute("aria-selected", "false");

    // Click examples tab
    await examplesTab.click();
    await page.waitForTimeout(300);

    // Examples tab should now be selected
    await expect(playgroundTab).toHaveAttribute("aria-selected", "false");
    await expect(examplesTab).toHaveAttribute("aria-selected", "true");

    // Click playground tab to switch back
    await playgroundTab.click();
    await page.waitForTimeout(300);

    // Playground tab should be selected again
    await expect(playgroundTab).toHaveAttribute("aria-selected", "true");
    await expect(examplesTab).toHaveAttribute("aria-selected", "false");
  });

  test("should have independent tabs for each section", async ({ page }) => {
    const buttonsSection = page.locator("#buttons");
    const modalsSection = page.locator("#modals");

    // Click examples tab in buttons section
    await buttonsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Buttons should show examples
    await expect(buttonsSection.getByRole("tab", { name: /examples/i })).toHaveAttribute("aria-selected", "true");

    // Modals should still show playground (default)
    await expect(modalsSection.getByRole("tab", { name: /playground/i })).toHaveAttribute("aria-selected", "true");

    // Click examples tab in modals section
    await modalsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Both sections should now show examples
    await expect(buttonsSection.getByRole("tab", { name: /examples/i })).toHaveAttribute("aria-selected", "true");
    await expect(modalsSection.getByRole("tab", { name: /examples/i })).toHaveAttribute("aria-selected", "true");
  });

  test("should display tabs component section", async ({ page }) => {
    const tabsSection = page.locator("#tabs");
    await expect(tabsSection).toBeVisible();

    // Click on Examples tab to see tabs examples
    await tabsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Check that basic tabs example is visible
    await expect(tabsSection.getByRole("tab", { name: /overview/i })).toBeVisible();
    await expect(tabsSection.getByRole("tab", { name: /details/i })).toBeVisible();

    // Check that tabs with icons example is visible
    await expect(tabsSection.getByRole("tab", { name: /files/i })).toBeVisible();
    await expect(tabsSection.getByRole("tab", { name: /images/i })).toBeVisible();

    // Verify features list is present
    await expect(tabsSection.getByText(/Full ARIA accessibility/i)).toBeVisible();
  });

  test("should interact with tabs examples", async ({ page }) => {
    const tabsSection = page.locator("#tabs");

    // Navigate to examples tab
    await tabsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Test basic tabs example - click on Details tab
    const basicTabsContainer = tabsSection.locator("div").filter({ hasText: /Basic Tabs/ }).first();
    const detailsTab = basicTabsContainer.getByRole("tab", { name: /^details$/i });
    await detailsTab.click();
    await page.waitForTimeout(300);

    // Verify Details tab is selected
    await expect(detailsTab).toHaveAttribute("aria-selected", "true");
    await expect(basicTabsContainer.getByText(/Detailed information/i)).toBeVisible();
  });

  test("should display tooltips component section", async ({ page }) => {
    const tooltipsSection = page.locator("#tooltips");
    await expect(tooltipsSection).toBeVisible();

    // Check that playground tab has tooltip buttons
    await expect(tooltipsSection.getByRole("button", { name: /^top$/i })).toBeVisible();
    await expect(tooltipsSection.getByRole("button", { name: /^right$/i })).toBeVisible();
    await expect(tooltipsSection.getByRole("button", { name: /^bottom$/i })).toBeVisible();
    await expect(tooltipsSection.getByRole("button", { name: /^left$/i })).toBeVisible();
  });

  test("should show tooltips examples", async ({ page }) => {
    const tooltipsSection = page.locator("#tooltips");

    // Click on Examples tab
    await tooltipsSection.getByRole("tab", { name: /examples/i }).click();
    await page.waitForTimeout(300);

    // Check that examples are visible
    await expect(tooltipsSection.getByText(/Basic Tooltip/i)).toBeVisible();
    await expect(tooltipsSection.getByText(/Positions/i)).toBeVisible();
    await expect(tooltipsSection.getByText(/Icon with Tooltip/i)).toBeVisible();

    // Verify features list is present
    await expect(tooltipsSection.getByText(/Four positioning options/i)).toBeVisible();
  });
});
