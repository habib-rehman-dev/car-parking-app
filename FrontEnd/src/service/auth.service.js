import apiclient from "../api/apiclient.js";

export async function registerCall(credentials) {
  let { data } = await apiclient.post("/register", credentials);

  return await data;
}

export async function loginCall(email, password) {
  console.log("the data is over here");

  let { data } = await apiclient.post("/auth/login", { email, password });
  console.log(data);
  return data;
}
export async function register(email, password , role) {
  console.log("the data is over here");

  let { data } = await apiclient.post("/auth/register", { email, password ,role });
  console.log(data);
  return data;
}

export async function logout() {
  await apiclient.get("/auth/logout");
  return;
}

// register({ email: "habib@gmail.com", password: 12345678 });
