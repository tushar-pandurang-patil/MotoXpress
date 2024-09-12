package com.moto.xpress.repository;

import com.moto.xpress.model.Bike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> {
    // Custom query methods if needed
}