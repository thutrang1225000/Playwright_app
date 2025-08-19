import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/');
});
// 1. Confirm that the user can log in successfully using valid credentials
test.describe('Log in feature', () => {
  test('Confirm that the user can log in successfully using valid credentials', async ({ page }) => {
      const username = 'Heath93';
    await page.getByRole("textbox",{name: "username"}).fill(username);
    await page.getByRole("textbox",{name: "password"}).fill('s3cret');
    await page.getByTestId('signin-submit').click();

    const usernameElement = page.getByTestId('sidenav-username');
    await expect(usernameElement).toBeVisible();
    await expect(usernameElement).toHaveText(`@${username}`);  
  });


});

