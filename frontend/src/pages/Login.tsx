import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthCard } from "../components/auth/AuthCard";
import { GoogleLogin } from "@react-oauth/google";

export function Login() {
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin(credential?: string) {
    if (!credential) {
      setError("Google login failed");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await loginWithGoogle(credential);
      navigate("/dashboard");
    } catch {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Entrar" subtitle="Acesse sua conta no Bolão da Copa">
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-mail"
        />

        <Input
          type="password"
          showPasswordToggle
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Senha"
        />

        {error && <p className="text-sm text-app-danger">{error}</p>}

        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "ENTRAR"}
          </Button>
        </div>
        {googleClientId && googleClientId !== "your_google_client_id" && (
          <>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-app-border" />
              <span className="text-xs text-app-muted">ou</span>
              <div className="h-px flex-1 bg-app-border" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={(response) => handleGoogleLogin(response.credential)}
                onError={() => setError("Google login failed")}
              />
            </div>
          </>
        )}
      </form>

      <div className="mt-4 flex flex-col items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/forgot-password")}
          className="text-xs"
        >
          Esqueci minha senha
        </Button>

        <p className="text-center text-xs text-app-muted">
          Não tem uma conta?{" "}
          <Button
            variant="ghost"
            type="button"
            onClick={() => navigate("/register")}
            className="cursor-pointer text-app-primary hover:text-app-primaryHover text-xs"
          >
            Criar conta
          </Button>
        </p>
      </div>
    </AuthCard>
  );
}
