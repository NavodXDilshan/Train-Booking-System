package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.CoachRepository;
import com.ticketbooking.demo.Repository.SeatRepository;
import com.ticketbooking.demo.dto.SeatDto;
import com.ticketbooking.demo.model.Coach;
import com.ticketbooking.demo.model.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class SeatService {
    private final SeatRepository seatRepository;
    private final ObjectMapper objectMapper;
    private final CoachRepository coachRepository;

    @Autowired
    public SeatService(SeatRepository seatRepository, ObjectMapper objectMapper,CoachRepository coachRepository){
        this.seatRepository = seatRepository;
        this.objectMapper = objectMapper;
        this.coachRepository = coachRepository;
    }

    public Seat addSeat(SeatDto dto){
        Seat seat = objectMapper.convertValue(dto,Seat.class);
        Coach coach = coachRepository.findById(dto.getCoachId())
                .orElseThrow(()->new RuntimeException("Coach not found"));

        seat.setCoach(coach);
        return seatRepository.save(seat);
    }


}
