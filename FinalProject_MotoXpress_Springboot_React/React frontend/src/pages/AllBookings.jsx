import React, { useState, useEffect } from 'react';
import RentalRecordService from '../services/RentalRecordService';

const BookingsPage = () => {
    const [rentalRecords, setRentalRecords] = useState([]);

    useEffect(() => {
        fetchRentalRecords();
    }, []);

    const fetchRentalRecords = async () => {
        try {
            const response = await RentalRecordService.getAllRentalRecords();
            setRentalRecords(response.data);
        } catch (error) {
            console.error('Error fetching rental records:', error);
        }
    };

    const deleteRentalRecord = async (id) => {
        const confirmed = window.confirm('Are you sure you want to delete this booking?');
        if (confirmed) {
            try {
                await RentalRecordService.deleteRentalRecord(id);
                setRentalRecords(rentalRecords.filter(record => record.rentalRecordId !== id));
                window.alert('Booking deleted successfully.');
            } catch (error) {
                console.error('Error deleting rental record:', error);
                window.alert('Failed to delete the booking.');
            }
        }
    };

    const calculateTotalCost = (startDate, endDate, perDayRental) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
        return days * perDayRental;
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>All Rental Records</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.th}>User Name</th>
                        <th style={styles.th}>Bike Name</th>
                        <th style={styles.th}>Bike Number</th>
                        <th style={styles.th}>Rental Start Date</th>
                        <th style={styles.th}>Rental End Date</th>
                        <th style={styles.th}>Total Cost</th>
                        <th style={styles.th}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rentalRecords.map(record => (
                        <tr key={record.rentalRecordId} style={styles.tr}>
                            <td style={styles.td}>{record.user.userFullName}</td>
                            <td style={styles.td}>{record.bike.bikeName}</td>
                            <td style={styles.td}>{record.bike.bikeNumber}</td>
                            <td style={styles.td}>{new Date(record.rentalStartDate).toLocaleDateString()}</td>
                            <td style={styles.td}>{new Date(record.rentalEndDate).toLocaleDateString()}</td>
                            <td style={styles.td}>
                                Rs.{calculateTotalCost(record.rentalStartDate, record.rentalEndDate, record.bike.perDayRental).toFixed(2)}
                            </td>
                            <td style={styles.td}>
                                <button 
                                    style={styles.deleteButton} 
                                    onClick={() => deleteRentalRecord(record.rentalRecordId)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
    },
    th: {
        backgroundColor: '#007BFF',
        color: 'white',
        padding: '10px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tr: {
        backgroundColor: '#fff',
        transition: 'background-color 0.3s ease',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    deleteButton: {
        backgroundColor: '#FF4D4D',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
};

export default BookingsPage;
