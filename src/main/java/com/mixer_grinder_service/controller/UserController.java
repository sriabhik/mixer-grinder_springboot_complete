//step 5

package com.mixer_grinder_service.controller;

import com.razorpay.*;
import com.mixer_grinder_service.model.Role;
import com.mixer_grinder_service.model.User;
import com.mixer_grinder_service.model.UserRole;
import com.mixer_grinder_service.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Map;
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

    //payment getway
    @PostMapping("/create_order")
    @ResponseBody
    public String createOrder(@RequestBody Map<String,Object> data) throws Exception {
        System.out.println(data);
        int amt =Integer.parseInt(data.get("amount").toString());
        System.out.println(amt);
        var client =new RazorpayClient("rzp_test_GZrvBqvL6b69GM","rMAnv0T10eg94VmmcynSExnZ");
        JSONObject ob = new JSONObject();
        ob.put("amount",amt*100);
        ob.put("currency","INR");
        ob.put("receipt","txn_235425");
        Order order = client.Orders.create(ob);
        System.out.println(order);
        return order.toString();
    }

}
