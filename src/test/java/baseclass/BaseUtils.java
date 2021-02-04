package baseclass;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.ie.InternetExplorerDriver;
import org.openqa.selenium.ie.InternetExplorerOptions;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.remote.CapabilityType;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.lang.reflect.InvocationTargetException;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

public class BaseUtils {
    public static WebDriver driver;

    public static WebDriver browserLaunch(String browserName) throws Throwable {

        try {
            if (browserName.equalsIgnoreCase("chrome")) {
                System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + "\\src\\test\\resources\\Driver\\chromedriver.exe");
                Map<String, Object> prefs = new HashMap<>();
                File downloadsDirectory = new File(String.join(File.separator, System.getProperty("user.home"), "downloads"));
                prefs.put("download.default_directory", downloadsDirectory.getAbsolutePath());
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.setAcceptInsecureCerts(true);
                chromeOptions.addArguments("--lang=en-us");
                chromeOptions.setExperimentalOption("prefs", prefs);
                driver = new ChromeDriver(chromeOptions);
            } else if (browserName.equalsIgnoreCase("InternetExplorer")) {
                InternetExplorerOptions io = new InternetExplorerOptions();
                io.setCapability(InternetExplorerDriver.NATIVE_EVENTS, false);
                io.setCapability(CapabilityType.ACCEPT_SSL_CERTS, true);
                io.setCapability(CapabilityType.ACCEPT_INSECURE_CERTS, true);
                driver = new InternetExplorerDriver(io);
            } else if (browserName.equalsIgnoreCase("Firfox")) {
                System.setProperty("webdriver.gecko.driver", System.getProperty("user.dir") + "\\src\\test\\resources\\drivers\\geckodriver.exe");
                driver = new FirefoxDriver();
            } else if(browserName.equalsIgnoreCase("chrome-selenoid")){
                System.setProperty("webdriver.chrome.driver", System.getProperty("user.dir") + "\\src\\test\\resources\\Driver\\chromedriver.exe");
                Map<String, Object> prefs = new HashMap<>();
                File downloadsDirectory = new File(String.join(File.separator, System.getProperty("user.home"), "downloads"));
                prefs.put("download.default_directory", downloadsDirectory.getAbsolutePath());
                ChromeOptions chromeOptions = new ChromeOptions();
                chromeOptions.setAcceptInsecureCerts(true);
                chromeOptions.addArguments("--lang=en-us");
                chromeOptions.setExperimentalOption("prefs", prefs);
                DesiredCapabilities capabilities = new DesiredCapabilities();
                capabilities.setCapability("browserName", "chrome");
                capabilities.setCapability("browserVersion", "87.0");
                capabilities.setCapability("selenoid:options", Map.<String, Object>of(
                        "enableVNC", true,
                        "enableVideo", true
                ));
                driver = new RemoteWebDriver(
                        URI.create("http://104.248.27.208:4444/wd/hub").toURL(),
                        capabilities);
            }
        } catch (Exception e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            throw new Exception("browser is not launched properly");
        }
        return driver;
    }

    public static WebDriver geturl(String url) throws Throwable {

        try {

            driver.get(url);
            driver.manage().window().maximize();
            driver.manage().timeouts().implicitlyWait(60, TimeUnit.SECONDS);

        } catch (Exception e) {
            throw new Exception();
        }
        return driver;
    }

    public static void  waitforVisibility(WebElement element) {
        try {
            WebDriverWait wb = new WebDriverWait(driver, 60);
            wb.until(ExpectedConditions.visibilityOf(element));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void clickusingActions(WebElement element) throws InvocationTargetException {
        // TODO Auto-generated method stub
        try {
            waitforVisibility(element);
            Actions ac = new Actions(driver);
            ac.click(element).build().perform();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void clickusingJavascript(WebElement element) throws Throwable {
        waitforVisibility(element);
        JavascriptExecutor executor = (JavascriptExecutor)driver;
        executor.executeScript("arguments[0].click();", element);
    }

    public static void sendkeysUsingActions(WebElement element, String value) {
        try {
            waitforVisibility(element);
            Actions ac = new Actions(driver);
            ac.sendKeys(element, value).build().perform();
        } catch (Exception e) {

            e.printStackTrace();
        }
    }

    public static void mouseover(WebElement element) {
        try {
            waitforVisibility(element);
            Actions ac = new Actions(driver);
            ac.moveToElement(element).build().perform();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException();
        }
    }

    public static String getScreenshot(WebDriver driver) {

        //LoggerUtil.logMessage("****** getScreenShot called with driver: " + driver + " ******");

        String path = null;

        try {



            TakesScreenshot takesScreenshot = (TakesScreenshot) driver;

            // take screenshot and store as a file format

            File src = takesScreenshot.getScreenshotAs(OutputType.FILE);

            // define the path to store the screenshot taken

            //path = System.getProperty("user.dir") + "/test-output/Screenshot/" + System.currentTimeMillis() + ".png";

            path = System.getProperty("user.dir") + "/target/screenshot/" + System.currentTimeMillis() + ".png";

            File destination = new File(path);
            // copy the screenshot to the above given path

            FileUtils.copyFile(src, destination);

        } catch (Exception e) {

            e.printStackTrace();

        }
        return path;
    }
}
