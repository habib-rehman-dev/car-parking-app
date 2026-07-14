import * as vheicleService from "../services/vheicle.service.js";

export async function checkIn(req, res, next) {
  try {
    let result = await vheicleService.checkin(req.body);

    res.json(result);
  } catch (err) {
    next(err);
  }
}
export async function checkOut(req, res, next) {
  try {
    let result = await vheicleService.checkOut(req.body);

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
    let result = await vheicleService.search({licencePlate});

    res.json(result);
  } catch (err) {
    next(err);
  }
}
