package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Fare;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FareRepository extends CrudRepository<Fare,Long> {
}
