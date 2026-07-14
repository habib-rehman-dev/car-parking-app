import * as dashboardService from '../services/dashboard.service.js'


export async function getStats(req, res, next) {
  try {
    let stats = await dashboardService.getStats()
    if(!stats){
        throw new Error('Error while geting the stats of the parking')
    }
    res.json({
        success: true,
        message: 'stats get in',
        stats});
  } catch (error) {
    next(error);
  }
}
export async function getAllParked(req, res, next) {
  try {
    let parked = await dashboardService.getAllParked()
     if(!parked){
        throw new Error('Error while geting parked vheicles')
    }
    res.json( {success: true,
        message: 'Parked vhecel got successfull',
        parked});
  } catch (error) {
    next(error);
  }
}


export async function getRevenue(req, res, next) {
  try {
   let revenue = await dashboardService.getRevenue()
   if(!revenue){
    throw new Error('there is some technical issue in the calculation of the total revenue.')
   }
  res.status(200).json({
    success : true ,
    message: 'Revenue fetched successfully',
    revenue
  });
  } catch (error) {
    next(error);
  }
}