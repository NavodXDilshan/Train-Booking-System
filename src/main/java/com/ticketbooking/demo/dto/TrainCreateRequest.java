package com.ticketbooking.demo.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TrainCreateRequest {
    private String name;
    private List<CoachRequest> coaches;

    @Getter
    @Setter
    public static class CoachRequest {
        private String type;
        private int seatCount;
    }
}