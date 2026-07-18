import { Route , Routes } from "react-router-dom";


import Home from "../page/Home";
import Login from "../features/auth/pages/Login";

const Approuter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}

export default Approuter
