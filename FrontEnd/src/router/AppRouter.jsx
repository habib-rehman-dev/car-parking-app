import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/SubRoutes/Dashboard";
import Login from "../pages/AuthPages/Login";
import Home from "../pages/Home";
import Register from '../pages/AuthPages/Register'
import CheckIn from "../pages/SubRoutes/CheckIn";
import SessionList from "../pages/SubRoutes/SessionList";
import History from "../pages/SubRoutes/History";
import Protect from "./Protect";
export const AppRouter = () => {
  return (
    // <ErrorBoundary fallbackRender={fallbackRender}>
    // <Layout>

    <Routes>
      <Route
        path="/"
        element={
          <Protect>
            <Home />
          </Protect>
        }
      >
        <Route
          index
          element={
            <Protect>
              <Dashboard />{" "}
            </Protect>
          }
        />
        <Route path="checkin" element={<CheckIn />} />
        <Route path="active" element={<SessionList />} />
        <Route path="history" element={<History />} />
        <Route path="*" element={<SessionList />} />
      </Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
    </Routes>
    // </Layout>

    // </ErrorBoundary>
  );
};
