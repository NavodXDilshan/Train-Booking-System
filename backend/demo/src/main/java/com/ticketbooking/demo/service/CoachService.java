package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.CoachRepository;
import com.ticketbooking.demo.Repository.TrainRepository;
import com.ticketbooking.demo.dto.CoachDto;
import com.ticketbooking.demo.model.Coach;
import com.ticketbooking.demo.model.Train;
import org.apache.tomcat.util.modeler.Registry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class CoachService {
    private final CoachRepository coachRepository;
    private final TrainRepository trainRepository;
    private ObjectMapper objectMapper;

    @Autowired
    public CoachService(CoachRepository coachRepository, TrainRepository trainRepository,ObjectMapper objectMapper){
        this.coachRepository = coachRepository;
        this.trainRepository = trainRepository;
        this.objectMapper = objectMapper;
    }

    public Coach addCoach(CoachDto coachDto){
        Coach coach = objectMapper.convertValue(coachDto, Coach.class);
        Train train = trainRepository.findById(coachDto.getTrainId())
                .orElseThrow(()->new RuntimeException("Train not found"));

        coach.setTrain(train);

        return coachRepository.save(coach);

    }
}
