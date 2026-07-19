// features/dashboard/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IconButton, Avatar, Tooltip } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

import { useGetUser } from "../../hooks/useGetUser";
import { useLogout } from "../auth/hooks/useLogout";

const navItems = [
  { label: "Overview", path: "/dashboard", icon: <DashboardIcon fontSize="small" /> },
  { label: "Parked", path: "/dashboard/vehicles", icon: <DirectionsCarIcon fontSize="small" /> },
  { label: "Check In", path: "/dashboard/check-in", icon: <LoginIcon fontSize="small" /> },
  { label: "Check Out", path: "/dashboard/check-out", icon: <LogoutIcon fontSize="small" /> },
  { label: "Sessions", path: "/dashboard/sessions", icon: <HistoryIcon fontSize="small" /> },
  { label: "Register", path: "/dashboard/register", icon: <HistoryIcon fontSize="small" /> },
];

const DashboardLayout = () => {
  const { data: user } = useGetUser();
  const { mutate: logout } = useLogout();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSidebarOpen(false)

  }, []);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen w-full bg-[url('/bg-parking.jpg')] bg-cover bg-scroll md:bg-fixed bg-center">
      <div className="min-h-screen w-full bg-black/40 flex">

        {/* ── SIDEBAR ─────────────────────────────────────────── */}
        <aside
          className={`fixed md:static z-40 top-0 left-0 h-screen w-64
                      bg-white/10 backdrop-blur-xl border-r border-white/20
                      p-5 flex flex-col transition-transform duration-300
                      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        >
          <div className="flex items-center  justify-between mb-8">
            <div className="flex items-center gap-2">
              <LocalParkingIcon className="text-blue-400" />
              <span className="text-white font-bold text-lg">ParkManage</span>
            </div>
            {/* was: sx={{ display: { xs: "inline-flex", md: "none" } }} — MUI's md (900px)
                didn't match the sidebar's Tailwind md (768px). Now both use the same breakpoint. */}
            <IconButton
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
              size="small"
            >
              <CloseIcon className="text-white md:sr-only"  fontSize="small" />
            </IconButton>
          </div>

          <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                              transition-all
                              ${
                                isActive
                                  ? "bg-white/25 text-white"
                                  : "text-white/70 hover:bg-white/10 hover:text-white"
                              }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-white/20 flex items-center gap-3">
            <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>
              {user?.name?.[0]?.toUpperCase()}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user?.name}</p>
              <p className="text-white/50 text-xs truncate">{user?.role}</p>
            </div>
            <Tooltip title="Logout">
              <IconButton onClick={() => logout()} size="small">
                <LogoutIcon className="text-white/70" fontSize="small" />
              </IconButton>
            </Tooltip>
          </div>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ── MAIN COLUMN ─────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">
          <header
            className="sticky top-0 z-20 flex items-center justify-between
                       px-6 py-4 bg-white/10 backdrop-blur-xl border-b border-white/20"
          >
            <div className="flex items-center gap-3">
              {/* was: sx={{ display: { xs: "inline-flex", md: "none" } }} — same fix as above */}
              <IconButton
                className="md:hidden"
                onClick={() => setSidebarOpen(true)}
                size="small"
              >
                <MenuIcon className="text-white md:sr-only" />
              </IconButton>
              <h1 className="text-white text-lg  font-semibold">
                {navItems.find((item) => item.path === location.pathname)?.label || "Dashboard"}
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Avatar sx={{ width: 32, height: 32, bgcolor: "primary.main" }}>
                {user?.name?.[0]?.toUpperCase()}
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;