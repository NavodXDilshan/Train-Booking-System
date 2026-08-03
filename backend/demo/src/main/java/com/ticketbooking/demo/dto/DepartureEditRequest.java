package com.ticketbooking.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class DepartureEditRequest {
    @NotNull(message = "Departure ID is required")
    private Long id;
    @NotNull(message = "Departure status is required")
    private String status;
}
