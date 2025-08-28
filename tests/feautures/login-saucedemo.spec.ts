import { test, expect } from '@playwright/test';
const data: { [key: string]: string } = {
    'Sauce Labs Backpack': '$29.99',
    'Sauce Labs Bike Light': '$9.99',
    'Sauce Labs Bolt T-Shirt': '$15.99',
    'Sauce Labs Fleece Jacket': '$49.99',
    'Sauce Labs Onesie': '$7.99',
    'Test.allTheThings() T-Shirt (Red)': '$15.99'
}
test('Login success ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByPlaceholder('Username')).toBeVisible();
    await expect(page.getByPlaceholder('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    const inventoryList = page.locator('[data-test="inventory-item-name"]');
    const itemCount = await inventoryList.count();
    console.log('item count:' + itemCount);
    expect(itemCount).toBe(6);

    for (const item of await inventoryList.all()) {  // trả về 1 list các locator 
        const itemName = await item.textContent();  // trả về 1 single locator 
        console.log(itemName + ' trang test locator Name' + item);
        if (itemName && data.hasOwnProperty(itemName)) {
            const priceLocator = item.locator('xpath=../../..//div[@data-test="inventory-item-price"]');
            const itemPrice = await priceLocator.textContent();
            console.log(itemPrice + ' item price' + item);
            expect(itemPrice).toBe(data[itemName]);
        }
    }

});