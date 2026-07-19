// features/vehicles/hooks/useHistory.js
import { useQuery } from "@tanstack/react-query";
import { history } from "../api/vheicleSessionApi";

export const useHistory = ({ limit = 10, page = 1 } = {}) => {
  return useQuery({
    queryKey: ["session-history", page, limit],
    queryFn: async () => {
      const response = await history({ limit, page });
      return response.result; // unwrap once here — component only sees { docs, totalPages, hasNextPage, ... }
    },
    keepPreviousData: true,
  });
};