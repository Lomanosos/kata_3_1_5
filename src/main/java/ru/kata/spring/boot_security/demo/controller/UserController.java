package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserAndRoleService;

import java.security.Principal;

@Controller
public class UserController {

    private final UserAndRoleService userAndRoleService;
    @Autowired
    public UserController(UserAndRoleService userAndRoleService) {
        this.userAndRoleService = userAndRoleService;
    }

    @GetMapping("/user")
    public String findAll(Model model, Principal principal){
        User user = userAndRoleService.findByUsername(principal.getName());
        model.addAttribute("user", user);
        model.addAttribute("roles", user.getRoles());
        return "/USER/user";
    }

}
