import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RentalRecordService from '../services/RentalRecordService';
import BikeService from '../services/BikeService';

const Bookings = () => {
    const [bike, setBike] = useState(null);
    const [rentalStartDate, setRentalStartDate] = useState('');
    const [rentalEndDate, setRentalEndDate] = useState('');
    const [bookingDate, setBookingDate] = useState(new Date().toISOString().split('T')[0]);
    const [extraHelmet, setExtraHelmet] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [userId, setUserId] = useState('');
    const [userFullName, setUserFullName] = useState('');
    const [error, setError] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUserId(storedUser.userId);
            setUserFullName(storedUser.userFullName);
        }

        const fetchBike = async () => {
            try {
                const response = await BikeService.getBikeById(id);
                setBike(response.data);
            } catch (error) {
                console.error('Failed to fetch bike:', error);
            }
        };

        fetchBike();
    }, [id]);

    const handleDateChange = () => {
        setError('');
        if (rentalStartDate && rentalEndDate) {
            const start = new Date(rentalStartDate);
            const end = new Date(rentalEndDate);

            if (end < start) {
                setError('End date cannot be before the start date.');
                setTotalCost(0);
                return;
            }

            if (end.toDateString() === start.toDateString()) {
                setError('End date cannot be the same as the start date.');
                setTotalCost(0);
                return;
            }

            const diffInTime = end.getTime() - start.getTime();
            const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
            let cost = diffInDays * bike.perDayRental;
            if (extraHelmet) {
                cost += 500;
            }
            setTotalCost(cost);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (error) {
            alert(error);
            return;
        }

        const rentalRecord = {
            user: { userId: userId },
            bike: { bikeId: bike.bikeId },
            rentalStartDate: rentalStartDate ? new Date(rentalStartDate).toISOString() : null,
            rentalEndDate: rentalEndDate ? new Date(rentalEndDate).toISOString() : null,
            bookingDate: bookingDate ? new Date(bookingDate).toISOString() : null,
            extraHelmet: extraHelmet,
            paymentConfirmation: false
        };

        const options = {
            key: 'rzp_test_zm3iMcpwyuurJQ',
            amount: totalCost * 100,
            currency: 'INR',
            name: 'Bike Rental Service',
            description: `Booking for ${bike.bikeName}`,
            handler: async function (response) {
                try {
                    rentalRecord.paymentConfirmation = true;
                    const apiResponse = await RentalRecordService.createRentalRecord(rentalRecord);
                    console.log('API Response:', apiResponse.data);
                    alert('Payment successful and booking confirmed!');
                    navigate('/bikes');
                } catch (error) {
                    console.error('Failed to create rental record after payment:', error);
                    alert('Payment succeeded, but booking failed. Please contact support.');
                }
            },
            prefill: {
                name: userFullName,
                email: 'xxxx@gmail.com',
                contact: 'XXXXXXXXXX' 
            },
            theme: {
                color: '#007BFF'
            }
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

        razorpay.on('payment.failed', function (response) {
            alert('Payment failed. Please try again.');
        });
    };

    useEffect(() => {
        handleDateChange();
    }, [rentalStartDate, rentalEndDate, extraHelmet, bike]);

    return (
        <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto', display: 'flex', gap: '40px' }}>
            {bike ? (
                <>
                    <div style={{ flex: 1 }}>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="userFullName" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>User Name:</label>
                                <input
                                    type="text"
                                    id="userFullName"
                                    value={userFullName}
                                    readOnly
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: '#f9f9f9' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="bikeName" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Bike Name:</label>
                                <input
                                    type="text"
                                    id="bikeName"
                                    value={bike.bikeName}
                                    readOnly
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: '#f9f9f9' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="bikeNumber" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Bike Number:</label>
                                <input
                                    type="text"
                                    id="bikeNumber"
                                    value={bike.bikeNumber}
                                    readOnly
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: '#f9f9f9' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="perDayRental" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Per Day Rental:</label>
                                <input
                                    type="text"
                                    id="perDayRental"
                                    value={`Rs. ${bike.perDayRental}`}
                                    readOnly
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: '#f9f9f9' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="rentalStartDate" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Rental Start Date:</label>
                                <input
                                    type="date"
                                    id="rentalStartDate"
                                    value={rentalStartDate}
                                    onChange={(e) => { setRentalStartDate(e.target.value); handleDateChange(); }}
                                    required
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="rentalEndDate" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Rental End Date:</label>
                                <input
                                    type="date"
                                    id="rentalEndDate"
                                    value={rentalEndDate}
                                    onChange={(e) => { setRentalEndDate(e.target.value); handleDateChange(); }}
                                    required
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="extraHelmet" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Extra Helmet:</label>
                                <input
                                    type="checkbox"
                                    id="extraHelmet"
                                    checked={extraHelmet}
                                    onChange={(e) => { setExtraHelmet(e.target.checked); handleDateChange(); }}
                                    style={{ marginRight: '10px' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="totalCost" style={{ marginBottom: '5px', color: '#555', fontWeight: '600' }}>Total Cost:</label>
                                <input
                                    type="text"
                                    id="totalCost"
                                    value={`Rs. ${totalCost}`}
                                    readOnly
                                    style={{ padding: '12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px', backgroundColor: '#f9f9f9' }}
                                />
                            </div>
                            {error && <div style={{ color: 'red', fontWeight: '600' }}>{error}</div>}
                            <button type="submit" style={{ padding: '12px', borderRadius: '6px', border: 'none', backgroundColor: '#007BFF', color: '#fff', fontSize: '16px', cursor: 'pointer' }}>Proceed to Payment</button>
                        </form>
                    </div>
                    <div style={{ flex: 1 }}>
                        <img
                            src={bike.bikePhoto}
                            alt={bike.bikeName}
                            style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
                        />
                    </div>
                </>
            ) : (
                <p>Loading bike details...</p>
            )}
        </div>
    );
};

export default Bookings;
