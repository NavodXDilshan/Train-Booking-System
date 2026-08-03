package com.ticketbooking.demo.controller;

import com.ticketbooking.demo.Repository.BookingRepository;
import com.ticketbooking.demo.dto.BookingDto;
import com.ticketbooking.demo.dto.BookingFilterResponse;
import com.ticketbooking.demo.dto.BookingRequest;
import com.ticketbooking.demo.model.Booking;
import com.ticketbooking.demo.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/book")
public class BookingController {
    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    @Autowired
    public BookingController(BookingRepository bookingRepository, BookingService bookingService){
        this.bookingRepository = bookingRepository;
        this.bookingService = bookingService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Booking>> getAllBookings(){
        List<Booking> bookingList = bookingRepository.findAll();
        return ResponseEntity.ok(bookingList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable long id){
        Optional<Booking> booking = bookingRepository.findById(id);
        if(booking.isPresent()){
            return ResponseEntity.ok(booking.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/departure")
    public ResponseEntity<BookingFilterResponse> getBookingsByDepartureDateAndId(@RequestBody BookingRequest bookingRequest){
        BookingFilterResponse bookingList = bookingService.filterByJourneySegments(bookingRequest);

        return ResponseEntity.ok(bookingList);
    }

    @PostMapping("/add")
    public ResponseEntity<Booking> addBooking(@Valid @RequestBody BookingDto dto){
        return ResponseEntity.ok(bookingService.addBooking(dto));
    }

}
