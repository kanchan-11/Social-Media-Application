package com.example.socialmedia.controllers;

import com.example.socialmedia.Response.ApiResponse;
import com.example.socialmedia.models.Post;
import com.example.socialmedia.models.User;
import com.example.socialmedia.services.PostService;
import com.example.socialmedia.services.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.PublicKey;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    PostService postService;
    @Autowired
    UserService userService;

    //create new post corresponding to a user
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestHeader("Authorization") String jwt,@RequestBody Post post) throws Exception {

        User requestingUser = userService.findUserByJwt(jwt);
        Post createdPost = postService.createNewPost(post,requestingUser.getId());
        return new ResponseEntity<>(createdPost, HttpStatus.ACCEPTED);

    }

    //Delete a post by a user
    @DeleteMapping("/{postId}")
    public ResponseEntity<ApiResponse> deletePost(@PathVariable Integer postId, @RequestHeader("Authorization") String jwt) throws Exception {

        User requestingUser = userService.findUserByJwt(jwt);
        String message = postService.deletePost(postId,requestingUser.getId());
        ApiResponse response = new ApiResponse(message,true);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    //get a post by its ID
    @GetMapping("/{postId}")
    public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws Exception {
        Post post = postService.findPostById(postId);
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    // get all posts corresponding to a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Post>> findUsersPosts(@PathVariable Integer userId)
    {
        List<Post> posts = postService.findPostByUserId(userId);
        return new ResponseEntity<>(posts,HttpStatus.OK);
    }

    //get all posts
    @GetMapping
    public ResponseEntity<List<Post>> findAllPost()
    {
        List<Post> posts = postService.findAllPost();
        return new ResponseEntity<>(posts,HttpStatus.OK);
    }

    //to save a post in user account
    @PutMapping("/save/{postId}")
    public ResponseEntity<Post> savePostHandler(@PathVariable Integer postId,@RequestHeader("Authorization") String jwt) throws Exception {
        User requestingUser = userService.findUserByJwt(jwt);
        Post post = postService.savePost(postId,requestingUser.getId());
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }

    //to like  a post by a user
    @PutMapping("/like/{postId}")
    public ResponseEntity<Post> likePostHandler(@PathVariable Integer postId,@RequestHeader("Authorization") String jwt) throws Exception {

        User requestingUser = userService.findUserByJwt(jwt);
        Post post = postService.likePost(postId,requestingUser.getId());
        return new ResponseEntity<>(post,HttpStatus.ACCEPTED);
    }
}
