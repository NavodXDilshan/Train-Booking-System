package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.DepartureRepository;
import com.ticketbooking.demo.Repository.TrainRepository;
import com.ticketbooking.demo.dto.DepartureDto;
import com.ticketbooking.demo.model.Departure;
import com.ticketbooking.demo.model.Train;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class DepartureService {
    private final ObjectMapper objectMapper;
    private final DepartureRepository departureRepository;
    private final TrainRepository trainRepository;

    @Autowired
    public DepartureService(
            ObjectMapper objectMapper,
            DepartureRepository departureRepository,
            TrainRepository trainRepository)
    {
        this.departureRepository = departureRepository;
        this.objectMapper = objectMapper;
        this.trainRepository = trainRepository;
    }

    public Departure addDeparture(DepartureDto dto){
        Departure departure = objectMapper.convertValue(dto, Departure.class);
        Train train = trainRepository.findById(dto.getTrainId())
                .orElseThrow(()->new RuntimeException("Train not found"));

        departure.setTrain(train);

        return departureRepository.save(departure);

    }
}
