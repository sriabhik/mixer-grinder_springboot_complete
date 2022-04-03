//step 3
package com.mixer_grinder_service.service;

import com.mixer_grinder_service.model.User;
import com.mixer_grinder_service.model.UserRole;

import java.util.Set;

public interface UserService {
    //creating user
    //taking userRole in set mean ,it might possile if a single user is both admin,customer,pass to it
    User addUser(User user, Set<UserRole> userRoles) throws Exception;
    Set<User> getUsers();
    User updateUser(User user);
    User getUserByUserName(String username);
}
