import { Page, Locator } from "@playwright/test";


export class LoginPage {
    private readonly usernameInput: Locator; // khai báo biến usernameInput là 1 locator
    private readonly passwordInput: Locator;
    private readonly signinButton: Locator;

    constructor(page: Page) {
        this.usernameInput = page.getByRole("textbox", { name: "username" }); // khai báo locator usernameInput
        this.passwordInput = page.getByRole("textbox", { name: "password" });
        this.signinButton = page.getByTestId('signin-submit');
    }
    async goto(url: string) {
        await this.goto(url)
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.signinButton.click();
    }
}