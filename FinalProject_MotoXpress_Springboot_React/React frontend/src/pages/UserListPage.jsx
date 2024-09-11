import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../services/UserService';

const UserProfilePage = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserService.getUserById(id);
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user:', error);
            }
        };

        fetchUser();
    }, [id]);

    const handleDelete = async () => {
        try {
            await UserService.deleteUser(id);
            navigate('/users');
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>{user.username}</h2>
                    <p>Email: {user.email}</p>
                    <button onClick={() => navigate(`/users/edit/${id}`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfilePage;
