import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8080", // adjust if needed
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // or use from AuthContext
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;