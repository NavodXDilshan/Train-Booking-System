package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Booking;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class BookingFilterResponse {
    private List<Booking> filteredByIdAndDateAndOrders;
    private BigDecimal journeyFare;

    public BookingFilterResponse(List<Booking> filteredByIdAndDateAndOrders,BigDecimal journeyFare){
        this.filteredByIdAndDateAndOrders = filteredByIdAndDateAndOrders;
        this.journeyFare = journeyFare;
    }
}
