import ParkingSession from "../model/ParkingSession.js";

export async function getAllSession(){
let result = await ParkingSession.find({status: 'parked'}).populate('vehicleId')
// if(!result)

return result
}
export async function getHistory(){
let result = await ParkingSession.find({status: 'exited' , }).sort({createdAt:-1}).populate('vehicleId')

if(result == [] || result.length == 0){
throw new Error('no parking session found' ,)
}
return result
}