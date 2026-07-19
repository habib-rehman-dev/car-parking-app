import { useQuery } from '@tanstack/react-query';
import { getActive } from '../api/vheicleSessionApi';




export const useGetAcitve = () => {
  return useQuery({
    queryKey: ["all-parked"],
    queryFn: getActive,
    staleTime: 30 * 1000, // this changes more often (cars coming/going), shorter staleTime
    refetchInterval: 30 * 1000, // auto-refetch every 30s — good for a "live" dashboard view
  });
};
export default useGetAcitve
