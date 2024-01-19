package com.example.socialmedia.controllers;

import com.example.socialmedia.models.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RealTimeChat {

//    private static final Logger LOGGER = LoggerFactory.getLogger(RealTimeChat.class);

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;
    @MessageMapping("/chat/{groupId}")
    public Message sendToUser(@Payload Message message,@DestinationVariable String groupId){

//        LOGGER.info("Sending message '{}' to groupId: {}", message.getContent(), groupId);

        simpMessagingTemplate.convertAndSendToUser(groupId,"/private",message);
        return message;
    }
}
