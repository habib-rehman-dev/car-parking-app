import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Protect = ({ children }) => {
  let navigate = useNavigate();
  let isLogedIn = useSelector(s=>s.auth.isLogedIn);
  useEffect(() => {
    if (!isLogedIn) navigate("/login");
  }, [isLogedIn, navigate]);
  return <div>{children}</div>;
};

export default Protect;
