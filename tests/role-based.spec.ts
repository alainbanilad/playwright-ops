import { test, expect } from '@playwright/test';

test.describe('admin role', () => {
  test.use({ storageState: 'tests/storageState.json' });

  test('can access administration features', async ({ page }) => {
    await page.goto('/web/index.php/dashboard/index');

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Admin', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'PIM', exact: true })).toBeVisible();
  });
});
