package com.example.socialmedia.repository;

import com.example.socialmedia.models.Story;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StoryRepositroy extends JpaRepository<Story,Integer> {

    public List<Story> findByUserId(Integer userId);
}
