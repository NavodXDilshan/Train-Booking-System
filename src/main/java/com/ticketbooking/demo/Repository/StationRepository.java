package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Station;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StationRepository extends CrudRepository<Station,Long> {
}
