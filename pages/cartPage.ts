import { Page, Locator } from '@playwright/test';
 
/**
 * Page Object pour la page du panier
 */
export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }
 
  /**
   * Obtenir le nombre d'articles dans le panier
   */
  async getCartItemCount(): Promise<number> {
    return await this.cartItems.count();
  }
 
  /**
   * Continuer vers le checkout
   */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}