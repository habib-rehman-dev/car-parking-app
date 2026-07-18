import { useMutation } from "@tanstack/react-query";
import { login } from "../api/usersApi";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import  useAuth  from "../../../contexts/useAuth";

const useLogin = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),

    onSuccess: (data) => {
      setUser(data.user);
      // localStorage.setItem("token", data.token); // ← missing this
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export default useLogin;
