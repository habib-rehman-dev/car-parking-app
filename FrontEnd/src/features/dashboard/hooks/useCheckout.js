// features/vehicles/hooks/useCheckout.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkout } from "../api/vheicleSessionApi";


export const useCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-parked"] }); // MUST match useGetActive's key exactly
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["revenue"] });
    },
  });
};

