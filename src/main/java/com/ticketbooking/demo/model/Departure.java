package com.ticketbooking.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@Entity
@Table(name="departures")
public class Departure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "train_id", nullable = false)
    @JsonIgnore
    private Train train;
    @Column(name = "departure_time",nullable = false)
    private LocalDateTime departureTime;
    @Column(name="origin_order",nullable = false)
    private int originOrder;
    @Column(name="destination_order",nullable = false)
    private int destinationOrder;
    @Column(name="status",nullable = false)
    private String status;

}
