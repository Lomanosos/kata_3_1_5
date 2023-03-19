package ru.kata.spring.boot_security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserAndRoleService;

import java.security.Principal;
import java.util.List;


@Controller
public class AdminController {
    private final UserAndRoleService userAndRoleService;
    @Autowired
    public AdminController(UserAndRoleService userAndRoleService) {
        this.userAndRoleService = userAndRoleService;
    }
    @GetMapping("/admin")
    public String findAll(Model model){
        model.addAttribute("users", userAndRoleService.getListUsers());
        return "admin";
    }
    @GetMapping("/createNewUser")
    public String createUserForm(Principal principal, Model model) {
        model.addAttribute("user", new User());
        model.addAttribute("allRoles", userAndRoleService.getAllRoles());
        return "createUser";
    }
    @PostMapping("/") //сохранение
    public String save(@ModelAttribute("user") User user){
        userAndRoleService.saveUser(user);

        return "redirect:/admin";
    }
    @GetMapping("/editUser/{id}")//редактирование
    public String updateUser(@PathVariable("id") long id, Model model) {
        model.addAttribute("user", userAndRoleService.getById(id));
        model.addAttribute("allRoles", userAndRoleService.getAllRoles());
        return "updateUser";
    }
    @PostMapping("/updateUser")
    public String update(@ModelAttribute("update") User user) {
        userAndRoleService.edit(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/deleteUser/{id}") //удаление
    public String deleteById(@PathVariable("id") Long id) {
        userAndRoleService.delete(id);
        return "redirect:/admin";
    }
}
