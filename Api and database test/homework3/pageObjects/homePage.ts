import type { Locator, Page } from "@playwright/test";
import { HelperBase } from "../Helper/helperBase";
import { get } from "http";

export class HomePage extends HelperBase {

readonly backpackHeader: Locator;
readonly tshirtItemAddToCartButton: Locator;
readonly cartButton: Locator;

    constructor(page: Page) {
        super(page);
        
        this.backpackHeader = page.getByText('Sauce Labs Backpack').or(this.page.getByText('Sauce Labs Bike Light'));
        this.tshirtItemAddToCartButton = page.locator('id=add-to-cart-sauce-labs-bolt-t-shirt')
        this.cartButton =  page.locator('id=shopping_cart_container');
        
    }

}