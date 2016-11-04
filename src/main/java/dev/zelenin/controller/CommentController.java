package dev.zelenin.controller;

import dev.zelenin.entity.Comment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


/**
 * Created by victor on 27.07.16.
 */
@Controller
public class CommentController {
    private List<Comment> comments = new ArrayList<>();

    @ResponseBody
    @RequestMapping(value = "/", method = RequestMethod.POST)
    public ResponseEntity<?> processRequest(@RequestBody Comment comment) throws IOException {
        System.out.println(comment);
        comments.add(comment);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @ResponseBody
    @RequestMapping(value = "/api/comments")
    public ResponseEntity<?> getComments() {
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }
}
