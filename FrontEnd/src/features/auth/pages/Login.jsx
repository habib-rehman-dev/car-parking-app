import { useState } from "react";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const loginMutation = useLogin();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(email, password);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="p-10 border-blue-600/10 border w-1/2 z-20 rounded-lg backdrop-blur">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Login
            </button>
            {/* {JSON.stringify(useLogin())} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
