import { Link } from "react-router-dom";
import { useState } from "react";
import { Avatar, Menu, MenuItem, IconButton, Divider, ListItemIcon } from "@mui/material";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LogoutIcon from "@mui/icons-material/Logout";
import useGetme from "../../features/auth/hooks/useGetme";
// import {useLogout} from "../../features/auth/hooks/useLogout";

const Header = () => {
  const { data: user, isLoading } = useGetme();
//   const { mutate: logout } = useLogout();
  console.log("Header user:", user); 
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    // logout();
  };

  return (
    <header className="sticky top-0 z-50 p-4">
      <div
        className="flex justify-between items-center px-6 py-3
                   bg-white/20 backdrop-blur-lg
                   border border-white/30
                   shadow-lg shadow-black/5
                   rounded-2xl"
      >
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <LocalParkingIcon className="text-blue-600" fontSize="large" />
          <h1 className="text-xl font-bold text-gray-800">Parking Management</h1>
        </div>

        {/* Nav links */}
        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Dashboard
          </Link>

          {/* Auth section — swaps based on login state */}
          {isLoading ? (
            <div className="w-9 h-9 rounded-full bg-gray-300/50 animate-pulse" />
          ) : user ? (
            <>
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar
                  alt={user.name}
                  src={user.avatarUrl}
                  sx={{ width: 36, height: 36, bgcolor: "primary.main" }}
                >
                  {user.name?.[0]?.toUpperCase()}
                </Avatar>
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleMenuClose}
                slotProps={{
                  paper: {
                    className: "backdrop-blur-lg bg-white/80",
                  },
                }}
              >
                <MenuItem disabled className="opacity-100">
                  <span className="text-sm text-gray-600">{user.email}</span>
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/dashboard" onClick={handleMenuClose}>
                  <ListItemIcon>
                    <DashboardIcon fontSize="small" />
                  </ListItemIcon>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="flex items-center gap-1 text-gray-700 hover:text-gray-900 font-medium transition-colors"
              >
                <LoginIcon fontSize="small" />
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center gap-1 px-4 py-1.5 bg-blue-600 text-white rounded-full
                           hover:bg-blue-700 transition-colors font-medium text-sm"
              >
                <HowToRegIcon fontSize="small" />
                Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
