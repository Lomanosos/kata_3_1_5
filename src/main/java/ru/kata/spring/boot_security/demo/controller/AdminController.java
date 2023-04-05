package ru.kata.spring.boot_security.demo.controller;

import org.apache.coyote.http11.filters.SavedRequestInputFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.RoleService;
import ru.kata.spring.boot_security.demo.service.UserService;

import java.security.Principal;


@Controller
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final RoleService roleService;
    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping()
    public String mainPage(Model model, Principal principal) {
        model.addAttribute("admin", userService.findByEmail(principal.getName()));
        model.addAttribute("users", userService.getListUsers());
        model.addAttribute("newUser", new User());
        model.addAttribute("allRolesNew", roleService.getAllRoles());
        return "admin";
    }

    @PostMapping("")
    public String save(@ModelAttribute("user") User user) {
        userService.saveUser(user);
        return "redirect:/admin";
    }
    @PatchMapping("/update/{id}")
    public String update(@PathVariable("id") Long id, @ModelAttribute("user") User theuser) {
        User user = userService.getById(id);
        user.setFirstName(theuser.getFirstName());
        user.setLastName(theuser.getLastName());
        user.setAge(theuser.getAge());
        user.setEmail(theuser.getEmail());
        user.setRoles(theuser.getRoles());
        user.setPassword(theuser.getPassword());
        userService.editUser(user);
        return "redirect:/admin";
    }
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return "redirect:/admin";
    }
}
