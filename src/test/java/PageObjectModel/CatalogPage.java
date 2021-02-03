package PageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class CatalogPage {
    public static WebDriver driver;

    @FindBy(xpath = "//h1[@class='catalog-navigation__title']")
    private WebElement heading;

    @FindBy(xpath = "//ul[contains(@class,'catalog-navigation-classifier catalog-navigation-classifier_brand')]")
    private WebElement catalogNavigationClassifier;

    @FindBy(xpath = "//div[contains(@class,'catalog-navigation-list__aside-item catalog-navigation-list__aside-item_active')]")
    private WebElement catalogNavigationActiveListItem;

    public CatalogPage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getHeading() { return heading; }

    public WebElement getCatalogNavigationClassifier() { return catalogNavigationClassifier; }

    public WebElement getNavigationClassifierByNumber(String classifierNumber){
        return driver.findElement(By.xpath("//li[@class='catalog-navigation-classifier__item ']["+ classifierNumber +"]"));
    }

    public WebElement getCatalogNavigationListItemByName(String itemName){
        return driver.findElement(By.xpath("//div[@class='catalog-navigation-list__aside-item']/div[contains(text(), '"+ itemName +"')]"));
    }

    public WebElement getCatalogNavigationActiveListItem() { return catalogNavigationActiveListItem; }

    public WebElement getDropdownNavigationListItemByName(String itemName){
        return driver.findElement(By.xpath("//div[contains(@class,'catalog-navigation-list__aside-item catalog-navigation-list__aside-item_active')]" +
                "//span[@class='catalog-navigation-list__dropdown-title' and contains(text(),'"+ itemName +"')]"));
    }
}
