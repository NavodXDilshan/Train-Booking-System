package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.SeatRepository;
import com.ticketbooking.demo.dto.SeatDto;
import com.ticketbooking.demo.model.Seat;
import com.ticketbooking.demo.service.SeatService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/seat")
public class SeatController {
    private final SeatRepository seatRepository;
    private final SeatService seatService;

    @Autowired
    public SeatController(SeatRepository seatRepository, SeatService seatService){
        this.seatRepository = seatRepository;
        this.seatService = seatService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Seat>> getAllSeats(){
        List<Seat> seatList = seatRepository.findAll();
        return ResponseEntity.ok(seatList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Seat> getSeatById(@PathVariable long id){
        Optional<Seat>seat = seatRepository.findById(id);
        if(seat.isPresent()){
            return ResponseEntity.ok(seat.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Seat> addSeat(@Valid @RequestBody SeatDto seatDto){
        return ResponseEntity.ok(seatService.addSeat(seatDto));
    }
}
