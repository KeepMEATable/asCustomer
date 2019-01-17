import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.keepmeatable.dev:8443/',
    timeout: 1000,
});

export default api;
