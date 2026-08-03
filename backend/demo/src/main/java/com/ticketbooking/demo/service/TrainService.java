package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.TrainRepository;
import com.ticketbooking.demo.dto.TrainCreateRequest;
import com.ticketbooking.demo.dto.TrainDto;
import com.ticketbooking.demo.model.Coach;
import com.ticketbooking.demo.model.Seat;
import com.ticketbooking.demo.model.Train;
import jakarta.persistence.OneToOne;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;

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
    @Transactional
    public Train createTrain(TrainCreateRequest request) {
        Train train = new Train();
        train.setName(request.getName());

        List<Coach> coaches = new ArrayList<>();
        long coachNumber = 1;

        for (TrainCreateRequest.CoachRequest coachReq : request.getCoaches()) {
            Coach coach = new Coach();
            coach.setTrain(train);
            coach.setCoachNumber(coachNumber++);
            coach.setType(coachReq.getType());
            coach.setSeatCount(coachReq.getSeatCount());


            List<Seat> seats = new ArrayList<>();
            for (int seatNum = 1; seatNum <= coachReq.getSeatCount(); seatNum++) {
                Seat seat = new Seat();
                seat.setCoach(coach);
                seat.setSeatNumber(seatNum);
                seat.setType(coachReq.getType());
                seats.add(seat);
            }
            coach.setSeats(seats);
            coaches.add(coach);
        }
        train.setCoaches(coaches);

        return trainRepository.save(train);
    }

}
