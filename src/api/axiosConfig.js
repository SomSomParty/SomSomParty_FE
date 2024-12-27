// src/api/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/festivals", // 백엔드 API의 기본 URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 필요한 경우 인터셉터 추가 (옵션)
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default instance;