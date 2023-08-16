function formatTime(value) {
  let date = new Date(value);
  //return `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")}`;
  let hours = date.getHours();
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert 0 to 12

  return `${hours}:${String(date.getMinutes()).padStart(2, "0")} ${period}`;
}
exports.formateTime = formatTime;
