import { Page, Locator } from '@playwright/test';
import { HelperBase } from '../Helper/helperBase';

export class ShopsPage extends HelperBase {
  readonly shopList: Locator;
  readonly shopCards: Locator;
  readonly shopTitle: Locator;
  readonly shopAddress: Locator;
  readonly shopPhone: Locator;
  readonly shopHours: Locator;
  readonly shopMap: Locator;
  readonly cityMenu: Locator;
  readonly cityDropdown: Locator;
  readonly cityOption: Locator;
  readonly cityFilter: Locator;

  constructor(page: Page) {
    super(page);
    this.shopList = page.locator('.shop-list, .stores-list, [class*="shop"], [class*="store"]');
    this.shopCards = page.locator('.shop-card, .store-card, .shop-item, [class*="shop-card"], [class*="store-item"]');
    this.shopTitle = page.locator('h1, .page-title, [class*="title"]:has-text("магазин"), [class*="title"]:has-text("shop")');
    this.shopAddress = page.locator('[class*="address"], [class*="location"], .address, .location');
    this.shopPhone = page.locator('[class*="phone"], [class*="tel"], .phone, a[href^="tel"]');
    this.shopHours = page.locator('[class*="hours"], [class*="time"], .hours, .opening-hours');
    this.shopMap = page.locator('iframe[src*="map"], iframe[src*="google"], .map, [class*="map"]');
    this.cityMenu = page.locator('button:has-text("град"), select[name*="city"], select[id*="city"], .city-select, [class*="city"], [class*="city-menu"], [class*="city-filter"]');
    this.cityDropdown = page.locator('select[name*="city"], select[id*="city"], .city-dropdown, [class*="city-select"]');
    this.cityOption = page.locator('option[value], option:has-text("София"), option:has-text("Пловдив"), option:has-text("Варна")');
    this.cityFilter = page.locator('.city-filter, [class*="city-filter"], button[class*="city"]');
  }

  async navigate() {
    await this.page.goto('https://www.sportdepot.bg/shops');
    await this.page.waitForLoadState('domcontentloaded');
    
    
    try {
      const cookieButton = await this.page.locator('button:has-text("Приемам"), #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').first().isVisible({ timeout: 3000 });
      if (cookieButton) {
        await this.page.locator('button:has-text("Приемам"), #CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').first().click();
        await this.waitForNumberOfSeconds(1);
      }
    } catch (e) {
      
    }
    
    await this.page.waitForLoadState('networkidle');
  }

  async getShopCardsCount(): Promise<number> {
    return await this.shopCards.count();
  }

  async getShopTitle(): Promise<string | null> {
    try {
      return await this.shopTitle.first().textContent();
    } catch {
      return null;
    }
  }

  async hasShopList(): Promise<boolean> {
    try {
      const shopListVisible = await this.shopList.first().isVisible({ timeout: 3000 });
      return shopListVisible;
    } catch {
      return await this.getShopCardsCount() > 0;
    }
  }

  async openCityMenu() {
    
    try {
      
      const dropdownVisible = await this.cityDropdown.first().isVisible({ timeout: 3000 }).catch(() => false);
      if (dropdownVisible) {
        await this.cityDropdown.first().click();
        await this.waitForNumberOfSeconds(1);
        return true;
      }
      
      
      const menuButton = await this.cityMenu.first().isVisible({ timeout: 3000 }).catch(() => false);
      if (menuButton) {
        await this.cityMenu.first().click();
        await this.waitForNumberOfSeconds(1);
        return true;
      }
    } catch (e) {
     
    }
    return false;
  }

  async selectCity(cityName?: string) {
    
    const cityToSelect = cityName || 'София';
    
    try {
      
      const dropdownVisible = await this.cityDropdown.first().isVisible({ timeout: 3000 }).catch(() => false);
      if (dropdownVisible) {
        
        try {
          await this.cityDropdown.first().selectOption({ label: cityToSelect });
        } catch {
          try {
            await this.cityDropdown.first().selectOption({ index: 1 });
          } catch {
           
            const option = this.page.locator(`option:has-text("${cityToSelect}"), option[value*="${cityToSelect}"]`).first();
            const optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
            if (optionVisible) {
              await option.click();
            }
          }
        }
        await this.waitForNumberOfSeconds(2);
        return true;
      }
      
      
      const cityLink = this.page.locator(`a:has-text("${cityToSelect}"), button:has-text("${cityToSelect}"), [data-city="${cityToSelect}"]`).first();
      const linkVisible = await cityLink.isVisible({ timeout: 3000 }).catch(() => false);
      if (linkVisible) {
        await cityLink.click();
        await this.waitForNumberOfSeconds(2);
        return true;
      }
      
      
      const option = this.cityOption.first();
      const optionVisible = await option.isVisible({ timeout: 2000 }).catch(() => false);
      if (optionVisible) {
        await option.click();
        await this.waitForNumberOfSeconds(2);
        return true;
      }
    } catch (e) {
      
    }
    
    return false;
  }

  async filterByCity(cityName?: string) {
    
    await this.openCityMenu();
    await this.selectCity(cityName);
    await this.page.waitForLoadState('domcontentloaded');
  }
}

