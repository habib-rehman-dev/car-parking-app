import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import Register from "../features/dashboard/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./Protect";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Overview from "../features/dashboard/pages/OverView";
import VehicleList from "../features/dashboard/pages/Parked";
import CheckIn from "../features/dashboard/pages/ChckIn";
import CanNotAdminAccess from "../page/CanNotAdminAccess";
import AdminRoute from "./AdminRout";
import Checout from "../features/dashboard/pages/Checout";
import SessionHistory from "../features/dashboard/pages/SessionHistory";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/denied" element={<CanNotAdminAccess />} />

      {/* Protected routes — anything nested here requires login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <AdminRoute>
                <Overview />
              </AdminRoute>
            }
          />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="check-in" element={<CheckIn />} />

          {/* Admin-only — nested guard inside the already-logged-in guard */}
          <Route
            path="register"
            element={
              <AdminRoute>
                <Register />
              </AdminRoute>
            }
          />

          <Route path="check-out" element={<Checout />} />
          <Route path="sessions" element={<SessionHistory />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;
