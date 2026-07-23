import axiosInstance from "../../../api/axiosInstance";

export const login = async (email, password) => {
  console.log(email , password)
  let result = await axiosInstance.post("/auth/login", { email, password });
  return result.data;
};

export const register = async ({ email, password, role }) => {
  const { data } = await axiosInstance.post("/auth/register", { email, password, role });
  console.log('register fun')
  return data; // clean JSON payload, not the full Axios response object
};

export const getme = async () => {
  let {data} = await axiosInstance.get("/auth/getme");
  
  return data;
};

export const logout = async () => {
 await axiosInstance.get("/auth/logout");

};