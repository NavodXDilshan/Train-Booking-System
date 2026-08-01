package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Coach;
import com.ticketbooking.demo.model.Departure;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class TrainDto {

    private Long id;
    @NotBlank(message = "Train name is required")
    private String name;
}
