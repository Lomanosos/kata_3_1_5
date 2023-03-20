package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

@Component
public class TableInserter implements CommandLineRunner {

    private PasswordEncoder passwordEncoder;
    private UserAndRoleService userAndRoleService;
    @Autowired
    public TableInserter(UserAndRoleService userAndRoleService, PasswordEncoder passwordEncoder) {
        this.userAndRoleService = userAndRoleService;
        this.passwordEncoder = passwordEncoder;

    }

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User("krot",
                passwordEncoder.encode("krot123"), 77);
        User user2 = new User("tom",
                passwordEncoder.encode("qwerty66"), 15);
        User user3 = new User("logitec",
                passwordEncoder.encode("thebestcompany"), 82);
        Role user = new Role("USER");
        Role admin = new Role("ADMIN");
        userAndRoleService.saveRole(user);
        userAndRoleService.saveRole(admin);
        user1.addRole(user);
        user2.addRole(admin);
        user3.addRole(admin);
        user3.addRole(user);
        userAndRoleService.saveUser(user1);
        userAndRoleService.saveUser(user2);;
        userAndRoleService.saveUser(user3);
    }
}
