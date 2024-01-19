package com.example.socialmedia.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ManyToAny;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String caption;
    private String image;
    private String video;

    @ManyToOne
    private User user;
    private LocalDateTime createdAt;

    @ManyToMany
    private List<User> liked = new ArrayList<>();
    @OneToMany
    private List<Comment> comments = new ArrayList<>();
}
