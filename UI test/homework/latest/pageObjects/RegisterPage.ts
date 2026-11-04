import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../Helper/helperBase';

export class RegisterPage extends HelperBase {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly phoneInput: Locator;
  readonly registerSubmitButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly termsCheckbox: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('input[type="email"], input[name*="email"], input[id*="email"], #email');
    this.passwordInput = page.locator('input[type="password"][name*="password"], input[type="password"][id*="password"]').first();
    this.confirmPasswordInput = page.locator('input[type="password"][name*="confirm"], input[type="password"][name*="repeat"], input[type="password"][id*="confirm"]');
    this.firstNameInput = page.locator('input[name*="first"], input[name*="name"], input[id*="first"], input[placeholder*="име"]');
    this.lastNameInput = page.locator('input[name*="last"], input[name*="surname"], input[id*="last"], input[placeholder*="фамилия"]');
    this.phoneInput = page.locator('input[type="tel"], input[name*="phone"], input[id*="phone"]');
    this.registerSubmitButton = page.locator('button[type="submit"]:has-text("Регистрация"), button[type="submit"]:has-text("Регистрирай"), button:has-text("Създай"), .register-submit');
    this.errorMessage = page.locator('.error, .alert-danger, .message-error, [class*="error"], .alert, [role="alert"]');
    this.successMessage = page.locator('.success, .alert-success, .message-success, [class*="success"]');
    this.termsCheckbox = page.locator('input[type="checkbox"][name*="terms"], input[type="checkbox"][id*="terms"], input[type="checkbox"][name*="agree"]');
  }

  async navigate() {
    await this.page.goto('https://www.sportdepot.bg/register');
    await this.page.waitForLoadState('domcontentloaded');
    
    
    try {
      const cookieButton = await this.page.locator('button:has-text("Приемам"), button:has-text("OK"), #cookie-accept, .cookie-accept, [id*="cookie"] button').first().isVisible({ timeout: 3000 });
      if (cookieButton) {
        await this.page.locator('button:has-text("Приемам"), button:has-text("OK"), #cookie-accept, .cookie-accept, [id*="cookie"] button').first().click();
        await this.waitForNumberOfSeconds(1);
      }
    } catch (e) {
      
    }
  }

  async fillRegistrationForm(data: {
    email: string;
    password: string;
    confirmPassword?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    acceptTerms?: boolean;
  }) {
    
    await this.page.waitForLoadState('domcontentloaded');
    
    
    if (await this.emailInput.first().isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.emailInput.first().fill(data.email);
    }
    
    
    if (await this.passwordInput.isVisible({ timeout: 3000 }).catch(() => false)) {
      await this.passwordInput.fill(data.password);
    }
    
    
    if (data.confirmPassword && await this.confirmPasswordInput.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.confirmPasswordInput.first().fill(data.confirmPassword);
    }
    
    
    if (data.firstName && await this.firstNameInput.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.firstNameInput.first().fill(data.firstName);
    }
    
    
    if (data.lastName && await this.lastNameInput.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.lastNameInput.first().fill(data.lastName);
    }
    
   
    if (data.phone && await this.phoneInput.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      await this.phoneInput.first().fill(data.phone);
    }
    
    
    if (data.acceptTerms !== undefined && await this.termsCheckbox.first().isVisible({ timeout: 2000 }).catch(() => false)) {
      const isChecked = await this.termsCheckbox.first().isChecked();
      if (data.acceptTerms && !isChecked) {
        await this.termsCheckbox.first().check();
      }
    }
  }

  async submitRegistration() {
    const submitBtn = await this.registerSubmitButton.first().isVisible({ timeout: 5000 }).catch(() => false);
    if (submitBtn) {
      await this.registerSubmitButton.first().click();
    } else {
     
      await this.page.keyboard.press('Enter');
    }
    await this.page.waitForLoadState('domcontentloaded');
    await this.waitForNumberOfSeconds(2);
  }

  async getErrorMessage(): Promise<string | null> {
    const isVisible = await this.errorMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
    if (isVisible) {
      return await this.errorMessage.first().textContent();
    }
    return null;
  }

  async getSuccessMessage(): Promise<string | null> {
    const isVisible = await this.successMessage.first().isVisible({ timeout: 3000 }).catch(() => false);
    if (isVisible) {
      return await this.successMessage.first().textContent();
    }
    return null;
  }
}



