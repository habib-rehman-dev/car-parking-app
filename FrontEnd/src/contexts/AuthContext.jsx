import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {getme} from '../features/auth/api/usersApi'
import { AuthContext } from "./useAuth"; 

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  // const { isLoading } = useQuery({
  //   queryKey: ["authUser"],
  //   queryFn: getme,
  //   retry: false,              
  //   refetchOnWindowFocus: false,


  //   onSuccess: (data) => setUser(data.user),
  //   onError: () => setUser(null),
  // });


  // if (isLoading) return 'Loading...'

  return (
    <AuthContext.Provider
      value={{
        user,          // the user object (null if not logged in)
        setUser,       // used by useLogin and useLogout to update user
        isLoggedIn: !!user,  // boolean — true if user exists
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// NOTE: For React Fast Refresh stability, this file should only export the
// component. Move shared hooks/utilities (like useAuth) to a separate file
// (e.g. ./useAuth.js) and export them from there. Keep a local non-exported
// helper here if needed.

// local (non-exported) convenience hook — move this to a new file for sharing


export default AuthProvider;