package com.ticketbooking.demo.service;

import com.ticketbooking.demo.Repository.BookingRepository;
import com.ticketbooking.demo.dto.BookingDto;
import com.ticketbooking.demo.dto.BookingFilterResponse;
import com.ticketbooking.demo.dto.BookingRequest;
import com.ticketbooking.demo.dto.BookingResponse;
import com.ticketbooking.demo.model.Booking;
//import io.hypersistence.utils.hibernate.type.range.Range;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import tools.jackson.databind.DatabindException;
import tools.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.security.Key;
import java.time.ZoneId;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final ObjectMapper objectMapper;
    private final FareService fareService;


    @Value("${spring.qr.secret-key}")
    private String secretKey;

    @Autowired
    public BookingService(BookingRepository bookingRepository, ObjectMapper objectMapper, FareService fareService){
        this.bookingRepository = bookingRepository;
        this.objectMapper = objectMapper;
        this.fareService = fareService;
    }

    public Booking addBooking(BookingDto dto){

        try{
            Booking booking = new Booking();

            if(dto.getDirection().equals("REVERSE")){
                booking.setDestinationOrder(dto.getOriginOrder());
                booking.setOriginOrder((dto.getDestinationOrder()));
            }else{
                booking.setOriginOrder(dto.getOriginOrder());
                booking.setDestinationOrder(dto.getDestinationOrder());
            }
            booking.setSeatId(dto.getSeatId());
            booking.setSeatNumber(dto.getSeatNumber());
            booking.setCoachId(dto.getCoachId());
            booking.setTrainId(dto.getTrainId());
            booking.setPassengerName(dto.getPassengerName());
            booking.setPassengerContact(dto.getPassengerContact());
            booking.setPassengerNIC(dto.getPassengerNIC());
            booking.setFareAmount(BigDecimal.valueOf(1000.00));
            booking.setTravelDate(dto.getTravelDate());
            booking.setDepartureId(dto.getDepartureId());
            booking.setVerified(false);
            booking.setDirection(dto.getDirection());

            Booking savedBooking = bookingRepository.save(booking);
            String token = generateBookingToken(savedBooking);

            return new BookingResponse(
                    savedBooking,
                    token
            ).getBooking();

        }catch(DataIntegrityViolationException e){
            throw new RuntimeException(
                    "Seat already booked for this journey"
            );
        }
    }

    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private String generateBookingToken(Booking booking) {

        Map<String, Object> claims = new HashMap<>();

        claims.put("bookingId", booking.getId());
        claims.put("trainId", booking.getTrainId());
        claims.put("coachId", booking.getCoachId());
        claims.put("seat", booking.getSeatNumber());
        claims.put("NIC", booking.getPassengerNIC());
        claims.put("name",booking.getPassengerName());

        return Jwts.builder()
                .claims(claims)
                .subject(booking.getPassengerContact())
                .issuedAt(new Date())
                .expiration(Date.from(
                    booking.getTravelDate()
                        .plusHours(1)
                        .atZone(ZoneId.systemDefault())
                        .toInstant()
                ))
                .signWith(getSigningKey())
                .compact();
    }

    public BookingFilterResponse filterByJourneySegments(BookingRequest bookingRequest){
        int start = Math.min(bookingRequest.getOriginOrder(), bookingRequest.getDestinationOrder());
        int end = Math.max(bookingRequest.getOriginOrder(), bookingRequest.getDestinationOrder());
        BigDecimal journeyFare = fareService.calculateFare(bookingRequest.getCoachType(),
                bookingRequest.getDestinationOrder(),bookingRequest.getOriginOrder());
      try{
          List<Booking> filteredByIdAndDateAndOrders = bookingRepository.findOverlappingBookings(
                  bookingRequest.getDepartureId(),
                  bookingRequest.getTravelDate(),
                  start,
                  end
          );

          return new BookingFilterResponse(filteredByIdAndDateAndOrders, journeyFare);

      }catch(DataIntegrityViolationException e){
          throw new RuntimeException("Error with filtering bookings");
      }
    }

//    private List<Range<Integer>> createJourneyRanges(
//            int origin,
//            int destination,
//            int stationCount
//    ) {
//
//        if(origin <= destination){
//            return List.of(
//                    Range.closed(origin, destination)
//            );
//        }
//
//        return List.of(
//                Range.closed(origin, stationCount),
//                Range.closed(0, destination)
//        );
//    }
}
