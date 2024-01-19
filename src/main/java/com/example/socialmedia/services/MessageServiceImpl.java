package com.example.socialmedia.services;

import com.example.socialmedia.exceptions.ChatException;
import com.example.socialmedia.exceptions.MessageException;
import com.example.socialmedia.models.Chat;
import com.example.socialmedia.models.Message;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.ChatRepository;
import com.example.socialmedia.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private ChatService chatService;

    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Message createMessage(User user, Integer chatId, Message message) throws MessageException, ChatException {

        Chat chat = chatService.findChatById(chatId);
        Message newMessage = new Message();

        newMessage.setContent(message.getContent());
        newMessage.setImage(message.getImage());
        newMessage.setUser(user);
        newMessage.setTimestamp(LocalDateTime.now());
        newMessage.setChat(chat);

        Message savedMessage = messageRepository.save(newMessage);
        chat.getMessages().add(savedMessage);
        chatRepository.save(chat);
        return savedMessage;
    }

    @Override
    public List<Message> findChatMessages(Integer chatId) throws MessageException, ChatException {

        Chat chat = chatService.findChatById(chatId);
        return messageRepository.findByChatId(chatId);
    }
}
