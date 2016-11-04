package dev.zelenin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by victor on 03.11.16.
 */
@Controller
public class MainController {
    private static final String VIEW = "static/index.html";

    @RequestMapping("/")
    public String home() {
        return VIEW;
    }
}
