import { useState } from "react";
import type { SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { AuthCard } from "../components/auth/AuthCard";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

        {error && <p className="text-sm text-red-400">{error}</p>}

        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "ENTRAR"}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-white/50">
        Não tem uma conta?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
          className="cursor-pointer text-green-400 hover:text-green-300"
        >
          Criar conta
        </button>
      </p>
    </AuthCard>
  );
}
