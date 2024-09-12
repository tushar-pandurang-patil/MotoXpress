// context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import AuthService from '../services/AuthService'; // Import default export

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    const handleLogin = async (user) => {
        const response = await AuthService.login(user); // Access login method from AuthService
        setAuth(response.data);
    };

    const handleLogout = async () => {
        await AuthService.logout(); // Access logout method from AuthService
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
