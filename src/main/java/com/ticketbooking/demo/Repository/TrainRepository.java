package com.ticketbooking.demo.Repository;

import com.ticketbooking.demo.model.Train;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainRepository extends CrudRepository<Train,Long> {
}
