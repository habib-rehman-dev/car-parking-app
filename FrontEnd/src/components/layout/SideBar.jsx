import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { FaRegistered, FaSignOutAlt } from "react-icons/fa";
import AuthCont from "../../context/auth.context";
import { useContext } from "react";

const Sidebar = () => {
  let { logout, isLogedIn } = useContext(AuthCont);
  const navItems = [
    {
      to: ROUTES.DASHBOARD,
      label: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
      to: ROUTES.CHECK_IN,
      label: "Check In",
      icon: "M13 10V3L4 14h7v7l9-11h-5z",
    },
    {
      to: ROUTES.ACTIVE,
      label: "Active Sessions",
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
    },
    {
      to: ROUTES.HISTORY,
      label: "History",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },
  ];

  return (
    <nav className="w-64 bg-white shadow-lg min-h-screen p-4">
      <ul className="space-y-2">
        {/* <Link to='checkin'>h</Link> */}
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              {item.label}
            </NavLink>
          </li>
        ))}
        <li
          key={"-=-=`^`=-=-"}
          onClick={logout}
          className={
            "flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
          }
        >
          <FaSignOutAlt />
          LogOut
        </li>
        {isLogedIn && (
          <li
            key={"register"}
            className={
              "flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
            }
          >
            <Link to={'/register'}><FaRegistered />
            Register</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Sidebar;
