package com.example.socialmedia.services;

import com.example.socialmedia.config.JwtProvider;
import com.example.socialmedia.exceptions.UserException;
import com.example.socialmedia.models.User;
import com.example.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    UserRepository userRepository;
    @Override
    public User RegisterUser(User user)
    {
        User newUser = new User(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                user.getPassword(),
                user.getFollowers(),
                user.getFollowings(),
                user.getGender(),
                user.getProfilePicture(),
                user.getSavedPosts());
        User savedUser = userRepository.save(newUser);
        return savedUser;
    }

    @Override
    public User findUserById(Integer id) throws UserException {
        Optional<User> user = userRepository.findById(id);

        if(user.isPresent())
            return user.get();
        throw  new UserException("user not exists with the id: "+id);
    }

    @Override
    public User findUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        return user;
    }

    @Override
    public User followUser(Integer requestingUserId, Integer id2) throws UserException
    {
        Optional<User> requestingUser = userRepository.findById(requestingUserId);
        Optional<User> user2 = userRepository.findById(id2);

        if(requestingUser.isEmpty() || user2.isEmpty())
                throw new UserException("No valid user found");

        user2.get().getFollowers().add(requestingUser.get().getId());
        requestingUser.get().getFollowings().add(user2.get().getId());

        userRepository.save(requestingUser.get());
        userRepository.save(user2.get());

        return requestingUser.get();
    }

    @Override
    public User updateUser(User updatedUser, Integer id) throws UserException
    {
        Optional<User> oldUser = userRepository.findById(id);
        if(!oldUser.isPresent())
        {
            throw new UserException("User not exists with the id: "+id);
        }
        User user = oldUser.get();
        if(updatedUser.getFirstName()!=null)
        {
            user.setFirstName(updatedUser.getFirstName());
        }
        if(updatedUser.getLastName()!=null)
        {
            user.setLastName(updatedUser.getLastName());
        }
        if(updatedUser.getEmail()!=null)
        {
            user.setEmail(updatedUser.getEmail());
        }
        if(updatedUser.getPassword()!=null)
        {
            user.setPassword(updatedUser.getPassword());
        }
        if(updatedUser.getGender()!=null)
        {
            user.setGender(updatedUser.getGender());
        }
        if(updatedUser.getProfilePicture()!=null)
        {
            user.setProfilePicture(updatedUser.getProfilePicture());
        }
        userRepository.save(user);
        return user;
    }

    @Override
    public List<User> searchUser(String query) {
        List<User> list = userRepository.searchUser(query);
        return list;
    }

    @Override
    public User findUserByJwt(String jwt)
    {
        String email = JwtProvider.getEmailFromJwtToken(jwt);
        User user= userRepository.findByEmail(email);
        return user;
    }
}
