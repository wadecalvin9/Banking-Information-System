package com.nexabank.app.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class homeController {



    @GetMapping("/")
    public String index(){
        return "Server is Running ....";
    }



}
