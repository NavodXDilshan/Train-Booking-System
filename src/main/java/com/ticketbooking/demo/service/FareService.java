package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.FareRepository;
import com.ticketbooking.demo.dto.FareDto;
import com.ticketbooking.demo.model.Fare;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;

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

    public BigDecimal calculateFare(String coachType, int destinationOrder, int originOrder) {
        Fare fare = fareRepository.findByCoachType(coachType);
        BigDecimal baseFare = fare.getBaseFare();
        BigDecimal farePerSegment = fare.getFarePerSegment();
        int segmentCount = Math.abs(destinationOrder - originOrder);

        return baseFare.add(
                farePerSegment.multiply(BigDecimal.valueOf(segmentCount))
        );
    }
}
