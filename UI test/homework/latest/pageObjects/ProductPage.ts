import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../Helper/helperBase';

export class ProductPage extends HelperBase {
  readonly productTitle: Locator;
  readonly addToCartButton: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly quantityInput: Locator;
  readonly sizeSelector: Locator;
  readonly colorSelector: Locator;
  readonly outOfStockMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.productTitle = page.locator('h1, .product-title, [class*="product-title"], .product-name');
    this.addToCartButton = page.locator('button:has-text("Добави"), button:has-text("Купи"), .add-to-cart, [class*="add-to-cart"]');
    this.productPrice = page.locator('.price, .product-price, [class*="price"]');
    this.productDescription = page.locator('.description, .product-description, [class*="description"]');
    this.quantityInput = page.locator('input[type="number"], input[name*="quantity"], .quantity-input');
    this.sizeSelector = page.locator('select[name*="size"], .size-selector, [class*="size"]');
    this.colorSelector = page.locator('select[name*="color"], .color-selector, [class*="color"]');
    this.outOfStockMessage = page.locator(':has-text("Неналичен"), :has-text("Изчерпан"), .out-of-stock, [class*="stock"]:has-text("няма")');
  }

  async getProductTitle(): Promise<string | null> {
    return await this.productTitle.first().textContent();
  }

  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.first().textContent();
  }

  async addToCart() {
    await this.addToCartButton.first().click();
    await this.waitForNumberOfSeconds(2);
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.first().fill(quantity.toString());
  }

  async selectSize(size: string) {
    await this.sizeSelector.first().selectOption(size);
  }

  async isOutOfStock(): Promise<boolean> {
    try {
      return await this.outOfStockMessage.first().isVisible({ timeout: 1000 });
    } catch {
      return false;
    }
  }

  async isAddToCartButtonVisible(): Promise<boolean> {
    try {
      return await this.addToCartButton.first().isVisible({ timeout: 2000 });
    } catch {
      return false;
    }
  }
}



