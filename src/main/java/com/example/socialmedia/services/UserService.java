package com.example.socialmedia.services;

import com.example.socialmedia.config.JwtProvider;
import com.example.socialmedia.exceptions.UserException;
import com.example.socialmedia.models.User;

import java.util.List;

public interface UserService {

    public User RegisterUser(User user);
    public User findUserById(Integer id) throws UserException;
    public User findUserByEmail(String email);
    public User followUser(Integer user1,Integer user2) throws UserException;
    public User updateUser(User user,Integer id) throws UserException;
    public List<User> searchUser(String query);
    public User findUserByJwt(String jwt);

}
