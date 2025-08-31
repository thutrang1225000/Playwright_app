import { Page, Locator } from "@playwright/test";


export class LoginPage {
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly signinButton: Locator;
    // private readonly page: Page;
    constructor(page: Page) {
        this.usernameInput = page.getByRole("textbox", { name: "username" });
        this.passwordInput = page.getByRole("textbox", { name: "password" });
        this.signinButton = page.getByTestId('signin-submit');
        // this.page = page;
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