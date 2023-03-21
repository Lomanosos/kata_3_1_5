package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;




@Component
public class TableInserter implements CommandLineRunner {

    private final UserAndRoleService userAndRoleService;

    @Autowired
    public TableInserter(UserAndRoleService userAndRoleService) {
        this.userAndRoleService = userAndRoleService;
    }

    @Override
    public void run(String... args) {
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
