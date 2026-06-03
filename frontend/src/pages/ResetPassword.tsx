import { useState, type SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthCard } from "../components/auth/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { API_URL } from "../services/api";

export function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email ?? "";
  const code = location.state?.code ?? "";

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
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao redefinir senha");
      }

      setSuccess("Senha atualizada com sucesso");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Nova senha" subtitle="Crie uma nova senha">
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <Input
          type="password"
          showPasswordToggle
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Nova senha"
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
            {loading ? "Atualizando..." : "ATUALIZAR SENHA"}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
