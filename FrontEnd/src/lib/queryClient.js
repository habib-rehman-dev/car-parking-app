import { QueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export  let  queryclient=new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,   // ← Tier 2: data stays "fresh" for 5 minutes
      gcTime: 1000 * 60 * 10,     // ← Tier 2: unused cache cleared after 10 minutes
      retry: 1,                    // retry failed requests once before giving up
      refetchOnWindowFocus: true,  // refetch when user tabs back in (good for production)
    },
    mutations: {
      onError: (error) => {
        // Global mutation error handler
        // Any useMutation that doesn't have its own onError will fall here
        const message = error?.response?.data?.message || 'Something went wrong'
        toast.error(message)
      },
    },
  },
})
