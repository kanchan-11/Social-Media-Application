package com.example.socialmedia.services;

import com.example.socialmedia.models.Reel;
import com.example.socialmedia.models.User;

import java.util.List;

public interface ReelService {
    public Reel createReel(Reel reel, User user);
    public List<Reel> findAllReels();
    public List<Reel> findUserReels(Integer userId) throws Exception;
}
