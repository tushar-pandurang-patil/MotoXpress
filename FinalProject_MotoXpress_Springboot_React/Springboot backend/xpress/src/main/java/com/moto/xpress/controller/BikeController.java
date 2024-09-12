package com.moto.xpress.controller;

import com.moto.xpress.model.Bike;
import com.moto.xpress.service.BikeService;

import jakarta.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bikes")
public class BikeController {

    @Autowired
    private BikeService bikeService;

    @GetMapping
    public ResponseEntity<List<Bike>> getAllBikes() {
        List<Bike> bikes = bikeService.findAll();
        return ResponseEntity.ok(bikes);	
    }
    
    @RolesAllowed({"ADMIN","SUPERUSER","CUSTOMER"})
    @GetMapping("/{id}")
    public ResponseEntity<Bike> getBikeById(@PathVariable Long id) {
        Optional<Bike> bike = bikeService.findById(id);
        return bike.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RolesAllowed({"ADMIN","SUPERUSER"})
    @PostMapping
    public ResponseEntity<Bike> createBike(@RequestBody Bike bike) {
        Bike createdBike = bikeService.save(bike);
        return ResponseEntity.ok(createdBike);
    }

    @RolesAllowed({"ADMIN","SUPERUSER"})
    @PutMapping("/{id}")
    public ResponseEntity<Bike> updateBike(@PathVariable Long id, @RequestBody Bike bikeDetails) {
        Optional<Bike> bike = bikeService.findById(id);
        if (bike.isPresent()) {
            bikeDetails.setBikeId(id);
            Bike updatedBike = bikeService.save(bikeDetails);
            return ResponseEntity.ok(updatedBike);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RolesAllowed({"ADMIN","SUPERUSER"})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBike(@PathVariable Long id) {
        Optional<Bike> bike = bikeService.findById(id);
        if (bike.isPresent()) {
            bikeService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}