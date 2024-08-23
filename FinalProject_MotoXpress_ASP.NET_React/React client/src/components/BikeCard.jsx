import React from 'react';
import { Card, Button } from 'react-bootstrap';

const BikeCard = ({ bike, cities, onEdit, onDelete }) => {
  const city = cities.find(c => c.cityId === bike.availableCityId);

  return (
    <Card className="bike-card shadow mb-3 bg-body rounded" border="warning">
      <Card.Img variant="top" src={bike.bikePhoto} alt={bike.bikeName} />
      <Card.Body>
        <Card.Title>{bike.bikeName}</Card.Title>
        <Card.Text>
          <strong>Bike registration number:₹</strong> {bike.bikeNumber}<br />
          <strong>Per day Rental: ₹</strong>{bike.perDayRental}<br />
          <strong>Available City:</strong> {city ? city.cityName : 'Unknown'}<br />
          <strong>Available:</strong> {bike.isAvailable ? 'True' : 'False'}<br />
          <strong>Description:</strong> {bike.bikeDescription}
        </Card.Text>
        <Button variant="primary" onClick={() => onEdit(bike)}>Edit</Button>
        <Button variant="danger" className="ms-2" onClick={onDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default BikeCard;
