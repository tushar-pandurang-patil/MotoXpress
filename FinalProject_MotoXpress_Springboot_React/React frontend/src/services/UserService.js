import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const UserService = {
    getAllUsers: async () => {
        return axios.get(API_URL, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    getUserById: async (id) => {
        return axios.get(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    createUser: async (user) => {
        return axios.post(API_URL, user, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    updateUser: async (id, user) => {
        return axios.put(`${API_URL}/${id}`, user, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    deleteUser: async (id) => {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    }
};

export default UserService;
