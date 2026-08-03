package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.StationRepository;
import com.ticketbooking.demo.dto.StationDto;
import com.ticketbooking.demo.model.Station;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class StationService {
    private final StationRepository stationRepository;
    private final ObjectMapper objectMapper;

    public StationService(StationRepository stationRepository, ObjectMapper objectMapper){
        this.objectMapper = objectMapper;
        this.stationRepository = stationRepository;
    }

    public Station addStation(StationDto dto){
        Station station = objectMapper.convertValue(dto,Station.class);
        return stationRepository.save(station);
    }
}
