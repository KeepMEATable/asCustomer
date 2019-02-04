import axios from 'axios';

let isRefreshing = false;
let refreshSubscribers: any[] = [];

function onAccessTokenFetched(token: any) {
  refreshSubscribers = refreshSubscribers.filter((callback) => callback(token));
}

function addSubscriber(callback: any) {
  refreshSubscribers.push(callback);
}

function refreshAccessToken() {
  return axios.post(`${process.env.VUE_APP_API_ENTRYPOINT}/login_check`, {
    username: process.env.VUE_APP_API_LOGIN,
    password: process.env.VUE_APP_API_PASSWORD,
  });
}

const loggedIn = localStorage.getItem(process.env.VUE_APP_API_LOCALSTORAGE_KEY);
if (null !== loggedIn) {
  const user = JSON.parse(loggedIn);
  axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
}

axios.defaults.headers.post['Content-Type'] = 'application/json';

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_ENTRYPOINT}/`,
  timeout: 1000,
});

api.interceptors.response.use((response: any) => {
  return response;
}, (error: any) => {
  const { config, response: { status } } = error;
  const originalRequest = config;

  if (status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;
      refreshAccessToken().then(({data}: any) => {
        isRefreshing = false;
        axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
        localStorage.setItem(process.env.VUE_APP_API_LOCALSTORAGE_KEY, JSON.stringify(data));
        onAccessTokenFetched(data.token);
      });
    }

    return new Promise((resolve) => {
      addSubscriber((token: any) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        resolve(axios(originalRequest));
      });
    });
  }
  return Promise.reject(error);
});

export default api;
