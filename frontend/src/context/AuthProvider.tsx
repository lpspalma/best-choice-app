import { useState } from "react";
import { AuthContext, type User } from "./auth-context";
import { loginRequest } from "../services/authService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  async function login(email: string, password: string) {
    const data = await loginRequest({ email, password });

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
