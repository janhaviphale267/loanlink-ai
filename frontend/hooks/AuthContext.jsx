import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // DEV DEFAULTS (can be wired to real auth later)
  const [user, setUser] = useState({
    isAuthenticated: true,
    role: "customer", // "admin" | "customer"
    name: "Rajesh Kumar",
  });

  function login(mockUser) {
    setUser({ ...mockUser, isAuthenticated: true });
  }

  function logout() {
    setUser({ isAuthenticated: false });
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
