import jwt from "jsonwebtoken";
import User from "../model/User.model.js";
import { ApiError, AuthenticationError } from "../utils/errors.js";

export async function login({ email, password }) {
  let isExist = await User.findOne({ email });
  if (!isExist || (await isExist.matchpassword(password)) === false) {
    throw new AuthenticationError("Invalid Credentials");
  }

  let token = jwt.sign(
    { _id: isExist._id, email: isExist.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    result: {
      user: isExist,
      message: "you loged in successfuly",
      success: true,
    },
  };
}

export async function register({ email, password, role }) {
  let isExist = await User.findOne({ email });

  if (isExist)
    throw new ApiError("user is already exist with the same email" , 409 , "USER_ALREADY_EXIST");
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
