import { test, expect } from '@playwright/test';
import {
  changePageSize,
  navigateToPage,
  verifyPaginationDisplay,
  verifyButtonStates,
  getFirstRowText,
} from './utils/pagination-helpers';

test.describe('Data Tables', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('products page loads and displays data', async ({ page }) => {
    // Navigate to products page
    await page.click('text=Products');
    await page.waitForURL('/products');

    // Check page title (use text-based selector to avoid navigation elements)
    await expect(page.getByRole('heading', { level: 1, name: /Products Management/i })).toBeVisible();

    // Wait for data to load
    await page.waitForTimeout(1000);

    // Check that table is visible
    await expect(page.locator('table')).toBeVisible();

    // Check pagination shows correct format
    await expect(page.locator('text=/Page \\d+ of \\d+/')).toBeVisible();

    // Check stats cards
    await expect(page.locator('text=Total Products')).toBeVisible();
    await expect(page.locator('text=In Stock')).toBeVisible();
  });

  test('users page loads and displays data', async ({ page }) => {
    await page.click('text=Users');
    await page.waitForURL('/users');

    await expect(page.getByRole('heading', { level: 1, name: /User Management/i })).toBeVisible();

    await page.waitForTimeout(1000);
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=Total Users')).toBeVisible();
  });

  test('orders page loads and displays data', async ({ page }) => {
    await page.click('text=Orders');
    await page.waitForURL('/orders');

    await expect(page.getByRole('heading', { level: 1, name: /Order Management/i })).toBeVisible();

    await page.waitForTimeout(1000);
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('text=Total Orders')).toBeVisible();
  });

  test('products search functionality works', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);

    // Type in search box
    await page.fill('input[placeholder*="Search"]', 'Wireless');
    await page.waitForTimeout(500);

    // Results should update (this tests client-side filtering in the demo)
    await expect(page.locator('table')).toBeVisible();
  });

  test('products filters panel toggles', async ({ page }) => {
    await page.goto('/products');

    // Click filters button
    await page.click('button:has-text("Filters")');
    await page.waitForTimeout(300);

    // Filter panel should be visible
    await expect(page.locator('text=Category')).toBeVisible();
  });

  test('add product button is clickable', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);

    // Verify Add Product button exists and is clickable
    const addButton = page.locator('button:has-text("Add Product")');
    await expect(addButton).toBeVisible();
    await expect(addButton).toBeEnabled();

    // Click the button (modal interaction tested in modal.e2e.spec.ts)
    await addButton.click();
  });

  test('clicking on a product row opens edit modal', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);

    // Wait for table to be visible
    await expect(page.locator('table')).toBeVisible();

    // Find the first data row (skip header row)
    const firstRow = page.locator('tbody tr').first();
    await expect(firstRow).toBeVisible();

    // Click on the product name cell (3rd cell: checkbox, image, name)
    const nameCell = firstRow.locator('td').nth(2);
    await nameCell.click();

    // Modal should open with "Edit Product" title
    await expect(page.locator('text=Edit Product')).toBeVisible({ timeout: 2000 });

    // Modal should have a form with product fields
    await expect(page.locator('input[placeholder*="product name"]')).toBeVisible();
  });

  // Pagination Tests
  test.describe.configure({ mode: 'serial' });
  test.describe('Pagination', () => {

    test.describe('Products Page (40 items)', () => {
      test.beforeEach(async ({ page }) => {
        await page.click('text=Products');
        await page.waitForURL('/products');
        // Wait for initial data load
        await page.waitForTimeout(2000);
        // Ensure table has loaded with data
        await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 5000 });
      });

      test('should display correct initial pagination state', async ({ page }) => {
        await verifyPaginationDisplay(page, {
          currentPage: 1,
          totalPages: 4, // 40 items / 10 per page
          showingFrom: 1,
          showingTo: 10,
          totalResults: 40,
        });

        await verifyButtonStates(page, {
          first: false,
          previous: false,
          next: true,
          last: true,
        });
      });

      test('should navigate to next page', async ({ page }) => {
        const firstPageFirstRow = await getFirstRowText(page);

        await navigateToPage(page, 'next');

        await verifyPaginationDisplay(page, {
          currentPage: 2,
          showingFrom: 11,
          showingTo: 20,
        });

        const secondPageFirstRow = await getFirstRowText(page);
        expect(secondPageFirstRow).not.toBe(firstPageFirstRow);
      });

      test('should navigate to last page', async ({ page }) => {
        await navigateToPage(page, 'last');

        await verifyPaginationDisplay(page, {
          currentPage: 4,
          showingFrom: 31,
          showingTo: 40,
        });

        await verifyButtonStates(page, {
          first: true,
          previous: true,
          next: false,
          last: false,
        });
      });

      test('should navigate to first page from last page', async ({ page }) => {
        await navigateToPage(page, 'last');
        await navigateToPage(page, 'first');

        await verifyPaginationDisplay(page, {
          currentPage: 1,
          showingFrom: 1,
          showingTo: 10,
        });
      });

      test('should navigate using previous button', async ({ page }) => {
        await navigateToPage(page, 'next');
        await navigateToPage(page, 'next');

        await verifyPaginationDisplay(page, { currentPage: 3 });

        await navigateToPage(page, 'previous');

        await verifyPaginationDisplay(page, { currentPage: 2 });
      });

      test('should change page size to 20', async ({ page }) => {
        await changePageSize(page, 20);

        await verifyPaginationDisplay(page, {
          currentPage: 1,
          totalPages: 2, // 40 items / 20 per page
          showingFrom: 1,
          showingTo: 20,
          totalResults: 40,
        });
      });

      test('should change page size to 30', async ({ page }) => {
        await changePageSize(page, 30);

        await verifyPaginationDisplay(page, {
          totalPages: 2, // 40 items / 30 per page
          showingTo: 30,
        });
      });

      test('should change page size to 100 and disable all navigation', async ({ page }) => {
        await changePageSize(page, 100);

        await verifyPaginationDisplay(page, {
          currentPage: 1,
          totalPages: 1,
          showingFrom: 1,
          showingTo: 40,
        });

        await verifyButtonStates(page, {
          first: false,
          previous: false,
          next: false,
          last: false,
        });
      });

      test('should persist page size when navigating', async ({ page }) => {
        await changePageSize(page, 20);
        await navigateToPage(page, 'next');

        await verifyPaginationDisplay(page, {
          currentPage: 2,
          showingFrom: 21,
          showingTo: 40,
        });
      });

      test('should navigate through all pages sequentially', async ({ page }) => {
        // Page 1 -> 2
        await navigateToPage(page, 'next');
        await verifyPaginationDisplay(page, { currentPage: 2 });

        // Page 2 -> 3
        await navigateToPage(page, 'next');
        await verifyPaginationDisplay(page, { currentPage: 3 });

        // Page 3 -> 4
        await navigateToPage(page, 'next');
        await verifyPaginationDisplay(page, { currentPage: 4 });

        // Verify next/last are disabled on last page
        await verifyButtonStates(page, {
          next: false,
          last: false,
        });
      });
    });

    test.describe('Users Page (25 items)', () => {
      test.beforeEach(async ({ page }) => {
        await page.click('text=Users');
        await page.waitForURL('/users');
        // Wait for initial data load
        await page.waitForTimeout(2000);
        // Ensure table has loaded with data
        await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 5000 });
      });

      test('should display correct initial pagination state', async ({ page }) => {
        await verifyPaginationDisplay(page, {
          currentPage: 1,
          totalPages: 3, // 25 items / 10 per page
          showingFrom: 1,
          showingTo: 10,
          totalResults: 25,
        });
      });

      test('should show correct count on last page with partial data', async ({ page }) => {
        await navigateToPage(page, 'last');

        await verifyPaginationDisplay(page, {
          currentPage: 3,
          showingFrom: 21,
          showingTo: 25, // Only 5 items on last page
          totalResults: 25,
        });
      });

      test('should change page size to 30 showing all items', async ({ page }) => {
        await changePageSize(page, 30);

        await verifyPaginationDisplay(page, {
          currentPage: 1,
          totalPages: 1,
          showingFrom: 1,
          showingTo: 25,
        });

        await verifyButtonStates(page, {
          first: false,
          previous: false,
          next: false,
          last: false,
        });
      });

      test('should navigate to next page', async ({ page }) => {
        await navigateToPage(page, 'next');

        await verifyPaginationDisplay(page, {
          currentPage: 2,
          showingFrom: 11,
          showingTo: 20,
        });
      });

      test('should change page size to 20', async ({ page }) => {
        await changePageSize(page, 20);

        await verifyPaginationDisplay(page, {
          totalPages: 2,
          showingTo: 20,
        });
      });

      test('should navigate to last page with partial data', async ({ page }) => {
        await navigateToPage(page, 'last');

        await verifyPaginationDisplay(page, {
          currentPage: 3,
          totalPages: 3,
          showingFrom: 21,
          showingTo: 25,
        });

        await verifyButtonStates(page, {
          first: true,
          previous: true,
          next: false,
          last: false,
        });
      });
    });

    test.describe('Orders Page (25 items)', () => {
      test.beforeEach(async ({ page }) => {
        await page.click('text=Orders');
        await page.waitForURL('/orders');
        // Wait for initial data load
        await page.waitForTimeout(2000);
        // Ensure table has loaded with data
        await page.locator('tbody tr').first().waitFor({ state: 'visible', timeout: 5000 });
      });

      test('should display correct initial pagination state', async ({ page }) => {
        await verifyPaginationDisplay(page, {
          currentPage: 1,
          totalPages: 3, // 25 items / 10 per page
          showingFrom: 1,
          showingTo: 10,
          totalResults: 25,
        });
      });

      test('should show correct count on last page with partial data', async ({ page }) => {
        await navigateToPage(page, 'last');

        await verifyPaginationDisplay(page, {
          currentPage: 3,
          showingFrom: 21,
          showingTo: 25, // Only 5 items on last page
        });
      });

      test('should navigate to next page', async ({ page }) => {
        await navigateToPage(page, 'next');

        await verifyPaginationDisplay(page, {
          currentPage: 2,
          showingFrom: 11,
          showingTo: 20,
        });
      });

      test('should change page size to 50', async ({ page }) => {
        await changePageSize(page, 50);

        await verifyPaginationDisplay(page, {
          totalPages: 1,
          showingTo: 25,
        });

        await verifyButtonStates(page, {
          first: false,
          previous: false,
          next: false,
          last: false,
        });
      });

      test('should navigate to last page', async ({ page }) => {
        await navigateToPage(page, 'last');

        await verifyPaginationDisplay(page, {
          currentPage: 3,
          totalPages: 3,
        });

        await verifyButtonStates(page, {
          next: false,
          last: false,
        });
      });

      test('should change page size to 20', async ({ page }) => {
        await changePageSize(page, 20);

        await verifyPaginationDisplay(page, {
          totalPages: 2,
          showingTo: 20,
        });
      });
    });
  });
});
