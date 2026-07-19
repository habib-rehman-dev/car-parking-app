// components/common/LoadingState.jsx
const LoadingState = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12">
      <div className="w-8 h-8 border-3 border-white/30 border-t-white rounded-full animate-spin" />
      <p className="text-white/60 text-sm">{message}</p>
    </div>
  );
};

export default LoadingState;