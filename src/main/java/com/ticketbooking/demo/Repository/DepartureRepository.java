package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Departure;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartureRepository extends JpaRepository<Departure,Long> {
}
