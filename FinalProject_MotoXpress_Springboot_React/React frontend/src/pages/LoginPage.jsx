import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../assets/bgbg12.jpeg'; // Add your image here

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Authenticate user
            const response = await axios.post('http://localhost:8080/login', {
                emailId,
                password,
            });

            if (response.data.access_token) {
                // Store the access token in local storage
                localStorage.setItem('token', response.data.access_token);
                localStorage.setItem('userid', response.data.userId);

                // Fetch all users
                const usersResponse = await axios.get('http://localhost:8080/api/users', {
                    headers: { 
                        'Authorization': `Bearer ${response.data.access_token}`
                    }
                });

                // Match the current entered emailId with the fetched users
                const matchedUser = usersResponse.data.find(user => user.emailId === emailId);

                if (matchedUser) {
                    localStorage.setItem('user', JSON.stringify(matchedUser));
                    console.log('Matched User:', matchedUser);
                } else {
                    console.log('No matching user found.');
                }

                navigate('/'); // Redirect to the home page or dashboard
            }
        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError('Invalid email or password');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: `url(${BackgroundImage})`, // Background image added here
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            fontFamily: 'Arial, sans-serif'
        }}>
            <form 
                onSubmit={handleLogin} 
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slight transparency for better contrast
                    padding: '40px 50px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                    textAlign: 'center'
                }}
            >
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Login</h2>
                {error && <p style={{ color: 'red', marginBottom: '15px' }}>{error}</p>}
                <div className="form-group" style={{ marginBottom: '15px', textAlign: 'left' }}>
                    <label htmlFor="emailId" style={{ marginBottom: '5px', display: 'block', color: '#333' }}>Email</label>
                    <input
                        type="email"
                        id="emailId"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
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
                <div className="form-group" style={{ marginBottom: '20px', textAlign: 'left' }}>
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
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
