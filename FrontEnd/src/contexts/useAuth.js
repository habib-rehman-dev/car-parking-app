import {  createContext, useContext } from "react";

let AuthContext = createContext();
const useAuth = () => {
  return useContext(AuthContext);
};

// Default export for the hook
export default useAuth;