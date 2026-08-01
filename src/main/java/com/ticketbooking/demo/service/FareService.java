package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.FareRepository;
import com.ticketbooking.demo.dto.FareDto;
import com.ticketbooking.demo.model.Fare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class FareService {
    private final FareRepository fareRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public FareService(FareRepository fareRepository, ObjectMapper objectMapper){
        this.fareRepository = fareRepository;
        this.objectMapper = objectMapper;
    }

    public Fare addFare(FareDto dto){
        Fare fare = objectMapper.convertValue(dto, Fare.class);
        return fareRepository.save(fare);
    }
}
