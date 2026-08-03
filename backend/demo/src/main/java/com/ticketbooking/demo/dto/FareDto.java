package com.ticketbooking.demo.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class FareDto {
    private Long id;
    @NotNull(message = "Base fare is required")
    @DecimalMin(value = "0.0", inclusive = true, message = "Base fare must be positive")
    private BigDecimal baseFare;
    @NotNull(message = "Fare per segment is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "Base fare must be positive")
    private BigDecimal farePerSegment;
    @NotNull(message = "Effective from date is required")
    private LocalDateTime effectiveFrom;
    @NotBlank(message = "Coach type is required")
    private String coachType;
}
