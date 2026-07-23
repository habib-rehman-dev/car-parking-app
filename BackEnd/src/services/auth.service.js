import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
import { ApiError, AuthenticationError } from "../utils/errors.js";


  
  const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

// exports.refresh = async (req, res) => {
//   const token = req.cookies.refreshToken;
//   if (!token) return res.status(401).json({ message: "No refresh token" });

//   try {
//     const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
//     const accessToken = jwt.sign({ userId: decoded.userId }, process.env.ACCESS_SECRET, { expiresIn: "15m" });
//     res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
//     res.json({ success: true });
//   } catch (err) {
//     res.status(403).json({ message: "Invalid refresh token" });
//   }
// };





export async function login({ email, password }) {
  let user = await User.findOne({email});
  console.log('login 1')
  if (!user || (await user.matchpassword(password)) === false) {
    throw new AuthenticationError("Invalid Credentials");
  }
  const { accessToken, refreshToken } = generateTokens(user._id);

  return {
     accessToken, refreshToken ,
    result: {
      user: user,
      message: "you loged in successfuly",
      success: true,
    },
  };
}

export async function register({ email, password, role }) {

  let isExist = await User.findOne({ email });

  if (isExist){

    throw new ApiError("user is already exist with the same email" , 409 , "USER_ALREADY_EXIST");
  }
  console.log(isExist)
  let user = await User.create({
    email: email,
    password: password,
    role: role,
  });
  if (!user) throw new Error("sorry sth went wrong");
  
  return {
    message: "user created succsfully",
    success: true,
  };
}
