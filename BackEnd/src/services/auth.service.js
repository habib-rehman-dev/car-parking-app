import jwt from "jsonwebtoken";
import User from "../model/User.model.js";

// rule for service => service should never touch the http

export async function login({ email, password }) {
  let isExist = await User.findOne({ email });
  if (!isExist || (await isExist.matchpassword(password)) === false) {
    throw new Error("Invalid Credentials");
    // throw new ApiError("Invalid Credentials");
  }
  console.log(isExist);
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

  if (isExist) throw new Error("user is already exist with the same email");

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

