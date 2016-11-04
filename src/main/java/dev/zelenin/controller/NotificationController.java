package dev.zelenin.controller;

import dev.zelenin.entity.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

/**
 * Created by victor on 03.11.16.
 */
@Controller
public class NotificationController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public User greetings(User user) throws InterruptedException {
        Thread.sleep(100);

        System.out.println(user);

        return user;
    }

}
