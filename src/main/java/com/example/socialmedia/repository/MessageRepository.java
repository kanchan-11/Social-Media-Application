package com.example.socialmedia.repository;

import com.example.socialmedia.models.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message,Integer> {
    public List<Message> findByChatId(Integer chatId);

}
