import { useState } from "react";
import { registerRequest } from "../services/authService";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router";
import { AuthCard } from "../components/auth/AuthCard";

export function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      await registerRequest({ name, email, password });
      setSuccess("Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Could not create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Criar conta" subtitle="Entre para o Bolão da Copa">
      <form onSubmit={handleSubmit} className="w-full mt-6 space-y-4">
        <Input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome completo"
        />

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

        <Input
          type="password"
          showPasswordToggle
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirmar senha"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}
        {success && <p className="text-sm text-green-400">{success}</p>}

        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "CRIAR CONTA"}
          </Button>
        </div>
      </form>

      <p className="mt-6 text-center text-xs text-white/50">
        Já tem uma conta?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="cursor-pointer text-green-400 hover:text-green-300"
        >
          Entrar
        </button>
      </p>
    </AuthCard>
  );
}
