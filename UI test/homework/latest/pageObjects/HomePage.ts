import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../Helper/helperBase';

export class HomePage extends HelperBase {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly loginButton: Locator;
  readonly cartIcon: Locator;
  readonly categoriesMenu: Locator;
  readonly cookieAcceptButton: Locator;
  readonly languageButton: Locator;
  readonly languageDropdown: Locator;
  readonly englishLink: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.searchInput = page.locator('input[type="search"], input[placeholder*="търси"], #search, .search-input');
    this.searchButton = page.locator('button[type="submit"], button:has-text("Търси"), .search-button');
    this.loginButton = page.locator('a:has-text("Вход"), button:has-text("Вход"), .login-button, [href*="login"]');
    this.cartIcon = page.locator('[href*="cart"], [href*="bag"], .cart-icon, .basket-icon');
    this.categoriesMenu = page.locator('.categories, .menu, nav, .navigation');
    this.cookieAcceptButton = page.locator('button:has-text("Приемам"), button:has-text("OK"), #cookie-accept, .cookie-accept');
    this.languageButton = page.locator('button.btn-langs.js-header-dropdown-toggle');
    this.languageDropdown = page.locator('.langs-dropdown');
    this.englishLink = page.locator('a[href="/en"][title="Английски"]');
  }

  async navigate() {
    await this.page.goto('https://www.sportdepot.bg/');
    await this.page.waitForLoadState('domcontentloaded');
    const cookieSelectors = [
      'button:has-text("Приемам")',
      'button:has-text("OK")',
      '#cookie-accept',
      '.cookie-accept',
      '[id*="cookie"] button',
      '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'
    ];
    for (const selector of cookieSelectors) {
      const el = this.page.locator(selector);
      if (await el.count() > 0 && await el.first().isVisible().catch(() => false)) {
        await el.first().click().catch(() => {});
        break;
      }
    }
    await this.page.waitForLoadState('networkidle');
  }

  async searchProduct(searchTerm: string) {
    if (await this.searchInput.first().isVisible().catch(() => false)) {
      await this.searchInput.first().fill(searchTerm);
      if (await this.searchButton.first().isVisible().catch(() => false)) {
        await this.searchButton.first().click();
      } else {
        await this.searchInput.first().press('Enter');
      }
    } else {
      await this.page.goto(`/?s=${encodeURIComponent(searchTerm)}`);
    }
    await this.page.waitForLoadState('networkidle');
  }

  async clickLogin() {
    if (await this.loginButton.first().isVisible().catch(() => false)) {
      await this.loginButton.first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async openCart() {
    if (await this.cartIcon.first().isVisible().catch(() => false)) {
      await this.cartIcon.first().click();
      await this.page.waitForLoadState('networkidle');
    } else {
      await this.page.goto('https://www.sportdepot.bg/cart');
      await this.page.waitForLoadState('networkidle');
    }
  }

  async selectCategory(categoryName: string) {
    const link = this.categoriesMenu.getByRole('link', { name: categoryName });
    if (await link.count() > 0) {
      await link.first().click();
      await this.page.waitForLoadState('networkidle');
      return true;
    }
    return false;
  }

  async changeLanguage(languageCode?: string) {
    try {
      await this.languageButton.click();
      await this.languageDropdown.waitFor({ state: 'visible', timeout: 5000 });
      if (languageCode === 'en') {
        await this.englishLink.click();
      }
      await this.page.waitForLoadState('networkidle');
      return true;
    } catch {
      return false;
    }
  }
}

