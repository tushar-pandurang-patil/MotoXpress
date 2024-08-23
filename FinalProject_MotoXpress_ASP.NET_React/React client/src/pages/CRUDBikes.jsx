import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { Button } from 'react-bootstrap';
import BikeList from '../components/BikeList';
import BikeFormModal from '../components/BikeFormModal';

const CRUDBikes = () => {
  const [bikes, setBikes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBike, setCurrentBike] = useState({
    bikeName: '',
    bikeNumber: '',
    bikeDescription: '',
    perDayRental: '',
    bikePhoto: '',
    availableCityId: '',
    isAvailable: 1
  });

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:7270/api/Bikes');
      setBikes(response.data);
    } catch (error) {
      console.error("Error fetching bikes!", error);
    }
  };

  const handleChange = (e) => {
    setCurrentBike({
      ...currentBike,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await axiosInstance.put(`https://localhost:7270/api/Bikes/${currentBike.bikeId}`, currentBike);
    } else {
      await axiosInstance.post('https://localhost:7270/api/Bikes', currentBike);
    }

    setShowModal(false);
    fetchBikes();
  };

  const handleEdit = (bike) => {
    setCurrentBike(bike);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAdd = () => {
    setCurrentBike({
      bikeName: '',
      bikeNumber: '',
      bikeDescription: '',
      perDayRental: '',
      bikePhoto: '',
      availableCityId: '',
      isAvailable: 1
    });
    setIsEditing(false);
    setShowModal(true);
  };

  const deleteBike = async (id) => {
    try {
      await axiosInstance.delete(`https://localhost:7270/api/Bikes/${id}`);
      fetchBikes();
    } catch (error) {
      console.error('Error deleting bike!', error);
    }
  };

  return (
    <div className="bikes-page">
      <h1>Bikes Management</h1>
      <Button variant="primary" onClick={handleAdd} className="mt-4">Add Bike</Button>

      <BikeList bikes={bikes} onEdit={handleEdit} onDelete={deleteBike} />

      <BikeFormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        bike={currentBike}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default CRUDBikes;
