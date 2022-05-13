package com.codecool.hackernews;

public abstract class News {

    private String title;
    private String time_ago;
    private String user;
    private String url;

    public News(String title, String time_ago, String user, String url) {
        this.title = title;
        this.time_ago = time_ago;
        this.user = user;
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public String getTimeAgo() {
        return time_ago;
    }

    public String getUser() {
        return user;
    }

    public String getUrl() {
        return url;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder()
                .append("Title:")
                .append(title).append("\n")
                .append("Time ago:")
                .append(time_ago).append("\n")
                .append("Author:")
                .append(user).append("\n")
                .append("Url:")
                .append(url).append("\n");
        return sb.toString();
    }
}
