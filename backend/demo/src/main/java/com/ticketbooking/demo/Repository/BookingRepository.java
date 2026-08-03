package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
    List<Booking> findAllByDepartureIdAndTravelDate(Long departureId, LocalDateTime travelDate);

    @Query(value = """
    SELECT * FROM bookings b
    WHERE b.departure_id = :departureId
      AND b.travel_date = :travelDate
      AND b.journey_range && int4range(:startOrder, :endOrder, '[)')
    """, nativeQuery = true)
    List<Booking> findOverlappingBookings(
            @Param("departureId") Long departureId,
            @Param("travelDate") LocalDateTime travelDate,
            @Param("startOrder") Integer startOrder,
            @Param("endOrder") Integer endOrder
    );

//    @Query("""
//    SELECT CASE WHEN COUNT(b)>0 THEN true ELSE false END
//    FROM Booking b
//    WHERE b.trainId = :trainId
//    AND b.coachId = :coachId
//    AND b.seatId = :seatId
//    AND b.travelDate = :travelDate
//    AND b.originOrder < :destinationOrder
//    AND b.destinationOrder > :originOrder
//    """)
//    boolean existsOverlappingBooking();
}
