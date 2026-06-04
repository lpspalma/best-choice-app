import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { LoadingState } from "../components/ui/LoadingState";

type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingState />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
