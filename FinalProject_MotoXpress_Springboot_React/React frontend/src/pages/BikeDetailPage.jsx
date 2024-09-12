import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BikeService from '../services/BikeService';

const BikeDetailPage = () => {
    const { id } = useParams();
    const [bike, setBike] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
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

    const handleDelete = async () => {
        try {
            await BikeService.deleteBike(id);
            navigate('/bikes');
        } catch (error) {
            console.error('Failed to delete bike:', error);
        }
    };

    return (
        <div>
            {bike ? (
                <div>
                    <h2>{bike.name}</h2>
                    <p>Model: {bike.model}</p>
                    <p>Price: {bike.price}</p>
                    <button onClick={() => navigate(`/bikes/edit/${id}`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BikeDetailPage;
