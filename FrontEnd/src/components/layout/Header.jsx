import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
  ListItemIcon,
} from "@mui/material";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { useGetUser } from "../../hooks/useGetUser";
import { useLogout } from "../../features/auth/hooks/useLogout";

const Header = () => {
  const { data: user, isLoading } = useGetUser();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const { mutate: logout } = useLogout();

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <header className="sticky top-0 z-50 p-3 sm:p-4">
      <div
        className="flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3
                   bg-white/20 backdrop-blur-lg
                   border border-white/30
                   shadow-lg shadow-black/5
                   rounded-2xl"
      >
        {/* Logo — now doubles as the "Home" link */}
        <Link
          to="/"
          className="flex items-center space-x-1.5 sm:space-x-2 shrink-0"
        >
          <LocalParkingIcon className="text-blue-600" fontSize="large" />
          {/* Full name on larger screens, short form on mobile so it never wraps/crowds the avatar */}
          <h1 className="hidden sm:block text-xl font-bold text-gray-800">
            Parking Management
          </h1>
          <h1 className="sm:hidden text-lg font-bold text-gray-800">
            Parking
          </h1>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center space-x-3 sm:space-x-6">
          {user ? (
            <Link
              to="/dashboard"
              className="hidden sm:block text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            ""
          )}

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
                {/* Dashboard link now lives in the menu too — since it's hidden
                    from the nav bar on mobile, this is the only way to reach it there */}
                <MenuItem
                  component={Link}
                  to="/dashboard"
                  onClick={handleMenuClose}
                  className="sm:hidden"
                >
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
                <span className="hidden xs:inline">Login</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;