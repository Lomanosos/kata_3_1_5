package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.repositories.UserRepository;

import java.util.HashSet;
import java.util.Set;

@Component
public class TableInserter implements CommandLineRunner {

    private PasswordEncoder passwordEncoder;
    private UserRepository userRepository;
    private RoleRepository roleRepository;


    @Autowired
    public TableInserter(PasswordEncoder passwordEncoder, UserRepository userRepository, RoleRepository roleRepository) {
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        User user1 = new User("krot",
                passwordEncoder.encode("krot123"), 77);
        User user2 = new User("tom",
                passwordEncoder.encode("qwerty66"), 15);
        User user3 = new User("logitec",
                passwordEncoder.encode("thebestcompany"), 82);
        Role user = new Role("ROLE_USER");
        Role admin = new Role("ROLE_ADMIN");
        roleRepository.save(user);
        roleRepository.save(admin);

        user1.addRole(roleRepository.findRoleByRole(String.valueOf(user)));
        user2.addRole(roleRepository.findRoleByRole(String.valueOf(admin)));
        user3.addRole(roleRepository.findRoleByRole(String.valueOf(admin)));
        user3.addRole(roleRepository.findRoleByRole(String.valueOf(user)));
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
    }
}
