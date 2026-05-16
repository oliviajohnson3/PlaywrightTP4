import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';   

// Naviguer vers la page d'accueil
test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('/');

  // Se connecter avec des identifiants valides
    await loginPage.login('standard_user', 'secret_sauce'); 

  // Vérifier que l'URL après connexion contient /inventory.html pour confirmer que la connexion a réussi
  await expect(page).toHaveURL(/.*inventory.html/);   
})