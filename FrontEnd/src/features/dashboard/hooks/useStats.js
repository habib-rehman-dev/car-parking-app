// features/dashboard/hooks/useStats.js
import { useQuery } from "@tanstack/react-query";
import { stats } from "../api/dashboardApi";

export const useStats = () => {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: stats,
    staleTime: 60 * 1000, // stats don't need to refetch every second — 1 min is reasonable
  });
};