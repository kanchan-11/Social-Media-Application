package com.example.socialmedia.request;

import com.example.socialmedia.models.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateChatRequest {

    private Integer requestedUserId;
}
