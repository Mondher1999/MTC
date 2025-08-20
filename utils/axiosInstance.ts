import axios from "axios";

const API_BASE =
  process.env.NODE_ENV === "production"
    ? "/api" // production → nginx forwards to backend
    : "http://localhost:4002"; // local dev → direct backend

const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

// Function to refresh token
const refreshTokenRequest = async () => {
    if (typeof window === "undefined") return null; // SSR safe
  
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");
  
    const response = await axios.post(`${API_BASE}/auth/refresh`, { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;
  
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  
    return accessToken;
  };
  

// Axios interceptor
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshTokenRequest();

        // Update axios headers
        api.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest); // retry failed request
      } catch (err) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
