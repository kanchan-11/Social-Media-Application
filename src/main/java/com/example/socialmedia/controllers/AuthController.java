package com.example.socialmedia.controllers;

import com.example.socialmedia.Response.AuthResponse;
import com.example.socialmedia.config.JwtProvider;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.UserRepository;
import com.example.socialmedia.request.LoginRequest;
import com.example.socialmedia.services.CustomUserDetailsService;
import com.example.socialmedia.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://kanchan-11.github.io/Social-Media-React"})
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CustomUserDetailsService customUserDetails;


    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUser(@RequestBody User user) throws Exception {

        User isExist = userRepository.findByEmail(user.getEmail());

        if(isExist!=null)
        {
            throw new Exception("Another User already exists with this email");
        }

        User newUser = new User();

        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(newUser);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedUser.getEmail(),savedUser.getPassword());
        String token= JwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token,"Register Success");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody LoginRequest loginRequest)
    {
        Authentication authentication = authenticate(loginRequest.getEmail(),loginRequest.getPassword());
        String token= JwtProvider.generateToken(authentication);
        AuthResponse response = new AuthResponse(token,"Login Success");
        return new ResponseEntity<>(response,HttpStatus.ACCEPTED);
    }

    private Authentication authenticate(String email, String password) {
        UserDetails userDetails = customUserDetails.loadUserByUsername(email);

        if(userDetails==null)
            throw new BadCredentialsException("invalid Username");
        if(!passwordEncoder.matches(password,userDetails.getPassword())) {
            throw new BadCredentialsException("Incorrect Password");
        }
        return new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
