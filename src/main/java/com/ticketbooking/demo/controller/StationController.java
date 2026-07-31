package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.model.Station;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stations")
public class StationController {
//    @GetMapping("/")
//    public ResponseEntity<>findAllStations(){
//
//    }
//
//    @PostMapping("/add")
//    public ResponseEntity<>addNewStation(@RequestBody Station station){
//
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void>deleteStationById(@PathVariable long id){
        return ResponseEntity.noContent().build();
    }




}
