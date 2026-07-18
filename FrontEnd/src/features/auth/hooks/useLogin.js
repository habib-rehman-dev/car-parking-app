import { useMutation } from "@tanstack/react-query";
import { login } from "../api/usersApi";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useLogin = () => {

  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),

    onSuccess: () => {

      toast.success("Logged in successfully!");
      navigate("/");
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export default useLogin;
