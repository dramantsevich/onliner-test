package PageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;

public class CartPage {
    public static WebDriver driver;

    @FindBy(xpath = "//div[contains(@class,'cart-form__title cart-form__title_big-alter cart-form__title_condensed-additional')]")
    private WebElement heading;

    @FindBy(xpath = "//div[contains(@class,'cart-form__offers-item cart-form__offers-item_secondary')]")
    private List<WebElement> listOfProducts;

    @FindBy(xpath = "//a[contains(@class,'button-style button-style_auxiliary button-style_small cart-form__button cart-form__button_remove')]")
    private WebElement removeButton;

    @FindBy(xpath = "//div[contains(@class,'cart-form__offers-part cart-form__offers-part_action')]")
    private WebElement offersPartAction;

    @FindBy(xpath = "//div[contains(@class,'cart-form__offers-part cart-form__offers-part_data cart-form__offers-part_vertical_middle')]")
    private List<WebElement> confirmDeleteMessages;

    @FindBy(xpath = "//a[contains(@class,'cart-form__image cart-form__image_logo')]")
    private WebElement logo;

    public CartPage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getHeading() { return heading; }

    public List<WebElement> getListOfProducts() { return listOfProducts; }

    public WebElement getRemoveButton() { return removeButton; }

    public WebElement getOffersPartAction() { return offersPartAction; }

    public List<WebElement> getConfirmDeleteMessages() { return confirmDeleteMessages; }

    public WebElement getLogo() { return logo; }

    public WebElement getProductName(String productName){
        return driver.findElement(By.xpath("//a[contains(text(),'"+ productName +"')]"));
    }
}
