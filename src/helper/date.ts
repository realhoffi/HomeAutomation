export function getGermanDateString(date: Date): string {
  if (!date) {
    return "";
  }
  return date.toLocaleString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}
export function addDays(
  dateToAdd: Date,
  daysToAdd: number,
  setHrsMinSecMiSecToZero: boolean = false
): Date {
  let calculatedDate = new Date(dateToAdd);
  calculatedDate.setDate(calculatedDate.getDate() + daysToAdd);
  if (setHrsMinSecMiSecToZero) {
    calculatedDate = setDatePropertiesToZero(calculatedDate);
  }
  return calculatedDate;
}
export function setDatePropertiesToZero(dateToSet: Date): Date {
  let calculatedDate = new Date(dateToSet);
  calculatedDate.setMinutes(0);
  calculatedDate.setHours(0);
  calculatedDate.setSeconds(0);
  calculatedDate.setMilliseconds(0);
  return calculatedDate;
}
