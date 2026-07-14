import apiclient from "../api/apiclient.js";

export async function getSessions() {
  let { data } = await apiclient.get("/sessions/getactive");
  return await data.result;
}

export async function getHistory() {
  let { data } = await apiclient.get("/sessions/gethistory");

  return await data.result;
}
