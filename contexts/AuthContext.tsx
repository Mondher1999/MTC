"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService, logout as logoutService } from "@/services/authService";
import api from "@/utils/axiosInstance";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      // ✅ Prevent SSR errors
      if (typeof window === "undefined") return;
  
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
  
      try {
        // ✅ Re-apply token after reload
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
  
        // (optional) Clear invalid tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setLoading(false);
      }
    };
  
    fetchUser();
  }, []);
    

  const login = async (email: string, password: string) => {
    const data = await loginService(email, password);

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    api.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;

    setUser(data.user);
  };

  const logout = async () => {
    await logoutService();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
