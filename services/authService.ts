import api from "@/utils/axiosInstance"; // Use your configured instance

export const login = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    
    const { accessToken, refreshToken } = response.data; // remove .tokens
    
    // Store tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  
    // Set default Authorization header for future requests
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  
    // Return user data and tokens
    return {
      user: response.data.user,
      accessToken,
      refreshToken,
    };
  };
  

  export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token stored");
  
    const response = await api.post("/auth/refresh", { refreshToken });
    const { accessToken, refreshToken: newRefreshToken } = response.data.tokens;
  
    // Save new tokens
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  
    // Update axios default headers
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  
    return { accessToken, refreshToken: newRefreshToken };
  };

  
  
  

export const logout = async () => {
    await api.post("/auth/logout");
    // remove tokens from localStorage if you store them
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };