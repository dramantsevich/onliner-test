package Helper;

import java.io.File;
import java.io.FileInputStream;
import java.util.Properties;

public class ConfigReader {
    public static String propertiesFilePath = System.getProperty("user.dir") + "\\src\\test\\resources\\Property\\Configuration.properties";

    public static Properties prop;

    public ConfigReader() throws Throwable {

        try {
            File file = new File(propertiesFilePath);
            FileInputStream finput = new FileInputStream(file);
            prop = new Properties();
            prop.load(finput);
        } catch (Exception e) {

            e.printStackTrace();
            throw new Exception("File not loaded properly");
        }
    }

    public String getbrowserName() throws Throwable {
        String browsername = prop.getProperty("browserName");

        if (browsername != null) {
        } else {
            throw new Exception("not a valid browsername");
        }
        return browsername;
    }

    public String getSelenoidBrowserName() throws Throwable {
        String browsername = prop.getProperty("selenoidBrowserName");

        if (browsername != null) {
        } else {
            throw new Exception("not a valid browsername");
        }
        return browsername;
    }

    public static String getextent_report() throws Exception {
        String report = prop.getProperty("extentReport");

        if (report != null) {
        } else {
            throw new Exception("not a valid path");
        }
        return report;
    }

    public String getEmailAddress() throws Throwable {
        String emailAddress = prop.getProperty("emailAddress");

        if (emailAddress != null) {
        } else {
            throw new Exception("not a valid email address");
        }
        return emailAddress;
    }

    public String getPassword() throws Throwable {
        String password = prop.getProperty("password");

        if (password != null) {

        } else {
            throw new Exception("not a valid password");
        }
        return password;
    }
}
