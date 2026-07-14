import apiclient from "../api/apiclient.js";

export async function vheicleCheckin(info) {
  let { data } = await apiclient.post("/vheicle/checkin", info);
  return data;
}

export async function vheicleCheckOut(licencePlate) {
  let { data } = await apiclient.put("/vheicle/checkout", { licencePlate });

  return data;
}
export async function serachByPlate(licencePlate) {
  let { data } = await apiclient.get(`/vheicle/search/${licencePlate}` );

  return data;
}
