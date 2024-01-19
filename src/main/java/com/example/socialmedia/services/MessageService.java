package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.ChatException;
import com.example.socialmedia.exceptions.MessageException;
import com.example.socialmedia.models.Chat;
import com.example.socialmedia.models.Message;
import com.example.socialmedia.models.User;

import java.util.List;

public interface MessageService {

    public Message createMessage(User user, Integer chatId, Message message) throws MessageException, ChatException;
    public List<Message> findChatMessages(Integer chatId) throws MessageException, ChatException;
}
