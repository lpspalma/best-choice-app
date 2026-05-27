import { Navigate } from "react-router";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth";

type PublicRouteProps = {
  children: ReactNode;
};

export function PublicRoute({ children }: PublicRouteProps) {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p>Loading...</p>;
  }

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
