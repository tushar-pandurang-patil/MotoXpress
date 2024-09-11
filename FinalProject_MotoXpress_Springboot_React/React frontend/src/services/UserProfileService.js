import axios from 'axios';

const API_URL = 'http://localhost:8080/api/userprofiles';

const UserProfileService = {
    getAllUserProfiles: async () => {
        return axios.get(API_URL);
    },

    getUserProfileById: async (id) => {
        return axios.get(`${API_URL}/${id}`);
    },

    createUserProfile: async (profile) => {
        return axios.post(API_URL, profile, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    updateUserProfile: async (id, profile) => {
        return axios.put(`${API_URL}/${id}`, profile, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    },

    deleteUserProfile: async (id) => {
        return axios.delete(`${API_URL}/${id}`, { 
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } 
        });
    }
};

export default UserProfileService;
