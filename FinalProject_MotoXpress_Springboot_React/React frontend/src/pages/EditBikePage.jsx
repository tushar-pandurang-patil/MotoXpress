import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BikeService from '../services/BikeService';

const EditBikePage = () => {
    const { id } = useParams(); // Extract the bike ID from the URL 
    const [bike, setBike] = useState({
        bikeName: '',
        bikeNumber: '',
        bikeDescription: '',
        perDayRental: '',
        bikePhoto: '',
        isAvailable: true,
        AvailableCityId: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBike = async () => {
            try {
                const response = await BikeService.getBikeById(id); // Fetch bike data from the backend
                setBike(response.data); // Update state with fetched bike data
            } catch (error) {
                console.error('Failed to fetch bike:', error);
                // Handle errors here (e.g., show a message to the user)
            }
        };

        fetchBike(); 
    }, [id]); 

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBike(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await BikeService.updateBike(id, bike); 
            navigate('/bikes'); 
        } catch (error) {
            console.error('Failed to update bike:', error);
            
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Edit Bike</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="bikeName" style={styles.label}>Bike Name:</label>
                    <input
                        type="text"
                        id="bikeName"
                        name="bikeName"
                        value={bike.bikeName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="bikeNumber" style={styles.label}>Bike Number:</label>
                    <input
                        type="text"
                        id="bikeNumber"
                        name="bikeNumber"
                        value={bike.bikeNumber}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        readOnly
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="bikeDescription" style={styles.label}>Description:</label>
                    <textarea
                        id="bikeDescription"
                        name="bikeDescription"
                        value={bike.bikeDescription}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="perDayRental" style={styles.label}>Per Day Rental:</label>
                    <input
                        type="number"
                        id="perDayRental"
                        name="perDayRental"
                        value={bike.perDayRental}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="bikePhoto" style={styles.label}>Bike Photo (URL):</label>
                    <input
                        type="text"
                        id="bikePhoto"
                        name="bikePhoto"
                        value={bike.bikePhoto}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="isAvailable" style={styles.label}>Available:</label>
                    <input
                        type="checkbox"
                        id="isAvailable"
                        name="isAvailable"
                        checked={bike.isAvailable}
                        onChange={handleChange}
                        style={styles.checkbox}
                    />
                </div>
                
                <button
                    type="submit"
                    style={styles.button}
                >
                    Update Bike
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        color: '#555',
    },
    input: {
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    checkbox: {
        transform: 'scale(1.2)',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default EditBikePage;
