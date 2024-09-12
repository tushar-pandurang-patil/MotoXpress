package com.moto.xpress.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Bike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bikeId;

    private String bikeName;
    
    @Column(unique = true)
    private String bikeNumber;
    
    private String bikeDescription;
    
    @Column(precision = 7, scale = 2)
    private BigDecimal perDayRental;
    
    private String bikePhoto;
    
    private boolean isAvailable;

    @ManyToOne
    @JoinColumn(name = "AvailableCityId")
    private City availableCity;
    
    @JsonIgnore
    @OneToMany(mappedBy = "bike")
    private List<RentalRecord> rentalRecords;

	public Long getBikeId() {
		return bikeId;
	}

	public void setBikeId(Long bikeId) {
		this.bikeId = bikeId;
	}

	public String getBikeName() {
		return bikeName;
	}

	public void setBikeName(String bikeName) {
		this.bikeName = bikeName;
	}

	public String getBikeNumber() {
		return bikeNumber;
	}

	public void setBikeNumber(String bikeNumber) {
		this.bikeNumber = bikeNumber;
	}

	public String getBikeDescription() {
		return bikeDescription;
	}

	public void setBikeDescription(String bikeDescription) {
		this.bikeDescription = bikeDescription;
	}

	public BigDecimal getPerDayRental() {
		return perDayRental;
	}

	public void setPerDayRental(BigDecimal perDayRental) {
		this.perDayRental = perDayRental;
	}

	public String getBikePhoto() {
		return bikePhoto;
	}

	public void setBikePhoto(String bikePhoto) {
		this.bikePhoto = bikePhoto;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean isAvailable) {
		this.isAvailable = isAvailable;
	}

	public City getAvailableCity() {
		return availableCity;
	}

	public void setAvailableCity(City availableCity) {
		this.availableCity = availableCity;
	}

	public List<RentalRecord> getRentalRecords() {
		return rentalRecords;
	}

	public void setRentalRecords(List<RentalRecord> rentalRecords) {
		this.rentalRecords = rentalRecords;
	}

    
	
}