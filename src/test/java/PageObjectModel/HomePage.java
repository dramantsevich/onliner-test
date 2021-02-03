package PageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class HomePage {
    public static WebDriver driver;

    @FindBy(xpath = "//div[@class='b-top-logo']/a/img")
    private WebElement imgLogo;

    @FindBy(xpath = "//div[contains(@class,'auth-bar__item auth-bar__item--text')]")
    private WebElement signInButton;

    @FindBy(xpath = "//input[@class='fast-search__input']")
    private WebElement searchInput;

    @FindBy(xpath = "//iframe[@class='modal-iframe']")
    private WebElement searchFrame;

    @FindBy(xpath = "//span[@class='text_match']")
    private WebElement searchFrameInput;

    @FindBy(xpath = "//li[contains(@class,'project-navigation__item project-navigation__item_primary project-navigation__item_active')]//span[@class='project-navigation__sign']")
    private WebElement activeNewsCategory;

    @FindBy(xpath = "//div[contains(@class,'b-top-profile__item b-top-profile__item_arrow')]")
    private WebElement profileArrow;

    @FindBy(xpath = "//div[@class='b-top-profile__name']")
    private WebElement profileName;

    @FindBy(xpath = "//div[@class='b-top-profile__logout']/a[@class='b-top-profile__link b-top-profile__link_secondary']")
    private WebElement logoutButton;

    public HomePage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getImgLogo() { return imgLogo; }

    public WebElement getSignInButton() {  return signInButton; }

    public WebElement getNewsByNumber(String newsNumber){
        return driver.findElement(By.xpath("//div[@id='widget-"+ newsNumber +"1']"));
    }

    public WebElement getNewsCategoryByNumber(String newsNumber){
        return driver.findElement(By.xpath("//div[@id='widget-"+ newsNumber +"1']/a[@class='b-tile-section']"));
    }

    public WebElement getNavigationMenuByName(String navigationMenuName){
        return driver.findElement(By.xpath("//span[@class='b-main-navigation__text' and contains(text(),'"+ navigationMenuName +"')]"));
    }

    public WebElement getSearchInput() { return searchInput; }

    public WebElement getSearchFrame() { return searchFrame; }

    public WebElement getSearchFrameInput(){ return searchFrameInput; }

    public WebElement getSearchResultItemByName(String itemName){
        return driver.findElement(By.xpath("//a[contains(text(),'"+ itemName +"')]"));
    }

    public WebElement getActiveNewsCategory() { return activeNewsCategory; }

    public WebElement getProfileArrow() { return profileArrow; }

    public WebElement getProfileName() { return profileName; }

    public WebElement getLogoutButton() { return logoutButton; }
}
