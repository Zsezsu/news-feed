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

@WebServlet (name = "Jobs", urlPatterns = {"/api/jobs"}, loadOnStartup = 1)
public class JobsServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String param = req.getParameter("page");
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        PrintWriter out = resp.getWriter();

        URL url = new URL("https://api.hnpwa.com/v0/jobs/"+ param + ".json");
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

        Type jobsType = new TypeToken<ArrayList<Jobs>>(){}.getType();
        List<Jobs> jobsList = new Gson().fromJson(String.valueOf(content), jobsType);

        JsonSerializer<Jobs> serializer = new JsonSerializer<Jobs>() {

            @Override
            public JsonElement serialize(Jobs jobs, Type type, JsonSerializationContext jsonSerializationContext) {

                JsonObject jsonJobs = new JsonObject();

                jsonJobs.addProperty("title", jobs.getTitle());
                jsonJobs.addProperty("time_ago", jobs.getTimeAgo());
                jsonJobs.addProperty("user", jobs.getUser());
                jsonJobs.addProperty("url", jobs.getUrl());

                return jsonJobs;
            }

        };

        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.registerTypeAdapter(Jobs.class, serializer);

        Gson customGson = gsonBuilder.create();
        String jsonFileForWebSite = customGson.toJson(jobsList);

        out.println(jsonFileForWebSite);
    }
}
