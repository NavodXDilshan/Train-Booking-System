package com.ticketbooking.demo.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StationDto {
    private Long id;
    @NotBlank(message = "Station name is required")
    private String name;
    @NotBlank(message = "Station code is required")
    private String code;
    @NotNull(message = "Route order is required")
    @Min(value=0, message = "router order must be a positive value")
    private Integer routeOrder;
}
