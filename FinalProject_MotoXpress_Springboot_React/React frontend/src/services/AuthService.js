import axios from 'axios';

const API_URL = 'http://localhost:8080'; // Replace with your Spring Boot API URL

const AuthService = {
    register: async (user) => {
        return axios.post(`${API_URL}/register`, user);
    },

    login: async (user) => {
        return axios.post(`${API_URL}/login`, user);
    },

    logout: async (user) => {
        return axios.post(`${API_URL}/logout`, user);
    },

    refreshToken: async () => {
        return axios.post(`${API_URL}/refresh_token`, {}, { withCredentials: true });
    }
};

export default AuthService;
