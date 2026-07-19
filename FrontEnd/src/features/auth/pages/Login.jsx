import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const loginMutation = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-[url('/bg-parking.jpg')] bg-cover bg-center px-4">
      <div className="absolute inset-0 bg-black/30" />

      <div
        className="relative z-10 w-full max-w-md p-8
                   bg-white/15 backdrop-blur-xl
                   border border-white/30
                   shadow-2xl shadow-black/20
                   rounded-2xl"
      >
        <h2 className="text-2xl font-bold text-white text-center mb-1">Welcome Back</h2>
        <p className="text-white/70 text-center text-sm mb-6">Login to your account</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="bg-white/20 border border-white/30 placeholder-white/60 text-white
                       p-3 rounded-xl outline-none focus:border-white/60 focus:bg-white/25 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="bg-white/20 border border-white/30 placeholder-white/60 text-white
                       p-3 rounded-xl outline-none focus:border-white/60 focus:bg-white/25 transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {loginMutation.isError && (
            <p className="text-red-300 text-sm text-center bg-red-500/20 border border-red-400/30 rounded-lg p-2">
              {loginMutation.error?.response?.data?.message || "Login failed. Check your credentials."}
            </p>
          )}

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="bg-blue-500/80 hover:bg-blue-600/90 text-white p-3 rounded-xl
                       font-semibold transition-all backdrop-blur-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;