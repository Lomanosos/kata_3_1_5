package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;


public class TableInserter {
    private UserRepository userRepository;


    public TableInserter(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    {
        User user1 = new User("krot", "krot123");
        User user2 = new User("tom", "qwerty66");
        User user3 = new User("logitec", "thebestcompany");
        user1.addRole(new Role("USER"));
        user2.addRole(new Role("ADMIN"));
        user3.addRole(new Role("USER"));
        user3.addRole(new Role("USER"));
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
    }
}
