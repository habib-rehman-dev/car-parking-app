// features/dashboard/api/dashboardApi.js
import axiosInstance from "../../../api/axiosInstance";

export async function stats() {
  const { data } = await axiosInstance.get("/dashboard/stats");
  
  return data.stats;
}

export async function getAllParked() {
  const { data } = await axiosInstance.get("/dashboard/getallparked");
  return data.parked;
}

export async function revenue() {
  const { data } = await axiosInstance.get("/dashboard/revenue");
  console.log(data)
  return data.revenue;
}