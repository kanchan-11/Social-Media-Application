package com.example.socialmedia.services;

import com.example.socialmedia.models.Story;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.StoryRepositroy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService{

    @Autowired
    private StoryRepositroy storyRepositroy;

    @Autowired
    private UserService userService;
    @Override
    public Story createStory(Story story, User user) {

        Story newStory = new Story();
        newStory.setCaption(story.getCaption());
        newStory.setImage(story.getImage());
        newStory.setTimeStamp(LocalDateTime.now());
        newStory.setUser(user);
        Story savedStory = storyRepositroy.save(newStory);
        return  savedStory;
    }

    @Override
    public List<Story> findStoryByUserId(Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        return storyRepositroy.findByUserId(userId);
    }
}
