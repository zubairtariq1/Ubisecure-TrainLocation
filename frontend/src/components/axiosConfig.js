import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000', // My backend URL
    timeout: 5000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;
