import { Routes, Route } from "react-router-dom";


import Home from "../page/Home";

import Register from "../features/auth/pages/Register";
import Dashboard from "../page/Dashboard";
import Login from "../features/auth/pages/Login";
import ProtectedRoute from "./Protect";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes — anything nested here requires login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* add more protected pages here, e.g. /bookings, /profile */}
      </Route>
    </Routes>
  );
};

export default AppRouter;