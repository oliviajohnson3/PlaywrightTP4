import { Page, Locator, expect } from '@playwright/test';          

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
 
  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('.complete-header');
  } 

  //Remplir le formulaire d'information de checkout
  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

    //Continuer vers l'étape suivante du checkout
  async continueCheckout() {
    await this.continueButton.click();      
  } 

  //Finaliser la commande
  async finishCheckout() {
    await this.finishButton.click();
  }

  //Obtenir le message de confirmation de commande
  async getCompleteHeader(): Promise<string> {
    return await this.completeHeader.textContent() || '';
  } 
}  