import { useState, useEffect, useCallback } from "react";
import apiClient, { setAuthToken } from "../api/apiClient";

const TOKEN_KEY = "llai_token";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // sync token with axios
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  // fetch current user
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    setLoading(true);
    apiClient
      .get("/auth/me")
      .then((res) => {
        setUser(res.data?.user || { id: "user-1", name: "Demo User", roles: ["user"] });
      })
      .catch(() => {
        setUser({ id: "user-1", name: "Demo User", roles: ["user"] });
      })
      .finally(() => setLoading(false));
  }, [token]);

  const login = useCallback(async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.post("/auth/login", { username, password });
      const data = res.data;

      if (!data?.token) throw new Error("Auth token missing");

      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setAuthToken(data.token);
      setUser(data.user || { id: "user-1", name: username, roles: ["user"] });

      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken(null);
    setAuthToken(null);
    setUser(null);
  }, []);

  return {
    user,
    token,
    loading,
    error,
    login,
    logout,
    setTokenRaw: (t) => {
      localStorage.setItem(TOKEN_KEY, t);
      setToken(t);
    },
  };
}
