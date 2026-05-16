//Ajouter un produit au panier 
import { expect, Locator, Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;

  // Lire le nombre d'articles dans le panier
  readonly cartBadge: Locator;      


  //Naviger vers le panier
  readonly cartLink: Locator;   
  constructor(page: Page) {
    this.page = page;
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
  } 

  //Ajouter un produit au panier
  async addProductToCart(productName: string) {
    const productLocator = this.page.locator(`.inventory_item:has-text("${productName}")`);
    const addToCartButton = productLocator.locator('button');
    await addToCartButton.click();
  }

 // Obtenir le nombre d'articles dans le panier
  async getCartItemCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  //Aller dans la page du panier
  async goToCart() {
    await this.cartLink.click();
  } 
}   

  
