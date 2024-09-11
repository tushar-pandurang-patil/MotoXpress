import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BikeCard = ({ bike, onDelete, onEdit }) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdmin = user && user.role === 'ADMIN';
    const isCustomer = user && user.role === 'CUSTOMER';

    const handleEditBike = () => {
        navigate(`/bikes/edit/${bike.bikeId}`);
    };

    const handleDeleteBike = () => {
        if (window.confirm(`Are you sure you want to delete ${bike.bikeName}?`)) {
            onDelete(bike.bikeId); 
        }
    };

    const handleBookNow = () => {
        navigate(`/bookings/${bike.bikeId}`);
    };

    const cardStyle = {
        transition: 'transform 0.3s ease',
        margin: '10px',
        flex: '1 1 calc(33.333% - 20px)',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#fff',
    };

    const cardHoverStyle = {
        transform: 'translateY(-10px)',
    };

    return (
        <Card style={cardStyle} className="bike-card">
            <Card.Img variant="top" src={bike.bikePhoto} alt={bike.bikeName} />
            <Card.Body>
                <Card.Title>{bike.bikeName}</Card.Title>
                <Card.Text>
                    <strong>Number:</strong> {bike.bikeNumber}<br />
                    <strong>Price per Day:</strong> Rs.{bike.perDayRental}<br />
                    <strong>Description:</strong> {bike.bikeDescription}
                </Card.Text>
                {isAdmin && (
                    <>
                        <Button variant="warning" onClick={handleEditBike} className="me-2">Edit</Button>
                        <Button variant="danger" onClick={handleDeleteBike} className="me-2">Delete</Button>
                    </>
                )}
                {isCustomer && (
                    <Button variant="primary" onClick={handleBookNow}>Book Now</Button>
                )}
            </Card.Body>
        </Card>
    );
};

export default BikeCard;
