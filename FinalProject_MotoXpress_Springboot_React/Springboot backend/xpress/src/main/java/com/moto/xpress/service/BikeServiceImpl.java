package com.moto.xpress.service;

import com.moto.xpress.model.Bike;
import com.moto.xpress.repository.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BikeServiceImpl implements BikeService {

    @Autowired
    private BikeRepository bikeRepository;

    @Override
    public List<Bike> findAll() {
        return bikeRepository.findAll();
    }

    @Override
    public Optional<Bike> findById(Long id) {
        return bikeRepository.findById(id);
    }

    @Override
    public Bike save(Bike bike) {
        return bikeRepository.save(bike);
    }

    @Override
    public void deleteById(Long id) {
        bikeRepository.deleteById(id);
    }
}