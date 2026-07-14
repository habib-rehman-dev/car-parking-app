import { useState } from "react";
import { register as register_ } from "../../service/auth.service";

let useRegister = () => {
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [success , setSuccess] = useState(false)
  
    let register = async (email , password , role) => {
      try {
        setIsLoading(true);
        let data = await register_(email , password , role);
        console.log(data)
        setIsLoading(false);
        setError(null);
        setSuccess(true)
      } catch (err) {
        setIsLoading(false);
        setError(err?.message || "Error while getting the stats");
      }
    };
 
  
  return { success, isLoading, error  ,  register};
};

export default useRegister;