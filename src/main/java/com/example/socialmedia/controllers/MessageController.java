package com.example.socialmedia.controllers;

import com.example.socialmedia.models.Message;
import com.example.socialmedia.models.User;
import com.example.socialmedia.services.MessageService;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/messages/chat")
@RestController
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private UserService userService;

    @PostMapping("/{chatId}")
    public ResponseEntity<Message> createMessage(@RequestHeader("Authorization") String jwt,
                                                  @RequestBody Message message,
                                                  @PathVariable Integer chatId) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        Message newMessage = messageService.createMessage(requestingUser,chatId,message);
        return new ResponseEntity<>(newMessage, HttpStatus.CREATED);
    }

    @GetMapping("/{chatId}")
    public ResponseEntity<List<Message>> findChatMessages(@RequestHeader("Authorization") String jwt,
                                                       @PathVariable Integer chatId) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        List<Message> messages = messageService.findChatMessages(chatId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
