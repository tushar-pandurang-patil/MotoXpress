package com.moto.xpress.repository;

import com.moto.xpress.model.Userprofile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserprofileRepository extends JpaRepository<Userprofile, Long> {
    // Custom query methods if needed
}