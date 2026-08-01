package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Coach;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SeatDto {
    private Long id;
    @NotNull(message = "CoachID is required")
    private Long coachId;
    @NotNull(message = "SeatID is required")
    @Min(value = 1, message = "SeatId must be greater than 0")
    private int seatNumber;
    @NotBlank(message = "Seat type is required")
    private String type;
}
