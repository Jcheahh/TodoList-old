/* eslint-disable no-underscore-dangle */
import axios from "axios";

const http = axios.create({
    baseURL: "http://localhost:4567",
});

http.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error),
);

export default http;
