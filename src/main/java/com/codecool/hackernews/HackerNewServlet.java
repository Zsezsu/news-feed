package com.codecool.hackernews;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "hackerNewsServlet", urlPatterns = {"/"}, loadOnStartup = 1)
public class HackerNewServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        PrintWriter out = response.getWriter();
        String title = "Michael Hackson news";

        out.println(
                "<html>\n" +
                        "<head>" +
                        "  <title>" + title + "</title>" +
                        "  <link rel=\"stylesheet\" type=\"text/css\" href='/static/css/site.css' />" +
                        "</head>\n" +
                        "<body>\n" +
                        "<h1 align = \"center\">" + title + "</h1>\n" +
                        "<ul>\n" +
                        "<li><b>First Name</b>: " + request.getParameter("first_name") + "\n" +
                        "<li><b>Last Name</b>: " + request.getParameter("last_name") + "\n" +
                        "</ul>\n" +
                        "<div class='visit'>You can serve any static content from <span class='folder'>webapp/static</span> folder, like a css file.</div>" +
                        "<div>Visit another servlet: <a href=\"/another\">Visit the other servlet</a></div>" +
                        "<div>You can provide a json file as well: <a href=\"/json\">Visit Hacker News json data example</a></div>" +
                        "</body></html>"
        );
    }
}
