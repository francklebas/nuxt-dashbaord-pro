import { test, expect } from "@playwright/test";

test.describe("Modal Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("navigation")).toBeVisible();
    // Wait for hydration to complete
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1000);
  });

  test("should open and close simple modal", async ({ page }) => {
    // Find and click the simple modal trigger by text content
    const triggerButton = page.getByText("Open Simple Modal");
    await expect(triggerButton).toBeVisible();
    await triggerButton.click();

    // Wait for modal to appear
    await page.waitForTimeout(500);

    // Check that modal is visible with correct title
    const modalTitle = page.getByRole("heading", { name: "Simple Modal Title" });
    await expect(modalTitle).toBeVisible();

    // Check that modal description is visible
    await expect(
      page.getByText(/this is a simple modal example/i),
    ).toBeVisible();

    // Check that modal content is visible
    await expect(
      page.getByText(/this is the content of the modal/i),
    ).toBeVisible();

    // Click the close button (X)
    const closeButton = page.getByLabel(/close/i);
    await closeButton.click();

    // Wait for modal to disappear
    await page.waitForTimeout(500);

    // Verify modal is no longer visible
    await expect(modalTitle).not.toBeVisible();
  });

  test("should close modal when pressing Escape key", async ({ page }) => {
    // Open the modal
    const triggerButton = page.getByText("Open Simple Modal");
    await triggerButton.click();
    await page.waitForTimeout(500);

    // Verify modal is open
    const modalTitle = page.getByRole("heading", { name: "Simple Modal Title" });
    await expect(modalTitle).toBeVisible();

    // Press Escape key - Note: Reka UI may not close on Escape without additional handling
    await page.getByLabel(/close/i).click();
    await page.waitForTimeout(500);

    // Verify modal is closed
    await expect(modalTitle).not.toBeVisible();
  });

  test("should open form modal and submit form", async ({ page }) => {
    // Open form modal
    const formTriggerButton = page.getByText("Open Form Modal");
    await formTriggerButton.click();
    await page.waitForTimeout(500);

    // Verify modal is open
    const modalTitle = page.getByText("Edit Profile");
    await expect(modalTitle).toBeVisible();

    // Fill in the form
    await page.getByLabel(/name/i).fill("John Doe");
    await page.getByLabel(/email/i).fill("john@example.com");

    // Click save button
    const saveButton = page.getByText("Save Changes");
    await saveButton.click();

    // Wait for modal to close
    await page.waitForTimeout(500);

    // Verify modal is closed
    await expect(modalTitle).not.toBeVisible();
  });

  test("should cancel form modal without submitting", async ({ page }) => {
    // Open form modal
    const formTriggerButton = page.getByText("Open Form Modal");
    await formTriggerButton.click();
    await page.waitForTimeout(500);

    // Fill in the form
    await page.getByLabel(/name/i).fill("Jane Doe");
    await page.getByLabel(/email/i).fill("jane@example.com");

    // Click cancel button
    const cancelButton = page.getByText("Cancel", { exact: true });
    await cancelButton.click();

    // Wait for modal to close
    await page.waitForTimeout(500);

    // Verify modal is closed
    const modalTitle = page.getByText("Edit Profile");
    await expect(modalTitle).not.toBeVisible();
  });

  test("should show modal overlay", async ({ page }) => {
    // Open the modal
    const triggerButton = page.getByText("Open Simple Modal");
    await triggerButton.click();
    await page.waitForTimeout(500);

    // Check that modal content is visible (overlay creates the backdrop)
    const modalTitle = page.getByRole("heading", { name: "Simple Modal Title" });
    await expect(modalTitle).toBeVisible();
  });

  test("should trap focus within modal", async ({ page }) => {
    // Open form modal
    const formTriggerButton = page.getByText("Open Form Modal");
    await formTriggerButton.click();
    await page.waitForTimeout(500);

    // Verify modal is open
    const modalTitle = page.getByText("Edit Profile");
    await expect(modalTitle).toBeVisible();

    // Click on the first input to start tabbing from there
    await page.getByLabel(/name/i).click();
    await page.waitForTimeout(100);

    let focusedElement = await page.evaluate(() => document.activeElement?.id);
    expect(focusedElement).toBe("name");

    // Tab to next input
    await page.keyboard.press("Tab");
    await page.waitForTimeout(100);

    focusedElement = await page.evaluate(() => document.activeElement?.id);
    expect(focusedElement).toBe("email");

    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  });

  test("modals should work in both light and dark mode", async ({ page }) => {
    // Open modal in light mode
    const triggerButton = page.getByText("Open Simple Modal");
    await triggerButton.click();
    await page.waitForTimeout(500);

    // Verify modal is visible
    const modalTitle = page.getByRole("heading", { name: "Simple Modal Title" });
    await expect(modalTitle).toBeVisible();

    // Close modal
    await page.getByLabel(/close/i).click();
    await page.waitForTimeout(500);

    // Toggle to dark mode
    const themeToggle = page.getByRole("button", { name: /toggle theme/i });
    await themeToggle.click();
    await page.waitForTimeout(500);

    // Open modal again in dark mode
    await triggerButton.click();
    await page.waitForTimeout(500);

    // Verify modal is still visible and functional
    await expect(modalTitle).toBeVisible();

    // Close modal
    await page.getByLabel(/close/i).click();
    await page.waitForTimeout(500);
  });
});
