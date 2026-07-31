package com.ticketbooking.demo.model;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class Booking {
    private long id;
    private long seatId;
    private long coachId;
    private String passengerName;
    private String passengerContact;
    private String passengerNIC;
    private int originOrder;
    private int destinationOrder;
    private float fareAmount;
    private Date creetedAt;


}
