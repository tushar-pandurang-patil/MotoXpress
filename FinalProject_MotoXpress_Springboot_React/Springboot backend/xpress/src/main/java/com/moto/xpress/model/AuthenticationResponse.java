package com.moto.xpress.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthenticationResponse {
    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("refresh_token")
    private String refreshToken;

    @JsonProperty("message")
    private String message;
    
    @JsonProperty("user_id")
    private String userId;


    public AuthenticationResponse(String accessToken, String refreshToken, String message, String userId) {
        this.accessToken = accessToken;
        this.message = message;
        this.refreshToken = refreshToken;
        this.userId = userId;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getMessage() {
        return message;
    }
    
    public String getUserId() {
        return userId;
    }
}