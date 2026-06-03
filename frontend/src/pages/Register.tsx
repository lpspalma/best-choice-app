import { useState, type SyntheticEvent } from "react";
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

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    if (password !== confirmPassword) {
      setError("Senha devem ser iguais");
      return;
    }
    setLoading(true);

    try {
      await registerRequest({ name, email, password });
      setSuccess("Conta criada com sucesso");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch {
      setError("Não foi possível criar a conta");
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

        {error && <p className="text-sm text-app-danger">{error}</p>}
        {success && <p className="text-sm text-app-success">{success}</p>}

        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Criando conta..." : "CRIAR CONTA"}
          </Button>
        </div>
      </form>

      <div className="mt-4 w-full text-center">
        <span className="text-xs text-app-muted">Já tem uma conta? </span>

        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate("/login")}
          className="inline-flex p-0 text-xs text-app-primary hover:text-app-primaryHover"
        >
          Entrar
        </Button>
      </div>
    </AuthCard>
  );
}
