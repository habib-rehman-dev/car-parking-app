import { Routes, Route } from "react-router-dom";

import Home from "../page/Home";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./Protect";
import DashboardLayout from "../features/dashboard/DashboardLayout";
import Overview from "../features/dashboard/pages/OverView";
import VehicleList from "../features/dashboard/pages/VehicleList";
import CheckIn from "../features/dashboard/pages/ChckIn";
// import these once you build them:
// import VehicleList from "../features/vehicles/pages/VehicleList";
// import CheckIn from "../features/parking-sessions/pages/CheckIn";
// import CheckOut from "../features/parking-sessions/pages/CheckOut";
// import SessionHistory from "../features/parking-sessions/pages/SessionHistory";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes — anything nested here requires login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="check-in" element={<CheckIn />} />
          {/* <Route path="check-out" element={<CheckOut />} /> */}
          {/* <Route path="sessions" element={<SessionHistory />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRouter;