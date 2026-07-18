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
      // Wipe the cached user — don't just invalidate, REMOVE it.
      queryClient.setQueryData(["me"], null);

      // Clear everything else too — no leftover data from the old session
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