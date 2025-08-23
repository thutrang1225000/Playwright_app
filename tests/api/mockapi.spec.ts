import { test, expect } from '@playwright/test';
/// Mock api dùng để tạo data giả, test UI mà không muốn add data vào trong database
test.describe('Mock API - Notification', () => {
    test('mock api ', async ({ page }) => {
        await page.route('**/notifications', async route => {
            const mockResponse1 = {
                "results": [
                    {
                        "userFullName": "Trang xinh gai",
                        "id": "5EPOA_hPA39U",
                        "uuid": "ab4c2288-d63c-442d-aef4-4781ff1f5e6e",
                        "userId": "WHjJ4qR2R2",
                        "transactionId": "kq0Jxb46fvI3",
                        "status": "requested",
                        "isRead": false,
                        "createdAt": "2023-08-04T11:53:10.613Z",
                        "modifiedAt": "2024-03-07T15:29:27.505Z"
                    }

                ]
            };
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockResponse1)
            });
        });

        await page.route('**/transactions/public', async route => {
            const mockResponse2 = {
                "pageData": {
                    "page": 1,
                    "limit": 10,
                    "hasNextPages": true,
                    "totalPages": 5
                },
                "results": [
                    {
                        "receiverName": "Trang",
                        "senderName": "Taylor",
                        "receiverAvatar": "https://avatars.dicebear.com/api/human/GjWovtg2hr.svg",
                        "senderAvatar": "https://avatars.dicebear.com/api/human/uBmeaz5pX.svg",
                        "likes": [],
                        "comments": [],
                        "id": "2Lz6Q3zj4Rb",
                        "uuid": "4f1305ab-ac20-4872-834a-e88de87f826c",
                        "source": "I8qfnpz9q4a",
                        "amount": 97077,
                        "description": "Payment: uBmeaz5pX to GjWovtg2hr",
                        "privacyLevel": "private",
                        "receiverId": "GjWovtg2hr",
                        "senderId": "uBmeaz5pX",
                        "balanceAtCompletion": 31759,
                        "status": "pending",
                        "requestStatus": "",
                        "requestResolvedAt": "2023-12-18T23:42:24.060Z",
                        "createdAt": "2023-05-08T10:51:44.873Z",
                        "modifiedAt": "2024-03-07T22:16:30.504Z"
                    }
                ]
            };
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(mockResponse2)
            });
        });

        await page.goto('http://localhost:3000/');
        const userData = {
            userName: "Judah_Dietrich50",
            password: "s3cret",
        };
        await page.getByRole("textbox", { name: "username" }).fill(userData.userName);
        await page.getByRole("textbox", { name: "password" }).fill(userData.password);
        await page.getByTestId('signin-submit').click();
        const notificationsLink = page.getByTestId('nav-top-notifications-link');
        await notificationsLink.click();
        await page.waitForTimeout(6000);
    });
});
