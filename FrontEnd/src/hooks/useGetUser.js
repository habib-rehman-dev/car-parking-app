import { useQuery } from "@tanstack/react-query";
import { getme } from "../features/auth/api/usersApi";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      let data = await getme();
      return data.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

// useQuery({
//     queryKey: ["me"],
//     queryFn: async () => {
//       const  data  = await getme();
//       return data.user;
//     },
//     retry: false,
//     staleTime: 5 * 60 * 1000,
//   });
