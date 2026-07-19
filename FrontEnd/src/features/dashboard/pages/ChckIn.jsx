import { useState } from "react";
import { useCheckIn } from "../hooks/useCheckin";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CheckIn = () => {
  const checkInMutation = useCheckIn();

  const [formData, setFormData] = useState({
    driverName: "",
    phone: "",
    type: "car",
    licencePlate: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInMutation.mutate(formData, {
      onSuccess: () => {
        // reset form after a successful check-in so the receptionist can do the next one
        setFormData({ driverName: "", phone: "", type: "car", licencePlate: "" });
      },
    });
  };

  // express-validator sends { errors: [{ msg, path }, ...] } — turn it into
  // a lookup so we can show the right message under the right field
  const fieldErrors = {};
  const validationErrors = checkInMutation.error?.response?.data?.errors;
  if (Array.isArray(validationErrors)) {
    validationErrors.forEach((err) => {
      fieldErrors[err.path || err.param] = err.msg;
    });
  }

  // a non-field-specific error (e.g. server crash) falls back to a general message
  const generalError =
    !validationErrors && checkInMutation.isError
      ? checkInMutation.error?.response?.data?.message || "Check-in failed. Please try again."
      : null;

  const inputClass = (fieldName) =>
    `bg-white/20 border ${
      fieldErrors[fieldName] ? "border-red-400/60" : "border-white/30"
    } placeholder-white/60 text-white p-3 rounded-xl outline-none
     focus:border-white/60 focus:bg-white/25 transition-all w-full`;

  return (
    <div className="flex justify-center items-start">
      <div
        className="w-full max-w-lg p-8 bg-white/15 backdrop-blur-xl
                   border border-white/30 shadow-2xl shadow-black/20 rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white mb-1">Vehicle Check-In</h2>
        <p className="text-white/60 text-sm mb-6">Register a new vehicle entering the lot</p>

        {checkInMutation.isSuccess && (
          <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-200 text-sm">
            <CheckCircleIcon fontSize="small" />
            Vehicle checked in successfully.
          </div>
        )}

        {generalError && (
          <p className="mb-5 text-red-300 text-sm bg-red-500/20 border border-red-400/30 rounded-lg p-3">
            {generalError}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Driver Name */}
          <div>
            <input
            required
              type="text"
              name="driverName"
              placeholder="Driver Name"
              className={inputClass("driverName")}
              value={formData.driverName}
              onChange={handleChange}
            />
            {fieldErrors.driverName && (
              <p className="text-red-300 text-xs mt-1">{fieldErrors.driverName}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
            required
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className={inputClass("phone")}
              value={formData.phone}
              onChange={handleChange}
            />
            {fieldErrors.phone && (
              <p className="text-red-300 text-xs mt-1">{fieldErrors.phone}</p>
            )}
          </div>

          {/* Vehicle Type — matches backend enum: car / bike */}
          <div>
            <div className="flex gap-3">
              {[
                { value: "car", label: "Car", icon: <DirectionsCarIcon fontSize="small" /> },
                { value: "bike", label: "Bike", icon: <TwoWheelerIcon fontSize="small" /> },
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer
                    transition-all
                    ${
                      formData.type === option.value
                        ? "bg-white/30 border-white/60 text-white font-semibold"
                        : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                    }`}
                >
                  <input
                    type="radio"
                    name="type"
                    value={option.value}
                    checked={formData.type === option.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  {option.icon}
                  {option.label}
                </label>
              ))}
            </div>
            {fieldErrors.type && (
              <p className="text-red-300 text-xs mt-1">{fieldErrors.type}</p>
            )}
          </div>

          {/* Licence Plate */}
          <div>
            <input
            required
              type="text"
              name="licencePlate"
              placeholder="Licence Plate (e.g. LHR-123)"
              className={inputClass("licencePlate") + " uppercase"}
              value={formData.licencePlate}
              onChange={handleChange}
            />
            {fieldErrors.licencePlate && (
              <p className="text-red-300 text-xs mt-1">{fieldErrors.licencePlate}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={checkInMutation.isPending}
            className="bg-blue-500/80 hover:bg-blue-600/90 text-white p-3 rounded-xl
                       font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {checkInMutation.isPending ? "Checking In..." : "Check In Vehicle"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckIn;