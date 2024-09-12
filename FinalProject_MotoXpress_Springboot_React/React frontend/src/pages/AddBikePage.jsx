import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BikeService from '../services/BikeService';

const AddBikePage = () => {
    const [bike, setBike] = useState({
        bikeName: '',
        bikeNumber: '',
        bikeDescription: '',
        perDayRental: '',
        bikePhoto: '',
        isAvailable: true,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBike({
            ...bike,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await BikeService.createBike(bike);
            navigate('/bikes');
        } catch (error) {
            console.error('Failed to add bike:', error);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Add Bike</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="bikeName" style={{ marginBottom: '5px', color: '#555' }}>Bike Name:</label>
                    <input
                        type="text"
                        id="bikeName"
                        name="bikeName"
                        value={bike.bikeName}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="bikeNumber" style={{ marginBottom: '5px', color: '#555' }}>Bike Number:</label>
                    <input
                        type="text"
                        id="bikeNumber"
                        name="bikeNumber"
                        value={bike.bikeNumber}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="bikeDescription" style={{ marginBottom: '5px', color: '#555' }}>Description:</label>
                    <textarea
                        id="bikeDescription"
                        name="bikeDescription"
                        value={bike.bikeDescription}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px', resize: 'vertical' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="perDayRental" style={{ marginBottom: '5px', color: '#555' }}>Per Day Rental:</label>
                    <input
                        type="number"
                        id="perDayRental"
                        name="perDayRental"
                        value={bike.perDayRental}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label htmlFor="bikePhoto" style={{ marginBottom: '5px', color: '#555' }}>Bike Photo (URL):</label>
                    <input
                        type="text"
                        id="bikePhoto"
                        name="bikePhoto"
                        value={bike.bikePhoto}
                        onChange={handleChange}
                        required
                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '16px' }}
                    />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <label htmlFor="isAvailable" style={{ color: '#555' }}>Available:</label>
                    <input
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        checked={bike.isAvailable}
                        onChange={handleChange}
                        style={{ transform: 'scale(1.2)' }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        borderRadius: '4px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                >
                    Add Bike
                </button>
            </form>
        </div>
    );
};

export default AddBikePage;
