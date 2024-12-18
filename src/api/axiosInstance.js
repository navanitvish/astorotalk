// src/api/axiosInstance.js
import axios from 'axios';
// eslint-disable-next-line no-undef
const admin = localStorage.getItem("token");
console.log( "this token",admin);

const axiosInstance = axios.create({
  baseURL: 'https://atro-server.onrender.com', // Replace with your base URL
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${admin}`,
  },
});

export default axiosInstance;
