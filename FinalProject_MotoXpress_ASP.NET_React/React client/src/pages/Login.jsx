import React, { useState } from 'react';
import axiosInstance from '../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for custom styles

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        let isValid = true;
        setEmailError('');
        setPasswordError('');

        // Validate Email
        if (!emailId) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(emailId)) {
            setEmailError('Invalid Email Address');
            isValid = false;
        }

        // Validate Password
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const response = await axiosInstance.post('https://localhost:7270/api/Users/Login', {
                emailId,
                password,
            });

            if (response.data.token) {
                // Store the token and user role in localStorage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userRole', response.data.role);
                localStorage.setItem('emailId', response.data.emailId);
                localStorage.setItem('userId', response.data.userId);
                navigate('/');
                window.location.reload();
            }
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container mt-5">
            <div className="login-form-container">
                <form onSubmit={handleLogin}>
                    <h2 className="text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="form-group">
                        <label htmlFor="emailId">Email ID</label>
                        <input
                            type="email"
                            id="emailId"
                            className="form-control"
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)}
                            required
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
