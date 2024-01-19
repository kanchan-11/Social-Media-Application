package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.PostException;
import com.example.socialmedia.exceptions.UserException;
import com.example.socialmedia.models.Post;

import java.util.List;

public interface PostService {

    public Post createNewPost(Post post, Integer userId) throws PostException, UserException;
    public String deletePost(Integer postId,Integer userId) throws PostException, UserException;
    public List<Post> findPostByUserId(Integer userId);
    public Post findPostById(Integer postId) throws PostException;
    public List<Post> findAllPost();
    public Post savePost(Integer postId,Integer userId) throws PostException, UserException;
    public Post likePost(Integer postId,Integer userId) throws PostException, UserException;

}
