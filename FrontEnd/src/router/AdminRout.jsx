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


