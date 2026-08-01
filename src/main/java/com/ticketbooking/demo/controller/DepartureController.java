package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.DepartureRepository;
import com.ticketbooking.demo.dto.DepartureDto;
import com.ticketbooking.demo.model.Departure;
import com.ticketbooking.demo.service.DepartureService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/departure")
public class DepartureController {
    private final DepartureRepository departureRepository;
    private final DepartureService departureService;

    @Autowired
    public DepartureController(DepartureService departureService, DepartureRepository departureRepository){
        this.departureRepository = departureRepository;
        this.departureService = departureService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Departure>> getAllDepartures(){
        List<Departure> departureList = departureRepository.findAll();
        return ResponseEntity.ok(departureList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Departure> getDepartureById(@PathVariable long id){
        Optional<Departure> departure = departureRepository.findById(id);
        if(departure.isPresent()){
            return ResponseEntity.ok(departure.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Departure> addDeparture(@Valid @RequestBody DepartureDto dto){
        return ResponseEntity.ok(departureService.addDeparture(dto));
    }
}
