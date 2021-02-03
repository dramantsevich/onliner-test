package Helper;

import PageObjectModel.*;
import org.openqa.selenium.WebDriver;

public class PageObjectManager {
    private WebDriver driver;
    private HomePage home;
    private LoginPage loginPage;
    private NewsPage newsPage;
    private CatalogPage catalogPage;
    private MobilePhonesCatalogPage mobilePhonesCatalogPage;
    private ProductPage productPage;
    private CartPage cartPage;

    public PageObjectManager(WebDriver lDriver) {

        this.driver = lDriver;
    }

    public HomePage getHome() {
        if (home == null) {
            home = new HomePage(driver);
        }
        return home;
    }

    public LoginPage getLoginPage(){
        if(loginPage == null){
            loginPage = new LoginPage(driver);
        }
        return loginPage;
    }

    public NewsPage getNewsPage(){
        if(newsPage == null){
            newsPage = new NewsPage(driver);
        }
        return newsPage;
    }

    public CatalogPage getCatalogPage(){
        if(catalogPage == null){
            catalogPage = new CatalogPage(driver);
        }
        return catalogPage;
    }

    public MobilePhonesCatalogPage getMobilePhonesCatalogPage(){
        if(mobilePhonesCatalogPage == null){
            mobilePhonesCatalogPage = new MobilePhonesCatalogPage(driver);
        }
        return mobilePhonesCatalogPage;
    }

    public ProductPage getProductPage(){
        if(productPage == null){
            productPage = new ProductPage(driver);
        }
        return productPage;
    }

    public CartPage getCartPage(){
        if(cartPage == null){
            cartPage = new CartPage(driver);
        }
        return cartPage;
    }
}
