package com.example.socialmedia.repository;

import com.example.socialmedia.models.Reel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReelRepository extends JpaRepository<Reel,Integer> {
    public List<Reel> findByUserId(Integer userId);
}
