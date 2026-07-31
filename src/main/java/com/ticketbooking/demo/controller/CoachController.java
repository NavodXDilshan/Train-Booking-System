package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.model.Coach;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/coach")
public class CoachController {

    @GetMapping("/")
    public ResponseEntity<>getAllCoaches(){

    }

    @GetMapping("/{id}")
    public ResponseEntity<>getCoachById(@PathVariable long id){

    }

    @PostMapping("/add")
    public ResponseEntity<>addCoach(@RequestBody Coach coach){

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void>deleteCoachById(@PathVariable long id){
        return ResponseEntity.noContent().build();
    }




}
