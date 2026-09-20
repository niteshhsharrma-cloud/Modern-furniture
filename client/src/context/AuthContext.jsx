import { createContext, useContext, useEffect, useState } from "react";
import { authApi } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const { data } = await authApi.me();
      setAdmin(data.admin);
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function login(email, password) {
    const { data } = await authApi.login({ email, password });
    setAdmin(data.admin);
    return data.admin;
  }

  async function logout() {
    await authApi.logout();
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, refresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
