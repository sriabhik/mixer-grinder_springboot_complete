//step 5

package com.mixer_grinder_service.controller;


import com.mixer_grinder_service.model.Role;
import com.mixer_grinder_service.model.User;
import com.mixer_grinder_service.model.UserRole;
import com.mixer_grinder_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping(value={"/user","/admin"})
@CrossOrigin("*")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @GetMapping("/test")
    public String test(){
        return "running";
    }
    @PostMapping("/signup")
    public User createUser(@RequestBody User user) throws Exception {

        // encoding password
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Set<UserRole> roles = new HashSet<>();
        Role role = new Role();
        role.setRoleName(user.getUserRole());
        UserRole userRole = new UserRole();
        userRole.setUser(user);
        userRole.setRole(role);
        //set function add
        roles.add(userRole);
        return this.userService.addUser(user,roles);
    }

    @GetMapping("/getUsers")
    public ResponseEntity<?> getUsers(){
        return ResponseEntity.ok(this.userService.getUsers());
    }

    @PutMapping("/updateUser")
    public User updateUser(@RequestBody  User user){
        System.out.println(user.getPassword());
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return this.userService.updateUser(user);
    }


}
