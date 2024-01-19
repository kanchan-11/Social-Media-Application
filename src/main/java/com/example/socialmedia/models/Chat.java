package com.example.socialmedia.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String chat_image;
    private String chat_name;
    @ManyToMany
    private List<User> users = new ArrayList<>();
    private LocalDateTime timestamp;

    @OneToMany(mappedBy = "chat")
    private List<Message> messages = new ArrayList<>();
}
