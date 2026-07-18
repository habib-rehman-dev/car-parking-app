import {
  useMutation,
  // useQueryClient
} from "@tanstack/react-query";

import { useNavigate } from "react-router-dom";
import { register } from "../api/usersApi";
import toast from "react-hot-toast";

const useRegister = () => {
  //   const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data_) => {
      console.log("Data fetched during register");
      const data = await register(data_);
      console.log("Data fetched during register", data);
      return data;
    },
    onSuccess: (data) => {
      // Backend registered AND logged them in (cookies set) — cache the user directly
      //   queryClient.setQueryData(["me"], data.user);

      console.log(data);
      navigate("/login");
      //   navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.message || "Failed SignUp");
    },
  });
};

export default useRegister;
