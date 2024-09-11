import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bikes';

const BikeService = {
    getAllBikes: async () => {
        return axios.get(API_URL);
    },
    
    getBikeById: async (id) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('Bike Data:',id);
    
        return axios.get(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${token}` } 
        });
    },

    createBike: async (bike) => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);
        console.log('Bike Data:', bike);
    
        return axios.post(API_URL, bike, { 
            headers: { 'Authorization': `Bearer ${token}` } 
        });
    },

    updateBike: async (id, bike) => {
        return axios.put(`${API_URL}/${id}`, bike, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    deleteBike: async (id) => {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    }
};

export default BikeService;
