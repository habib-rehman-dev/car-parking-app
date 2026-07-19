// features/users/pages/AddUser.jsx
import { useState } from "react";
import useRegister from "../../auth/hooks/useRegister";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const AddUser = () => {
  const registerMutation = useRegister();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ email: "", password: "", role: "user" }); // clear for the next user
      },
    });
  };

  return (
    <div className="max-w-lg">
      <div className="flex items-center gap-2 mb-1">
        <PersonAddIcon className="text-blue-300" />
        <h2 className="text-xl font-bold text-white">Add New User</h2>
      </div>
      <p className="text-white/60 text-sm mb-6">Create a login for staff or another admin</p>

      <div
        className="bg-white/10 backdrop-blur-md border border-white/20
                   rounded-2xl p-6"
      >
        {registerMutation.isSuccess && (
          <div className="flex items-center gap-2 mb-5 p-3 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-200 text-sm">
            <CheckCircleIcon fontSize="small" />
            User created successfully.
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="bg-white/10 border border-white/20 placeholder-white/50 text-white
                       p-3 rounded-xl outline-none focus:border-white/50 focus:bg-white/15 transition-all"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Temporary Password"
            className="bg-white/10 border border-white/20 placeholder-white/50 text-white
                       p-3 rounded-xl outline-none focus:border-white/50 focus:bg-white/15 transition-all"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <div className="flex gap-3">
            {["user", "admin"].map((roleOption) => (
              <label
                key={roleOption}
                className={`flex-1 text-center p-3 rounded-xl border cursor-pointer capitalize transition-all
                  ${
                    formData.role === roleOption
                      ? "bg-white/25 border-white/50 text-white font-semibold"
                      : "bg-white/5 border-white/15 text-white/60 hover:bg-white/10"
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
            <p className="text-red-300 text-sm bg-red-500/20 border border-red-400/30 rounded-lg p-3">
              {registerMutation.error?.response?.data?.message || "Failed to create user."}
            </p>
          )}

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="bg-blue-500/80 hover:bg-blue-600/90 text-white p-3 rounded-xl
                       font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;