package com.ticketbooking.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(
    name="bookings",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {
                "seat_id",
                "coach_id",
                "booking_at",
                "origin_order",
                "destination_order",
                "travel_date"
            }
        )
    }
)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, name="seat_id")
    private long seatId;
    @Column(nullable = false, name="coach_id")
    private long coachId;
    @Column(nullable = false, name="train_id")
    private long trainId;
    @Column(nullable = false, name="passenger_name")
    private String passengerName;
    @Column(nullable = false, name="passenger_contact")
    private String passengerContact;
    @Column(nullable = false, name="passenger_nic")
    private String passengerNIC;
    @Column(nullable = false, name="origin_order")
    private int originOrder;
    @Column(nullable = false, name="destination_order")
    private int destinationOrder;
    @Column(nullable = false, name="fare_amount")
    private BigDecimal fareAmount;
    @CreationTimestamp
    @Column(nullable = false, name="created_at")
    private LocalDateTime createdAt;
    @Column(nullable = false, name="travel_date")
    private  LocalDateTime travelDate;
    @Column(nullable = false, name="status")
    private boolean status;
    @Column(nullable = false, name="code")
    private String code;

}
