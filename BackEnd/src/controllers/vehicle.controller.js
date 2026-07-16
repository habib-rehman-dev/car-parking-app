import * as vehicleService from "../services/vheicle.service.js";

export async function checkIn(req, res, next) {
  try {
    let result = await vehicleService.checkin(req.body);
    console.log(result)

    res.json(result);
  } catch (err) {
    next(err);
  }
}
export async function checkOut(req, res, next) {
  try {
    let result = await vehicleService.checkOut(req.body);

    res.json(result);
  } catch (err) {
    next(err);
  }
}
export async function search(req, res, next) {
  try {
    let licencePlate = req.params.licencePlate

    console.log( licencePlate)

    if (!licencePlate) {
      throw new Error("Licence Plate is Required.");
    }
    let result = await vehicleService.search({licencePlate});

    res.json(result);
  } catch (err) {
    next(err);
  }
}
