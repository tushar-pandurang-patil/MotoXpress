package com.moto.xpress.service;

import com.moto.xpress.model.RentalRecord;
import java.util.List;
import java.util.Optional;

public interface RentalRecordService {
    List<RentalRecord> findAll();
    Optional<RentalRecord> findById(Long id);
    RentalRecord save(RentalRecord rentalrecord);
    void deleteById(Long id);
}