import { test, expect } from '@playwright/test';    
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { LoginPage } from '../pages/LoginPage';     
import { CartPage } from '../pages/cartPage';       

// Se connecter à l'application
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');
  await loginPage.login('standard_user', 'secret_sauce');

  //Ajouter 1 produit au panier
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addProductToCart('Sauce Labs Backpack');

  // Accéder au panier et démarrer le processus de commande
  await inventoryPage.goToCart();
  await expect(page).toHaveURL(/.*cart\.html/);  
  const cartPage = new CartPage(page);
  await cartPage.checkout();  
 
  // Remplir le formulaire avec un prénom, un nom et un code postal valides
  const checkoutPage = new CheckoutPage(page);
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');

 
  
    // Continuer vers l'étape suivante du checkout
  await checkoutPage.continueCheckout(); 

  // Finaliser la commande
  await checkoutPage.finishCheckout();
  await expect(page).toHaveURL(/.*checkout-complete\.html/); 

    // Vérifier que le message de confirmation de commande s'affiche correctement
  const completeHeader = await checkoutPage.getCompleteHeader();
  expect(completeHeader).toBe('Thank you for your order"');
});     

