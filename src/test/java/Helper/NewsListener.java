package Helper;

import java.util.Locale;

public class NewsListener {
    private String news;

    public NewsListener(String news){
        this.news = news.toLowerCase(Locale.ROOT);
    }

    public String getNews(){
        return this.news.toLowerCase(Locale.ROOT);
    }

    public void setNews(String newsName) {
        this.news = newsName.toLowerCase(Locale.ROOT);
    }
}
