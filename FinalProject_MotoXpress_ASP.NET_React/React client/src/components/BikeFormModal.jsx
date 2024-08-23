import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BikeFormModal = ({ show, onHide, bike, onChange, onSubmit, isEditing }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Bike' : 'Add Bike'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formBikeName">
            <Form.Label>Bike Name</Form.Label>
            <Form.Control 
              type="text" 
              name="bikeName"
              value={bike.bikeName} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formBikeNumber">
            <Form.Label>Bike Registration Number</Form.Label>
            <Form.Control 
              type="text" 
              name="bikeNumber" 
              value={bike.bikeNumber} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formPerDayRental">
            <Form.Label>Per Day Rental</Form.Label>
            <Form.Control 
              type="number" 
              name="perDayRental" 
              value={bike.perDayRental} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formAvailableCityId">
            <Form.Label>Available City ID</Form.Label>
            <Form.Control 
              type="number" 
              name="availableCityId" 
              value={bike.availableCityId} 
              onChange={onChange} 
            />
          </Form.Group>
          <Form.Group controlId="formIsAvailable">
            <Form.Label>Available</Form.Label>
            <Form.Control 
              as="select" 
              name="isAvailable" 
              value={bike.isAvailable} 
              onChange={onChange}
              required 
            >
              <option value={1}>True</option>
              <option value={0}>False</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formBikeDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control 
              as="textarea" 
              name="bikeDescription" 
              value={bike.bikeDescription} 
              onChange={onChange} 
            />
          </Form.Group>
          <Form.Group controlId="formBikePhoto">
            <Form.Label>Bike Photo URL</Form.Label>
            <Form.Control 
              type="text" 
              name="bikePhoto" 
              value={bike.bikePhoto} 
              onChange={onChange} 
              required 
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            {isEditing ? 'Save Changes' : 'Add Bike'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BikeFormModal;
