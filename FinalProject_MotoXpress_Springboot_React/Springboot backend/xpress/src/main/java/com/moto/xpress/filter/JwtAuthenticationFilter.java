package com.moto.xpress.filter;

import com.moto.xpress.service.JwtService;
import com.moto.xpress.service.UserDetailsServiceImpl;
import io.jsonwebtoken.Claims;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsServiceImpl userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        // Extract the JWT token from the Authorization header
        String token = extractTokenFromRequest(request);

        // If the token is not null and is valid, set the authentication
        if (token != null && jwtService.isValid(token, userDetailsService.loadUserByUsername(jwtService.extractEmailId(token)))) {
            setAuthentication(token, request);
        }

        // Continue the filter chain
        filterChain.doFilter(request, response);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            String token = bearerToken.substring(7);
        // Log token for debugging
        System.out.println("Extracted Token: " + token);
        return token;
        }
        return null;
    }

    private void setAuthentication(String token, HttpServletRequest request) {
        Claims claims = jwtService.extractAllClaims(token);
        String emailId = claims.getSubject();
		System.out.println("Claims Email ID: " + emailId);
		
        // If the email ID is not null and the user is not already authenticated
        if (emailId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Extract roles from the claims and create authorities
            List<GrantedAuthority> authorities = Arrays.stream(claims.get("roles", String.class).split(","))
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
			
			// Log authorities for debugging
			System.out.println("Extracted Authorities: " + authorities);
		
            // Load the user details based on the email ID
            UserDetails userDetails = userDetailsService.loadUserByUsername(emailId);

            // Create an authentication token and set it in the security context
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, authorities);
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Set the authenticated user in the security context
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
    }
}