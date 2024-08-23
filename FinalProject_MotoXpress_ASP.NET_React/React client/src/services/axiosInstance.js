import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7270/api/', // Your API base URL
    // Disable SSL verification for development only
    //httpsAgent: new https.Agent({ rejectUnauthorized: false })
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(config.headers.Authorization);
            
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
