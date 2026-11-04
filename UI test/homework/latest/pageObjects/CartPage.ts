import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly items: Locator;
  readonly emptyMessage: Locator;
  readonly qtyInput: (idx?: number) => Locator;
  readonly updateBtn: Locator;
  readonly removeBtn: (idx?: number) => Locator;
  readonly checkoutBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.items = page.locator('.cart-items, .cart-row, .cart-item');
    this.emptyMessage = page.locator('text=Кошницата е празна, text=Вашата количка е празна, .cart-empty, text=Нямате продукти в кошницата, .item-inline');
    this.qtyInput = (idx = 0) => this.items.nth(idx).locator('input[type="number"], input qty, .qty-input');
    this.updateBtn = page.locator('button:has-text("Обнови"), button:has-text("Актуализирай"), button[data-test="update-cart"]');
    this.removeBtn = (idx = 0) => this.items.nth(idx).locator('button:has-text("Премахни"), .remove, button[data-test="remove-item"]');
    this.checkoutBtn = page.locator('button:has-text("Поръчай"), a:has-text("Към касата"), button[data-test="checkout"]');
  }

  async goto() {
    await this.page.goto('https://www.sportdepot.bg/cart');
    await this.page.waitForLoadState('networkidle');
  }

  async setQuantity(idx: number, qty: number) {
    const input = this.qtyInput(idx);
    if (await input.count() > 0) {
      await input.fill(String(qty));
      if (await this.updateBtn.first().isVisible().catch(() => false)) {
        await this.updateBtn.first().click();
      }
      await this.page.waitForLoadState('networkidle');
    }
  }

  async removeItem(idx = 0) {
    const btn = this.removeBtn(idx);
    if (await btn.count() > 0) {
      await btn.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async proceedToCheckout() {
    if (await this.checkoutBtn.first().isVisible().catch(() => false)) {
      await this.checkoutBtn.first().click();
      await this.page.waitForLoadState('networkidle');
    }
  }
}



