import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
import { getCities } from '../services/api'; // Import getCities function
import './BikeList.css'; // Import a CSS file for styling
import BikeCardBook from './BikeCardBook';


const BikeListBook = ({ bikes  }) => {
    const [cities, setCities] = useState([]);
    const [selectedBike, setSelectedBike] = useState(null);
    
    useEffect(() => {
        // Fetch cities from the backend API using getCities function
        getCities()
            .then(data => setCities(data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

       return (
        <Row>
            {bikes.map(bike => (
                <Col key={bike.bikeId} sm={6} md={4} lg={3} className="mb-2 mt-5">
                <BikeCardBook 
                    key={bike.bikeId} 
                    bike={bike} 
                    cities={cities}
                    />
                </Col>
            ))}
        </Row>
    );
};

export default BikeListBook;
