package com.example.socialmedia.controllers;

import com.example.socialmedia.models.Comment;
import com.example.socialmedia.models.User;
import com.example.socialmedia.services.CommentService;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    private UserService userService;

    @PostMapping("/post/{postId}")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment,
                                                @RequestHeader("Authorization") String jwt,
                                                @PathVariable Integer postId) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        Comment newComment = commentService.createComment(comment,postId,requestingUser.getId());
        return new ResponseEntity<>(newComment,HttpStatus.CREATED);
    }

    @PutMapping("/like/{commentId}")
    public ResponseEntity<Comment> likeComment(@RequestHeader("Authorization") String jwt,@PathVariable Integer commentId) throws Exception {
        User RequestingUser= userService.findUserByJwt(jwt);
        Comment likedComment = commentService.likeComment(commentId,RequestingUser.getId());
        return new ResponseEntity<>(likedComment,HttpStatus.ACCEPTED);
    }
}
