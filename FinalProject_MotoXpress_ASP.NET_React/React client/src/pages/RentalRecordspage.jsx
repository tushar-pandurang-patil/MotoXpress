import React, { useState, useEffect } from 'react';
import { getRentalRecords, getBikes, getUsers, getCities } from '../services/api';
import { Table } from 'react-bootstrap';

const RentalRecordspage = () => {
  const [rentalRecords, setRentalRecords] = useState([]);
  const [bikes, setBikes] = useState([]);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);

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
      setRentalRecords(response.data);
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

  const getUserEmail = (userId) => {
    if (!users || users.length === 0) return '';
    const user = users.find(u => u.userId === userId);
    return user ? user.emailId : ''; // Updated to `emailId`
  };

  const getCityName = (cityId) => {
    if (!cities || cities.length === 0) return '';
    const city = cities.find(c => c.cityId === cityId);
    return city ? city.cityName : '';
  };

  

  return (
    <div className="container mt-4">
      <h2>Rental Records</h2>
      <Table bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Bike Name</th>
            <th>Bike Photo</th>
            <th>Per Day Rental</th>
            <th>User Email</th>
            <th>Pickup City</th>
            <th>Dropoff City</th>
            <th>Rental Start Date</th>
            <th>Rental End Date</th>
            <th>Booking Date</th>
            <th>Extra Helmet</th>
            <th>Paid Amount</th>
          </tr>
        </thead>
        <tbody>
          {rentalRecords.map(record => {
            const bikeDetails = getBikeDetails(record.bike.bikeId);
            const userEmail = record.user.emailId; // Directly access user email from the record
            const pickupCityName = record.pickupCity.cityName; // Directly access city name from the record
            const dropOffCityName = record.dropOffCity.cityName; // Directly access city name from the record

            const calculateBookingFee = () => {
              const start = new Date(record.rentalStartDate);
              const end = new Date(record.rentalEndDate);
              if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
          
              const hours = (end - start) / (1000 * 60 * 60);
              const ratePerHour = record.bike.perDayRental/24;
              return hours * ratePerHour;
            };
          
            const bookingFee = calculateBookingFee();
            const cgst = bookingFee * 0.14;
            const sgst = bookingFee * 0.14;
            const extraHelmetCost = record.extraHelmet ? 150 : 0;
            const totalPayable = Math.round(bookingFee + cgst + sgst + extraHelmetCost);

            return (
              <tr key={record.rentalRecordId}>
                <td>{record.rentalRecordId}</td>
                <td>{bikeDetails.name}</td>
                <td><img src={bikeDetails.photo} alt="Bike" style={{ width: '200px' }} /></td>
                <td>{bikeDetails.perDayRental}</td>
                <td>{userEmail}</td>
                <td>{pickupCityName}</td>
                <td>{dropOffCityName}</td>
                <td>{new Date(record.rentalStartDate).toLocaleString()}</td>
                <td>{new Date(record.rentalEndDate).toLocaleString()}</td>
                <td>{new Date(record.bookingDate).toLocaleString()}</td>
                <td>{record.extraHelmet ? 'Yes' : 'No'}</td>
                <td>₹ {totalPayable}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default RentalRecordspage;
