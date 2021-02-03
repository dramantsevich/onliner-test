package Helper;

public class FileReaderManager {
    public static FileReaderManager filereader = new FileReaderManager();
    public static ConfigReader configreader;

    public ConfigReader getConfigReader() throws Throwable {

        if (configreader == null) {
            configreader = new ConfigReader();
        }
        return configreader;
    }

    public static FileReaderManager getInstance() {
        return filereader;
    }

    private FileReaderManager() {

    }
}
