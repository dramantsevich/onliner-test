package stepdefinition;

import Helper.FileReaderManager;
import Helper.NewsListener;
import Helper.PageObjectManager;
import PageObjectModel.*;
import cucumber.api.java.en.*;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import testrunner.DriverTest;

import java.lang.reflect.InvocationTargetException;
import java.util.Locale;

import static baseclass.BaseUtils.*;
import static org.junit.Assert.assertTrue;

public class OnlinerStepDefinition {
    private static NewsListener newsListener;
    private static WebDriver driver = DriverTest.driver;
    private static PageObjectManager pageobject = new PageObjectManager(driver);
    private static HomePage homePage = pageobject.getHome();
    private static LoginPage loginPage = pageobject.getLoginPage();
    private static NewsPage newsPage = pageobject.getNewsPage();
    private static CatalogPage catalogPage = pageobject.getCatalogPage();
    private static MobilePhonesCatalogPage mobilePhonesCatalogPage = pageobject.getMobilePhonesCatalogPage();
    private static ProductPage productPage = pageobject.getProductPage();
    private static CartPage cartPage = pageobject.getCartPage();

    @Given("^user navigates to \"([^\"]*)\"$")
    public void userIsOnHomePage(String URL) throws Throwable {
        geturl(URL);
    }

    @When("^user is on home page$")
    public void userIsOnHomePage(){
        waitforVisibility(homePage.getImgLogo());
        assertTrue(homePage.getImgLogo().isDisplayed());
    }

    @When("^user click on \"([^\"]*)\" button$")
    public void userClickOnButton(String option) throws Throwable {
        if (option.equalsIgnoreCase("Sign_In")) {
            clickusingActions(homePage.getSignInButton());
        }
        if(option.equalsIgnoreCase("Login")){
            clickusingActions(loginPage.getLoginButton());
        }
        if(option.equalsIgnoreCase("Предложений")){
            clickusingJavascript(productPage.getOffersButton());
        }
        if(option.equalsIgnoreCase("В корзине")){
            clickusingActions(productPage.getGreenBuyButton());
        }
        if(option.equalsIgnoreCase("confirm Area")){
            clickusingActions(productPage.getConfirmCurrentAreaButton());
        }
    }

    @And("^user enter email on Login page$")
    public void userEnterEmailOnLoginPage() throws Throwable {
        String email = FileReaderManager.getInstance().getConfigReader().getEmailAddress();
        sendkeysUsingActions(loginPage.getEmail(), email);
    }

    @And("^user enter password on Login page$")
    public void userEnterPasswordOnLoginPage() throws Throwable {
        String password = FileReaderManager.getInstance().getConfigReader().getPassword();
        sendkeysUsingActions(loginPage.getPassword(), password);
    }

    @And("^user click on \"([^\"]*)\" News on Home page$")
    public void userClickOnNewsOnHomePage(String newsNumber) throws InvocationTargetException {
        newsListener = new NewsListener(homePage.getNewsCategoryByNumber(newsNumber).getText());
        clickusingActions(homePage.getNewsByNumber(newsNumber));
    }

    @Then("^user see Heading on \"([^\"]*)\" page$")
    public void userSeeHeadingOnNewsPage(String pageName){
        if(pageName.equalsIgnoreCase("News")){
            waitforVisibility(newsPage.getHeading());
            assertTrue(newsPage.getHeading().isDisplayed());
        }
        else if(pageName.equalsIgnoreCase("Popular News")){
            waitforVisibility(newsPage.getHeading());
            assertTrue(newsPage.getHeading().getText().toLowerCase(Locale.ROOT).contains(newsListener.getNews()));
        }
        else if(pageName.equalsIgnoreCase("Catalog")){
            waitforVisibility(catalogPage.getHeading());
            assertTrue(catalogPage.getHeading().isDisplayed());
        }
        else if(pageName.equalsIgnoreCase("Mobile Phones Catalog")){
            waitforVisibility(mobilePhonesCatalogPage.getHeading());
            assertTrue(mobilePhonesCatalogPage.getHeading().isDisplayed());
        }
        else if(pageName.equalsIgnoreCase("Product")){
            waitforVisibility(productPage.getHeading());
            assertTrue(productPage.getHeading().isDisplayed());
        }
        else if(pageName.equalsIgnoreCase("Cart")){
            waitforVisibility(cartPage.getHeading());
            assertTrue(cartPage.getHeading().isDisplayed());
        }
    }

    @Then("^user see same Category on News page$")
    public void userSeeSameCategoryOnNewsPage(){
        waitforVisibility(homePage.getActiveNewsCategory());
        assertTrue(homePage.getActiveNewsCategory().getText().toLowerCase(Locale.ROOT).contains(newsListener.getNews()));
    }

    @And("^user click on \"([^\"]*)\" Reaction on News page$")
    public void userClickOnReactionOnNewsPage(String reactionNumber) throws InvocationTargetException{
        clickusingActions(newsPage.getReactionByNumber(reactionNumber));
    }

    @Then("^user see selected Reaction on News page$")
    public void userSeeSelectedReactionOnNewsPage(){
        waitforVisibility(newsPage.getSelectedReaction());
        assertTrue(newsPage.getSelectedReaction().isDisplayed());
    }

