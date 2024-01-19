package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.PostException;
import com.example.socialmedia.exceptions.UserException;
import com.example.socialmedia.models.Post;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.PostRepository;
import com.example.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService{

    @Autowired
    PostRepository postRepository;

    @Autowired
    UserService userService;

    @Autowired
    UserRepository userRepository;
    @Override
    public Post createNewPost(Post post, Integer userId) throws PostException, UserException {

        Post newPost = new Post();

        User user = userService.findUserById(userId);

        newPost.setUser(user);
        newPost.setCaption(post.getCaption());
        newPost.setImage(post.getImage());
        newPost.setVideo(post.getVideo());
        newPost.setCreatedAt(LocalDateTime.now());

        postRepository.save(newPost);
        return newPost;
    }

    @Override
    public String deletePost(Integer postId, Integer userId) throws PostException, UserException {

        Post post = findPostById(postId);
        User user = userService.findUserById(userId);
        if(post.getUser().getId()!=user.getId())
            throw new PostException("You cannot delete post of some other user");
        postRepository.delete(post);
        return "Post Deleted Successfully";
    }

    @Override
    public List<Post> findPostByUserId(Integer userId) {
        return postRepository.findPostByUserId(userId);
    }

    @Override
    public Post findPostById(Integer postId) throws PostException {

        Optional<Post> post = postRepository.findById(postId);
        if(post.isEmpty())
            throw  new PostException("post not found with Id "+ postId);
        return post.get();
    }

    @Override
    public List<Post> findAllPost() {
        List<Post> list = postRepository.findAll();
        return list;
    }

    @Override
    public Post savePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(user.getSavedPosts().contains(post))
        {
            user.getSavedPosts().remove(post);
        }
        else
        {
            user.getSavedPosts().add(post);
        }
        userRepository.save(user);
        return post;
    }

    @Override
    public Post likePost(Integer postId, Integer userId) throws PostException, UserException {
        Post post = findPostById(postId);
        User user = userService.findUserById(userId);

        if(post.getLiked().contains(user))
            post.getLiked().remove(user);
        else
            post.getLiked().add(user);

        return postRepository.save(post);
    }
}
