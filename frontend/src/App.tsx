import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { PublicRoute } from "./routes/PublicRoute";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { useAuth } from "./context/useAuth";
import { Profile } from "./pages/Profile";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyResetCode } from "./pages/VerifyResetCode";
import { ForgotPassword } from "./pages/ForgotPassword";
import { AuthLayout } from "./layouts/AuthLayout";
import { MyGuesses } from "./pages/MyGuesses";
import { TodayGames } from "./pages/TodayGames";
import { Games } from "./pages/Games";
import { UserGuesses } from "./pages/UserGuesses";
import { WorldCupTable } from "./pages/WorldCupTable";
import { Results } from "./pages/Results";
import { Ranking } from "./pages/Ranking";
import { Rules } from "./pages/Rules";
import { LoadingState } from "./components/ui/LoadingState";

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
        <Route path="/my-guesses" element={<MyGuesses />} />
        <Route path="/today-games" element={<TodayGames />} />
        <Route path="/games" element={<Games />} />
        <Route path="/user-guesses" element={<UserGuesses />} />
        <Route path="/world-cup-table" element={<WorldCupTable />} />
        <Route path="/results" element={<Results />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}

function HomeRedirect() {
  const { token, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <LoadingState />;
  }

  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}
