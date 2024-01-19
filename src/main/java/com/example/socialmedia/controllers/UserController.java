package com.example.socialmedia.controllers;

import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getUsers()
    {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users,HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") int id) throws Exception
    {
        return new ResponseEntity<>(userService.findUserById(id),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User updatedUser,@RequestHeader("Authorization") String jwt) throws Exception
    {
        User requestingUser = userService.findUserByJwt(jwt);
        return new ResponseEntity<>(userService.updateUser(updatedUser,requestingUser.getId()),HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable int id) throws Exception
    {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent())
        {
            throw new Exception("User not exists with the id: "+id);
        }
        userRepository.delete(user.get());
        return new ResponseEntity<>("User deleted successfully with id: "+id,HttpStatus.OK);
    }

    @PutMapping("/follow/{user2}")
    public User followUserHandler(@RequestHeader("Authorization") String jwt,@PathVariable int user2)throws Exception
    {
        User requestingUser = userService.findUserByJwt(jwt);
        User user = userService.followUser(requestingUser.getId(),user2);
        return user;
    }

    @GetMapping("/search")
    public List<User> searchUser(@RequestParam("query") String query)
    {
        List<User> users= userRepository.searchUser(query);
        return users;
    }

    @GetMapping("/profile")
    public User getUserFromToken(@RequestHeader("Authorization") String jwt)
    {
        User user = userService.findUserByJwt(jwt);
        user.setPassword(null);
        return user;
    }
}

