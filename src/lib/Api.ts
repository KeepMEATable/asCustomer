import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.VUE_APP_API_ENTRYPOINT}/`,
    timeout: 1000,
});

export default api;
