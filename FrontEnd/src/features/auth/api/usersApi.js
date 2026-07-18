import axiosInstance from "../../../api/axiosInstance";

export const login = async (email, password) => {
  let result = await axiosInstance.post("/auth/login", { email, password });
  return result.data;
};

export const register = async (email, password, role) => {
  let result = await axiosInstance.post("/auth/register", {
    email,
    password,
    role,
  });
  return result.data;
};

export const getme = async () => {
  let result = await axiosInstance.get("/auth/getme");
  return result.data;
};

export const logout = async () => {
 await axiosInstance.get("/auth/logout");

};