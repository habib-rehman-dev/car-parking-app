import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkIn } from "../api/vheicleSessionApi";

export const useCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkIn,
    onSuccess: () => {
      // A new session was created — any cached "active vehicles" or "stats"
      // data is now stale, so invalidate to trigger a refetch
      queryClient.invalidateQueries({ queryKey: ["active-parked"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};