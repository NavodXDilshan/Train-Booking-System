package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.TrainRepository;
import com.ticketbooking.demo.dto.TrainDto;
import com.ticketbooking.demo.model.Train;
import jakarta.persistence.OneToOne;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class TrainService {
    private ObjectMapper objectMapper;
    private final TrainRepository trainRepository;
    @Autowired
    public TrainService(ObjectMapper objectMapper, TrainRepository trainRepository){
        this.objectMapper = objectMapper;
        this.trainRepository = trainRepository;
    }

    public Train addTrain(TrainDto dto){
        Train train = objectMapper.convertValue(dto,Train.class);
        return trainRepository.save(train);

    }

}
