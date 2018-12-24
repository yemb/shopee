Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
Date.prototype.addMonth = function (number) {
  var date = new Date(this.valueOf())
  date.setMonth(date.getMonth() + number)
  return date
}
export const getStartOfThisDay = (date) => {
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}
