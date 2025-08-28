import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
    const userData = {
        userName: "Heath93",
        password: "s3cret",
    };
    await page.getByRole("textbox", { name: "username" }).fill(userData.userName);
    await page.getByRole("textbox", { name: "password" }).fill(userData.password);
    await page.getByTestId('signin-submit').click();
});
// 3. Verify that the notifications has 8 items items list
// 4. Verify that after dismissing a notification, the notifications displays the remaining notifications
test.describe('Notification', () => {
    test('display 8 items list noti ', async ({ page }) => {
        const noti = page.getByTestId('nav-top-notifications-count');
        const notificationsList = page.locator('[data-test="notifications-list"]');
        const items = notificationsList.locator('li');
        await expect(noti).toBeVisible();
        const notificationsLink = page.getByTestId('nav-top-notifications-link');
        await notificationsLink.click();
        await expect(page).toHaveURL(/notifications/);
        await expect(notificationsList).toBeVisible();
        await expect(items).toHaveCount(8);

    });

    test('dismiss noti ', async ({ page }) => {
        const notificationsList = page.getByTestId('notifications-list');
        const items = notificationsList.locator('li');
        //Kiểm tra mỗi item có nút Dismiss
        for (let i = 0; i < await items.count(); i++) {
            const item = items.nth(i);
            const dismissButton = item.getByTestId('notification-mark-read');
            //  Nút phải hiển thị
            await expect(dismissButton).toBeVisible();
            // Nút phải có text “Dismiss”
            await expect(dismissButton).toHaveText('Dismiss');
            // (Tuỳ chọn) Click vào nút và kiểm tra item biến mất
            await dismissButton.click();
            // Đếm số <li> ban đầu
            const countBefore = await items.count();
            // Click nút dismiss của phần tử thứ i
            await items.nth(i).locator('button.dismiss').click();
            // Kỳ vọng số lượng <li> giảm một
            await expect(items).toHaveCount(countBefore - 1);

        }
        // console.log('trang 1');
        // for (const item of await items.all()) {
        //     const itemName = await item.textContent();
        //     console.log(itemName + ' trang 2' + item);
        //     // const dismissButton = item.getByTestId('notification-mark-read');
        //     // await expect(dismissButton).toBeVisible();
        //     // await expect(dismissButton).toHaveText('Dismiss');
        //     // await dismissButton.click();
        //     // const countBefore = await items.count();
        //     // await expect(items).toHaveCount(countBefore - 1);
        // }
    });

});




