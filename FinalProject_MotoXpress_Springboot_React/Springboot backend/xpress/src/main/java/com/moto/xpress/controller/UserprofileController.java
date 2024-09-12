package com.moto.xpress.controller;

import com.moto.xpress.model.Userprofile;
import com.moto.xpress.service.UserprofileService;

import jakarta.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/userprofiles")
public class UserprofileController {

    @Autowired
    private UserprofileService userprofileService;

    @RolesAllowed({"ADMIN","OBSERVER","SUPERUSER"})
    @GetMapping
    public ResponseEntity<List<Userprofile>> getAllUserprofiles() {
        List<Userprofile> userprofiles = userprofileService.findAll();
        return ResponseEntity.ok(userprofiles);
    }

    @RolesAllowed({"ADMIN","CUSTOMER","SUPERUSER","APPROVER"})
    @GetMapping("/{id}")
    public ResponseEntity<Userprofile> getUserprofileById(@PathVariable Long id) {
        Optional<Userprofile> userprofile = userprofileService.findById(id);
        return userprofile.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @RolesAllowed({"CUSTOMER","SUPERUSER"})
    @PostMapping
    public ResponseEntity<Userprofile> createUserprofile(@RequestBody Userprofile userprofile) {
        Userprofile createdUserprofile = userprofileService.save(userprofile);
        return ResponseEntity.ok(createdUserprofile);
    }

    @RolesAllowed({"CUSTOMER","SUPERUSER","APPROVER"})
    @PutMapping("/{id}")
    public ResponseEntity<Userprofile> updateUserprofile(@PathVariable Long id, @RequestBody Userprofile userprofileDetails) {
        Optional<Userprofile> userprofile = userprofileService.findById(id);
        if (userprofile.isPresent()) {
            userprofileDetails.setProfileId(id);
            Userprofile updatedUserprofile = userprofileService.save(userprofileDetails);
            return ResponseEntity.ok(updatedUserprofile);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @RolesAllowed({"ADMIN","CUSTOMER","SUPERUSER"})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserprofile(@PathVariable Long id) {
        Optional<Userprofile> userprofile = userprofileService.findById(id);
        if (userprofile.isPresent()) {
            userprofileService.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}