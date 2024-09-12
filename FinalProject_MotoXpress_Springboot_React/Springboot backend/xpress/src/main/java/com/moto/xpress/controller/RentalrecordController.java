package com.moto.xpress.controller;

import com.moto.xpress.model.RentalRecord;
import com.moto.xpress.service.RentalRecordService;

import jakarta.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rentalrecords")
public class RentalrecordController {

    @Autowired
    private RentalRecordService rentalRecordService;

    @RolesAllowed({"ADMIN","CUSTOMER","OBSERVER","SUPERUSER"})
    @GetMapping
    public ResponseEntity<List<RentalRecord>> getAllRentalrecords() {
        List<RentalRecord> rentalrecords = rentalRecordService.findAll();
        return ResponseEntity.ok(rentalrecords);
    }
    
    @RolesAllowed({"ADMIN","CUSTOMER","SUPERUSER"})
    @GetMapping("/{id}")
    public ResponseEntity<RentalRecord> getRentalrecordById(@PathVariable Long id) {
        Optional<RentalRecord> rentalrecord = rentalRecordService.findById(id);
        return rentalrecord.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RolesAllowed({"CUSTOMER","SUPERUSER","ADMIN"})
    @PostMapping
    public ResponseEntity<RentalRecord> createRentalrecord(@RequestBody RentalRecord rentalrecord) {
    	RentalRecord createdRentalrecord = rentalRecordService.save(rentalrecord);
    	System.out.println("Rental record created");
        return ResponseEntity.ok(createdRentalrecord);
    }

    @RolesAllowed({"SUPERUSER","CUSTOMER"})
    @PutMapping("/{id}")
    public ResponseEntity<RentalRecord> updateRentalrecord(@PathVariable Long id, @RequestBody RentalRecord rentalrecordDetails) {
        Optional<RentalRecord> rentalrecord = rentalRecordService.findById(id);
        if (rentalrecord.isPresent()) {
            rentalrecordDetails.setRentalRecordId(id);
            RentalRecord updatedRentalrecord = rentalRecordService.save(rentalrecordDetails);
            return ResponseEntity.ok(updatedRentalrecord);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RolesAllowed({"SUPERUSER"})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRentalrecord(@PathVariable Long id) {
        Optional<RentalRecord> rentalrecord = rentalRecordService.findById(id);
        if (rentalrecord.isPresent()) {
            rentalRecordService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}