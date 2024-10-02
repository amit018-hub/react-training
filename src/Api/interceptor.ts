// src/interceptors/axiosInterceptor.js
import axios from 'axios';
import { authService } from './auth.service';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
    (config) => {
        const token = authService.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
