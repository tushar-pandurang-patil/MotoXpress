package com.moto.xpress.repository;

import com.moto.xpress.model.RentalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RentalRecordRepository extends JpaRepository<RentalRecord, Long> {
    // Custom query methods if needed
}