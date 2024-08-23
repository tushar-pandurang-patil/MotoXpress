import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { createRentalRecord } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BikeCardBook = ({ bike, cities }) => {
  const [showModal, setShowModal] = useState(false);

  const userId = localStorage.getItem('userId');
  const emailId = localStorage.getItem('emailId');

  
  
  const [rentalData, setRentalData] = useState({
    bikeId: bike.bikeId || '',
    userId: userId,
    pickupCityId: bike.availableCityId || '',
    dropOffCityId: '',
    rentalStartDate: '',
    rentalEndDate: '',
    bookingDate: new Date().toISOString(),
    extraHelmet: 0,
    paymentConfirmation: 0,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (bike) {
      setRentalData(prevState => ({
        ...prevState,
        bikeId: bike.bikeId || '',
        pickupCityId: bike.availableCityId || ''
      }));
    }
  }, [bike.bikeId, bike.availableCityId]);

  const pickupCity = cities.find(c => c.cityId === bike.availableCityId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRentalData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (name, value) => {
    setRentalData(prevState => ({
      ...prevState,
      [name]: value
    }));

    if (name === 'rentalStartDate') {
      const pickupDate = new Date(value);
      if (!isNaN(pickupDate.getTime())) {
        const dropoffDate = new Date(pickupDate);
        dropoffDate.setDate(dropoffDate.getDate() + 1);
        setRentalData(prevState => ({
          ...prevState,
          rentalEndDate: dropoffDate.toISOString().slice(0, 16)
        }));
      }
    }
  };

  const validateDates = () => {
    const errors = {};
    const now = new Date();
    const pickupDate = new Date(rentalData.rentalStartDate);
    const dropoffDate = new Date(rentalData.rentalEndDate);

    // Check if Dropoff City is selected
    if (!rentalData.dropOffCityId) {
      errors.dropOffCityId = 'Dropoff city is required.';
    }

    // Check if Pickup Date & Time is selected
    if (!rentalData.rentalStartDate) {
      errors.rentalStartDate = 'Pickup date & time is required.';
    } else if (pickupDate <= now) {
      errors.rentalStartDate = 'Pickup date & time must be in the future.';
    }

    // Check if Dropoff Date & Time is selected
    if (!rentalData.rentalEndDate) {
      errors.rentalEndDate = 'Dropoff date & time is required.';
    } else if (dropoffDate <= pickupDate) {
      errors.rentalEndDate = 'Dropoff date & time must be at least 1 day after the pickup date & time.';
    }

    return errors;
  };

  const handleBookClick = () => {
    if(userId){
      setShowModal(true);
    }
    else{
      navigate('/login')
    }
  };

  const handleConfirmBooking = async () => {
    const validationErrors = validateDates();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
        // Initialize Razorpay
        const amountInPaise = Math.round(totalPayable * 100); // Convert totalPayable to paise and round it
        console.log(amountInPaise);
        if (amountInPaise < 100) {
          toast.error('Total payable amount should be at least 1');
          return;
        }
        const options = {
          key: 'rzp_test_ngkHQMb4oJmuyn',
          key_secret:'LCyWNIhviqWNSXG5RvAgjh0M',
          amount: amountInPaise, // Amount in paise
          currency: 'INR',
          name: 'MotoXpress',
          description: 'Payment for bike rental',
          handler: async (response) => {
            // Save rental record
            try {
              const confirmResponse = await createRentalRecord(rentalData);
              if (confirmResponse && confirmResponse.status === 201) {
                toast.success('Booking confirmed and payment successful');
                setTimeout(() => {
                }, 2000);
                } else {
                toast.error('Failed to confirm booking');
              }
            } catch (error) {
              toast.error('Error during booking confirmation');
            }
          },
          prefill: {
            email: emailId || '',
          },
          theme: {
            color: '#3399cc'
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

      }
      catch (error) {
      toast.error('Error during booking');
    }

    setShowModal(false);
  };

  const calculateBookingFee = () => {
    const start = new Date(rentalData.rentalStartDate);
    const end = new Date(rentalData.rentalEndDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;

    const hours = (end - start) / (1000 * 60 * 60);
    const ratePerHour = bike.perDayRental/24;
    return hours * ratePerHour;
  };

  const bookingFee = calculateBookingFee();
  const cgst = bookingFee * 0.14;
  const sgst = bookingFee * 0.14;
  const extraHelmetCost = rentalData.extraHelmet === '1' ? 150 : 0;

  // Calculate intercity fee if dropoff city is different from pickup city
  // const isIntercity = rentalData.dropOffCityId && rentalData.dropOffCityId !== rentalData.pickupCityId;
  // const intercityFee = isIntercity ? bookingFee * 0.3 : 0;
  const totalPayable = bookingFee + cgst + sgst + extraHelmetCost //+ intercityFee;

  const now = new Date().toISOString().slice(0, 16);
  const minDropoffDate = rentalData.rentalStartDate
    ? new Date(rentalData.rentalStartDate)
    : new Date();
  minDropoffDate.setDate(minDropoffDate.getDate() + 1);
  const minDropoffDateStr = minDropoffDate.toISOString().slice(0, 16);

  return (
    <>
      <Card className="bike-card-book shadow mb-2 bg-body rounded" border="warning">
        <Card.Img variant="top" src={bike.bikePhoto} alt={bike.bikeName} className="mt-3" />
        <Card.Body>
          <Card.Title>{bike.bikeName}</Card.Title>
          <Card.Text>
            <strong>Per day Rental: ₹ </strong>{bike.perDayRental}<br />
            <strong>Description:</strong> {bike.bikeDescription}
          </Card.Text>
          <Button variant="warning" onClick={handleBookClick}>Book</Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={4} className="d-flex justify-content-center align-items-center">
              <img
                src={bike.bikePhoto}
                alt={bike.bikeName}
                className="img-fluid rounded"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Col>
            <Col md={8}>
              <Form>
                <Form.Group>
                  <Form.Label>Bike Name</Form.Label>
                  <Form.Control type="text" value={bike.bikeName || ''} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>User Email</Form.Label>
                  <Form.Control type="text" value={emailId || ''} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Pickup City</Form.Label>
                  <Form.Control type="text" value={pickupCity?.cityName || ''} readOnly />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dropoff City</Form.Label>
                  <Form.Control as="select" name="dropOffCityId" value={rentalData.dropOffCityId} onChange={handleInputChange} isInvalid={!!errors.dropOffCityId}>
                    <option>Select Dropoff City</option>
                    {cities.map(c => (
                      <option key={c.cityId} value={c.cityId}>{c.cityName}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Pickup Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="rentalStartDate"
                    min={now}
                    value={rentalData.rentalStartDate}
                    onChange={(e) => handleDateChange('rentalStartDate', e.target.value)}
                    isInvalid={!!errors.rentalStartDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rentalStartDate}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Dropoff Date & Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="rentalEndDate"
                    min={minDropoffDateStr}
                    value={rentalData.rentalEndDate}
                    onChange={(e) => handleDateChange('rentalEndDate', e.target.value)}
                    isInvalid={!!errors.rentalEndDate}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rentalEndDate}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Extra Helmet</Form.Label>
                  <Form.Control as="select" name="extraHelmet" value={rentalData.extraHelmet} onChange={handleInputChange}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </Form.Control>
                  <small className="text-danger">*To use for intercity travel, please select a different drop-off city. Additional charges based on ₹7/km will be applied during bike drop-off.</small>
                </Form.Group>
              </Form>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={6}><strong>Booking Fee:</strong></Col>
            <Col md={6}>₹{bookingFee.toFixed(2)}</Col>
          </Row>
          <Row>
            <Col md={6}><strong>CGST (14%):</strong></Col>
            <Col md={6}>₹{cgst.toFixed(2)}</Col>
          </Row>
          <Row>
            <Col md={6}><strong>SGST (14%):</strong></Col>
            <Col md={6}>₹{sgst.toFixed(2)}</Col>
          </Row>
          {rentalData.extraHelmet === '1' && (
            <Row>
              <Col md={6}><strong>Extra Helmet:</strong></Col>
              <Col md={6}>₹150.00</Col>
            </Row>
          )}
          <Row>
            <Col md={6}><strong>Total Payable Amount:</strong></Col>
            <Col md={6}>₹{totalPayable.toFixed(2)}</Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleConfirmBooking}>Confirm Booking</Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </>
  );
};

export default BikeCardBook;
