package com.ticketbooking.demo.dto;

import com.ticketbooking.demo.model.Booking;
import lombok.Data;

@Data
public class BookingResponse {
    private Booking booking;
    private String qrToken;

    public BookingResponse(Booking booking, String qrToken) {
        this.booking = booking;
        this.qrToken = qrToken;
    }
}
