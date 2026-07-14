import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthCont from "../../context/auth.context";
import { useContext } from "react";

const Login = () => {
  const navigate = useNavigate();
  //  let context =
  let { error, login: login_ } = useContext(AuthCont);
  let [password, setPassword] = useState("12345678");
  let [email, setEmail] = useState("habib@gmail.com");

  function handleSubmit(e) {
    e.preventDefault();

    login_(email, password);
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Parking Management
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to manage your parking sessions
          </p>
        </div>
        {error}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error?.message && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-700">
                {error?.message || "Login failed"}
              </p>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              // disabled={user.status == 'loading'}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              sign
              {/* {user.status=='loading' ? "Signing in..." : "Sign in"} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
