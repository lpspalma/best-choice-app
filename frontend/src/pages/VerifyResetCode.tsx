import { useState, type SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { AuthCard } from "../components/auth/AuthCard";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { API_URL } from "../services/api";

export function VerifyResetCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email ?? "";

  const [code, setCode] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (!email) {
      setError("E-mail não encontrado. Solicite um novo código.");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/verify-reset-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code,
        }),
      });

      if (!response.ok) {
        throw new Error("Código inválido ou expirado");
      }

      navigate("/reset-password", {
        state: {
          email,
          code,
        },
      });
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
    <AuthCard
      title="Validar código"
      subtitle="Digite o código enviado para seu e-mail"
    >
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <Input
          type="text"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          placeholder="Código"
        />

        {error && <p className="text-sm text-app-danger">{error}</p>}

        <div className="flex justify-center">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Validando..." : "VALIDAR"}
          </Button>
        </div>
      </form>
    </AuthCard>
  );
}
