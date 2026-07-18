import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
import { ApiError, AuthenticationError } from "../utils/errors.js";


const cookieOptions = {
  httpOnly: true, // JS can't read it — XSS protection
  secure: true, // only sent over HTTPS
  sameSite: "strict", // CSRF protection — cookie only sent for same-site requests
};

export const login = async (req, res, next) => {
  try {
    let { accessToken ,refreshToken, result } = await authService.login(req.body, res);

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};
export const refresh = async (req, res, next) => {
  const token = req.cookies.refreshToken;
  if (!token) throw new AuthenticationError("No refresh token");

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
    res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
    res.json({ success: true });
  } catch (err) {
    
    throw new AuthenticationError("Invalid refresh token");
  }
};
export const register = async (req, res, next) => {
  try {
    let result = await authService.register(req.body);
   if(!result){
    throw new ApiError('SignUp Got Failed' , 400 , 'SignUp_Error')
   }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);

    res.json({ message: "Logged out successfully", success: true });
  } catch (err) {
    throw new ApiError("Logout failed", 500, "LOGOUT_FAILED");
  }
};

export const getme = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      throw new AuthenticationError("Token Missing");
    }
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
      throw new AuthenticationError("User not found");
    }
    res.json({user, successjh: true });
  } catch (err) {
    
    throw new AuthenticationError("Invalid or Expired Token");
  }
};
