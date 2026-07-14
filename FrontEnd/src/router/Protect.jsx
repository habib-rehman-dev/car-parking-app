import { useContext } from "react";
import AuthCont from "../context/auth.context";
import { Navigate, useNavigate } from 'react-router-dom';


import React from 'react'

const Protect = ({children}) => {
    let navigate = useNavigate()
    let {isLogedIn } = useContext(AuthCont)
   
if(!isLogedIn){
  console.log('navigated to the login');
  navigate('/login')
  //  return 
}
    return children
}

export default Protect



// i am geting this errro but i dont no what this mean is 
// {You should call navigate() in a React.useEffect(), not when your component is first rendered.}