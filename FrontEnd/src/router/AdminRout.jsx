// router/AdminRoute.jsx
import { Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";

const AdminRoute = ({ children }) => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) return null; // ProtectedRoute's loading state already covers this visually

  if (user?.role !== "admin") {
    return  <Navigate to="/dashboard/vehicles" replace />;
  }

  return children;
};

export default AdminRoute;


// DashboardLayout.jsx

const navItems = [
  ...(user?.role === "admin"
    ? [{ label: "Overview", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> }]
    : []),
  { label: "Vehicles", path: "/dashboard/vehicles", icon: <DirectionsCarIcon fontSize="small" /> },
  { label: "Check In", path: "/dashboard/check-in", icon: <LoginIcon fontSize="small" /> },
  { label: "Check Out", path: "/dashboard/check-out", icon: <LogoutIcon fontSize="small" /> },
  { label: "Sessions", path: "/dashboard/sessions", icon: <HistoryIcon fontSize="small" /> },
  ...(user?.role === "admin"
    ? [{ label: "Add User", path: "/dashboard/users/new", icon: <PersonAddIcon fontSize="small" /> }]
    : []),
];