import {  createContext, useContext } from "react";

export let AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};


export default useAuth;