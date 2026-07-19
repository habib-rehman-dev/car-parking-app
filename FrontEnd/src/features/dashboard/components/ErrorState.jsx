// components/common/ErrorState.jsx
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import RefreshIcon from "@mui/icons-material/Refresh";

const ErrorState = ({ error, onRetry }) => {
  // Prefer the backend's actual message if it sent one, fall back to something generic
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "Something went wrong. Please try again.";

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-12 px-6
                 bg-red-500/10 border border-red-400/30 rounded-2xl text-center"
    >
      <ErrorOutlineOutlinedIcon className="text-red-300" fontSize="large" />
      <p className="text-red-200 text-sm max-w-sm">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1.5 mt-2 px-4 py-2 bg-white/10 hover:bg-white/20
                     text-white text-sm rounded-xl border border-white/20 transition-all"
        >
          <RefreshIcon fontSize="small" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorState;