package com.ticketbooking.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Coach {
    private long id;
    private long coachNumber;
    private String type;
    private int seatCount;

}
