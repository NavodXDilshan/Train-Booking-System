package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Coach;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachRepository extends CrudRepository<Coach,Long> {
}
