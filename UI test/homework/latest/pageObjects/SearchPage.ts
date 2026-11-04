import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../Helper/helperBase';

export class SearchPage extends HelperBase {
  readonly searchResults: Locator;
  readonly noResultsMessage: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly filtersPanel: Locator;
  readonly sortDropdown: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchResults = page.locator('.search-results, .products-list, [class*="product"], .product-grid');
    this.noResultsMessage = page.locator(':has-text("няма резултати"), :has-text("не са намерени"), .no-results, [class*="no-results"]');
    this.searchInput = page.locator('input[type="search"], input[placeholder*="търси"], #search');
    this.searchButton = page.locator('button[type="submit"]:has-text("Търси"), .search-button');
    this.filtersPanel = page.locator('.filters, .sidebar-filter, [class*="filter"]');
    this.sortDropdown = page.locator('select[name*="sort"], .sort-select, [class*="sort"]');
    
    this.productCards = page.locator('article.product, .product-item, .product-card, [class*="product-item"], [class*="product-card"], a[href*="/product"], .item-product, [data-product-id]');
  }

  async getResultsCount(): Promise<number> {
    return await this.productCards.count();
  }

  async hasNoResults(): Promise<boolean> {
    try {
      return await this.noResultsMessage.first().isVisible({ timeout: 2000 });
    } catch {
      return await this.getResultsCount() === 0;
    }
  }

  async clickFirstProduct() {
    
    try {
      const cookieButton = await this.page.locator('button:has-text("Приемам"), button:has-text("OK"), #cookie-accept, [id*="cookie"] button, #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').first().isVisible({ timeout: 2000 });
      if (cookieButton) {
        await this.page.locator('button:has-text("Приемам"), button:has-text("OK"), #cookie-accept, [id*="cookie"] button, #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').first().click();
        await this.page.waitForTimeout(1000);
      }
    } catch (e) {
     
    }
    
    
    await this.productCards.first().scrollIntoViewIfNeeded();
    await this.productCards.first().click({ timeout: 10000 });
    await this.page.waitForLoadState('domcontentloaded');
  }

  async search(searchTerm: string) {
    await this.searchInput.first().fill(searchTerm);
    await this.searchButton.first().click();
    await this.page.waitForLoadState('networkidle');
  }

  async sortBy(option: string) {
    await this.sortDropdown.first().selectOption(option);
    await this.page.waitForLoadState('networkidle');
  }

  async applyFilter(filterName: string, value: string) {
    await this.page.locator(`[data-filter="${filterName}"], label:has-text("${filterName}")`).first().click();
    await this.page.waitForLoadState('networkidle');
  }
}

