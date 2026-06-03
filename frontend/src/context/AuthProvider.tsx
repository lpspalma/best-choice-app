import { useState, useEffect } from "react";
import { AuthContext, type User } from "./auth-context";
import {
  getMeRequest,
  loginRequest,
  googleLoginRequest,
} from "../services/authService";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const userData = await getMeRequest(token);

        setUser(userData);
      } catch {
        localStorage.removeItem("token");

        setToken(null);
        setUser(null);
      } finally {
        setIsAuthLoading(false);
      }
    }

    restoreSession();
  }, [token]);

  async function login(email: string, password: string) {
    const data = await loginRequest({ email, password });

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);
  }

  async function loginWithGoogle(credential: string) {
    const data = await googleLoginRequest(credential);

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
    setIsAuthLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        loginWithGoogle,
        logout,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
