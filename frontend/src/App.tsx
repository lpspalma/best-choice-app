import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuth } from "./context/useAuth";
import { Pools } from "./pages/Pools";
import { Profile } from "./pages/Profile";
import { CreatePool } from "./pages/CreatePool";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyResetCode } from "./pages/VerifyResetCode";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AuthLayout } from "./layouts/AuthLayout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route
        element={
          <PublicRoute>
            <AuthLayout />
          </PublicRoute>
        }
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset-code" element={<VerifyResetCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pools" element={<Pools />} />
        <Route path="/create-pool" element={<CreatePool />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

function HomeRedirect() {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p>Carregando...</p>;
  }

  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}