    @And("^user click on \"([^\"]*)\" Popular News on News page$")
    public void userClickOnPopularNewsOnNewsPage(String popularNewsNumber) throws InvocationTargetException {
        newsListener = new NewsListener(newsPage.getPopularNewsNameByNumber(popularNewsNumber).getText());
        clickusingActions(newsPage.getPopularNewsByNumber(popularNewsNumber));
    }

    @And("^user click on \"([^\"]*)\" Navigation Menu$")
    public void userClickOnNavigationmenu(String navigationMenuName) throws InvocationTargetException{
        clickusingActions(homePage.getNavigationMenuByName(navigationMenuName));
    }

    @And("^user click on \"([^\"]*)\" Catalog Navigation Classifier on Catalog page$")
    public void userClickOnCatalogNavigationClassifierOnCatalogPage(String classifierNumber) throws Throwable {
        waitforVisibility(catalogPage.getCatalogNavigationClassifier());
        mouseover(catalogPage.getNavigationClassifierByNumber(classifierNumber));
        clickusingActions(catalogPage.getNavigationClassifierByNumber(classifierNumber));
    }

    @And("^user mouseover on \"([^\"]*)\" Catalog Navigation List Item on Catalog page$")
    public void userClickOnCatalogNavigationListItemOnCatalogPage(String catalogItemName) {
        if(catalogItemName.equalsIgnoreCase("Мобильные телефоны и аксессуары")){
            mouseover(catalogPage.getCatalogNavigationListItemByName("Мобильные телефоны и"));
        }
        else{
            mouseover(catalogPage.getCatalogNavigationListItemByName(catalogItemName));
        }
    }

    @Then("^user see Catalog Navigation active List Item$")
    public void userSeeCatalogNavigationActiveListItem(){
        waitforVisibility(catalogPage.getCatalogNavigationActiveListItem());
        assertTrue(catalogPage.getCatalogNavigationActiveListItem().isDisplayed());
    }

    @And("^user click on \"([^\"]*)\" Dropdown Navigation List Item on Catalog page$")
    public void userClickOnDropdownNavigationListItemOnCatalogPage(String dropdownItemName) throws InvocationTargetException {
        clickusingActions(catalogPage.getDropdownNavigationListItemByName(dropdownItemName));
    }

    @And("^user click on \"([^\"]*)\" Mobile Phone on Mobile Phones Catalog$")
    public void userClickOnMobilePhoneOnMobilePhonesCatalog(String phoneName) throws InvocationTargetException {
        clickusingActions(mobilePhonesCatalogPage.getMobilePhoneByName(phoneName));
    }

    @And("^user click on \"([^\"]*)\" Offers list item on Product page$")
    public void userClickOnOffersListItemOnProductPage(String itemNumber) throws InvocationTargetException {
        waitforVisibility(productPage.getOffersFilter());
        assertTrue(productPage.getOffersListItemByNumber(itemNumber).isEnabled());
        clickusingActions(productPage.getOffersListItemByNumber(itemNumber));
    }

    @Then("^user see Buy Button is green on Product Page$")
    public void userSeeBuyButtonIsGreenOnProductPage(){
        waitforVisibility(productPage.getGreenBuyButton());
        assertTrue(productPage.getGreenBuyButton().isDisplayed());
    }

    @When("^user enter \"([^\"]*)\" on Search Input$")
    public void userEnterOnSearchInput(String string) {
        sendkeysUsingActions(homePage.getSearchInput(), string);
    }

    @Then("^user see \"([^\"]*)\" on Search Window Input$")
    public void userSeeOnSearchWindowInput(String product){
        driver.switchTo().frame(homePage.getSearchFrame());
        waitforVisibility(homePage.getSearchFrameInput());
        assertTrue(homePage.getSearchFrameInput().getText().contains(product));
    }

    @And("^user click on \"([^\"]*)\" Item on Search window$")
    public void userClickOnItemOnSearchWindow(String itemName) throws InvocationTargetException {
        clickusingActions(homePage.getSearchResultItemByName(itemName));
    }

    @Then("^user see \"([^\"]*)\" product contains in Cart page$")
    public void userSeeThatProductsContainsInCartPage(String product){
        waitforVisibility(cartPage.getProductName(product));
        assertTrue(cartPage.getProductName(product).isDisplayed());
    }

    @And("^user remove all Items on Cart page$")
    public void userRemoveAllItemsOnCartPage() throws Throwable {
        int i = cartPage.getListOfProducts().size();

        while(i > 0){
            mouseover(cartPage.getOffersPartAction());
            clickusingActions(cartPage.getRemoveButton());
            i--;
        }
    }

    @Then("^user see confirm Remove message on Cart page$")
    public void userSeeConfirmRemoveMessageOnCartPage(){
        for(WebElement element : cartPage.getConfirmDeleteMessages()){
            waitforVisibility(element);
            assertTrue(element.isDisplayed());
        }
    }

    @When("^user click on Logo on Cart page$")
    public void userClickOnLogoOnCartPage() throws InvocationTargetException {
        clickusingActions(cartPage.getLogo());
    }

    @And("^user logout the application$")
    public void userLoguoutTheApplication() throws InvocationTargetException {
        clickusingActions(homePage.getProfileArrow());
        waitforVisibility(homePage.getProfileName());
        clickusingActions(homePage.getLogoutButton());
    }
}
