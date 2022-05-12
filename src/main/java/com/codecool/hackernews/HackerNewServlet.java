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
        String title = "Hacker news";

        out.println(
                "<html>\n" +
                        "<head>" +
                        "  <title>" + title + "</title>" +
                        "  <link rel=\"stylesheet\" type=\"text/css\" href='/static/css/site.css' />" +
                        "  <link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3\" crossorigin=\"anonymous\">\n" +
                        "  <script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js\" integrity=\"sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p\" crossorigin=\"anonymous\" defer></script>\n" +
                        "  <script src='/static/js/main.js' defer></script>" +
                        "</head>\n" +
                        "<body>\n" +
                        "<div class=\"shadow p-3 mb-5 bg-body rounded\">" +
                        "<ul class=\"nav nav-tabs\">\n" +
                        "   <li class=\"nav-item\"><a class=\"nav-link active\" aria-current=\"page\" href=\"/\">Hackson news</a> " +
                        "   <li class=\"nav-item\"><a class=\"nav-link\" id=\"top-news\" href=\"javascript:void(0);\">Top news</a> " +
                        "   <li class=\"nav-item\"><a class=\"nav-link\" id=\"newest\" href=\"javascript:void(0);\">Newest</a> " +
                        "   <li class=\"nav-item\"><a class=\"nav-link\" id=\"jobs\">Jobs</a> " +
                        "  </ul>\n" +
                        "</div>" +
                        "<div class=\"shadow p-3 mb-5 bg-light text-dark rounded container pagination-container\">" +
                        "</div>" +
                        "<div class=\"shadow p-3 mb-5 bg-light text-dark rounded container\">" +
                        "<div class=\"row card-container\">" +
                        "   <div class=\"card col link\">\n" +
                        "       <div class=\"card-body\">\n" +
                        "           <a>Top news</a>\n" +
                        "       </div>\n" +
                        "    </div>" +
                        "   <div class=\"card col link\">\n" +
                        "       <div class=\"card-body\">\n" +
                        "           <a>Newest news</a>\n" +
                        "       </div>\n" +
                        "    </div>" +
                        "   <div class=\"card col link\">\n" +
                        "       <div class=\"card-body\">\n" +
                        "           <a>Jobs</a>\n" +
                        "       </div>\n" +
                        "    </div>" +
                        "</div>" +
                        "</div>" +
                        "<div class=\"shadow p-3 mb-5 bg-light text-dark rounded\">" +
                        "<footer class=\"text-primary w-25 p-6\">" +
                        "   <p class=\"text-primary\">Developer: Zsu Juhász</p><br>" +
                        "   <p class=\"text-primary\">Contact me: <a class=\"text-primary\" href=\"mailto:zsezsu6@gmail.com\">zsezsu6@gmail.com</a></p>" +
                        "</footer>" +
                        "</div>" +
                        "</body>" +
                        "</html>"
        );
    }
}
