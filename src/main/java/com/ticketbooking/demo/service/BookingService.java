package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.BookingRepository;
import com.ticketbooking.demo.dto.BookingDto;
import com.ticketbooking.demo.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final ObjectMapper objectMapper;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ObjectMapper objectMapper){
        this.bookingRepository = bookingRepository;
        this.objectMapper = objectMapper;
    }

    public Booking addBooking(BookingDto dto){
        Booking booking = objectMapper.convertValue(dto,Booking.class);
        return bookingRepository.save(booking);
    }
}
