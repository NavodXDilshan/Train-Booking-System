package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.StationRepository;
import com.ticketbooking.demo.dto.StationDto;
import com.ticketbooking.demo.model.Station;
import com.ticketbooking.demo.service.StationService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/station")
public class StationController {

    private final StationRepository stationRepository;
    private final StationService stationService;

    @Autowired
    public StationController(StationService stationService, StationRepository stationRepository){
        this.stationRepository = stationRepository;
        this.stationService = stationService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Station>>findAllStations(){
        List<Station> stationList = stationRepository.findAll();
        return ResponseEntity.ok(stationList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Station> getStationById(@PathVariable long id){
        Optional<Station> station = stationRepository.findById(id);
        return ResponseEntity.ok(station.get());
    }
    @PostMapping("/add")
    public ResponseEntity<Station>addNewStation(@Valid @RequestBody StationDto stationDto){
        return ResponseEntity.ok(stationService.addStation(stationDto));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void>deleteStationById(@PathVariable long id){
        return ResponseEntity.noContent().build();
    }




}
