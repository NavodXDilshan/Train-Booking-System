package com.ticketbooking.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "seats",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"coach_id", "seat_number"}
        )
    }
)
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name="coach_id",nullable = false)
    private Coach coach;
    @Column(name = "seat_number",nullable = false)
    private int seatNumber;
    @Column(name="type")
    private String type;

}
