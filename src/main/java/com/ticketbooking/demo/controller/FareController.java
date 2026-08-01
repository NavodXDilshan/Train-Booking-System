package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.FareRepository;
import com.ticketbooking.demo.dto.FareDto;
import com.ticketbooking.demo.model.Fare;
import com.ticketbooking.demo.service.FareService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/fare")
public class FareController {
    private final FareRepository fareRepository;
    private final FareService fareService;

    @Autowired
    public FareController(FareRepository fareRepository, FareService fareService){
        this.fareRepository = fareRepository;
        this.fareService = fareService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Fare>> getAllFares(){
        List<Fare> fareList = fareRepository.findAll();
        return ResponseEntity.ok(fareList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fare> getFareById(@PathVariable long id){
        Optional<Fare> fare = fareRepository.findById(id);
        if(fare.isPresent()){
            return ResponseEntity.ok(fare.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Fare> addFare(@Valid @RequestBody FareDto fareDto){
        return ResponseEntity.ok(fareService.addFare(fareDto));
    }
}
