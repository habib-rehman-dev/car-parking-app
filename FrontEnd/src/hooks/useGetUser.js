// here i am going to get the data from the api using react query and axios 
import axiosInstance from "../api/axiosInstance";
import { useQuery } from "@tanstack/react-query";









const useGetUser =  () => {
    let fetchusers = async ()=>{
        let response = await axiosInstance.get()
        return response.data.users
    }
 


    return useQuery({
        queryKey: ['users'],
        queryFn: fetchusers,
        
    });
};

export default useGetUser
