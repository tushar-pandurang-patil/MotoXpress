package com.moto.xpress.model;

import jakarta.persistence.*;

@Entity
public class Userprofile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profileId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    private String phoneNumber;

    private String address;
    
    private String dlNumber;
    
    @Column(columnDefinition = "LONGTEXT")
    private String profilePhoto;
    
    @Column(columnDefinition = "LONGTEXT")
    private String dlUploadedDocument;
    
    private boolean approvalCompleted;
    
    @OneToOne
    @JoinColumn(name = "city_id")
    private City city;

	public Long getProfileId() {
		return profileId;
	}

	public void setProfileId(Long profileId) {
		this.profileId = profileId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getDlNumber() {
		return dlNumber;
	}

	public void setDlNumber(String dlNumber) {
		this.dlNumber = dlNumber;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	public String getDlUploadedDocument() {
		return dlUploadedDocument;
	}

	public void setDlUploadedDocument(String dlUploadedDocument) {
		this.dlUploadedDocument = dlUploadedDocument;
	}

	public boolean isApprovalCompleted() {
		return approvalCompleted;
	}

	public void setApprovalCompleted(boolean approvalCompleted) {
		this.approvalCompleted = approvalCompleted;
	}

	public City getCity() {
		return city;
	}

	public void setCity(City city) {
		this.city = city;
	}

	
}