import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";
import { LoadingState } from "../components/ui/LoadingState";

type PublicRouteProps = {
  children: ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps) {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingState />;
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
