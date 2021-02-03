package PageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class MobilePhonesCatalogPage {
    public static WebDriver driver;

    @FindBy(xpath = "//h1[@class='schema-header__title']")
    private WebElement heading;

    public MobilePhonesCatalogPage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getHeading() { return heading; }

    public WebElement getMobilePhoneByName(String phoneName){
        return driver.findElement(By.xpath("//div[contains(@class,'schema-product__part schema-product__part_4')]" +
                "/div/a/span[contains(text(),'"+ phoneName +"')]"));
    }
}
