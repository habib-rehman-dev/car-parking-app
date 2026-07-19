// features/dashboard/hooks/useRevenue.js
import { useQuery } from "@tanstack/react-query";
import { revenue } from "../api/dashboardApi";

export const useRevenue = () => {
  return useQuery({
    queryKey: ["revenue"],
    queryFn: revenue,
    staleTime: 60 * 1000,
  });
};