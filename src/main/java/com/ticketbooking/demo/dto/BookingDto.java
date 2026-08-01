package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Booking;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingDto {
    private Long id;
    @NotNull(message = "SeatID is required")
    @Min(value=0, message = "SeatId must be positive")
    private Long seatId;
    @NotNull(message = "CoachId is required")
    @Min(value = 0,message = "CoachId must be positive")
    private Long coachId;
    @NotNull(message = "TrainId is required")
    @Min(value = 0,message = "TrainId must be positive")
    private Long trainId;
    @NotBlank(message = "Passenger name is required")
    private String passengerName;
    @NotBlank(message = "Passenger contact number is required")
    @Pattern(regexp = "^[0-9]{10}$", message = "Invalid contact number")
    private String passengerContact;
    @NotBlank(message = "Passenger NIC is required")
    private String passengerNIC;
    @NotNull(message = "Origin order is required")
    @Min(value = 0, message = "Origin point must be positive")
    private Integer originOrder;
    @NotNull(message = "Destination order is required")
    @Min(value = 0, message = "Destination point must be positive")
    private Integer destinationOrder;
    @NotNull(message = "Departure date is required")
    private  LocalDateTime travelDate;
    @NotBlank(message = "Code is required")
    private String code;
}
