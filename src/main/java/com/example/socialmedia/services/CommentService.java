package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.CommentException;
import com.example.socialmedia.exceptions.UserException;
import com.example.socialmedia.models.Comment;

public interface CommentService {

    public Comment createComment(Comment comment,Integer postId,Integer userId) throws Exception;
    public Comment findCommentById(Integer commentId) throws CommentException;
    public Comment likeComment(Integer commentId,Integer userId) throws CommentException, UserException;
}
