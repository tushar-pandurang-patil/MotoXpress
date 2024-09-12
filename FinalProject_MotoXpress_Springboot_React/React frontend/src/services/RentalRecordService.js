import axios from 'axios';

const API_URL = 'http://localhost:8080/api/rentalrecords';

const RentalRecordService = {
    getAllRentalRecords: async () => {
        return axios.get(API_URL);
    },

    getRentalRecordById: async (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    createRentalRecord: async (record) => {
        const token = localStorage.getItem('token');
        console.log('JWT Token:',token,record);
        
        return await axios.post(API_URL, record, { 
            headers: { 
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            } 
        });
    },

    updateRentalRecord: async (id, record) => {
        return axios.put(`${API_URL}/${id}`, record, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    deleteRentalRecord: async (id) => {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    }
};

export default RentalRecordService;
