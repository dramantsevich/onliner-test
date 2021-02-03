package baseclass;

import java.text.SimpleDateFormat;
import java.util.Date;

public abstract class LoggerUtil {
    static org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger("devpinoyLogger");



    /**********************************************************************************************

     * Logs a message in Log4J and Console file

     *

     * @param message

     ***********************************************************************************************/



    public static void logMessage(String message) {

        logConsoleMessage(message);

        log.info(message);

    }



    /**********************************************************************************************

     * Logs a message to the console only

     *

     * @param message

     ***********************************************************************************************/



    public static void logConsoleMessage(String message) {

        System.out.println(new SimpleDateFormat("yyyy-MM-dd hh:mm:ss.SSS").format(new Date()) + " " + message);

    }



    /**********************************************************************************************

     * Logs a error message in Log4J and Console file

     *

     * @param displayed

     ***********************************************************************************************/

    public static void logErrorMessage(String displayed) {

        System.err.println("Error: " + displayed);

        log.error(displayed);

    }


    public static void logBolleanMessage(boolean booleanValue) {
        logMessage(Boolean.toString(true));
        log.info(booleanValue?"true":"false");
        //log.assertLog(true, msg);
        //log.info(message);

    }
}
