package com.example.socialmedia.services;

import com.example.socialmedia.models.Story;
import com.example.socialmedia.models.User;

import java.util.List;

public interface StoryService {
    public Story createStory(Story story, User user);
    public List<Story> findStoryByUserId(Integer userId) throws Exception;

}
