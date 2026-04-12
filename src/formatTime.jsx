export function formatTime(value) {
  let date = new Date(value);
  let hours = date.getHours();
  let period = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${String(date.getMinutes()).padStart(2, "0")} ${period}`;
}
