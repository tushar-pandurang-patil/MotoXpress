package com.moto.xpress.service;

import com.moto.xpress.model.Bike;
import java.util.List;
import java.util.Optional;

public interface BikeService {
    List<Bike> findAll();
    Optional<Bike> findById(Long id);
    Bike save(Bike bike);
    void deleteById(Long id);
}