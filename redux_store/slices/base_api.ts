import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

axiosClient.interceptors.request.use(function (config) {
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});
