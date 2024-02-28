import axios from "axios";
import { BASE_URL } from "@/config.ts";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "access-control-allow-origin": "http://localhost:5000",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response?.data,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
