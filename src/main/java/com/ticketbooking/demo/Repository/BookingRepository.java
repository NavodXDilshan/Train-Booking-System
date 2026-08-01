package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Long> {
}
