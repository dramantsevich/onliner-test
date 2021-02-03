package PageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class ProductPage {
    public static WebDriver driver;

    @FindBy(xpath = "//h1[@class='catalog-masthead__title']")
    private WebElement heading;

    @FindBy(xpath = "//a[contains(@class,'button button_orange button_big offers-description__button')]")
    private WebElement offersButton;

    @FindBy(xpath = "//div[@class='offers-filter__flex']")
    private WebElement offersFilter;

    @FindBy(xpath = "//a[contains(@class,'button-style button-style_base-alter offers-list__button offers-list__button_cart button-style_another')]")
    private WebElement greenBuyButton;

    @FindBy(xpath = "//span[contains(@class,'button-style button-style_another button-style_base offers-form__button')]")
    private WebElement confirmCurrentAreaButton;

    public ProductPage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getHeading() { return heading; }

    public WebElement getOffersButton() { return offersButton; }

    public WebElement getOffersFilter() { return offersFilter; }

    public WebElement getOffersListItemByNumber(String itemNumber){
        return driver.findElement(By.xpath("//div[contains(@class, 'offers-list__item')]["+ itemNumber +"]" +
                "//a[contains(@class,'button-style button-style_base-alter offers-list__button offers-list__button_cart button-style_expletive')]"));
    }

    public WebElement getGreenBuyButton() { return greenBuyButton; }

    public WebElement getConfirmCurrentAreaButton() { return confirmCurrentAreaButton; }
}
