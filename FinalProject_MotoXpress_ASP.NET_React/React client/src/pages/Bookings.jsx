import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { getRentalRecords, getBikes, getUsers, getCities, deleteRentalRecord } from '../services/api';
import { Card, Row, Col, Table, Button, Modal } from 'react-bootstrap';
import './Booking.css';  // Import the custom CSS file

const Bookings = () => {
  const [rentalRecords, setRentalRecords] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [email, setEmail] = useState('');

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ypcnc16",
        "template_g67bixi",
        form.current,
        "0ieyPTlvdz5H0raAg"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const loggedInUserId = localStorage.getItem('userId');
  
  useEffect(() => {
    const storedEmail = localStorage.getItem('emailId');
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  useEffect(() => {
    fetchRentalRecords();
    fetchUsers();
    fetchCities();
  }, []);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchRentalRecords = async () => {
    try {
      const response = await getRentalRecords();
      const userRecords = response.data.filter(record => record.user.userId === parseInt(loggedInUserId));
      setRentalRecords(userRecords);
    } catch (error) {
      console.error('Error fetching rental records:', error);
    }
  };

  const fetchBikes = async () => {
    try {
      const response = await getBikes();
      setBikes(response.data);
    } catch (error) {
      console.error('Error fetching bikes:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await getCities();
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const getBikeDetails = (bikeId) => {
    if (!bikes || bikes.length === 0) return {};
    const bike = bikes.find(b => b.bikeId === bikeId);
    return bike ? { name: bike.bikeName, photo: bike.bikePhoto, perDayRental: bike.perDayRental } : {};
  };

  const getCityName = (cityId) => {
    if (!cities || cities.length === 0) return '';
    const city = cities.find(c => c.cityId === cityId);
    return city ? city.cityName : '';
  };

  const handleDeleteClick = (record) => {
    setRecordToDelete(record);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (recordToDelete) {
      try {
        await deleteRentalRecord(recordToDelete.rentalRecordId);
        setRentalRecords(rentalRecords.filter(r => r.rentalRecordId !== recordToDelete.rentalRecordId));
      } catch (error) {
        console.error('Error deleting rental record:', error);
      } finally {
        setShowModal(false);
        setRecordToDelete(null);
      }
    }
  };

  

  return (
    <div className="container mt-4">
      <h2>My Rides</h2>
      {rentalRecords.length === 0 && (
        <a href="/bikes" >No upcoming trips. Plan one now!</a>
      )}
      <Row>
        {rentalRecords.map(record => {
          const bikeDetails = getBikeDetails(record.bike.bikeId);
          const pickupCityName = record.pickupCity.cityName;
          const dropOffCityName = record.dropOffCity.cityName;

          const calculateBookingFee = (record) => {
            const start = new Date(record.rentalStartDate);
            const end = new Date(record.rentalEndDate);
            if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
        
            const hours = (end - start) / (1000 * 60 * 60);
            const ratePerHour = record.bike.perDayRental/24;
            return hours * ratePerHour;
          };

          const bookingFee = calculateBookingFee(record);
          const cgst = bookingFee * 0.14;
          const sgst = bookingFee * 0.14;
          const extraHelmetCost = record.extraHelmet ? 150 : 0;
          const totalPayable = Math.round(bookingFee + cgst + sgst + extraHelmetCost);

          return (
            <Col xs={12} key={record.rentalRecordId} className="mb-4">
              <Card className="booking-card" border="warning">
                <Table responsive>
                  <tbody>
                    <tr>
                      <td className="align-middle">
                        <Card.Img variant="left" src={bikeDetails.photo} alt="Bike" className="bike-image" />
                      </td>
                      <td>
                        <strong>Bike Name:</strong> {bikeDetails.name}<br />
                        <strong>Per Day Rental:</strong> ₹{bikeDetails.perDayRental}<br />
                        <strong>Pickup City:</strong> {pickupCityName}<br />
                        <strong>Dropoff City:</strong> {dropOffCityName}<br />
                        <strong>Rental Start Date:</strong> {new Date(record.rentalStartDate).toLocaleString()}<br />
                        <strong>Rental End Date:</strong> {new Date(record.rentalEndDate).toLocaleString()}<br />
                        <strong>Booking Date:</strong> {new Date(record.bookingDate).toLocaleString()}<br />
                        <strong>Extra Helmet:</strong> {record.extraHelmet ? 'Yes' : 'No'}<br />
                        <strong>Paid Amount:</strong> ₹{totalPayable}
                      </td>
                      <td className="align-middle text-right">
                        <Button variant="danger" onClick={() => handleDeleteClick(record)}>Cancel Booking</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Card>
            </Col>
          );
        })}
        
      </Row>
        {
          
      <div className="card mt-5 shadow-sm">
  <div className="card-body">
    <h3 className="text-center mb-4">Ride Feedback</h3>
    <form ref={form} onSubmit={sendEmail}>
      <div className="form-group">
        <label>Email</label>
        <input 
          type="email" 
          name="user_email" 
          className="form-control" 
          required 
          value={email} // Bind the state value to the input field
          onChange={(e) => setEmail(e.target.value)} // Update state on input change
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Date of Ride</label>
        <input type="date" name="ride_date" className="form-control" required />
      </div>
      <div className="form-group">
        <label>Rate Your Experience</label>
        <select name="ride_rating" className="form-control" required>
          <option value="">Select Rating</option>
          <option value="1">1 - Very Poor</option>
          <option value="2">2 - Poor</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div className="form-group">
        <label>Condition of the Bike</label>
        <select name="bike_condition" className="form-control" required>
          <option value="">Select Condition</option>
          <option value="1">1 - Very Poor</option>
          <option value="2">2 - Poor</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div className="form-group">
        <label>Feedback on Customer Service</label>
        <select name="customer_service" className="form-control" required>
          <option value="">Select Service Level</option>
          <option value="1">1 - Very Poor</option>
          <option value="2">2 - Poor</option>
          <option value="3">3 - Average</option>
          <option value="4">4 - Good</option>
          <option value="5">5 - Excellent</option>
        </select>
      </div>
      <div className="form-group">
        <label>Would You Recommend Us to Others?</label>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="recommend" value="Yes" required />
          <label className="form-check-label">Yes</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="recommend" value="No" required />
          <label className="form-check-label">No</label>
        </div>
      </div>
      <div className="form-group">
        <label>Additional Comments</label>
        <textarea name="comments" className="form-control" rows="4"></textarea>
      </div>
      <div className="text-center mt-4">
        <input type="submit" value="Submit Feedback" className="btn btn-primary" />
      </div>
    </form>
  </div>
</div>}


      {/* Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking? This is a No-refund cancellation.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Cancel Booking</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;
