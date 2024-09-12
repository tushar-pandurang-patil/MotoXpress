package com.moto.xpress.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cityId;

    private String cityName;
    
    @JsonIgnore
    @OneToMany(mappedBy = "city")
    private List<Userprofile> userprofiles;
    
    @JsonIgnore
    @OneToMany(mappedBy = "availableCity")
    private List<Bike> bikes;
    
    

	public Long getCityId() {
		return cityId;
	}

	public void setCityId(Long cityId) {
		this.cityId = cityId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public List<Userprofile> getUserprofiles() {
		return userprofiles;
	}

	public void setUserprofiles(List<Userprofile> userprofiles) {
		this.userprofiles = userprofiles;
	}

	public List<Bike> getBikes() {
		return bikes;
	}

	public void setBikes(List<Bike> bikes) {
		this.bikes = bikes;
	}

	
    
	
}