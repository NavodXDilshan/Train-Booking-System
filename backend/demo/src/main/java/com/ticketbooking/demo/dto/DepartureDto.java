package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Train;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class DepartureDto {
    private Long id;
    @NotNull(message = "Train id is required")
    private Long trainId;
    @NotNull(message = "Departure time is required")
    private LocalDateTime departureTime;
    @NotNull(message = "Origin point is required")
    @Min(value=0,message = "Origin point has to be positive")
    private Integer originOrder;
    @NotNull(message = "Destination point is required")
    @Min(value=0,message = "Destination point has to be positive")
    private Integer destinationOrder;
    @NotNull(message = "Direction is required")
    private String direction;
    @NotBlank(message = "Status is required")
    private String status;
}
