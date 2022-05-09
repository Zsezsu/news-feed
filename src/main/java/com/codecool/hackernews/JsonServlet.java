package com.codecool.hackernews;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "JsonServlet", urlPatterns = "/json", loadOnStartup = 3)
public class JsonServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        out.println("{\"id\":23568208,\"title\":\"Maze ransomware gang demand payoff from wrong company\",\"points\":1,\"user\":\"samizdis\",\"time\":1592515537,\"time_ago\":\"9 minutes ago\",\"type\":\"link\",\"content\":\"\",\"comments\":[],\"comments_count\":0,\"url\":\"https://www.theregister.com/2020/06/18/maze_ransomware_gang_name_screwup/\",\"domain\":\"theregister.com\"}");
    }
}
