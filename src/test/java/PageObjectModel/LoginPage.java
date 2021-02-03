package PageObjectModel;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

public class LoginPage {
    public static WebDriver driver;

    @FindBy(xpath = "//input[contains(@placeholder,'Ник или e-mail')]")
    private WebElement email;

    @FindBy(xpath = "//input[contains(@placeholder,'Пароль')]")
    private WebElement password;

    @FindBy(xpath = "//button[contains(@class,'auth-button auth-button_primary auth-button_middle auth-form__button auth-form__button_width_full')]")
    private WebElement loginButton;

    public LoginPage(WebDriver ldriver) {
        this.driver = ldriver;
        PageFactory.initElements(driver, this);
    }

    public WebElement getEmail() { return email; }

    public WebElement getPassword() { return password; }

    public WebElement getLoginButton() { return loginButton; }
}
