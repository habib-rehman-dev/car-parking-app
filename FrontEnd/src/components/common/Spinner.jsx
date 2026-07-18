// components/Spinner.jsx
export default function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-50 space-y-4">
      {/* Outer spinning ring */}
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="text-gray-500 font-medium text-sm animate-pulse">Loading data...</p>
    </div>
  );
}