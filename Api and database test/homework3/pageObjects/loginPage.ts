import type { Locator, Page } from "@playwright/test";
import { HelperBase } from "../Helper/helperBase";

export class LoginPage extends HelperBase {

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);

        this.usernameInput = page.locator('id=user-name');
        this.passwordInput = page.locator('id=password');
        this.loginButton = page.locator('id=login-button');
        
    }

}