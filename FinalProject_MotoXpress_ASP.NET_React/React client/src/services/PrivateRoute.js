import React from 'react';
import { Route, Navigate } from 'react-router-dom'; // Update import
import { isAuthenticated, getToken } from '../services/auth';
const jwtDecode = require('jwt-decode');// Use named import for jwt-decode

const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
    const token = getToken();

    // Check if the user is authenticated
    const isAuthenticated = !!token;

    // Check if the user has a valid role
    let userRole = null;
    if (isAuthenticated) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role; // Assuming 'role' is in the token
        } catch (error) {
            console.error('Token decoding failed', error);
            return <Navigate to="/login" />;
        }
    }

    return (
        <Route
            {...rest}
            element={
                isAuthenticated && allowedRoles.includes(userRole) ? (
                    <Component />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
