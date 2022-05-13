package com.codecool.hackernews;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@WebServlet (name= "NewestNews", urlPatterns = {"/api/newest"}, loadOnStartup = 1)
public class NewestNewsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String param = req.getParameter("page");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();

        URL url = new URL("https://api.hnpwa.com/v0/newest/" + param +".json");
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer content = new StringBuffer();
        while ((inputLine = in.readLine()) != null){
            content.append(inputLine);
        }
        in.close();
        con.disconnect();

        Type newestNewsType = new TypeToken<ArrayList<NewestNews>>(){}.getType();
        List<NewestNews> newestNewsList = new Gson().fromJson(String.valueOf(content), newestNewsType);

        JsonSerializer<NewestNews> serializer = new JsonSerializer<NewestNews>() {

            @Override
            public JsonElement serialize(NewestNews newestNews, Type type, JsonSerializationContext jsonSerializationContext) {
                JsonObject jsonNewestNews = new JsonObject();

                jsonNewestNews.addProperty("title", newestNews.getTitle());
                jsonNewestNews.addProperty("time_ago", newestNews.getTimeAgo());
                jsonNewestNews.addProperty("user", newestNews.getUser());
                jsonNewestNews.addProperty("url", newestNews.getUrl());

                return jsonNewestNews;
            }
        };

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(NewestNews.class, serializer);

        Gson customGson = gsonBuilder.create();
        String customJson = customGson.toJson(newestNewsList);

        out.println(customJson);

    }
}
