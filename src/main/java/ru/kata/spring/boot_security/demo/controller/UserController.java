package ru.kata.spring.boot_security.demo.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.service.UserAndRoleService;

import java.security.Principal;

@Controller
public class UserController {

    private final UserAndRoleService userAndRoleService;
    @Autowired
    public UserController(UserAndRoleService userAndRoleService) {
        this.userAndRoleService = userAndRoleService;
    }

    @GetMapping("/")
    public String home(){
        return "/main";
    }
    @GetMapping("/user")
    public String findAll(Model model, Principal principal){
        model.addAttribute("user", userAndRoleService.findByUsername(principal.getName()));
        return "user";
    }

}
