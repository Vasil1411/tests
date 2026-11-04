import type { Locator, Page } from "@playwright/test";
import { HelperBase } from "../Helper/helperBase";
import { get } from "http";

export class CartPage extends HelperBase {

    readonly listOfItems: Locator;

    constructor(page: Page) {
        super(page);

        this.listOfItems = page.locator('.cart_item');
        

        
    }

}