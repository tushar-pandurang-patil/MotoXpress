import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const NavigationBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rzp_device_id');
        localStorage.removeItem('rzp_checkout_anon_id');
        
        navigate('/login');
    };

    // Check if the user role is admin or customer
    const isAdmin = user && user.role === 'ADMIN';

    return (
        <Navbar 
            bg="dark" 
            variant="dark" 
            expand="lg" 
            sticky="top" 
            style={{
                backgroundColor: '#343a40',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                fontFamily: 'Arial, sans-serif',
                fontSize: '16px',
                padding: '10px 20px'
            }}
        >
            <Container>
                <Navbar.Brand 
                    as={NavLink} 
                    to="/" 
                    style={{
                        color: '#ffffff', 
                        fontWeight: 'bold', 
                        fontSize: '24px',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    Moto<span style={{ color: '#ff0000' }}>X</span>press
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link 
                            as={NavLink} 
                            to="/bikes" 
                            style={{ 
                                color: '#ffffff', 
                                marginRight: '15px', 
                                padding: '5px 10px', 
                                textDecoration: 'none'
                            }}
                            activeStyle={{
                                backgroundColor: '#17a2b8'
                            }}
                        >
                            Bikes
                        </Nav.Link>
                        {/* Conditionally render Bookings link based on role */}
                        {isAdmin && (
                            <Nav.Link 
                                as={NavLink} 
                                to="/allbookings" 
                                style={{ 
                                    color: '#ffffff', 
                                    marginRight: '15px', 
                                    padding: '5px 10px', 
                                    textDecoration: 'none'
                                }}
                                activeStyle={{
                                    backgroundColor: '#17a2b8'
                                }}
                            >
                                All Bookings
                            </Nav.Link>
                        )}
                        <Nav.Link 
                            as={NavLink} 
                            to="/contact-us" 
                            style={{ 
                                color: '#ffffff', 
                                marginRight: '15px', 
                                padding: '5px 10px', 
                                textDecoration: 'none'
                            }}
                            activeStyle={{
                                backgroundColor: '#17a2b8'
                            }}
                        >
                            Contact Us
                        </Nav.Link>
                        <Nav.Link 
                            as={NavLink} 
                            to="/about-us" 
                            style={{ 
                                color: '#ffffff', 
                                marginRight: '15px', 
                                padding: '5px 10px', 
                                textDecoration: 'none'
                            }}
                            activeStyle={{
                                backgroundColor: '#17a2b8'
                            }}
                        >
                            About Us
                        </Nav.Link>
                        {token && (
                            <Nav.Link 
                                as={NavLink} 
                                to="/profile" 
                                style={{ 
                                    color: '#ffffff', 
                                    marginRight: '15px', 
                                    padding: '5px 10px', 
                                    textDecoration: 'none'
                                }}
                                activeStyle={{
                                    backgroundColor: '#17a2b8'
                                }}
                            >
                                User Profile
                            </Nav.Link>
                        )}
                    </Nav>
                    <Nav className="ms-auto">
                        {!token ? (
                            <>
                                <Nav.Link 
                                    as={NavLink} 
                                    to="/login" 
                                    style={{ 
                                        color: '#ffffff', 
                                        marginRight: '15px', 
                                        padding: '5px 10px', 
                                        textDecoration: 'none'
                                    }}
                                    activeStyle={{
                                        backgroundColor: '#17a2b8'
                                    }}
                                >
                                    Login
                                </Nav.Link>
                                <Nav.Link 
                                    as={NavLink} 
                                    to="/register" 
                                    style={{ 
                                        color: '#ffffff', 
                                        marginRight: '15px', 
                                        padding: '5px 10px', 
                                        textDecoration: 'none'
                                    }}
                                    activeStyle={{
                                        backgroundColor: '#17a2b8'
                                    }}
                                >
                                    Register
                                </Nav.Link>
                            </>
                        ) : (
                            <Button 
                                variant="outline-light" 
                                onClick={handleLogout} 
                                style={{
                                    color: '#ffffff',
                                    borderColor: '#17a2b8',
                                    padding: '5px 15px',
                                    transition: 'all 0.3s ease',
                                    borderRadius: '5px',
                                    position: 'relative'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = '#dc3545';
                                    e.target.style.color = '#ffffff';
                                    e.target.style.borderColor = '#dc3545';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#ffffff';
                                    e.target.style.borderColor = '#17a2b8';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                Logout
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
