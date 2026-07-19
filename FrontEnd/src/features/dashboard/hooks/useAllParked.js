// features/dashboard/hooks/useAllParked.js
import { useQuery } from "@tanstack/react-query";
import { getAllParked } from "../api/dashboardApi";

export const useAllParked = () => {
  return useQuery({
    queryKey: ["all-parked"],
    queryFn: getAllParked,
    staleTime: 30 * 1000, // this changes more often (cars coming/going), shorter staleTime
    refetchInterval: 30 * 1000, // auto-refetch every 30s — good for a "live" dashboard view
  });
};