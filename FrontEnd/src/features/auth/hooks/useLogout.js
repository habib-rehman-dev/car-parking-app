// features/auth/hooks/useLogout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/usersApi";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { data } = await logout();
      return data;
    },
    onSuccess: () => {
      queryClient.setQueryData(["me"], null); // instantly wipes cache, no refetch needed
      queryClient.clear();
      navigate("/login");
    },
    onError: () => {
      // Even if the server call fails (e.g. network hiccup),
      // don't trap the user logged-in-looking on a broken session.
      queryClient.setQueryData(["me"], null);
      navigate("/login");
    },
  });
};
