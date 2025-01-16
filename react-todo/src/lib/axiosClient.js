// axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("APIエラー:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
