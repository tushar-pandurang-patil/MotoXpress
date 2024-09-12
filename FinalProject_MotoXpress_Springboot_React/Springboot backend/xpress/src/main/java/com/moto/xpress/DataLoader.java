package com.moto.xpress;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.moto.xpress.model.Role;
import com.moto.xpress.model.User;
import com.moto.xpress.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void run(String... args) throws Exception {
//		
//		  User admin = new User(); admin.setUserFullName("admin");
//		  admin.setEmailId("admin@gmail.com");
//		  admin.setPassword(passwordEncoder.encode("Admin@123"));
//		  admin.setRole(Role.ADMIN); userRepository.save(admin);
//		 
//		  User observer = new User(); observer.setUserFullName("observer");
//		  observer.setEmailId("observer@gmail.com");
//		  observer.setPassword(passwordEncoder.encode("Observer@123"));
//		  observer.setRole(Role.OBSERVER); userRepository.save(observer);
//		  
//		  User approver = new User(); approver.setUserFullName("approver");
//		  approver.setEmailId("approver@gmail.com");
//		  approver.setPassword(passwordEncoder.encode("Approver@123"));
//		  approver.setRole(Role.APPROVER); userRepository.save(approver);
//		  
//		  User superuser = new User(); superuser.setUserFullName("superuser");
//		  superuser.setEmailId("superuser@gmail.com");
//		  superuser.setPassword(passwordEncoder.encode("Superuser@123"));
//		  superuser.setRole(Role.SUPERUSER); userRepository.save(superuser);
		  
		 
	}
}