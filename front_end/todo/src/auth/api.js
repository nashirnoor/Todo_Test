
import axios from 'axios';


export const baseURL ='http://localhost:8000/api';


export const axi = axios.create({
    baseURL
})

export const authAxios = axios.create({
    baseURL
})

authAxios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);