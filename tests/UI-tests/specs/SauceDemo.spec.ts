import { test } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { Minicart } from '../pages/miniCartPage';
import { ProductsPage } from '../pages/productsPage';

test.describe('Sauce Demo Tests', () => {
  let loginPage: LoginPage;
  let productsPage: ProductsPage;
  let miniCart: Minicart;

  test('GivenValidCredentials_WhenLoggingIn_ThenLoginSuccesfull', async ({ page }) => {
    //Arrange
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    //Act
    await loginPage.navigateToLoginPage();
    await loginPage.loginSuccess();
    
    //Assert
    await productsPage.verifyProductsPageDisplayed();
  });

  test('GivenInvalidCredentials_WhenLoggingIn_ThenLoggingUnsuccesfull', async ({ page }) => {
    //Arrange
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    //Act
    await loginPage.navigateToLoginPage();
    await loginPage.LoginFail();

    //Assert
    await loginPage.verifyErrorMessageForFailureLogin();
    await loginPage.verifyLoginPageisDisplayed();
    await productsPage.verifyProductsPageNotDisplayed();
  });

  test('GivenProductInStock_WhenAddingProductToCart_ThenMiniCartContainsProduct', async ({ page }) => {
    //Arrange
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    miniCart = new Minicart(page);

    //Act
    await loginPage.navigateToLoginPage();
    await loginPage.loginSuccess();
    await productsPage.verifyProductsPageDisplayed();
    await productsPage.addGivenProductToCart(2);
    
    //Assert
    await miniCart.verifyMiniCartCount('1');
  });
});