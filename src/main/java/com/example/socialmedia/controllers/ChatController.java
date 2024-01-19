package com.example.socialmedia.controllers;


import com.example.socialmedia.models.Chat;
import com.example.socialmedia.models.User;
import com.example.socialmedia.request.CreateChatRequest;
import com.example.socialmedia.services.ChatService;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/chats")
@RestController
public class ChatController {

    @Autowired
    private ChatService chatService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestHeader("Authorization") String jwt,
                                           @RequestBody CreateChatRequest request) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        User requestedUser = userService.findUserById(request.getRequestedUserId());
        Chat newChat = chatService.createChat(requestingUser,requestedUser);
        return  new ResponseEntity<>(newChat,HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Chat>> findUsersChat(@RequestHeader("Authorization") String jwt)
    {
        User requestingUser = userService.findUserByJwt(jwt);
        List<Chat> chats = chatService.findUsersChat(requestingUser.getId());
        return  new ResponseEntity<>(chats,HttpStatus.OK);
    }

}
