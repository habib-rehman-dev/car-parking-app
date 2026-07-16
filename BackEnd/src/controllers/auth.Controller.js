import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
import { ApiError, AuthenticationError } from "../utils/errors.js";


export const register = async (req, res, next) => {
  try {
    let result =await authService.register(req.body);
    
    res.json(result);
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    
    let {token ,result } = await authService.login(req.body, res);
      res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });
    res.json(result);
  } catch (err) {
    next(err);
  }
};



export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    
    res.json({ message: "loged out successfully", success: true });
  } catch (err) {
    console.log(err.message);
    res.json({ messege: "faild to logout" });
  }
};


export const getme = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new AuthenticationError('Token Missing')
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("-password");
    res.json({ message: "User data retrieved", user, success: true });
  } catch (err) {
    next(err);  // Let your error middleware handle it
  }
};