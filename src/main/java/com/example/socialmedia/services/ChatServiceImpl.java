package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.ChatException;
import com.example.socialmedia.models.Chat;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ChatServiceImpl implements ChatService{

    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Chat createChat(User requestingUser, User user) {

        Chat chatAlready = chatRepository.findChatByUsersId(user,requestingUser);
        if(chatAlready!=null)
            return chatAlready;
        Chat newChat = new Chat();
        newChat.getUsers().add(user);
        newChat.getUsers().add(requestingUser);

        newChat.setTimestamp(LocalDateTime.now());
        Chat savedChat = chatRepository.save(newChat);
        return savedChat;
    }

    @Override
    public Chat findChatById(Integer chatId) throws ChatException {

        Optional<Chat> chat = chatRepository.findById(chatId);
        if(chat.isEmpty())
            throw  new ChatException("Chat not found with Id: "+chatId);

        return chat.get();
    }

    @Override
    public List<Chat> findUsersChat(Integer userId) {

        return chatRepository.findByUsersId(userId);
    }
}
