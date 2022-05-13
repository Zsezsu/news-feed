package com.codecool.hackernews;

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

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@WebServlet (name = "TopNews", urlPatterns = {"/api/top"}, loadOnStartup = 1)
public class TopNewsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String param = req.getParameter("page");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();

        URL url = new URL("https://api.hnpwa.com/v0/news/" + param + ".json");
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

        Type topNewsType = new TypeToken<ArrayList<TopNews>>(){}.getType();
        List<TopNews> topNewsList = new Gson().fromJson(String.valueOf(content), topNewsType);

        JsonSerializer<TopNews> serializer = new JsonSerializer<TopNews>() {

            @Override
            public JsonElement serialize(TopNews topNews, Type type, JsonSerializationContext jsonSerializationContext) {
                JsonObject jsonTopNews = new JsonObject();

                jsonTopNews.addProperty("title", topNews.getTitle());
                jsonTopNews.addProperty("time_ago", topNews.getTimeAgo());
                jsonTopNews.addProperty("user", topNews.getUser());
                jsonTopNews.addProperty("url", topNews.getUrl());

                return jsonTopNews;
            }
        };

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(TopNews.class, serializer);

        Gson customGson = gsonBuilder.create();
        String customJson = customGson.toJson(topNewsList);

        out.println(customJson);
    }
}
