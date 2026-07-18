import { getme } from "../api/usersApi";
import { useQuery } from '@tanstack/react-query';





export const useGetme = () => {
    return useQuery({
        queryKey: ['me'],
        queryFn:  async () => {
      const { data } = await getme();
      console.log(data.user);
      return data.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
    })
}
export default useGetme