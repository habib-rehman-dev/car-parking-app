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