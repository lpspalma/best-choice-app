import { Navigate, Route, Routes } from "react-router";
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

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
    return <p>Loading...</p>;
  }

  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}
