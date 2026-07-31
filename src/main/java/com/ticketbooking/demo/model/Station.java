package com.ticketbooking.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="stations")
public class Station {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="name",nullable = false,length=100)
    private String name;
    @Column(name="code",nullable = false,unique = true,length=10)
    private String code;
    @Column(name="route_order",nullable = false)
    private int routeOrder;
}
