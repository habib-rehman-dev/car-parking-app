import axiosInstance from "../../../api/axiosInstance";



export let getActive = async()=>{
    let {data} = await axiosInstance.get('/sessions/getactive')
    console.log(data)
    return data.result
}




export async function checkIn({ driverName, phone, type, licencePlate }) {
  const { data } = await axiosInstance.post("/vehicle/checkin", {
    driverName,
    phone,
    type,
    licencePlate,
  });
  return data;
}


export async function checkout({ licencePlate }) {
  const { data } = await axiosInstance.patch("/vehicle/checkout", {
   
    licencePlate,
  });
  return data;
}

// features/vehicles/api/vehicleApi.js
export async function history({ limit, page }) {
  const { data } = await axiosInstance.get("/sessions/gethistory", {
    params: { limit, page }, // Axios turns this into ?limit=10&page=1 automatically
  });
  console.log(data)
  return data;
}