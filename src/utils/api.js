import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:5000/api", // Sesuaikan dengan backend Anda
    withCredentials: true, // Untuk menangani cookie sesi
});

export default api;
