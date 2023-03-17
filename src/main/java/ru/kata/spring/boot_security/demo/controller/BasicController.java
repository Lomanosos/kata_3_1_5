package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import ru.kata.spring.boot_security.demo.service.UserAndRoleService;

@Controller
public class BasicController {
    private final UserAndRoleService userAndRoleService;

    @Autowired
    public BasicController(UserAndRoleService userAndRoleService) {
        this.userAndRoleService = userAndRoleService;
    }

    @GetMapping("/")
    public String home(){
        return "/main";
    }

}
