import { Locator, Page, expect } from '@playwright/test';

export class Minicart {
  readonly page: Page;
  readonly miniCartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.miniCartCount = this.page.locator(`//*[@id='shopping_cart_container']//span`);
  }

  async verifyMiniCartCount(expMiniCartCount: string) {
    await expect(this.miniCartCount).toHaveText(expMiniCartCount);
  }
}