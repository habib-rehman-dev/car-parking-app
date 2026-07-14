import apiclient from "../api/apiclient.js";

export async function getStats() {
 
    let { data } = await apiclient.get("/dashboard/stats");
    return await data;

    
}

export async function getRevenue() {
 
    let { data } = await apiclient.get("/dashboard/revenue");
    return await data;
 
}

export async function getallparked() {
 
    let { data } = await apiclient.get("/dashboard/getallparked");
    return await data.parked;
 
}
getallparked()