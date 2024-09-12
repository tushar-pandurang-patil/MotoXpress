package com.moto.xpress.service;

import com.moto.xpress.model.City;
import java.util.List;
import java.util.Optional;

public interface CityService {
    List<City> findAll();
    Optional<City> findById(Long id);
    City save(City city);
    void deleteById(Long id);
}