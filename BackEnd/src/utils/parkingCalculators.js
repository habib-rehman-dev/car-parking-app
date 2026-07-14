export function calculateDaysParked(exitTime , entryTime ) {
  let dif = exitTime.getTime() - entryTime.getTime();
  let days = Math.ceil(dif / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 1;
}

export function calculateFee(types, cartype, days) {
  let fee = types[cartype];
  return fee * days;
}
