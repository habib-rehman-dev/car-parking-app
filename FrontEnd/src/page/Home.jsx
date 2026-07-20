import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import { useGetUser } from "../hooks/useGetUser";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import LoginIcon from "@mui/icons-material/Login";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";

const Home = () => {
  const { data: user, isLoading } = useGetUser();
  const navigate = useNavigate();

  // Logged-in users never actually see this page — they're bounced
  // straight to their dashboard the moment we know who they are
  useEffect(() => {
    if (!isLoading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoading, user, navigate]);

  // While we're checking auth status, or right after redirecting,
  // show nothing meaningful — avoids a flash of landing content
  // for a user who's about to get bounced to /dashboard anyway
  if (isLoading || user) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center text-center px-4 py-20 sm:py-28">
        <LocalParkingIcon
          sx={{ fontSize: 56 }}
          className="text-blue-600 mb-4"
        />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
          Parking Management System
        </h1>
        <p className="text-gray-600 max-w-md mb-8">
          Track vehicle check-ins, check-outs, and parking revenue in one place.
          Log in to access your dashboard.
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700
                       text-white font-medium rounded-xl transition-colors"
          >
            <LoginIcon fontSize="small" />
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;