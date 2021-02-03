package stepdefinition;

import baseclass.BaseUtils;
import baseclass.LoggerUtil;
import com.cucumber.listener.Reporter;
import cucumber.api.Scenario;
import cucumber.api.java.After;
import cucumber.api.java.Before;
import org.openqa.selenium.WebDriver;

import java.io.IOException;

public class Hooks {
    public static WebDriver driver;
    @Before
    public static void beforeHook(Scenario scenario) throws Exception {
        Reporter.assignAuthor("Onliner");
        LoggerUtil.logMessage("Scenario: " + scenario.getName());
    }

    @After
    public static void afterHook(Scenario scenario) throws IOException {
        if(scenario.isFailed() == true) {
            BaseUtils.getScreenshot(driver);
        }
        LoggerUtil.logMessage("Scenario: " + scenario.getStatus().toUpperCase());
        LoggerUtil.logMessage("************End of Scenario************");
        LoggerUtil.logMessage("************************************************");

    }
}
