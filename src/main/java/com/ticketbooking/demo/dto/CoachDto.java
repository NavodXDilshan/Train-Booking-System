package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Seat;
import com.ticketbooking.demo.model.Train;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class CoachDto {
    private long id;
    @NotNull(message = "Train ID is required")
    private Long trainId;
    @NotNull(message = "Coach number is required")
    @Min(value=1, message="Coach number must be greater than 0")
    private Long coachNumber;
    @NotBlank(message = "Coach type is required")
    private String type;
    @NotNull(message = "Seat count is required")
    @Min(value = 1, message = "Seat count must be greater than 0" )
    private Integer seatCount;

}
