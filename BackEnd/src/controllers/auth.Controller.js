import * as authService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import User from "../model/User.model.js";


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

export const getme = async (req, res) => {
  try {
    let token = req.cookies.token;
    let decoded = jwt.verify(token, process.env.JWT_SECRET );
    let _id = decoded._id;
    let user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    res.json({ message: "you got the user data", user, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error", success: false });
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
