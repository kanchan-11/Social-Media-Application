package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.CommentException;
import com.example.socialmedia.exceptions.PostException;
import com.example.socialmedia.exceptions.UserException;
import com.example.socialmedia.models.Comment;
import com.example.socialmedia.models.Post;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.CommentRepository;
import com.example.socialmedia.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommnetServiceImpl implements CommentService{

    @Autowired
    private PostService postService;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;
    @Autowired
    private CommentRepository commentRepository;
    @Override
    public Comment createComment(Comment comment, Integer postId, Integer userId) throws CommentException, UserException, PostException {

        User user = userService.findUserById(userId);
        Post post = postService.findPostById(postId);

        comment.setUser(user);
        comment.setContent(comment.getContent());
        comment.setCreatedAt(LocalDateTime.now());

        Comment savedComment = commentRepository.save(comment);

        post.getComments().add(savedComment);
        postRepository.save(post);
        return savedComment;
    }

    @Override
    public Comment findCommentById(Integer commentId) throws CommentException {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isEmpty())
        {
            throw new CommentException("No such comment exist with Id:"+commentId);
        }
        return comment.get();
    }

    @Override
    public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {

        Comment comment = findCommentById(commentId);
        User user = userService.findUserById(userId);

        if(comment.getLiked().contains(user))
        {
            comment.getLiked().remove(user);
        }
        else {
            comment.getLiked().add(user);
        }
        return commentRepository.save(comment);
    }
}
