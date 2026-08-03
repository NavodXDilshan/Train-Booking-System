package com.ticketbooking.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class BookingRequest {
    private long departureId;
    private LocalDateTime travelDate;
    private int originOrder;
    private int destinationOrder;
    private String direction;
    private String coachType;

    public BookingRequest(long departureId,LocalDateTime travelDate,int originOrder,
                          int destinationOrder, String direction, String coachType){
        this.departureId = departureId;
        this.travelDate = travelDate;
        this.originOrder = originOrder;
        this.destinationOrder = destinationOrder;
        this.direction = direction;
        this.coachType = coachType;
    }

}
