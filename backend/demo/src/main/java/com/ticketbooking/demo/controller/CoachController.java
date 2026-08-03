package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.CoachRepository;
import com.ticketbooking.demo.dto.CoachDto;
import com.ticketbooking.demo.model.Coach;
import com.ticketbooking.demo.service.CoachService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/coach")
public class CoachController {
    CoachRepository coachRepository;
    CoachService coachService;
    @Autowired
    public CoachController(CoachRepository coachRepository, CoachService coachService){
        this.coachRepository = coachRepository;
        this.coachService = coachService;
    }
    @GetMapping("/")
    public ResponseEntity<List<Coach>>getAllCoaches(){
        List<Coach> coachList = coachRepository.findAll();
        return ResponseEntity.ok(coachList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Coach>getCoachById(@PathVariable long id){
        Optional<Coach> coach = coachRepository.findById(id);
        if(coach.isPresent()){
            return ResponseEntity.ok(coach.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Coach>addCoach(@Valid @RequestBody CoachDto coachDto){
        return ResponseEntity.ok(coachService.addCoach(coachDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void>deleteCoachById(@PathVariable long id){
        return ResponseEntity.noContent().build();
    }




}
