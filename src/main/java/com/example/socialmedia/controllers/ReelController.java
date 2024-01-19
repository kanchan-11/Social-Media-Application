package com.example.socialmedia.controllers;

import com.example.socialmedia.models.Reel;
import com.example.socialmedia.models.User;
import com.example.socialmedia.services.ReelService;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reels")
public class ReelController {

    @Autowired
    private ReelService reelService;

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Reel> createReel(@RequestBody Reel reel, @RequestHeader("Authorization") String jwt)
    {
        User requestingUser = userService.findUserByJwt(jwt);
        Reel newReel = reelService.createReel(reel,requestingUser);
        return new ResponseEntity<>(newReel, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Reel>> findAllReels()
    {
        List<Reel> allReels = reelService.findAllReels();
        return new ResponseEntity<>(allReels,HttpStatus.OK);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Reel>> findUserReels(@PathVariable Integer userId) throws Exception {
        User user = userService.findUserById(userId);
        List<Reel> userReels = reelService.findUserReels(user.getId());
        return new ResponseEntity<>(userReels,HttpStatus.OK);
    }
}
