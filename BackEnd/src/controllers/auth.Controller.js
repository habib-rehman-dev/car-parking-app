import * as authService from "../services/auth.service.js";
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
    console.log(req.body)
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
    let token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "not autherized", success: false });
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET || "my secret_ ji");
    let _id = decoded._id;
    let user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", success: false });
    }
    res.json({ messege: "you got the user data", user, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error", success: false });
  }
};

export const logout = (req, res) => {
  try {
    console.log('hi')
    res.clearCookie("token");
    
    res.json({ message: "loged out successfully", success: true });
  } catch (err) {
    console.log(err.message);
    res.json({ messege: "faild to logout" });
  }
};
