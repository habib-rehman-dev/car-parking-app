import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useGetUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }
  
  if (!user) {
    // send them to login, but remember where they were trying to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // renders whatever child route matched
};

export default ProtectedRoute;