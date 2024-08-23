import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
//import { revokeToken } from '../services/api';
//const jwtDecode = require('jwt-decode');// Use named import for jwt-decode

const NavigationBar = () => {
    const [emailId, setEmailId] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setEmailId(localStorage.getItem('emailId'));
            setUserRole(localStorage.getItem('userRole'));
        }
    }, []);

    const handleLogout = () => {
        const token = localStorage.getItem('token');
        //revokeToken(token);
        //axios.post(`https://localhost:7270/api/Users/RevokeToken`, { token });
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('emailId');
        localStorage.removeItem('userId');
        setEmailId(null);
        setUserRole(null);
        navigate('/login');
    };

    // const handleLoginSuccess = () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         const decodedToken = jwtDecode(token);
    //         setEmailId(decodedToken.emailId); // Update the email state
    //     }
    // };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    Moto<span style={{ color: 'red', fontSize: '21px' }}>X</span>press
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/bikes">
                            Bikes
                        </Nav.Link>
                        {userRole === 'admin' && (
                            <>
                                <Nav.Link as={NavLink} to="/crudbikes">
                                    Manage Bikes
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/rentalrecordspage">
                                    Rental Records
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/users">
                                    Users
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/past-approvals">
                                    Past Approvals
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/pending-approvals">
                                    Pending Approvals
                                </Nav.Link>
                            </>
                        )}
                        {userRole === 'approver' && (
                            <>
                                <Nav.Link as={NavLink} to="/past-approvals">
                                    Past Approvals
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/pending-approvals">
                                    Pending Approvals
                                </Nav.Link>
                            </>
                        )}
                        <Nav.Link as={NavLink} to="/contact-us">
                            Contact Us
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/about-us">
                            About Us
                        </Nav.Link>
                    </Nav>
                    {emailId ? (
                        <Nav>
                            <NavDropdown title={emailId} id="user-dropdown" align="end">
                                <NavDropdown.Item as={NavLink} to="/profile">
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item as={NavLink} to="/bookings">
                                    My Rides
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    ) : (
                        <Nav>
                            <Nav.Link as={NavLink} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/register">
                                Register
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;