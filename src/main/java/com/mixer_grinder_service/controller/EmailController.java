package com.mixer_grinder_service.controller;

import com.mixer_grinder_service.model.EmailRequest;
import com.mixer_grinder_service.model.User;
import com.mixer_grinder_service.repo.UserRepository;
import com.mixer_grinder_service.service.EmailService;
import com.mixer_grinder_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
public class EmailController {

    @Autowired
    private EmailService emailService;
    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;
    //api to send email
    @PostMapping("/sendEmail")
    public ResponseEntity<?> sendEmail(@RequestBody EmailRequest request){
        this.emailService.sendEmail(request.getSubject(),request.getMessage(),request.getTo());
        System.out.println(request);
        return ResponseEntity.ok(request);
    }
    @GetMapping("/getUserByEmail/{username}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String username){
        System.out.println(username);
        return  ResponseEntity.ok(this.userRepository.findByUsername(username));
    }
}
