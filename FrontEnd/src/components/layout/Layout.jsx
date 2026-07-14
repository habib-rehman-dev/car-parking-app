import React from "react";
import Header from "./Header";
import Sidebar from "./SideBar";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Layout = ({children}) => {
  // const isAuthenticated = useSelector((s) => s.auth.isLogedIn);
  // let navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate("/login");
  // }

  return (
    <div className="flex h-screen bg-white ">
      <Sidebar />
      <div className="flex-1 flex  flex-col overflow-hidden">
        <Header />
        <div className="bg-white flex felx-col h-full">

        <main className="flex-1  overflow-y-auto p-6 rounded-tl-2xl  bg-gray-100 h-full ">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
