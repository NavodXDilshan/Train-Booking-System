package com.ticketbooking.demo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Fare {

    private long id;
    private float baseFare;
    private float farePerSegment;
    private Date effectiveFrom;
    private String coachType;
}
