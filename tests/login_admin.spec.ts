import { test, expect } from '@playwright/test';

test.use({ storageState: 'tests/storageState.json' });

test('admin state opens an authenticated session', async ({ page }) => {
  await page.goto('/web/index.php/dashboard/index');

  await expect(page).toHaveURL(/dashboard\/index/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});