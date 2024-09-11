import React, { useEffect, useState } from 'react';
import RentalRecordService from '../services/RentalRecordService';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
    const [bookings, setBookings] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const { userId, userFullName, role } = user;
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== 'ADMIN') {
            RentalRecordService.getAllRentalRecords()
                .then(response => {
                    const userBookings = response.data.filter(record => record.user.userId === userId);
                    setBookings(userBookings);
                })
                .catch(error => console.error('Error fetching bookings:', error));
        }
    }, [userId, role]);

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            RentalRecordService.deleteRentalRecord(id)
                .then(() => {
                    setBookings(bookings.filter(booking => booking.rentalRecordId !== id));
                    alert('Booking cancelled.');
                })
                .catch(error => console.error('Error deleting booking:', error));
        }
    };

    const calculateTotalCost = (perDayRental, startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return perDayRental * diffDays;
    };

    const formatDate = (dateTime) => {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };
        return new Date(dateTime).toLocaleDateString('en-IN', options);
    };

    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            overflow: 'hidden'
        }}>
            <video
                style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: '-1'
                }}
                autoPlay
                muted
                loop
            >
                <source src="../assets/video1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '20px',
                borderRadius: '8px',
                maxWidth: '800px',
                margin: '0 auto',
                position: 'relative',
                zIndex: '1'
            }}>
                <div style={{
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    <h2>My Profile</h2>
                </div>
                <div style={{
                    marginBottom: '20px'
                }}>
                    <p><strong>Name:</strong> {userFullName}</p>
                </div>
                {role !== 'ADMIN' && (
                    <div style={{
                        marginBottom: '20px'
                    }}>
                        <h3>My Bookings</h3>
                        {bookings.length === 0 ? (
                            <p style={{
                                textAlign: 'center',
                                fontSize: '18px',
                                color: '#555',
                            }}>
                                No bookings done yet.
                            </p>
                        ) : (
                            <ul style={{
                                listStyleType: 'none',
                                padding: '0'
                            }}>
                                {bookings.map(booking => (
                                    <li key={booking.rentalRecordId} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: '20px',
                                        padding: '10px',
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        backgroundColor: '#fff'
                                    }}>
                                        <img
                                            src={booking.bike.bikePhoto || 'https://via.placeholder.com/200x150?text=No+Photo'}
                                            alt={booking.bike.bikeName || 'Bike Photo'}
                                            style={{
                                                width: '200px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                marginRight: '20px'
                                            }}
                                        />
                                        <div style={{
                                            flex: '1'
                                        }}>
                                            <p><strong>Bike Name:</strong> {booking.bike.bikeName}</p>
                                            <p><strong>Bike Number:</strong> {booking.bike.bikeNumber}</p>
                                            <p><strong>Start Date:</strong> {formatDate(booking.rentalStartDate)}</p>
                                            <p><strong>End Date:</strong> {formatDate(booking.rentalEndDate)}</p>
                                            <p><strong>Total Cost:</strong> ₹{calculateTotalCost(booking.bike.perDayRental, booking.rentalStartDate, booking.rentalEndDate).toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(booking.rentalRecordId)}
                                            style={{
                                                backgroundColor: '#dc3545',
                                                color: '#fff',
                                                border: 'none',
                                                padding: '8px 12px',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                                marginLeft: 'auto'
                                            }}
                                        >
                                            Cancel Booking
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
