package PageObjectModel;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class NewsPage {
    public static WebDriver driver;

    @FindBy(xpath = "//h1")
    private WebElement heading;

    @FindBy(xpath = "//div[contains(@class,'st-btn st-selected')]")
    private WebElement selectedReaction;

    public NewsPage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getHeading() { return heading; }

    public WebElement getSelectedReaction() { return selectedReaction; }

    public WebElement getReactionByNumber(String reactionNumber){
        return driver.findElement(By.xpath("//div[contains(@class,'st-btn')]["+ reactionNumber +"]"));
    }

    public WebElement getPopularNewsByNumber(String populaNewsNumber){
        return driver.findElement(By.xpath("//a[contains(@class,'news-popular__item news-popular__item_visible')]["+ populaNewsNumber +"]"));
    }

    public WebElement getPopularNewsNameByNumber(String popularNewsNumber){
        return driver.findElement(By.xpath("//a[contains(@class,'news-popular__item news-popular__item_visible')]["+ popularNewsNumber +"]" +
                "//div[@class='news-popular__subtitle']"));
    }
}
