package com.moto.xpress.service;

import com.moto.xpress.model.Userprofile;
import com.moto.xpress.repository.UserprofileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserprofileServiceImpl implements UserprofileService {

    @Autowired
    private UserprofileRepository userprofileRepository;

    @Override
    public List<Userprofile> findAll() {
        return userprofileRepository.findAll();
    }

    @Override
    public Optional<Userprofile> findById(Long id) {
        return userprofileRepository.findById(id);
    }

    @Override
    public Userprofile save(Userprofile userprofile) {
        return userprofileRepository.save(userprofile);
    }

    @Override
    public void deleteById(Long id) {
        userprofileRepository.deleteById(id);
    }
}