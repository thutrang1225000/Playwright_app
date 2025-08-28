import { test, expect } from '../pages/fixture';
// import { LoginPage } from '../pages/login';
// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:3000/');
// });
test.describe('Login feature', () => {
  test('Login success', async ({ loginPage, page }) => {
    // const loginPage = new LoginPage(page);
    await loginPage.goto('http://localhost:3000/');
    await loginPage.login('Heath93', 's3cret');
    const usernameElement = page.getByTestId('sidenav-username');
    await expect(usernameElement).toBeVisible();
    await expect(usernameElement).toHaveText(`@Heath93`);
  });
  test('Login failed', async ({ loginPage, page }) => {
    // const loginPage = new LoginPage(page);
    await loginPage.goto('http://localhost:3000/');
    await loginPage.login('Heath93', 's3cret1');
    const usernameElement = page.getByTestId('sidenav-username');
    await expect(usernameElement).toBeVisible();
    await expect(usernameElement).toHaveText(`@Heath93`);
  });

});