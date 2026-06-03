import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router";
import { AuthCard } from "../components/auth/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { API_URL } from "../services/api";

export function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await fetch(`${API_URL}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setSuccess("Código enviado");

      setTimeout(() => {
        navigate("/verify-reset-code", {
          state: { email },
        });
      }, 1000);
    } catch {
      setError("Erro ao enviar código");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Recuperar senha" subtitle="Digite seu e-mail">
      <form onSubmit={handleSubmit} className="mt-2 w-full space-y-4">
        <Input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="E-mail"
        />

        {error && <p className="text-sm text-app-danger">{error}</p>}
        {success && <p className="text-app-success text-sm">{success}</p>}

        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Enviando..." : "ENVIAR CÓDIGO"}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
