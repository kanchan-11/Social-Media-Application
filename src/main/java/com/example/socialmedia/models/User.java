package com.example.socialmedia.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private List<Integer> followers = new ArrayList<>();
    private List<Integer> followings = new ArrayList<>();
    private String gender;
    private String profilePicture;

    @JsonIgnore
    @ManyToMany
    private List<Post> savedPosts = new ArrayList<>();

}
