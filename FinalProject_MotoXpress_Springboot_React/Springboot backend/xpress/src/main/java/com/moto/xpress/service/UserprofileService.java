package com.moto.xpress.service;

import com.moto.xpress.model.Userprofile;
import java.util.List;
import java.util.Optional;

public interface UserprofileService {
    List<Userprofile> findAll();
    Optional<Userprofile> findById(Long id);
    Userprofile save(Userprofile userprofile);
    void deleteById(Long id);
}