package com.example.socialmedia.services;

import com.example.socialmedia.models.Reel;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.ReelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReelServiceImpl implements ReelService{

    @Autowired
    private ReelRepository reelRepository;

    @Autowired
    private UserService userService;
    @Override
    public Reel createReel(Reel reel, User user) {

        Reel newReel = new Reel();

        newReel.setUser(user);
        newReel.setVideo(reel.getVideo());
        newReel.setTitle(reel.getTitle());
        //newReel.setUser(reel.getUser());

        Reel savedReel = reelRepository.save(newReel);
        return savedReel;
    }

    @Override
    public List<Reel> findAllReels() {
        return reelRepository.findAll();
    }

    @Override
    public List<Reel> findUserReels(Integer userId) throws Exception {
        User user = userService.findUserById(userId);

        return reelRepository.findByUserId(userId);
    }
}
