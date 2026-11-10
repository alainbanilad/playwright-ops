import { test as setup, expect } from '@playwright/test';

const credentials = {
  admin: {
    username: 'Admin',
    password: 'admin123',
    statePath: 'tests/storageState.json',
  },
};

setup.describe.configure({ mode: 'serial' });
setup.setTimeout(60000);

for (const [role, { username, password, statePath }] of Object.entries(credentials)) {
  setup(`save ${role} user state`, async ({ page, context }) => {
    await page.goto('/web/index.php/auth/login');
    await page.getByPlaceholder('Username').fill(username);
    await page.getByPlaceholder('Password').fill(password);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await context.storageState({ path: statePath });
  });
}
