package com.ticketbooking.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Departure {
    private long id;
    private long coachId;
    private Date departureTime;
    private int originOrder;
    private int destinationOrder;

}
