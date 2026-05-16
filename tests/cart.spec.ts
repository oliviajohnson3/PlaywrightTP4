import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';     
import { CartPage } from '../pages/cartPage';

// Naviguer vers la page d'accueil
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  await page.goto('/');

  // Se connecter avec des identifiants valides
    await loginPage.login('standard_user', 'secret_sauce'); 

  // Vérifier que l'URL après connexion contient /inventory.html pour confirmer que la connexion a réussi
  await expect(page).toHaveURL(/.*inventory.html/);   

  // Ajouter 2 produits différents au panier
  await inventoryPage.addProductToCart('Sauce Labs Backpack');
  await inventoryPage.addProductToCart('Sauce Labs Bike Light');
  
  //Vérifier que le badge du panier affiche bien le nombre correct d'articles ajoutés
  const cartItemCount = await inventoryPage.getCartItemCount();
  expect(cartItemCount).toBe(2);  

  // Ouvrir le panier et vérifier que les 2 produits y sont bien présents
  await inventoryPage.goToCart();
  const cartItemCountInCart = await cartPage.getCartItemCount();
  expect(cartItemCountInCart).toBe(2);    
  
})
    