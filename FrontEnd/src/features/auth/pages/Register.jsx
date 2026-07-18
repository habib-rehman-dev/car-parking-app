import { useState } from "react";
import { Link } from "react-router-dom";
import useRegister from "../hooks/useRegister";

const Register = () => {
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    // name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[url('/bg-parking.jpg')] bg-cover bg-center px-4">
      {/* dark overlay so the glass card reads clearly against a busy background image */}
      <div className="absolute inset-0 bg-black/30" />

      <div
        className="relative z-10 w-full max-w-md p-8
                   bg-white/15 backdrop-blur-xl
                   border border-white/30
                   shadow-2xl shadow-black/20
                   rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-1">Create Account</h2>
        <p className="text-white/70 text-center text-sm mb-6">Join Parking Management today</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="bg-white/20 border border-white/30 placeholder-white/60 text-white
                       p-3 rounded-xl outline-none focus:border-white/60 focus:bg-white/25 transition-all"
            // value={formData.name}
            onChange={handleChange}
            required
          /> */}

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white/20 border border-white/30 placeholder-white/60 text-white
                       p-3 rounded-xl outline-none focus:border-white/60 focus:bg-white/25 transition-all"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="bg-white/20 border border-white/30 placeholder-white/60 text-white
                       p-3 rounded-xl outline-none focus:border-white/60 focus:bg-white/25 transition-all"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          {/* Role selection */}
          <div className="flex gap-3">
            {["user", "admin"].map((roleOption) => (
              <label
                key={roleOption}
                className={`flex-1 text-center p-3 rounded-xl border cursor-pointer capitalize transition-all
                  ${
                    formData.role === roleOption
                      ? "bg-white/30 border-white/60 text-white font-semibold"
                      : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
                  }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={roleOption}
                  checked={formData.role === roleOption}
                  onChange={handleChange}
                  className="hidden"
                />
                {roleOption}
              </label>
            ))}
          </div>

          {registerMutation.isError && (
            <p className="text-red-300 text-sm text-center bg-red-500/20 border border-red-400/30 rounded-lg p-2">
              {registerMutation.error?.response?.data?.message || "Registration failed. Try again."}
            </p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="bg-blue-500/80 hover:bg-blue-600/90 text-white p-3 rounded-xl
                       font-semibold transition-all backdrop-blur-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-white/70 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;