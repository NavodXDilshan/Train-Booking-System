package com.ticketbooking.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="fares")
public class Fare {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false, name="base_fare",precision = 10, scale = 2)
    private BigDecimal baseFare;
    @Column(nullable = false, name="fare_per_segment",precision = 10, scale = 2)
    private BigDecimal farePerSegment;
    @Column(nullable = false, name="effective_from")
    private LocalDateTime effectiveFrom;
    @Column(nullable = false,name="coach_type")
    private String coachType;
}
