import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import BikeCard from './BikeCard';
import { getCities } from '../services/api'; // Import getCities function
import './BikeList.css'; // Import a CSS file for styling

const BikeList = ({ bikes, onEdit, onDelete }) => {
    const [cities, setCities] = useState([]);
    const [selectedBike, setSelectedBike] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        // Fetch cities from the backend API using getCities function
        getCities()
            .then(data => setCities(data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    // Handle Edit
    const handleEdit = (bike) => {
        setSelectedBike(bike);
        onEdit(bike);
    };

    // Handle Delete
    const handleDelete = (bikeId) => {
        if (window.confirm('Are you sure you want to delete this bike?')) {
            onDelete(bikeId);
        }
    };

    return (
        <Row>
            {bikes.map(bike => (
                <Col key={bike.bikeId} sm={6} md={4} lg={3} className="mb-2 mt-5">
                <BikeCard 
                    key={bike.bikeId} 
                    bike={bike} 
                    cities={cities} 
                    onEdit={() => handleEdit(bike)} 
                    onDelete={() => handleDelete(bike.bikeId)} 
                />
                </Col>
            ))}
        </Row>
    );
};

export default BikeList;
