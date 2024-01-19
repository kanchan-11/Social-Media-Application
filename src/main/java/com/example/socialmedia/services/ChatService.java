package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.ChatException;
import com.example.socialmedia.models.Chat;
import com.example.socialmedia.models.User;

import java.util.List;

public interface ChatService {
    public Chat createChat(User requestingUser, User user);
    public Chat findChatById(Integer chatId) throws ChatException;
    public List<Chat> findUsersChat(Integer userId);
}
