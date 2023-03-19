package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

@Component
public class TableInserter implements CommandLineRunner {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    @Autowired
    public TableInserter(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
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
        user1.addRole(new Role("ROLE_USER"));
        user2.addRole(new Role("ROLE_ADMIN"));
        user3.addRole(new Role("ROLE_USER"));
        user3.addRole(new Role("ROLE_ADMIN"));
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
    }
}
