package com.ticketbooking.demo.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Station {

    private long id;
    private String name;
    private String code;
    private int routeOrder;
}
