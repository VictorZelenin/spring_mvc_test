package dev.zelenin.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by victor on 27.07.16.
 */
@Controller
public class CommentController {
    private static final String VIEW = "static/index.html";
    private List<String> comments = new ArrayList<>();

    @RequestMapping("/")
    public String home() {
        return VIEW;
    }

    @RequestMapping(value = "/api/comments")
    @ResponseBody
    public ResponseEntity<List<String>> getComments() {
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @RequestMapping(value = "/", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> processRequest(@RequestBody String input) {
        comments.add(input);

        return new ResponseEntity<>(input, HttpStatus.OK);
    }
}
