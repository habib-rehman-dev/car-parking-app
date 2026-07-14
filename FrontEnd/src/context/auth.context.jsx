import { createContext } from "react";
import { useState } from "react";
import { loginCall } from "../service/auth.service";
import { logout as logout_ } from "../service/auth.service";

let AuthCont = createContext();

export const AuthProvider = ({ children }) => {
  let [isLogedIn, setIsLogedIn] = useState(false);
  let [role , setRole] = useState(null)
  let [email, setEmail] = useState(null);
  let [error, setError] = useState(null);
  let [isLoading, setIsloading] = useState(false);
    let  login = async (email_, password_) =>{
    try {

      setIsloading(true);
      setError(null);
      setIsLogedIn(false)
      let  data  =  await loginCall(email_, password_);
      setEmail(data?.user?.email ?? "Error while seting the email!");
      setRole(data?.user?.role ?? null)
      setIsLogedIn(true)

    } catch (error) {
      setIsLogedIn(false)

      setError(error?.message ?? "Login failed!");
    }
  }
  let logout = async ()=>{
    try{
      await logout_()
     setEmail(null)
     setRole(null)
setIsloading(false)
setIsLogedIn(false)
    }
    catch(err){
    setError(err?.message ?? 'failed to logout.')
  }
  }
  return (
    <AuthCont.Provider value={{  email, error, isLoading , login ,role ,isLogedIn , logout}}>
      {children}
    </AuthCont.Provider>
  );
};

export default AuthCont;
