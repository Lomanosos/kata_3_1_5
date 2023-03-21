package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Component
public class TableInserter implements CommandLineRunner {

    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private UserAndRoleService userAndRoleService;


    @Autowired
    public TableInserter(UserRepository userRepository,
                         RoleRepository roleRepository,
                         UserAndRoleService userAndRoleService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.userAndRoleService = userAndRoleService;
    }

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User("krot",
                "krot123", 77);
        User user2 = new User("tom",
                "qwerty66", 15);
        User user3 = new User("logitec",
                "thebestcompany", 82);
        Role user = new Role("ROLE_USER");
        Role admin = new Role("ROLE_ADMIN");

        userAndRoleService.saveRole(user);
        userAndRoleService.saveRole(admin);

        user1.addRole(user);
        user2.addRole(admin);
        user3.addRole(user);
        user3.addRole(admin);

        userAndRoleService.saveUser(user1);
        userAndRoleService.saveUser(user2);
        userAndRoleService.saveUser(user3);

    }
}
