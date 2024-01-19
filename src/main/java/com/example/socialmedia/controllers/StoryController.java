package com.example.socialmedia.controllers;


import com.example.socialmedia.models.Story;
import com.example.socialmedia.models.User;
import com.example.socialmedia.services.StoryService;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/story")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Story> createStory(@RequestBody Story story, @RequestHeader("Authorization") String jwt)
    {
        User requestingUser = userService.findUserByJwt(jwt);
        Story newStory = storyService.createStory(story,requestingUser);
        return new ResponseEntity<>(newStory, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Story>> findUserStory(@PathVariable Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        return new ResponseEntity<>(storyService.findStoryByUserId(userId),HttpStatus.OK);
    }
}
