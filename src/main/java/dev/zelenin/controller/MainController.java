package dev.zelenin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by victor on 03.11.16.
 */
@Controller
public class MainController {
    private static final String VIEW = "static/views/main_page.html";

    @RequestMapping("/")
    public String home() {
        return VIEW;
    }

    @RequestMapping("/login")
    public String loginView() {
        return "static/views/login_page.html";
    }

    @RequestMapping("/comment")
    public static String commentView() {
        return "static/views/comment_page.html";
    }
}
