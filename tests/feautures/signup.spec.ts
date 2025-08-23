import { test, expect } from '@playwright/test';

test('Verify that account has been registed should be logged into the system', async ({ page }) => {
  await page.goto('http://localhost:3000/signup'), { waitUntil: 'load' }
  const userData = {
    firstName: "Trang",
    lastName: "2k",
    userName: "trang2k",
    password: "SecureP@ssw0rd!",
    confirmPassword: "SecureP@ssw0rd!"
  };
  await page.locator('#firstName').fill(userData.firstName);
  await page.locator('#lastName').fill(userData.lastName);
  await page.locator('#username').fill(userData.userName);
  await page.locator('#password').fill(userData.password);
  await page.locator('#confirmPassword').fill(userData.confirmPassword);

  await page.getByTestId('signup-submit').click();

  await expect(page).toHaveURL('http://localhost:3000/signin');

  //Verify login
  await page.getByRole("textbox", { name: "username" }).fill(userData.userName);
  await page.getByRole("textbox", { name: "password" }).fill(userData.password);
  await page.getByTestId('signin-submit').click();
  // Verify login success
  const usernameElement = page.getByTestId('sidenav-username');
  await expect(usernameElement).toBeVisible();
  await expect(usernameElement).toHaveText(`@${userData.userName}`);


});
