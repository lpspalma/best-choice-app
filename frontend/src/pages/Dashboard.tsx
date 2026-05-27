import { useNavigate } from "react-router";
import { useAuth } from "../context/useAuth";

export function Dashboard() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome, {user?.name ?? user?.email}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
