import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate that passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        try {
            // Send only the password to the backend
            const response = await axios.post('http://localhost:8080/register', {
                userFullName: username,
                emailId: email,
                password: password, // Only send the password
            });
            
            console.log('Form Data:', username, email, password); // Log form data

            if (response.status === 200) {
                // Registration successful, show alert and navigate to the login page
                alert('Account created successfully! Please log in.');
                navigate('/login');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration failed:', err);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f4f4f4',
            fontFamily: 'Arial, sans-serif'
        }}>
            <form 
                onSubmit={handleRegister} 
                style={{
                    backgroundColor: '#ffffff',
                    padding: '40px 50px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Register</h2>
                {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                    <label htmlFor="username" style={{ marginBottom: '5px', display: 'block', color: '#333' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                    <label htmlFor="email" style={{ marginBottom: '5px', display: 'block', color: '#333' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '15px', textAlign: 'left' }}>
                    <label htmlFor="password" style={{ marginBottom: '5px', display: 'block', color: '#333' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                    <label htmlFor="confirmPassword" style={{ marginBottom: '5px', display: 'block', color: '#333' }}>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                            fontSize: '16px'
                        }}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{
                        width: '100%',
                        padding: '10px 0',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
