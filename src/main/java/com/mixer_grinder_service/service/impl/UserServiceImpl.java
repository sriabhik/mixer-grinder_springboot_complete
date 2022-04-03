
package com.mixer_grinder_service.service.impl;

import com.mixer_grinder_service.exception.UserNotFoundException;
import com.mixer_grinder_service.model.ServiceCenter;
import com.mixer_grinder_service.model.User;
import com.mixer_grinder_service.model.UserRole;
import com.mixer_grinder_service.repo.RoleRepository;
import com.mixer_grinder_service.repo.UserRepository;
import com.mixer_grinder_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User addUser(User user, Set<UserRole> userRoles) throws Exception {
        //we are creating a method findyUserName to check is the user already present in db
        User local = this.userRepository.findByUsername(user.getUsername());
        if (local != null) {
            throw new UserNotFoundException("User " + local.getId() + " is already Exists");
        } else {
            //here we are taking role we recieved and saving in db if it not present
            for (UserRole ur : userRoles) {
                roleRepository.save(ur.getRole());
            }
            //adding all role that is associated with user
            user.getUserRoles().addAll(userRoles);
            local = this.userRepository.save(user);
        }

        return local;
    }


    @Override
    public Set<User> getUsers() {
        return new HashSet<>(this.userRepository.findAll());
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.save(user);
    }

    @Override
    public User getUserByUserName(String username) {
        System.out.println(this.userRepository.findByUsername(username));
        return this.userRepository.findByUsername(username);
    }
}
