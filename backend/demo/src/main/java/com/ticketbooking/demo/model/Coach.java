package com.ticketbooking.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(
    name = "coaches",
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"train_id", "coach_number"}
        )
    }
)
public class Coach {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "train_id", nullable = false)
    @JsonIgnore
    private Train train;
    @Column(nullable = false, name="coach_number")
    private long coachNumber;
    @Column(nullable = false, name = "type")
    private String type;
    @Column(nullable = false, name="seat_count")
    private int seatCount;
    @OneToMany(mappedBy = "coach", cascade = CascadeType.ALL)
    private List<Seat> seats;
}
