package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.TrainRepository;
import com.ticketbooking.demo.dto.TrainDto;
import com.ticketbooking.demo.model.Train;
import com.ticketbooking.demo.service.TrainService;
import jakarta.persistence.GeneratedValue;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/train")
public class TrainController {
    private final TrainRepository trainRepository;
    private final TrainService trainService;

    @Autowired
    public TrainController(TrainRepository trainRepository,TrainService trainService){
        this.trainRepository = trainRepository;
        this.trainService = trainService;
    }
    @GetMapping("/")
    public ResponseEntity<List<Train>> findAllTrains(){
        List<Train> trainList = trainRepository.findAll();
        return ResponseEntity.ok(trainList);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Train> findTrainById(@PathVariable long id){
        Optional<Train> train = trainRepository.findById(id);
        if(train.isPresent()){
            return ResponseEntity.ok(train.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/add")
    public ResponseEntity<Train>addTrain(@Valid @RequestBody TrainDto trainDto){
        return ResponseEntity.ok(trainService.addTrain(trainDto));
    }


}
