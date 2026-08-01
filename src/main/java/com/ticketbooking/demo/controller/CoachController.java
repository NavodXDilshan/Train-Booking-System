package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.CoachRepository;
import com.ticketbooking.demo.model.Coach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coach")
public class CoachController {
    CoachRepository coachRepository;
    @Autowired
    public CoachController(CoachRepository coachRepository){
        this.coachRepository = coachRepository;
    }
    @GetMapping("/")
    public ResponseEntity<Iterable<Coach>>getAllCoaches(){
        Iterable<Coach> coachList = coachRepository.findAll();
        return ResponseEntity.ok(coachList);
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<>getCoachById(@PathVariable long id){
//
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<>addCoach(@RequestBody Coach coach){
//
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void>deleteCoachById(@PathVariable long id){
        return ResponseEntity.noContent().build();
    }




}
