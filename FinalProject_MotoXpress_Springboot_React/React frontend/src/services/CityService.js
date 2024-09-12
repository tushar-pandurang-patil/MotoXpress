import axios from 'axios';

const API_URL = 'http://localhost:8080/api/cities';

const CityService = {
    getAllCities: async () => {
        return axios.get(API_URL);
    },

    getCityById: async (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    createCity: async (city) => {
        return axios.post(API_URL, city, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    updateCity: async (id, city) => {
        return axios.put(`${API_URL}/${id}`, city, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    deleteCity: async (id) => {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    }
};

export default CityService;
