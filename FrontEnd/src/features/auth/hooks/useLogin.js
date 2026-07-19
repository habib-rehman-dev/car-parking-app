import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/usersApi";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),

    onSuccess: (data) => {
      console.log(data);
      toast.success("Logged in successfully!");
      queryClient.setQueryData(["me"], data.user);
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    },

    onError: (error) => {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    },
  });
};

export default useLogin;
